import { z } from "zod";

export const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
});

export const animalSchema = z.object({
  id: z.number(),
  name: z.string(),
  owner: userSchema,
});

export const vehicleSchema = z.object({
  id: z.number(),
  brand: z.string(),
  numberPlate: z.string(),
  owner: userSchema,
})

export type User = z.infer<typeof userSchema>;
export type Animal = z.infer<typeof animalSchema>;
export type Vehicle = z.infer<typeof vehicleSchema>;
