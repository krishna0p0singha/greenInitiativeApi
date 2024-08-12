const { default: mongoose } = require("mongoose");

exports.ConnectDB=async ()=>{
	const dbName="Project_DB";
    mongoose.set('strictQuery',true);
    
    mongoose.connect(process.env.MONGO_URL, {
	dbName: dbName,
	useNewUrlParser: true,
	useUnifiedTopology: true
}, err => err ? console.log(err) :
	console.log(`Connected to ${dbName} database`));
}