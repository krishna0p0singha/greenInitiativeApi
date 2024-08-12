const router=require('express').Router();
const { PlayList}=require('../Lib/SchemaLib');
const uuid = require('uuid').v4;
var d=new Date();
function TimeStampCreate(){
    const t=d.getTime();
    return t;
}

router.post('/create_playlist',async(req,res)=>{
    //console.log("Playlist");
   // console.log(req.body);
    try{
        const Timestampp=TimeStampCreate();
        var playlist_uniqueID =req.body.userUniqueID+"@"+Timestampp;
            let data=await PlayList({
                creatorUniqueId: req.body.userUniqueID,
                playlistUniqueId:playlist_uniqueID,
                playlistName: req.body.title,
                contentList:[]
            });
            let result=data.save();
            if(result){
                res.send(result);
            }
    }catch(e){

    }
});

router.post('/fetch_play_list_info',async(req,res)=>{
    console.log("Playlist");
    console.log(req.body);
    try{
      PlayList.find({'creatorUniqueId': req.body.userUniqueID},function(err,result){
            if(err) throw err;
            if(result){
                res.send(result);
            }
      });
    }catch(e){

    }
});

router.post('/add_item_playlist',(req,res)=>{
    console.log("heee")
    console.log(req.body);
    try{
            PlayList.updateOne({'playlistUniqueId' : req.body.playlistId},
            {$push :{'contentList': {'ContentUniqueId':req.body.contentUniqueID}}},
            function(err,result){
                if(err) throw err;
                if(result){
                    //console.log(result);
                    res.send(result);
                }
            })
    }catch(e){

    }
})

module.exports=router;