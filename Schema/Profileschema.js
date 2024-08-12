const { default: mongoose, model, Mongoose } = require("mongoose");


const Profile_Info=new mongoose.Schema({
    user:{
        username:{
            type:String,
            required:true,
            unique:true
        },
        name:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        password:{
            type:String,
            required:true
        },
        accountType: {
            type:String,
            required:true
        },
        uniqueID:{
            type:String,
            required:true
        },
        groupList:[{
            groupUniqueID:{
                    type:String
            }
        }],
        followList:[{
            fileOwnerUniqueID:{
                type:String,
               
            },
            followStatus:{
                type:Boolean,
            }
        }],
        followerList:[{
            followerUniqueID:{
                type:String,
               
            },
            followStatus:{
                type:Boolean,
            }
        }]
    }
   
});
const ProfileInfo=mongoose.model('profile_info',Profile_Info);
ProfileInfo.createIndexes();



const Reaction_List =new mongoose.Schema({
    userUniqueId:{
        type:String,
        required:true,
        unique:true
    },
    videoReactionInfo:[{
        reactionType:{
            type:String
        },
        contentUniqueID:{
            type:String
        }
    }]
});
const ReactionList=mongoose.model('reactionList',Reaction_List);
ReactionList.createIndexes();


module.exports={ProfileInfo,ReactionList};