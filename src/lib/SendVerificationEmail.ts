import { resend } from "@/lib/Resend";
import VerificationEmail from "../../emailTemplates/VerificationEmail";
import { ApiResponse } from "@/types/apiResponse";


export const SendVerificationEmail = async(email:string,username:string,verificationCode:string):Promise<ApiResponse>=>{

    try {

            await resend.emails.send({
            from: "TrueFeedback <onboarding@resend.dev>",
            to: email,
            subject: 'TrueFeedBack : Verify your Account',
            react: VerificationEmail({username,otp:verificationCode}),
            });

        return{
            success: true,
            message:"Email Sent Successfully" 
        } 

    } catch (error) {
        console.log("EmailSendingError : "+ error);
        return{
            success: false,
            message:"Error sending Verification Email"
        }
    }

}

