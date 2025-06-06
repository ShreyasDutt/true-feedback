import {z} from 'zod';

export const MessageValidationSchema = z.object({
    Content : z.string().min(10,"Message must be of 10 characters").max(300,"Message must be no more than 300 characters"),
})
