import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { checkoutSchema } from "../checkout.schema";
import { CheckoutFormType } from "../checkout.interface";
import { useCart } from "@/hooks/use-cart";

export function useCheckoutForm() {
  const router = useRouter();
  const { items, total, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formMethods = useForm<CheckoutFormType>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      country: "United States",
      cardName: "",
      cardNumber: "",
      cardExpiry: "",
      cardCvc: "",
    },
  });

  const onSubmit = async (data: CheckoutFormType) => {
    setIsSubmitting(true);
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    const orderId = `ORD-${Date.now().toString(36).toUpperCase()}`;
    sessionStorage.setItem(
      "lastOrder",
      JSON.stringify({
        orderId,
        items: items.map((i) => ({
          name: i.name,
          quantity: i.quantity,
          price: i.price,
        })),
        total,
        email: data.email,
        shippingAddress: `${data.firstName} ${data.lastName}, ${data.address}, ${data.city}, ${data.state} ${data.zipCode}`,
      }),
    );
    
    clearCart();
    setIsSubmitting(false);
    router.push(`/order/success?id=${orderId}`);
  };

  return {
    formMethods,
    onSubmit,
    isSubmitting,
  };
}
