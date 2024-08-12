const {ProfileInfo,ReactionList}=require('../Schema/Profileschema');

const {Friend_List,FriendRequests}=require('../Schema/FriendlistSchema');

const {WatchList,PlayList}=require('../Schema/WatchListSchema');
const {VideoInfo} =require("../Schema/VideoSchema");
const {GroupList} =require("../Schema/GrouplistSchema");
const {Wallet}=require('../Schema/WalletSchema');
module.exports={
    ProfileInfo,
    Friend_List,
    FriendRequests,
    WatchList,
    PlayList,
    VideoInfo,
    ReactionList,
    GroupList,
    Wallet
};