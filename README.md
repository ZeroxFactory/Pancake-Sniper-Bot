# Pancake-Sniper-Bot
Pancake Sniper Bot, a powerful Node.js application designed to streamline and enhance your experience in the world of decentralized finance (DeFi). This innovative bot is tailored for those seeking to effortlessly detect and seize opportunities in newly created liquidity pools (LPs) on PancakeSwap.

## Introduction

Introducing the Pancake Sniper Bot, a powerful Node.js application designed to streamline and enhance your experience in the world of decentralized finance (DeFi). This innovative bot is tailored for those seeking to effortlessly detect and seize opportunities in newly created liquidity pools (LPs) on PancakeSwap.

## Key Features

1. **Automatic LP Detection:** The Pancake Sniper Bot constantly monitors PancakeSwap for the creation of new liquidity pools, ensuring you stay ahead of the curve in the ever-evolving DeFi landscape.

2. **Precision Buying:** Leveraging sniper-like precision, the bot executes buy orders with accuracy, allowing you to swiftly capitalize on promising LP opportunities.

3. **Customizable Settings:** Tailor the bot's behavior to your preferences with customizable settings. Adjust parameters such as buy thresholds, frequency of scans, and more to align the bot with your investment strategy.

4. **Real-time Notifications:** Stay informed with instant notifications on your preferred channels. Receive alerts about newly created LPs, successful buys, and other critical events, ensuring you never miss a lucrative opportunity.

5. **Security First:** The Pancake Sniper Bot prioritizes the security of your assets. Implementing industry-best practices, your sensitive information is encrypted, and API keys are handled with the utmost care.

## Getting Started

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/ZeroxFactory/pancake-sniper-bot.git
    ```

2. Install dependencies:

    ```bash
    cd pancake-sniper-bot
    npm install
    ```

### Configuration

1. Edit bot.js file:
2. Add you wallet address and wallet private key

    ```bash
    const walletAddress = 'YOUR_WALLET_ADDRESS_HERE';
    const myPrivateKey = 'YOUR_WALLET_PRIVATE_KEY';
    const AMOUNT = '0.01' // How much BNB are you willing to spend on new tokens?
    ```
### Usage

Run the bot:

```bash
node bot.js

## Disclaimer:
Use the Pancake Sniper Bot responsibly and at your own risk. Always conduct thorough research and ensure compliance with relevant regulations before engaging in any financial activities.
the contract use 0xfactory router to make swap, it cost fee of 0.0005 BNB per swap.
