const router=require('express').Router();
const Sendmail =require('../Lib/Sendmail');
const otpGenerator = require('otp-generator');
const Sendotp=new Sendmail();
const {ProfileInfo}=require('../Lib/SchemaLib');

router.post('/generateotp',(req,res)=>{
    try{
        ProfileInfo.findOne({'user.email': ""+req.body.user.email+""},
                function(err,result){
                        if(err) throw (err);
                        if(!result){
                            try {
                                var otpSend=[];
                                        let Sender='cyber0bravo@gmail.com';
                                        let psw='wbgbgxszpddnpbvu';

                                        sub="One Time Password";

                                        var otp=otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
                                        console.log(req.body);
                                        let text="Your One time Password<br><h2>"+otp+"</h2>";
                                       let result=Sendotp.PrintData(Sender,req.body.user.email,sub,text,psw);
                                       //let result="true"        
                                       if(result === "true"){
                                                    otpSend.push({
                                                    email: req.body.user.email,
                                                    otp: otp
                                                });
                                                }else{
                                                    console.log("fail");
                                                }
                                            console.log(otpSend);
                                    res.send(otpSend);
                            } catch (error) {
                                res.send([{
                                    email: "",
                                    otp: ""
                                }]);
                            }
                            
                        }else{
                            res.send([{
                                email: "used",
                                otp: ""
                            }]);
                        }
                        });
    /**/
}catch(e){
    res.send([{
        email: "error",
        otp: ""
    }]);
}
});

module.exports=router ;