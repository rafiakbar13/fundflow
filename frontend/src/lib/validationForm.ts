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

export const UpdateProfileSchema = z.object({
  email: z.string().email(),
  name: z.string().min(3).max(20),
  photo: z.string(),
  phone: z.string().min(10),
});

export type UpdateProfileSchemaType = z.infer<typeof UpdateProfileSchema>;

export const AccountSchema = z.object({
  bankName: z.string().min(3).max(20),
  type: z.string().min(3).max(20),
  balance: z.string().min(1),
  accountNumber: z.string().min(12).max(13),
});

export type AccountSchemaType = z.infer<typeof AccountSchema>;
