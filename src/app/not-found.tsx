import Link from "next/link";
import { Home, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="animate-fade-in">
      <section className="container-page py-20 lg:py-32 text-center animate-fade-in">
        <p className="text-7xl lg:text-9xl font-bold text-primary/20">404</p>
        <h1 className="text-2xl lg:text-3xl font-bold tracking-tight mt-4 mb-3">
          Page Not Found
        </h1>
        <p className="text-muted-foreground max-w-md mx-auto mb-8">
          The page you are looking for does not exist or has been moved. Try
          browsing our products instead.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/">
            <Button size="lg">
              <Home size={18} className="mr-2" />
              Back to Home
            </Button>
          </Link>
          <Link href="/shop">
            <Button variant="outline" size="lg">
              <Search size={18} className="mr-2" />
              Browse Products
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
