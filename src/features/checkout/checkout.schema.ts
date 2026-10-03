import { z } from "zod";

export const checkoutSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zipCode: z
    .string()
    .min(1, "ZIP code is required")
    .regex(/^\d{5}(-\d{4})?$/, "Enter a valid ZIP code"),
  country: z.string().min(1, "Country is required"),
  cardName: z.string().min(1, "Name on card is required"),
  cardNumber: z
    .string()
    .min(1, "Card number is required")
    .regex(/^[\d\s]{13,19}$/, "Enter a valid card number"),
  cardExpiry: z
    .string()
    .min(1, "Expiry date is required")
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Use MM/YY format"),
  cardCvc: z
    .string()
    .min(1, "CVC is required")
    .regex(/^\d{3,4}$/, "Enter a valid CVC"),
});
