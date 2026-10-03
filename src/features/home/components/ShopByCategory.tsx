import Link from "next/link";
import Image from "next/image";

const CATEGORIES = [
  {
    name: "Electronics",
    href: "/shop?category=Electronics",
    image:
      "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "Headphones, cameras, smart devices",
  },
  {
    name: "Fashion",
    href: "/shop?category=Fashion",
    image:
      "https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "Clothing, footwear, accessories",
  },
  {
    name: "Home & Living",
    href: "/shop?category=Home+%26+Living",
    image:
      "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "Furniture, decor, kitchenware",
  },
  {
    name: "Sports & Outdoors",
    href: "/shop?category=Sports+%26+Outdoors",
    image:
      "https://images.pexels.com/photos/2294361/pexels-photo-2294361.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "Fitness, camping, cycling gear",
  },
  {
    name: "Beauty & Health",
    href: "/shop?category=Beauty+%26+Health",
    image:
      "https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "Skincare, supplements, fragrance",
  },
  {
    name: "Books & Media",
    href: "/shop?category=Books+%26+Media",
    image:
      "https://images.pexels.com/photos/256541/pexels-photo-256541.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "Fiction, non-fiction, stationery",
  },
];

export function ShopByCategory() {
  return (
    <section className="container-page py-12 lg:py-16">
      <div className="flex items-end justify-between mb-8">
        <div>
          <h2 className="text-2xl lg:text-3xl font-bold tracking-tight">
            Shop by Category
          </h2>
          <p className="text-muted-foreground mt-1">
            Find exactly what you are looking for
          </p>
        </div>
        <Link
          href="/shop"
          className="text-sm font-medium text-primary hover:underline hidden sm:block"
        >
          View all
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 lg:gap-6">
        {CATEGORIES.map((category) => (
          <Link
            key={category.name}
            href={category.href}
            className="group relative aspect-[4/3] rounded-xl overflow-hidden border border-border card-hover-lift hover:shadow-xl"
          >
            <Image
              src={category.image}
              alt={category.name}
              fill
              sizes="(max-width: 640px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3 className="text-lg font-bold text-white">{category.name}</h3>
              <p className="text-sm text-white/80 mt-0.5 line-clamp-1">
                {category.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
