const User = require('../model/UserSchema');
const bcrypt = require('bcryptjs');
const sgMail = require('@sendgrid/mail');


sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const generateOtp = ()=>Math.floor(100000+Math.random()*900000);

const registerUser = async (req, resp) => {
   try{
       const {username, displayName, password, roles, isActive} = req.body;
       const existingUser = await User.findOne({username});
       if (existingUser) {
           return resp.status(409).json({message: 'username is already exists!'});
       }
       console.log(username, displayName, password, roles, isActive)
       const salt =  bcrypt.genSaltSync(10);
       const hashedPassword =  bcrypt.hashSync(password, salt);

       const otp = generateOtp();

       const newUser = new User({
           username, displayName, password:hashedPassword,
           roles, isActive, otp
       });


       const msg ={
           to:username,
           from:process.env.SENDGRID_VERIFIED_EMAIL,
           subject:'Your OTP',
           text:`Your OTP code is ${otp}`,
           html:`<h1>${otp}</h1>`
       }
       await sgMail.send(msg);
       await newUser.save();
       resp.status(201).json({'message':'new user created..'});
   }catch (e) {
       console.log(e)
       resp.status(500).json({error:e});
   }
}

const verifyOtp = async (req, resp) => {
    try{
        const {username, otp} = req.body;
        const existingUser = await User.findOne({username});
        if (!existingUser) {
            return resp.status(409).json({message: 'username is not found!'});
        }
        if(existingUser.otp==otp){
            await User.findOneAndUpdate({username},{
                isActive:true
            });
        }else{
            return resp.status(404).json({message: 'otp is wrong!'});
        }




        const msg ={
            to:username,
            from:process.env.SENDGRID_VERIFIED_EMAIL,
            subject:'account is activated',
            text:`activated`,
            html:`<h1>welcome on board</h1>`
        }
        await sgMail.send(msg);
        resp.status(201).json({'message':'new user verified..'});
    }catch (e) {
        resp.status(500).json({error:e});
    }
}

module.exports={
    registerUser,verifyOtp
}