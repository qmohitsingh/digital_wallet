const Users     = require('./users')
const constants = require('../utils/constants')

const Accounts = function () {
    this.accountInfo  = {};
}

Accounts.prototype.getAccountInfo = function () {
    return this.accountInfo;
}

Accounts.prototype.setAccountInfo = function (accountInfo) {
    return this.accountInfo= accountInfo;
}

Accounts.prototype.CreateWallet = function (accountHolderName, balance) {
    let user = Users.createNewUser(accountHolderName, balance);
    this.accountInfo[accountHolderName] = user;
    return {statusCode:200, message: 'new account has been created'}
}


/**
 * @return {{message:  string, statusCode: number}}
 */
Accounts.prototype.TransferMoney = function (accountHolderName1, accountHolderName2, amount) {

    try {

        let result = this.debitBalance(accountHolderName1, accountHolderName2, amount);

        if (result.statusCode !== 200) {
            return {statusCode: result.statusCode, message: result.messageType}
        }

        return this.creditBalance(accountHolderName1, accountHolderName2, amount);
    } catch (error) {
        return {statusCode: 400, message: error.toString()};
    }
}

/**
 * @return {{message: string, statusCode: number}}
 */
Accounts.prototype.Statement = function (accountHolder1) {

    try {
        if (!this.accountInfo[accountHolder1]) {
            return {statusCode: 400, message: 'User Not found'};
        }

        return this.accountInfo[accountHolder1];
    } catch (error) {
        return {statusCode: 400, message: error.toString()};
    }
}

Accounts.prototype.Overview = function () {

    try {
        let usersBalance = [];

        Object.keys(this.accountInfo).forEach( user => {
            usersBalance.push({account_holder_name: this.accountInfo[user].getName(), balance: this.accountInfo[user].getBalance()});
        })

        return usersBalance;
    } catch (error) {
        return {statusCode: 400, message: error.toString()};
    }
}


Accounts.prototype.createTransactionMessage = function (type, amount, accountHolderName) {
    switch (type) {
        case 'debit':
            return `${accountHolderName} debit ${amount}`;
        case 'credit':
            return `${accountHolderName} credit ${amount}`;
    }
}

Accounts.prototype.creditBalance = function (accountHolderName1, accountHolderName2, amount) {
    try{

        //crediting balance
        this.accountInfo[accountHolderName2].balance = parseFloat(this.accountInfo[accountHolderName2].balance) + parseFloat(amount);

        let message = this.createTransactionMessage('credit', amount, accountHolderName1);
        this.accountInfo[accountHolderName2].transactions.push(message);
        return {statusCode:200, message: message};
    } catch (error) {
        return {statusCode: 400, message: error.toString()};
    }
}

Accounts.prototype.debitBalance = function (accountHolderName1, accountHolderName2, amount) {
    try {
        if (amount > this.balance) {
            return {statusCode: 400, message: "Insufficient fund"};
        } else if (amount < constants.MIN_BALANCE) {
            return {statusCode: 400, message: `Minimum amount should be greater than ${constants.MIN_BALANCE}`};
        }
        //Debit balance
        this.accountInfo[accountHolderName1].balance = parseFloat(this.accountInfo[accountHolderName1].balance) - parseFloat(amount);

        let message = this.createTransactionMessage('debit', amount, accountHolderName2);
        this.accountInfo[accountHolderName1].transactions.push(message);
        return {statusCode:200, message: message};
    } catch (error) {
        console.log('debit ', error)
        return {statusCode: 400, message: error.toString()};
    }
}



module.exports = new Accounts();