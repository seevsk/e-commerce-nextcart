export const revalidate = 60;

import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination, ProductGrid, Title } from "@/components";
import { Gender } from "@/generated/prisma/enums";
import { redirect } from "next/navigation";

interface Props {
  params: Promise<{
    gender: string;
  }>;
  searchParams: Promise<{
    page?: string;
  }>;
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { gender } = await params;

  const { page: pageParam } = await searchParams;

  const page = pageParam ? parseInt(pageParam) : 1;

  const { products, currentPage, totalPages } =
    await getPaginatedProductsWithImages({ page, gender: gender as Gender });

  if (products.length === 0) {
    redirect(`/gender/${gender}`);
  }

  const labels: Record<string, string> = {
    men: "Mens",
    women: "Womens",
    kid: "Kid",
    unisex: "Unisex",
  };

  return (
    <>
      <Title
        title={`Articles of ${labels[gender]}`}
        subtitle="All Products"
        className="mb-2"
      />
      <ProductGrid products={products} />

      <Pagination totalPages={totalPages} />
    </>
  );
}
