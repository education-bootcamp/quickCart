const User = require('../model/UserSchema');
const bcrypt = require('bcrypt');
const sgMail = require('@sendgrid/mail');


sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const generateOtp = ()=>Math.floor(100000)+Math.random()*900000;

const registerUser = async (req, resp) => {
   try{
       const {username, displayName, email, password, roles, isActive} = req.body;
       const existingUser = await User.findOne({username});
       if (existingUser) {
           return resp.status(409).json({message: 'username is already exists!'});
       }
       const salt = await bcrypt.salt(10);
       const hashedPassword = await bcrypt.hash(password, salt);

       const otp = generateOtp();

       const newUser = new User({
           username, displayName, password:hashedPassword,
           roles, isActive, otp
       });
       await newUser.save();

       const msg ={
           to:username,
           from:process.env.SENDGRID_VERIFIED_EMAIL,
           subject:'Your OTP',
           text:`Your OTP code is ${otp}`,
           html:`<h1>${otp}</h1>`
       }
       await sgMail.send(msg);
       resp.status(201).json({'message':'new user created..'});
   }catch (e) {
       resp.status(500).json({error:e});
   }
}
module.exports={
    registerUser
}