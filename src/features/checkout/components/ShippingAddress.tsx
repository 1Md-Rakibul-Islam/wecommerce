import { useFormContext } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckoutFormType } from "../checkout.interface";
import { US_STATES } from "../checkout.constant";

export function ShippingAddress() {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<CheckoutFormType>();

  const selectedState = watch("state");
  const inputClass = "h-11 mt-1.5";

  return (
    <section className="rounded-xl border border-border bg-card p-6">
      <h2 className="font-semibold text-lg mb-4">Shipping Address</h2>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName">First name</Label>
          <Input id="firstName" className={inputClass} {...register("firstName")} />
          {errors.firstName && (
            <p className="text-sm text-destructive mt-1">{errors.firstName.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="lastName">Last name</Label>
          <Input id="lastName" className={inputClass} {...register("lastName")} />
          {errors.lastName && (
            <p className="text-sm text-destructive mt-1">{errors.lastName.message}</p>
          )}
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="address">Street address</Label>
          <Input
            id="address"
            placeholder="123 Main St"
            className={inputClass}
            {...register("address")}
          />
          {errors.address && (
            <p className="text-sm text-destructive mt-1">{errors.address.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="city">City</Label>
          <Input id="city" className={inputClass} {...register("city")} />
          {errors.city && (
            <p className="text-sm text-destructive mt-1">{errors.city.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="state">State</Label>
          <Select
            value={selectedState}
            onValueChange={(value) => setValue("state", value, { shouldValidate: true })}
          >
            <SelectTrigger id="state" className={inputClass}>
              <SelectValue placeholder="Select state" />
            </SelectTrigger>
            <SelectContent>
              {US_STATES.map((state) => (
                <SelectItem key={state} value={state}>
                  {state}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.state && (
            <p className="text-sm text-destructive mt-1">{errors.state.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="zipCode">ZIP code</Label>
          <Input
            id="zipCode"
            placeholder="12345"
            className={inputClass}
            {...register("zipCode")}
          />
          {errors.zipCode && (
            <p className="text-sm text-destructive mt-1">{errors.zipCode.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="country">Country</Label>
          <Input id="country" className={inputClass} {...register("country")} disabled />
          {errors.country && (
            <p className="text-sm text-destructive mt-1">{errors.country.message}</p>
          )}
        </div>
      </div>
    </section>
  );
}
