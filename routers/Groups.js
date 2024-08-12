const router=require('express').Router();
const uuid = require('uuid').v4;
const path = require('path');
const fs=require('node:fs');

const rootDir=process.env.ROOT_DIR;
const {GroupList, ProfileInfo}=require('../Lib/SchemaLib');

router.post('/create_group',async(req,res)=>{
    //console.log(req.body);
    try {
        const d=new Date();
        const id = uuid();
        var GroupUniqueID = req.body.group_info.group_owner_uniqueId+"@"+id+"@"+req.body.group_info.group_title;
        const dirName=GroupUniqueID;
         const GroupUploadDir=path.join(rootDir,"public/groups/"+dirName);
        console.log(GroupUniqueID);
        let data =new GroupList({
            GroupUniqueID: GroupUniqueID,
            GroupOwnerUniqueID: req.body.group_info.group_owner_uniqueId,
            GroupCreateDate: d.toLocaleDateString()+"@"+d.toLocaleTimeString(),  
            GroupTittle: req.body.group_info.group_title,
            GroupDescription: req.body.group_info.group_description,
            audienceType: req.body.group_info.group_audience_type,
            GroupIconPath: GroupUniqueID,
            GroupIconName: "",
            GroupMemberList:[{
                userUniqueId:req.body.group_info.group_owner_uniqueId,
                joinDate:d.toLocaleDateString()+"@"+d.toLocaleTimeString()
            }],
            GroupChatRoom:[]
        });
        let result=await data.save();
        if(result){
            
            ProfileInfo.updateOne({'user.uniqueID': req.body.group_info.group_owner_uniqueId},
            { $push:{'user.groupList':{'groupUniqueID':GroupUniqueID}} },function(err,result){
                if(err) throw (err);
                console.log(result);

                    });
             //create file directory for each Group using their uniqueID----------------------------
         if(!fs.existsSync(GroupUploadDir)){
                     fs.mkdirSync(GroupUploadDir);
                     if(fs.existsSync(GroupUploadDir)){
                        const VideoUploadDir=path.join(GroupUploadDir,"videos");
                        const ImageUploadDir=path.join(GroupUploadDir,"images");
                        if(fs.existsSync(GroupUploadDir)){
                            fs.mkdirSync(VideoUploadDir);
                            fs.mkdirSync(ImageUploadDir);
                         }
                     }
                    }
                    res.send(result);
        }
        
    } catch (error) {
        console.log(error)
    }
});

router.post('/fetch_group_info',async (req,res)=>{
   // console.log(req.body);
    try{
        let response_result=[];
        GroupList.find({ GroupOwnerUniqueID : req.body.uniqueID },function(err,result){
                if(err) throw err;
                if(result){
                    for(let i=result.length-1;i>=0;i--){
                      response_result.push(result[i]);
                    }
                   }
                 res.send(response_result);
        })
    }catch(e){

    }
});
router.get('/fetch_all_group',async (req,res)=>{
    try{
        let response_result=[];
        GroupList.find(function(err,result){
                if(err) throw err;
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

router.post('/join_group',async (req,res)=>{
    console.log(req.body);
})
module.exports=router;
