class Block {
    constructor(index, previousHash, timestamp, data, hash) {
        this.index = index;
        this.previousHash = previousHash;
        this.timestamp = timestamp;
        this.data = data;
        this.hash = hash;
    }
}

class Blockchain {
    constructor() {
        this.chain = [];
        this.createGenesisBlock();
    }

    createGenesisBlock() {
        const genesisBlock = new Block(0, "0", Date.now(), "Genesis Block", this.calculateHash(0, "0", Date.now(), "Genesis Block"));
        this.chain.push(genesisBlock);
    }

    calculateHash(index, previousHash, timestamp, data) {
        return String(index) + previousHash + timestamp + JSON.stringify(data);
    }

    addBlock(data) {
        const previousBlock = this.chain[this.chain.length - 1];
        const newIndex = previousBlock.index + 1;
        const newTimestamp = Date.now();
        const newHash = this.calculateHash(newIndex, previousBlock.hash, newTimestamp, data);
        const newBlock = new Block(newIndex, previousBlock.hash, newTimestamp, data, newHash);
        this.chain.push(newBlock);
    }

    getChain() {
        return this.chain;
    }
}

// Example Usage
const myBlockchain = new Blockchain();
myBlockchain.addBlock({ amount: 10 });
myBlockchain.addBlock({ amount: 20 });

console.log(JSON.stringify(myBlockchain.getChain(), null, 4));
