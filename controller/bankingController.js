const BankingService = require('../service/bankingService');
const OfferService   = require('../service/offerService')

const BankingController = function () {
    this.logs = [];
}

BankingController.prototype.serveRequest = function (type, opts) {
    switch (type) {
        case 'CreateWallet':
            return BankingService.CreateWallet(opts.slice(1,opts.length-1).join(' '), opts[opts.length-1]);
        case 'TransferMoney':
            return BankingService.TransferMoney(opts[1], opts[2], opts[opts.length-1]);
        case 'Overview':
            return BankingService.Overview();
        case 'Statement':
            return BankingService.Statement(opts[1]);
        case 'Offer2':
            return OfferService.Offer2();
    }
}



module.exports = new BankingController();