import { useFormContext } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CheckoutFormType } from "../checkout.interface";

export function ContactInfo() {
  const {
    register,
    formState: { errors },
  } = useFormContext<CheckoutFormType>();

  const inputClass = "h-11 mt-1.5";

  return (
    <section className="rounded-xl border border-border bg-card p-6">
      <h2 className="font-semibold text-lg mb-4">Contact Information</h2>
      <div>
        <Label htmlFor="email">Email address</Label>
        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          className={inputClass}
          {...register("email")}
        />
        {errors.email && (
          <p className="text-sm text-destructive mt-1">
            {errors.email.message}
          </p>
        )}
      </div>
    </section>
  );
}
