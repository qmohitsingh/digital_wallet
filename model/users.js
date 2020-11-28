
const Users = function (name, balance) {
    this.name = name;
    this.balance = balance;
    this.currency = 'F₹';
    this.transactions = [];
    this.creationTime = new Date();
}

Users.prototype.getBalance = function () {
    return this.balance;
}

Users.prototype.getTransactions = function () {
    return this.transactions;
}

Users.prototype.getCurrency = function() {
    return this.currency
}

Users.prototype.getName = function () {
    return this.name;
}


Users.prototype.setBalance = function (balance) {
     this.balance = balance;
}


const createNewUser = function (name, balance) {
    return new Users(name, balance);
}

module.exports = {
    createNewUser
};