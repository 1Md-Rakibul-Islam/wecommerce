import { useFormContext } from "react-hook-form";
import { CreditCard, Lock } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CheckoutFormType } from "../checkout.interface";

export function PaymentDetails() {
  const {
    register,
    formState: { errors },
  } = useFormContext<CheckoutFormType>();

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(" ");
    }
    return value;
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return `${v.slice(0, 2)}/${v.slice(2, 4)}`;
    }
    return v;
  };

  const inputClass = "h-11 mt-1.5";

  return (
    <section className="rounded-xl border border-border bg-card p-6">
      <div className="flex items-center gap-2 mb-4">
        <CreditCard size={20} />
        <h2 className="font-semibold text-lg">Payment Details</h2>
      </div>
      <div className="space-y-4">
        <div>
          <Label htmlFor="cardName">Name on card</Label>
          <Input id="cardName" className={inputClass} {...register("cardName")} />
          {errors.cardName && (
            <p className="text-sm text-destructive mt-1">{errors.cardName.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="cardNumber">Card number</Label>
          <Input
            id="cardNumber"
            placeholder="1234 5678 9012 3456"
            className={inputClass}
            {...register("cardNumber")}
            onChange={(e) => {
              e.target.value = formatCardNumber(e.target.value);
            }}
          />
          {errors.cardNumber && (
            <p className="text-sm text-destructive mt-1">{errors.cardNumber.message}</p>
          )}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="cardExpiry">Expiry date</Label>
            <Input
              id="cardExpiry"
              placeholder="MM/YY"
              className={inputClass}
              {...register("cardExpiry")}
              onChange={(e) => {
                e.target.value = formatExpiry(e.target.value);
              }}
            />
            {errors.cardExpiry && (
              <p className="text-sm text-destructive mt-1">{errors.cardExpiry.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="cardCvc">CVC</Label>
            <Input
              id="cardCvc"
              placeholder="123"
              className={inputClass}
              {...register("cardCvc")}
              onChange={(e) => {
                e.target.value = e.target.value.replace(/\D/g, "").slice(0, 4);
              }}
            />
            {errors.cardCvc && (
              <p className="text-sm text-destructive mt-1">{errors.cardCvc.message}</p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Lock size={14} />
          Your payment information is encrypted and secure
        </div>
      </div>
    </section>
  );
}
