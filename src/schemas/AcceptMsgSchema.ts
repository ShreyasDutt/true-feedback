import {z} from 'zod';

export const AcceptMessageValidationSchema = z.object({
    AcceptMessage : z.boolean(),
})
