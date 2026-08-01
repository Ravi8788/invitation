import { z } from "zod";

export const blessingsSchema = z.object({
  name: z
    .string()
    .min(2, "Please enter your name")
    .max(80, "Name is too long"),
  message: z
    .string()
    .min(4, "Please share a few words")
    .max(300, "Message is too long"),
});

export type BlessingsFormData = z.infer<typeof blessingsSchema>;
