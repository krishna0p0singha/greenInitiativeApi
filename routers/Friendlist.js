const router=require('express').Router();
const {Friend_List, ProfileInfo}=require('../Lib/SchemaLib');


router.post('/fetch_follow_list',async(req,res)=>{
    console.log(" hello friend =>"+req.body.uniqueID);
    try{
            ProfileInfo.findOne({'user.uniqueID': req.body.uniqueID},function(err,result){
                if(err) throw (err);
            if(result){
                console.log(result.user.followerList)
               res.send({
                followingList: result.user.followList
               });
            }
            });
    }catch(e){
        console.log(e);
    }
});
module.exports=router;