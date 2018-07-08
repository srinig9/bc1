const BlockChain = require('./index');
const Block = require('./block');

describe('BlockChain', () => {
    let bc, bc2;

    beforeEach(() => {
        bc = new BlockChain();
        bc2 = new BlockChain();
    });

    it('starts with genesis block', () => {
        expect(bc.chain[0]).toEqual(Block.genesis());
    });

    it('adds a new block', () => {
        const data = 'foo';
        const block = bc.addBlock(data);
        expect(bc.chain[bc.chain.length-1].data).toEqual(data);
    });

    it('Check if first block is genesis', () => {
        bc2.addBlock('foo');
        expect(bc2.chain[0]).toEqual(Block.genesis());
    });

    it('Check if the chain is valid', () => {
        expect(bc.isValidChain(bc2.chain)).toBe(true);
    });

    it('Check is the chain is currupted', () => {
        bc2.chain[0].data = 'test';
        expect(bc.isValidChain(bc2.chain)).toBe(false);
    });

    it('Replaces valid chain', () => {
        bc2.addBlock('foo');
        bc.replaceChain(bc2.chain);

        expect(bc.chain).toEqual(bc2.chain);
    });

    it('Does not replace invalid chain', () => {
        bc.addBlock('foo');
        bc.replaceChain(bc2.chain);

        expect(bc.chain).not.toEqual(bc2.chain);
    })
})