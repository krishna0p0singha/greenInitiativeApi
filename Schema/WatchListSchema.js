const { default: mongoose, model } = require("mongoose");

const Watch_List=new mongoose.Schema({
        userUniqueId:{
            type:String,
            required:true
        },
        ContentId:[
            {
         ContentUniqueId:{
            type:String
         }
        }
    ]

});
const WatchList=mongoose.model('Watch_List',Watch_List);
WatchList.createIndexes();

const Play_List=new mongoose.Schema({
       creatorUniqueId:{
        type:String,
            required:true
       },
        playlistUniqueId:{
            type:String,
            required:true
        },
        playlistName:{
            type:String,
            required:true
        },
        contentList:[
            {
                 ContentUniqueId:{
                    type:String
                 }
            }
        ]
   
});
const PlayList=mongoose.model('Play_List',Play_List);
PlayList.createIndexes();

module.exports={WatchList,PlayList}

