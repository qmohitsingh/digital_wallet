const Accounts = require('../model/accounts')
const OfferService = require('./offerService')

const BankingService = function () {
    this.logs = [];
}

BankingService.prototype.CreateWallet = function (accountHolderName, balance) {
    return Accounts.CreateWallet(accountHolderName, balance);
}


BankingService.prototype.TransferMoney = function (accountHolderName1, accountHolderName2, amount) {
    let result = Accounts.TransferMoney(accountHolderName1, accountHolderName2, amount);

    if (result.statusCode !== 200)
        return result;
    //check for offer1 after transfer of money is complete
    return OfferService.checkOffer('offer1', accountHolderName1, accountHolderName2);
}


BankingService.prototype.Statement = function (accountHolder1) {
    return Accounts.Statement(accountHolder1);
}

BankingService.prototype.Overview = function () {
    return Accounts.Overview();
}



module.exports = new BankingService()