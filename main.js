const fs = require('fs');
const _ = require('underscore');
const BankingController = require('./controller/bankingController')

if (require.main === module) {
    let filename = process.argv[2];
    let inputData = fs.readFileSync(filename);

    inputData = inputData.toString().split('\n');

    inputData.forEach( input => {

        let opts = input.split(' ');

        console.log(opts)
        let response = BankingController.serveRequest(opts[0], opts);
        console.log(response);
    })


}