const express = require('express')
const app = express(); 
const cors=require('cors');
const {readdirSync}=require('fs');

app.use(express.static("public"));

const { ConnectDB } = require('./Connection/ConnectDB');


require('dotenv').config();
const PORT=process.env.PORT || 5000;
app.use(cors());
app.use(express.json()); 

readdirSync('./routers').map((router)=>app.use('/api',require('./routers/'+ router)))


app.listen(PORT, () => {
    console.log(`listening on port ${PORT}!`);
    ConnectDB();
    

});
