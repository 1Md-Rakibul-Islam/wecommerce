import { z } from "zod";
import { checkoutSchema } from "./checkout.schema";

export type CheckoutFormType = z.infer<typeof checkoutSchema>;
