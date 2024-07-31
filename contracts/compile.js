const path = require('path');
const fileSystem = require('fs');
const solidityCompiler = require('solc');
require('dotenv').config();

const smartContractFilePath = path.resolve(__dirname, 'contracts', 'ECommerceChain.sol');
const smartContractSourceCode = fileSystem.readFileSync(smartContractFilePath, 'utf8');

const compilerInput = {
  language: 'Solidity',
  sources: {
    'ECommerceChain.sol': {
      content: smartContractSourceCode,
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

const compilerOutput = JSON.parse(solidityCompiler.compile(JSON.stringify(compilerInput))).contracts['ECommerceChain.sol'];
const smartContractName = process.env.CONTRACT_NAME;

// Extracting ABI and Bytecode for the specified contract
const { abi: contractABI, evm: contractEVM } = compilerOutput[smartContractName];

const smartContractData = {
  abi: contractABI,
  bytecode: contractEVM.bytecode.object,
};

const outputFilePath = path.resolve(__dirname, 'build', `${smartContractName}.json`);
fileSystem.writeFileSync(outputFilePath, JSON.stringify(smartContractData), 'utf8');