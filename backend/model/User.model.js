const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const generateVerificationToken = require('../helper/generateVerificationToken');
const { sendVerificationEmail } = require('../mailtrap/email');

const User = new Schema ({
    email:{
        type:String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    lastLogin: {
        type: Date,
        default: Date.now()
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    resetPasswordToken: String,
    resetPasswordExpiresAt: String,
    verificationToken: String,
    verificationTokenExpiresAt: Date,
}, {timestamps: true})


//signup function
User.statics.signup = async function( email, password, name){
    let userExists = await this.findOne({email});

    if(userExists){
        throw new Error('Email already exists');
    }

    //hash password with bycrypt
    let salt = await bcrypt.genSalt(10);
    let hashedPassword = await bcrypt.hash(password, salt);
    let verificationToken = generateVerificationToken();
    let user = await this.create({
        email,
        password : hashedPassword,
        name,
        verificationToken,
        verificationTokenExpiresAt: Date.now() + 5 * 60 * 1000 //5 min
    });

    await sendVerificationEmail(user.email, verificationToken);
    return user;
}

//login function
User.statics.login = async function( email, password) {
    let user = await this.findOne({email});

    if(!user){
        throw new Error("User does not exist!!!")
    }

    //compare password
    let isCorrect = await bcrypt.compare(password, user.password);
    if(isCorrect){
        user.lastLogin = new Date ();
        await user.save();
        return user;
    }else{
        throw new Error('Incorrect Password');
    }

}

module.exports = mongoose.model('User', User);