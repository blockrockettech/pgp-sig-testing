const {expectEvent} = require('@openzeppelin/test-helpers');
const {accounts, contract} = require('@openzeppelin/test-environment');
const {expect} = require('chai');

const [creator, bidder1, noBidder] = accounts;

const SealedBidsRegistry = contract.fromArtifact('SealedBidsRegistry');

describe('SealedBidsRegistry Tests', function () {

    beforeEach(async function () {
        this.registry = await SealedBidsRegistry.new({from: creator});
    });

    describe('Can add and remove your offer', async function () {
        it('no bid registered if not used before', async function () {
            const offer = await this.registry.getOffer(noBidder);
            expect(offer).to.be.equal('');
        });

        it('offer is set', async function () {
            const event = await this.registry.recordOffer('my-offer', {from: bidder1});

            expectEvent(event, 'OfferMade', {
                bidder: bidder1,
                sealedBid: 'my-offer'
            });

            const offer = await this.registry.getOffer(bidder1);
            expect(offer).to.be.equal('my-offer');
        });

        it('offer is cleared', async function () {
            const event = await this.registry.clearOffer({from: bidder1});
            expectEvent(event, 'OfferCleared', {
                bidder: bidder1
            });

            const offer = await this.registry.getOffer(bidder1);
            expect(offer).to.be.equal('');
        });
    });

});
