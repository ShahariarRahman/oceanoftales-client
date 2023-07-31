import { z } from "zod";

const passwordRules = (label: string) =>
  z
    .string({ required_error: `${label} is required` })
    .nonempty(`${label} is required`)
    .regex(/[a-z]/, `${label} requires at least one lowercase letter`)
    .regex(/[A-Z]/, `${label} requires at least one uppercase letter`)
    .regex(/[0-9]/, `${label} requires at least one digit`)
    .regex(/[^A-Za-z0-9]/, `${label} requires at least one special character`)
    .min(8, `${label} must be at least 8 characters`)
    .max(20, `${label} must be at most 20 characters`);

const passwordValidation = passwordRules("Password");
const confirmPasswordValidation = passwordRules("Confirm password");

const emailField = z
  .string({ required_error: "Email is required" })
  .nonempty("Email is required")
  .email("Invalid email format")
  .min(6, "Email too short")
  .max(100, "Email too long");

const signInZodSchema = z.object({
  email: emailField,
  password: passwordValidation,
});

const signUpZodSchema = z
  .object({
    email: emailField,
    password: passwordValidation,
    confirmPassword: confirmPasswordValidation,
  })
  .refine((value) => value.password === value.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const AuthValidation = { signUpZodSchema, signInZodSchema };
