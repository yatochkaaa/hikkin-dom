import { z } from "zod";

export const usernameSchema = z
  .string()
  .trim()
  .min(3, { message: "Username must be at least 3 characters long" })
  .max(20, { message: "Username must be at most 20 characters long" })
  .regex(/^[a-zA-Z0-9_]+$/, {
    message: "Username can only contain letters, numbers, and underscores",
  });

export const imageUrlSchema = z
  .url({ message: "Image must be a valid URL" })
  .trim()
  .regex(/\.(jpg|jpeg|png|webp|gif|svg|avif)$/i, {
    message: "Image URL must point to a valid image file (.jpg, .png, etc.)",
  });

export const createUserSchema = z.object({
  name: usernameSchema,
  image: imageUrlSchema.optional(),
});

export const updateUserSchema = createUserSchema.partial();

export const createPostSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  content: z.string().optional(),
});

export const updatePostSchema = createPostSchema.partial();
