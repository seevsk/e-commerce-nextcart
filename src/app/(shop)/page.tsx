import { ProductGrid, Title } from "@/components";
import { initialData } from "@/seed/seed";

export const products = initialData.products;

export default function Home() {
  return (
    <div className="px-4 sm:px-0">
      <Title title="Store" subtitle="All Products" className="mb-2" />
      <ProductGrid products={products} />
    </div>
  );
}
