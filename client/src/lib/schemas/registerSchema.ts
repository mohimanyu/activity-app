import z from "zod";

export const registerSchema = z.object({
  email: z.email(),
  displayName: z.string().min(1, { message: "Display Name is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export type RegisterSchema = z.infer<typeof registerSchema>;
