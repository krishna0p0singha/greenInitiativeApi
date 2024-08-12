const { Videoupload } = require('../middleware/Videoupload');
const { VideoInfo, ProfileInfo} =require('../Lib/SchemaLib');
const router=require('express').Router();

router.post('/fetch_video_info',async (req,res)=>{
    try{  
      let response_result=[];
           VideoInfo.find({'fileOwnerUniqueID': req.body.uniqueID},
                function(err,result){
                        if(err) throw (err);
                        if(result){
                          for(let i=result.length-1;i>=0;i--){
                            response_result.push(result[i]);
                          }
                         }
                       res.send(response_result);
                        });
            }catch(e){

            }
});
router.post('/upload',Videoupload.single('video'),(req,res)=>{
    res.send({message: "video uploaded"});
});
router.post('/video_info_edit',(req,res)=>{
  try{  
                 VideoInfo.updateOne({'contentUniqueID': req.body.contentUniqueID},  
                 { $set: req.body.values },function(err,result){
                if(err) throw (err);
                //console.log(result);
                res.send(result);
                    });
     }catch(e){

     }
});

router.get('/fetch_all_video_info',async(req,res)=>{
  try{  
    let response_result=[];
    VideoInfo.find(function(err,result){
                 if(err) throw (err);
                 if(result){
                  for(let i=result.length-1;i>=0;i--){
                    response_result.push(result[i]);
                  }
                 }
               res.send(response_result);
                 });
     }catch(e){

     }
});
router.post('/post_comment_reactions',async(req,res)=>{
  try{  //$push:{'reactions.sad':{ 'userUniqueID':"hello"}}
    /*'commentList': {
      userUniqueID:"",
      commentText:""
  }*/
        VideoInfo.updateOne({'contentUniqueID': req.body.contentUniqueID},  
                {$push : req.body.values},function(err,result){
                if(err) throw (err);
                    //console.log(result);
                    res.send(result);
            });
}catch(e){

}
});

router.post('/follow_now',async (req,res)=>{
  console.log(req.body)
  try {
    ProfileInfo
            ProfileInfo.updateOne(
              {'user[uniqueID]': req.body.userUniqueId},
            { $set: { 'user.followList.$[elem].followStatus': true } },
            { arrayFilters: [{ 'elem.fileOwnerUniqueID': req.body.fileOwnerUniqueID }] },
          //Update Follow List
          function(err,result1){
                  if(err) throw err;
                  
              if(result1.modifiedCount=== 1){
                console.log(result1);
                    /*ProfileInfo.updateOne({'user.uniqueID': req.body.fileOwnerUniqueID},//Content owner Follower List
                    {$push :{'user.followerList' :{
                      followerUniqueID: req.body.userUniqueId,
                      followStatus: true }
                    }},function(err,result){
                          if(err) throw err;
                          if(result){
                            console.log(result);
                            
                          }
                    });*/
              }else{
                        ProfileInfo.updateOne({'user.uniqueID': req.body.userUniqueId},//Update Follow List
                        {$push :{'user.followList' :{
                          fileOwnerUniqueID: req.body.fileOwnerUniqueID,
                          followStatus: true }
                        }},function(err,result){
                        if(err) throw err;
                        if(result){
                          console.log(result);
                            
                        }
                          });
              }
        });
  } catch (error) {
    
  }
});
//"kkkk@408b1f9c-fc16-4208-92ec-baa8f3c7c66b@1714976735829"
//"kkkk@408b1f9c-fc16-4208-92ec-baa8f3c7c66b@1714976735829"

router.post('/unfollow_now',async (req,res)=>{
  console.log(req.body)
  try {
    ProfileInfo.updateOne(
      {'user[uniqueID]': req.body.userUniqueId},
    { $set: { 'user.followList.$[elem].followStatus': false } },
    { arrayFilters: [{ 'elem.fileOwnerUniqueID': req.body.fileOwnerUniqueID }] },
   //Update Follow List
   function(err,result){
          if(err) throw err;
          if(result){
            console.log(result);
               
          }
    });
  } catch (error) {
   console.log(error) 
  }
});
/*{ $unset: { 'followerList.$[elem].followStatus': 1 } },
    { arrayFilters: [{ 'elem.followerUniqueID': yourFollowerUniqueID }] }
    followerList */

router.post('/fetch_watch_list_video_info',async(req,res)=>{
      console.log("video")
      console.log(req.body)
      try{  
        VideoInfo.find({'contentUniqueID': req.body.contentUniqueID},
        function(err,result){
                     if(err) throw (err);
                     if(result){
                      console.log(result);
                        res.send(result);
                     }
                  
                     });
         }catch(e){
            console.log(e)
         }
    });
module.exports=router ;