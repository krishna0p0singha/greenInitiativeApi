const { default: mongoose, model } = require("mongoose");
const Wallet_Details =new mongoose.Schema({
    userUniqueId:{
        type:String,
        required:true,
        unique:true
    },
   totalBalance:{
    type:Number
   },
   transactionList:[{
            transactionType:{
                type:String
            },
            transactionAmount:{
                type:Number
            },
            transactionStatus:{
                type:String
            },
            transactionDate:{
                type:String
            }
    }],
   donateAmount:[
    {
        contentUniqueID:{
            type:String
        },
        donateAmount:{
            type:Number
        }
    }
   ]
});
const Wallet=mongoose.model('Wallet',Wallet_Details);
Wallet.createIndexes();
module.exports= {Wallet}