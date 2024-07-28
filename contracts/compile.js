const path = require('path');
const fs = require('fs');
const solc = require('solc');
require('dotenv').config();
const contractPath = path.resolve(__dirname, 'contracts', 'ECommerceChain.sol');
const source = fs.readFileSync(contractPath, 'utf8');
const input = {
  language: 'Solidity',
  sources: {
    'ECommerceChain.sol': {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['*'],
      },
    },
  },
};
const output = JSON.parse(solc.compile(JSON.stringify(input))).contracts['ECommerceChain.sol'];
const contractName = process.env.CONTRACT_NAME;
const { abi, evm } = output[contractName];
const contractData = {
  abi: abi,
  bytecode: evm.bytecode.object,
};
const outputPath = path.resolve(__dirname, 'build', `${contractName}.json`);
fs.writeFileSync(outputPath, JSON.stringify(contractData), 'utf8');