const { default: mongoose, model } = require("mongoose");

const Content_info =new mongoose.Schema({
    contentUnique_id:{
        type:String,
        required:true
    },
    uploadDate:{
        type:Date,
        default:Date.now()
    }
});
const ContentInfo=mongoose.model('Content_info',Content_info);
ContentInfo.createIndexes();
module.exports={ContentInfo};