const _ = require('underscore')
const Accounts = require('../model/accounts');

const OfferService = function () {
    this.offer1 = 10;
    this.offer2 = [10, 5, 2];
}

OfferService.prototype.Offer2 = function() {
    try {
        let accountInfo = Accounts.getAccountInfo()

        let accountInfoArray = [];
        Object.keys(accountInfo).forEach( user => {
            accountInfoArray.push(accountInfo[user]);
        })

        let sortedAccountData = _.sortBy(accountInfoArray, function (user) {
            console.log([-user.transactions.length, user.balance, user.creationTime])
            return [-user.transactions.length, user.balance, user.creationTime]
        });

        sortedAccountData.sort((user1, user2) => {
            console.log(user1, user2)

            if (user1.transactions.length === user2.transactions.length) {
                if (user1.balance === user2.balance) {
                    return user1.creationTime.getTime()  < user2.creationTime.getTime()  ? 1 : -1;
                }
                return user1.balance < user2.balance ? 1 : -1;
            }

            return user1.transactions.length < user2.transactions.length ? 1 : -1;
        })

        let index = 0;
        sortedAccountData.forEach( user => {
            if (index < this.offer2.length) {
                user.balance = parseFloat(user.balance ) + parseFloat(this.offer2[index]);
                index = index + 1;
                accountInfo[user.name] = user;
            }
        })

        Accounts.setAccountInfo(accountInfo);
        return {statusCode:200, message: 'success'};
    }catch (error) {
        return {statusCode:400, message: error.toString()};
    }
}

OfferService.prototype.checkOffer = function(type, accountHolderName1, accountHolderName2) {
    try {
        if (type === 'offer1') {
            let users = Accounts.getAccountInfo();

            if (users[accountHolderName1].balance !== users[accountHolderName2].balance)
                return {statusCode: 200, message: 'success'};

            users[accountHolderName1].balance = parseFloat(users[accountHolderName1].balance) + parseFloat(this.offer1);
            users[accountHolderName2].balance = parseFloat(users[accountHolderName2].balance) + parseFloat(this.offer1);

            users[accountHolderName1].transactions.push(`offer1 credit ${this.offer1}`);
            users[accountHolderName2].transactions.push(`offer1 credit ${this.offer1}`);

            Accounts.setAccountInfo(users);
        }

        return {statusCode: 200, message: 'success'};
    }catch (error) {
        return {statusCode:400, message: error.toString()};
    }
}

module.exports = new OfferService();
