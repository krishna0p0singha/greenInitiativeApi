const { default: mongoose, model } = require("mongoose");

const group_info =new mongoose.Schema({
        GroupUniqueID:{
            type:String,
            required:true
        },
        GroupOwnerUniqueID:{
            type:String,
            required:true
        },
        GroupCreateDate:{
            type:String,
            
        },  
        GroupTittle:{
            type:String,
            required:true
        },
        GroupDescription:{
            type:String,
            required:true
        },
        audienceType:{
            type:String,
            required:true
        },
        GroupIconPath:{
            type:String,
            required:true
        },
        GroupIconName:{
            type:String,
        },
        GroupMemberList:[{
            userUniqueId:{
                type:String
            },
            joinDate:{
                type:String
            }
        }],
        GroupChatRoom:[{
            userUniqueId:{
                type:String
            },
            PostDate:{
                type:String
            },
            messageText:{
                type:String
            }
            
        }]
});
const GroupList=mongoose.model('groupList',group_info);
GroupList.createIndexes();
module.exports={GroupList};