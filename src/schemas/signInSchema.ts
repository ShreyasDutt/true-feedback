import {z} from 'zod';

export const SignInValidationSchema = z.object({
    identifier : z.string(),
    password: z.string().min(8)
})
