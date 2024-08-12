const router=require('express').Router();
const {WatchList}=require('../Lib/SchemaLib');

router.post('/fetch_watch_list',async(req,res)=>{
//console.log('--------------------watchlist ---------------')
   // console.log(req.body);
try{
    WatchList.findOne({ 'userUniqueId': req.body.uniqueID},function(err,result){
        if(err) throw (err);
    if(result){
        console.log(result.ContentId)
        res.send(result.ContentId);
    }
    });
}catch(e){

}
});

router.post('/add_to_watch_list',async(req,res)=>{
   // console.log('watchlist call')
    //console.log(req.body);
    try {
        WatchList.updateOne({'userUniqueId': req.body.userUniqueId},
        {$push :{'ContentId':{ContentUniqueId : req.body.contentUniqueID}}},
        function(err,result){
            if(err) throw (err);
        if(result){
            console.log(result)
            res.send(result);
        }
        });
    } catch (error) {
        console.log(error);
    }
});

module.exports=router;