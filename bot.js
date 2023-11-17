// Intianiate Web3 connection
const Web3 = require('web3')
const data = require('0xfactory')
const web3 = new Web3('YOUR_END_POINT_NODE') // Replace this with a websocket connection , GET IT FREE FROM https://www.quicknode.com/

const IUniswapV2Pair = require('@uniswap/v2-core/build/IUniswapV2Pair.json')
const uFactory = new web3.eth.Contract(data.FactoryABI, data.FactoryV2)
const uRouter = new web3.eth.Contract(data.RouterABI, data.PancakeRouterV2)
const WETH = new web3.eth.Contract(data.TokenABI, data.BNB)


///////////////////////////// Edit this settings ///////////////////////////////
const walletAddress = 'YOUR_WALLET_ADDRESS_HERE'
const myPrivateKey = 'YOUR_WALLET_PRIVATE_KEY'
const AMOUNT = '0.01' // How much BNB are you willing to spend on new tokens?
////////////////////////////////////////////////////////////////////////////////


const main = async () => {

    web3.eth.accounts.wallet.add(myPrivateKey);
    const gasPrice = await web3.eth.getGasPrice();

    // Create event listener to listen to PairCreated
    uFactory.events.PairCreated({}, async (error, event) => {
        console.log(`New pair detected...\n`)

        const { token0, token1, pair } = event.returnValues
        //console.log(`Token0: ${token0}`)
        //console.log(`Token1: ${token1}`)
        //console.log(`Pair Address: ${pair}\n`)

        // Since we are buying this new token with WETH, we want to verify token0 & token1 address, and fetch the address of the new token?
        let path = []

        if (token0 === WETH._address) {
            path = [token0, token1]
        }

        if (token1 === WETH._address) {
            path = [token1, token0]
        }

        if (path.length === 0) {
            console.log(`Pair wasn\'t created with WETH...\n`)
            return
        }

        const uPair = new web3.eth.Contract(IUniswapV2Pair.abi, pair)
        const token = new web3.eth.Contract(data.TokenABI, path[1]) // Path[1] will always be the token we are buying.

        console.log(`Checking liquidity...\n`)
        //console.log(path[1])

        // Ideally you'll probably want to take a closer look at reserves, and price from the pair address
        // to determine if you want to snipe this particular token...
        const reserves = await uPair.methods.getReserves().call()

        if (reserves[0] == 0 && reserves[1] == 0) {
            console.log(`Token has no liquidity...`)
            return
        }

        console.log(`Swapping BNB...\n`)

        try {
            const amountIn = web3.utils.toWei(AMOUNT, 'ether')
            const deadline = Date.now() + 1000 * 60 * 10
            
            await uRouter.methods.swapExactETHForTokens(
                0, 
                path, 
                walletAddress, 
                deadline)
                .send({
                     from: walletAddress, 
                     gasPrice, 
                     gas: 500000,
                     value: amountIn,
                     privateKey: myPrivateKey, 
                    })

            console.log(`Swap Successful\n`)
            console.log(`The token contract is: \n`)
            console.log(path[1])

            // Check user balance of token:
            const symbol = await token.methods.symbol().call()
            const tokenBalance = await token.methods.balanceOf(walletAddress).call()

            console.log(`Successfully swapped ${AMOUNT} BNB for ${web3.utils.fromWei(tokenBalance.toString(), 'ether')} ${symbol}\n`)
        } catch (error) {
            console.log(`Error Occured while swapping...`)
            console.log(error)
        }

        console.log(`Listening for new pairs...\n`)

    })

    console.log(`Listening for new pairs...\n`)
}

main()