import Link from "next/link";
import Image from "next/image";
import { Plus, Minus, Trash2 } from "lucide-react";
import { formatPrice } from "@/lib/format";
import { Product } from "@/types/product";

interface CartItemProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  item: any; // Using any or specific type based on cart context
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
}

export function CartItem({ item, updateQuantity, removeItem }: CartItemProps) {
  return (
    <div className="flex gap-4 rounded-xl border border-border bg-card p-4">
      <Link href={`/products/${item.slug}`} className="shrink-0">
        <Image
          width={96}
          height={96}
          src={item.image}
          alt={item.name}
          className="h-24 w-24 rounded-lg object-cover border border-border"
        />
      </Link>
      <div className="flex-1 min-w-0">
        <Link
          href={`/products/${item.slug}`}
          className="font-medium hover:text-primary transition-colors line-clamp-2"
        >
          {item.name}
        </Link>
        <p className="text-sm text-muted-foreground mt-1">
          {formatPrice(item.price)} each
        </p>
        <div className="flex items-center gap-3 mt-3">
          <div className="flex items-center border border-border rounded-lg">
            <button
              className="p-1.5 hover:bg-muted rounded-l-lg"
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              aria-label="Decrease quantity"
            >
              <Minus size={14} />
            </button>
            <span className="px-3 text-sm font-medium min-w-[2.5rem] text-center">
              {item.quantity}
            </span>
            <button
              className="p-1.5 hover:bg-muted rounded-r-lg disabled:opacity-40"
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              disabled={item.quantity >= item.stock}
              aria-label="Increase quantity"
            >
              <Plus size={14} />
            </button>
          </div>
          <button
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-destructive transition-colors"
            onClick={() => removeItem(item.id)}
          >
            <Trash2 size={16} />
            Remove
          </button>
        </div>
      </div>
      <div className="text-right shrink-0">
        <p className="font-bold text-lg">
          {formatPrice(item.price * item.quantity)}
        </p>
        {item.quantity >= item.stock && (
          <p className="text-xs text-warning mt-1">Max stock reached</p>
        )}
      </div>
    </div>
  );
}
