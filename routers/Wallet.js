const router=require('express').Router();
const {Wallet}=require('../Lib/SchemaLib');

router.post('/fetch_wallet_info',(req,res)=>{
    try {
        Wallet.findOne({userUniqueId : req.body.uniqueID},function(err,result){
            if(err) throw err;
            if(result){
                res.send(result);
            }
        })
    } catch (error) {
        
    }
});

router.post('/deposit_money',async (req,res)=>{
console.log(req.body)
    try {
        Wallet.updateOne({userUniqueId: req.body.userUniqueID},
            {$set: {totalBalance : parseInt(req.body.transaction_amount) },$push:{transactionList: {
                transactionType:  req.body.transaction_type,
                transactionAmount:  req.body.transaction_amount,
                transactionDate: req.body.transaction_date

            }}},function(err,result){
            if(err) throw err;
            if(result){
                res.send(result);
            }
        })
    } catch (error) {
        
    }
});
router.post('/fetch_transaction_list',async (req,res)=>{
    try {
        let response_result=[];
        Wallet.findOne({userUniqueId : req.body.uniqueID},function(err,result){
            if(err) throw err;
            if(result){
                 for(let i=result.transactionList.length-1;i>=0;i--){
                    response_result.push(result.transactionList[i]);
                  }
                 }
               res.send(response_result);
        })
    } catch (error) {
        
    }
});
router.post('/withdraw_money',async (req,res)=>{

    try {
        Wallet.updateOne({userUniqueId: req.body.userUniqueID},
            {$set: {totalBalance : parseFloat(req.body.totalBalance)-parseFloat(req.body.transaction_amount) },
            $push:{transactionList: {
                transactionType:  req.body.transaction_type,
                transactionAmount:  req.body.transaction_amount,
                transactionStatus: "SUCCESS",
                transactionDate: req.body.transaction_date

            }}},function(err,result){
            if(err) throw err;
            if(result){
                res.send(result);
            }
        })
    } catch (error) {
        
    }
});
module.exports=router;