import { dbConnect } from "@/lib/Dbconnect";
import { SendVerificationEmail } from "@/lib/SendVerificationEmail";
import UserModel from "@/models/user.model";
import bcrypt from "bcryptjs";


export async function POST(request: Request) {
  await dbConnect();
  try{
   const {username,email,password} = await request.json();

    //check if user Exists
    const FoundUser = await UserModel.findOne({username, isVerified: true});
    if(FoundUser){
        return Response.json({
            success:false,
            message: "User Already Exists"
        },{status:400})
    }
    const verificationCode = Math.floor(100000+Math.random()*900000).toString();
    const ExistingUserbyEmail = await UserModel.findOne({email});

    if (ExistingUserbyEmail) {
        if (ExistingUserbyEmail.isVerified) {
            return Response.json({
                success: false,
                message: "User Already Exists"
            },{status:400})
        }else{
            const hashedPassword = await bcrypt.hash(password, 10);
            ExistingUserbyEmail.verificationCode = verificationCode;
            ExistingUserbyEmail.verificationExpiry = new Date(Date.now() + 60 * 60 * 1000);
            ExistingUserbyEmail.password = hashedPassword;
            await ExistingUserbyEmail.save();
        }

    }else{
        const hashedPassword = await bcrypt.hash(password, 10);
        const ExpiryDate = new Date();
        ExpiryDate.setHours(ExpiryDate.getHours()+1);

        const newUser = new UserModel({
                username,
                email,
                password: hashedPassword,
                verificationCode,
                verificationExpiry: ExpiryDate,
                messages:[]
        })

        await newUser.save();
    }
    const sendEmail = await SendVerificationEmail(email,username,verificationCode);

    if(!sendEmail.success){
        return Response.json({
            success: false,
            message: sendEmail.message
        },{status: 500})
    }else{
        return Response.json({
            success: true,
            message: "User Registered Successfully & Email has been sent"
        },{status: 200})
    }

  }catch(error){
    console.error("Error Registering User : "+error);
    return Response.json({
        success: false,
        message: "Error Registering User"
    },{status: 500})
  }
}
