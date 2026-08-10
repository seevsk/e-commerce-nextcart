import { ProductGrid, Title } from "@/components";
import { Category } from "@/interfaces";
import { initialData } from "@/seed/seed";

const seedProducts = initialData.products;

interface Props {
  params: Promise<{
    id: Category;
  }>;
}

export default async function CategoryPage({ params }: Props) {
  const { id } = await params;
  const products = seedProducts.filter((product) => product.gender == id);
  const labels: Record<Category, string> = {
    men: "Mens",
    women: "Womens",
    kid: "Kid",
    unisex: "Unisex",
  };

  return (
    <>
      <Title
        title={`Articles of ${labels[id]}`}
        subtitle="All Products"
        className="mb-2"
      />
      <ProductGrid products={products} />
    </>
  );
}
