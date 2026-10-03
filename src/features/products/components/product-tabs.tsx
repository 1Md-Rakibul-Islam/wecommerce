import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ReviewList } from "@/features/products/components/review-list";
import { Product } from "@/types/product";

interface ProductTabsProps {
  product: Product;
}

export function ProductTabs({ product }: ProductTabsProps) {
  return (
    <Tabs defaultValue="description">
      <TabsList className="inline-flex h-12 items-center justify-start rounded-full bg-muted/50 p-1 text-muted-foreground w-full sm:w-auto overflow-x-auto scrollbar-hide">
        <TabsTrigger
          value="description"
          className="rounded-full px-6 py-2.5 text-sm font-medium transition-all data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
        >
          Description
        </TabsTrigger>
        <TabsTrigger
          value="specifications"
          className="rounded-full px-6 py-2.5 text-sm font-medium transition-all data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
        >
          Specifications
        </TabsTrigger>
        <TabsTrigger
          value="reviews"
          className="rounded-full px-6 py-2.5 text-sm font-medium transition-all data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
        >
          Reviews ({product.reviewCount})
        </TabsTrigger>
      </TabsList>

      <TabsContent value="description" className="mt-6">
        <div className="prose prose-sm max-w-none">
          <p className="text-muted-foreground leading-relaxed text-base">
            {product.longDescription}
          </p>
        </div>
      </TabsContent>

      <TabsContent value="specifications" className="mt-6">
        <div className="rounded-xl border border-border overflow-hidden">
          <table className="w-full text-sm">
            <tbody>
              {product.specifications.map((spec, i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-muted/30" : ""}>
                  <td className="px-4 py-3 font-medium w-1/3">
                    {spec.label}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {spec.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </TabsContent>

      <TabsContent value="reviews" className="mt-6">
        <ReviewList
          reviews={product.reviews}
          rating={product.rating}
          reviewCount={product.reviewCount}
        />
      </TabsContent>
    </Tabs>
  );
}
