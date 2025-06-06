import mongoose, { Schema, Document } from "mongoose";

export interface MessageInterface extends Document{
    content: string;
    createdAt: Date;
}

export interface UserInterface extends Document{
    username: string;
    email: string;
    password: string;
    verificationCode: string;
    verificationExpiry: Date;
    isAcceptingMessage: Boolean;
    isVerified: Boolean;
    messages: MessageInterface[];
}

const MessageSchema:Schema<MessageInterface> = new Schema({
    content:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    } 
    
})

const UserSchema:Schema<UserInterface> = new Schema({
    username:{
        type:String,
        required:[true,"Please provide a username"],
        unique:true,
        trim:true
    },
    email:{
        type:String,
        required:[true,"Please provide a email"],
        unique:true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/,'Please provide a valid email'],
        trim:true
    },
    password:{
        type:String,
        required:[true,"Please provide a password"],
    },
    verificationCode:{
        type:String,
        required:[true,"Please provide a verification code"],
    },
    verificationExpiry:{
        type:Date,
        required:[true,"Please provide a verification expiry"],
    },
    isAcceptingMessage:{
        type:Boolean,
        default:true
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    messages:[MessageSchema]
})

const UserModel = mongoose.models.User || mongoose.model<UserInterface>("User",UserSchema);

export default UserModel;