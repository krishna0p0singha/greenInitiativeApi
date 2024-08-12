const router=require('express').Router();
const uuid = require('uuid').v4;
const path = require('path');
const fs=require('node:fs');

const rootDir=process.env.ROOT_DIR;
const {ProfileInfo,Friend_List,FriendRequests,WatchList, ReactionList, Wallet}=require('../Lib/SchemaLib');
const { Recoverable } = require('repl');
var d=new Date();
function TimeStampCreate(){
    const t=d.getTime();
    return t;
}
router.post('/signin_info',async (req,res)=>{

    try{
    ProfileInfo.findOne({'user.username': req.body.username, 'user.password': req.body.password},
                function(err,result){
                        if(err) throw (err);
                        if(result){
                            console.log(result)
                            res.send(result);
                        }else{
                            res.send({msg: "not valid"});
                        }
                        });
            }catch(e){
                
            }
});

router.post('/signup',async(req,res)=>{
    const id = uuid();
    const t=TimeStampCreate();
    try{//profile Colection creating --------------------------------------
        req.body.user.uniqueID=req.body.user.username+"@"+id+"@"+t;
        let data=await ProfileInfo(req.body);
        let result=await data.save();
        if(result){//Friend List Creating--------------------------
                                        //create file directory for each user using their uniqueID----------------------------
                                        const dirName=req.body.user.uniqueID
                                        const VideoUploadDir=path.join(rootDir,"public/videos/"+dirName);
                                        const ImageUploadDir=path.join(rootDir,"public/images/"+dirName);
                                        if(!fs.existsSync(VideoUploadDir) && !fs.existsSync(ImageUploadDir)){
                                                    fs.mkdirSync(VideoUploadDir);
                                                    fs.mkdirSync(ImageUploadDir);
                                        }//create file directory for each user using their uniqueID----------------------------END
                let data=await Friend_List({user:{
                userUniqueId : req.body.user.uniqueID,
                friendList:[]
            }});
            let result1=await data.save();  
                if(result1){//Friend Request List Creating--------------------------
                        let data=await FriendRequests({user:{
                            userUniqueId : req.body.user.uniqueID,
                            friendRequestList:[]
                        }});
                        let result2=await data.save();  
                        if(result2){//watch List Creating-------------------------------
                                let data=await WatchList({
                                    userUniqueId: req.body.user.uniqueID,
                                    ContentId:[]
                            });
                            let result3=await data.save();  
                            if(result3){
                                let data=new ReactionList({
                                    userUniqueId: req.body.user.uniqueID,
                                    videoReactionInf:[]
                                });
                                let result4=await data.save();
                                if(result4){
                                    let data= new Wallet({
                                        userUniqueId:req.body.user.uniqueID,
                                       totalBalance:0,
                                       transactionList:[],
                                       donateAmount:[]
                                    });
                                    let result5=await data.save();
                                    if(result5){
                                        console.log(result5);
                                    }
                                }
                                console.log(result4)
                            }
                            console.log(result3);//watch List Creating---------------------------------------------------END
                        }
                        console.log(result2);//Friend Request List Creating----------------------------END
                }
            console.log(result1);//Friend List Creating--------------------------END
        }
        res.send({status: "success",id: req.body.user.uniqueID});//profile Colection creating --------------------------------------END
    }catch(e){
        res.send({status: "Failed"});
    }
    

});

router.post('/fetch_info',async(req,res)=>{

try{
        ProfileInfo.findOne({'user.uniqueID': req.body.uniqueID},function(err,result){
            if(err) throw (err);
        if(result){
            console.log(result)
            res.send(result);
        }
        })
}catch(e){
    console.log(e);
}

});
router.post('/change_info',async(req,res)=>{
    console.log(req.body)
    try{
    
        ProfileInfo.updateOne({'user.uniqueID': req.body.uniqueID},  
             { $set: req.body.values },function(err,result){
            if(err) throw (err);
            console.log(result);
            res.send(result);
                });
               
    }catch(e){
        console.log(e);
    }
});

router.post('/fetch_reaction_list',(req,res)=>{
    console.log(req.body.userUniqueId);
    console.log("reactionList")
    try {
        var val=req.body
        ReactionList.findOne({'userUniqueId': req.body.userUniqueId},function(err,result){
                if(err) throw err;
                if(result){
                    console.log("reactionList")
                    console.log(result.videoReactionInfo)
                    res.send(result.videoReactionInfo);
                }
        });
    } catch (error) {
        
    }
});
router.post('/update_reaction_list',(req,res)=>{
    
   // console.log(req.body)
try {//$push : {'videoReactionInfo': {'reactionType': "Hello1",'contentUniqueID':"Hello 2" }}
    ReactionList.updateOne({'userUniqueId': req.body.userUniqueId},  
                {$push : req.body.values},function(err,result){
                if(err) throw (err);
                   // console.log(result);
                    res.send(result);
            });
} catch (error) {
    
}

});



router.post('/fetch_profile_name',async (req,res)=>{
   //console.log(req.body);
   try{
    ProfileInfo.findOne({'user.uniqueID': req.body.userUniqueId},
        function(err,result){
                if(err) throw (err);
                if(result){
                    //console.log(result.user.username);
                    ProfileInfo.findOne({'user.uniqueID': req.body.fileOwnerUniqueID},
                            function(err,result1){
                                    if(err) throw (err);
                                    if(result1){
                                        //console.log(result1.user.username);
                                        res.send({
                                            fileOwnerUsername: result1.user.username,
                                            username : result.user.username,
                                            followList: result.user.followList
                                        });
                                    
                                    }
                                    });
                   
                }
                });
    }catch(e){
       
    }
});

router.post('/fetch_username',async (req,res)=>{
    //console.log(" comment ID ");
    try{
        ProfileInfo.findOne({'user.uniqueID': req.body.userUniqueID},
            function(err,result){
                    if(err) throw (err);
                    if(result){
                        //console.log(result.user.username)
                        res.send({username : result.user.username});
                    }
                    });
        }catch(e){
    
        }
})

module.exports=router;