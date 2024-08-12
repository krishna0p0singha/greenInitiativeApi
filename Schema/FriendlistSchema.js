const { default: mongoose, model } = require("mongoose");

const FriendList=new mongoose.Schema({
    user:[{
        userUniqueId:{
            type:String,
            required:true
        },
        friendList:{
            type:Array
        }
    } 
]
   
});
const Friend_List=mongoose.model('Friend_List',FriendList);
Friend_List.createIndexes();

const Friend_requests=new mongoose.Schema({
    user:{
        userUniqueId:{
            type:String,
            required:true
        },
        friendRequestList:[{
               friendsUniqId:{
                type:String,
            },
            requestStatus:{
                type:Boolean,
            }
        }
         
        ]
    }
});
const FriendRequests=mongoose.model('Friend_requests',Friend_requests);
FriendRequests.createIndexes();
module.exports={Friend_List,FriendRequests};