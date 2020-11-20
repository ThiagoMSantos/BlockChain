const BlockChain = require('./src/blockChain');

const blockChain = new BlockChain();

blockChain.adicionarBloco("Block #01");
blockChain.adicionarBloco("Block #02");
blockChain.adicionarBloco("Block #03");

console.log(blockChain);

console.log(blockChain.validaBlockChain());