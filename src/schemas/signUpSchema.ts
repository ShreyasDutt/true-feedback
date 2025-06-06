import {z} from 'zod';


export const UsernameValidation = z.string().min(3,"Username must be at least 3 characters").max(10,"Username must be at most 10 characters").regex(/^[a-zA-Z0-9]+$/,"Username must only contain letters and numbers");

export const SignUpSchema = z.object({
    username:UsernameValidation,
    email:z.string().email({message:"Invalid email"}),
    password:z.string().min(8,{message:"Password must be at least 8 characters"}),
})
