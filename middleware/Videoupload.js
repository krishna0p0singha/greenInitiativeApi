const multer = require("multer");
const path = require('path');
const uuid = require('uuid').v4;
const { VideoInfo} =require('../Lib/SchemaLib');

const AddVideInfoToDtabase=async (data)=>{
    try {
        let values=await VideoInfo(data);
        let result=await values.save();
    } catch (error) {
        console.log(error);
    }
}

var d=new Date();
function TimeCreate(){
    const t=d.getTime();
    return t;
}
var userVideosDir="";
// Destination folder
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const rootDir=process.env.ROOT_DIR;
        const video_info=file.originalname.split('+');
        console.log(video_info);
        const userDir=video_info[0];
        userVideosDir='videos/'+video_info[0];
        if (file.fieldname === 'video') {
            cb(null, path.join(rootDir, 'public/videos/').concat(userDir)); // Using __dirname to get the current directory
        } else {
            cb(new Error('Invalid fieldname'));
        }
    },
    filename: (req, file, cb) => {
       var time_Stamp=TimeCreate();
       const video_info=file.originalname.split('+');
        const videoExt = file.mimetype.split('/')[1];
        if (!videoExt) {
            return cb(new Error('Invalid file type'));
        }
        const id = uuid();
        const uniq_file_name=video_info[0]+"_"+time_Stamp+"_"+id+"."+video_info[5];
        cb(null, uniq_file_name );
/*
        const contentUniqueID=video_info[0]+"_"+time_Stamp+"_"+id;
        const fileOwnerUniqueID=video_info[0];
        const contentExecuteName=video_info[0]+"_"+time_Stamp+"_"+id+"."+video_info[5];
        const uploadDate=d.toLocaleDateString()+"@"+d.toLocaleTimeString();
        const contentTittle=video_info[1];
        const contentDescription=video_info[2];
        const audienceType=video_info[3];
       
        const reactions={
            happy:[],
            sad:[],
            love:[],
            angry:[],
            woe:[],
            like:[]
        };
        const commentList=[];
        const contentPath='public/videos/'.concat(userVideosDir);
        const contentKeywords=[];
        */
        AddVideInfoToDtabase({
            contentUniqueID:video_info[0]+"_"+time_Stamp+"_"+id,
            fileOwnerUniqueID:video_info[0],
            contentExecuteName:video_info[0]+"_"+time_Stamp+"_"+id+"."+video_info[5],
            uploadDate:""+d.toLocaleDateString()+"@"+d.toLocaleTimeString()+"",
            contentTittle:video_info[1],
            contentDescription:video_info[2],
            audienceType:video_info[3],
            reactions:{
                happy:[],
                sad:[],
                love:[],
                angry:[],
                wow:[],
                like:[]
            },
            commentList:[],
            contentPath:userVideosDir,
            contentKeywords:video_info[4],
            DonationList:[]
        });
        console.log(video_info);
        console.log(uniq_file_name);
    }
});

exports.Videoupload = multer({ storage }); // Assuming 'video' is the field name in your form
