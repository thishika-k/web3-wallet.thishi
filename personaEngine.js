const axios = require("axios");
require("dotenv").config();

// Fetch ETH transactions from Etherscan
async function fetchTransactions(wallet) {
  const url = `https://api.etherscan.io/api?module=account&action=txlist&address=${wallet}&sort=asc&apikey=${process.env.ETHERSCAN_API_KEY}`;
  const response = await axios.get(url);

  if (!response.data.result || response.data.result.length === 0) {
    throw new Error("No transactions found or invalid wallet address.");
  }

  return response.data.result;
}

// Simple classification based on transaction count
function classify(transactions) {
  const txCount = transactions.length;
  if (txCount > 100) return "Active Trader";
  if (txCount > 20) return "Occasional Investor";
  return "Newbie or HODLer";
}

// Rule-based persona generation (no AI)
function generatePersona(wallet, transactions) {
  const txCount = transactions.length;
  let description = '';
  let recommendations = [];

  if (txCount > 100) {
    description = "This wallet belongs to an active trader who frequently interacts with DeFi protocols and on-chain assets.";
    recommendations = ["Uniswap", "Aave"];
  } else if (txCount > 20) {
    description = "This user is an occasional investor gradually exploring DeFi, NFTs, and other Web3 platforms.";
    recommendations = ["Zerion", "Rarible"];
  } else {
    description = "A newcomer or passive holder just stepping into the Ethereum ecosystem.";
    recommendations = ["MetaMask Learn", "OpenSea"];
  }

  return `${description} Suggested dApps/NFTs: ${recommendations.join(', ')}.`;
}

// Exported function
module.exports = async function (wallet) {
  const transactions = await fetchTransactions(wallet);
  const category = classify(transactions);
  const aiPersona = generatePersona(wallet, transactions); // <- no AI, but still 'persona'

  return {
    wallet,
    category,
    transactionsCount: transactions.length,
    aiPersona,
  };
};
