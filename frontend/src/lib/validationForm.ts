import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;

export const RegisterSchema = LoginSchema.extend({
  name: z.string().min(3).max(20),
});

export type RegisterSchemaType = z.infer<typeof RegisterSchema>;
