const mongoose = require("mongoose");

const ListTransaction = new mongoose.Schema(
    {
        date: {type: String},
        package: {type: String},
        userID: {type: String},
        username: {type: String},
        amount: {type: Number},
        status: {type: String}
    },
    { timestamps: true }
);

module.exports = mongoose.model("transaction", ListTransaction);
