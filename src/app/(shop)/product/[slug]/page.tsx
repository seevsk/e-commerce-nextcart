import { ProductSlideshow, QuantitySelector, SizeSelector } from "@/components";
import { titleFont } from "@/config/fonts";
import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function SlugProductPage({ params }: Props) {
  const { slug } = await params;
  const product = initialData.products.find((product) => product.slug === slug);
  if (!product) {
    notFound();
  }

  return (
    <div className="mt-5 mb-20 grid md:grid-cols-3 gap-3">
      {/* Slideshow */}
      <div className="col-span-1 md:col-span-2 min-w-0">
        <ProductSlideshow title={product.title} images={product.images} />
      </div>

      {/* Details */}
      <div className="col-span-1 px-5">
        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
          {product.title}
        </h1>
        <p className="text-lg mb-5">${product.price}</p>

        {/* Size Selector */}
        <SizeSelector
          selectedSize={product.sizes[0]}
          availableSize={product.sizes}
        />
        {/* Quantity Selector */}
        <QuantitySelector quantity={2} />
        {/* Button */}
        <button className="btn-primary my-5">Add to Cart</button>

        {/* Description */}
        <h3 className="font-bold text-sm">Description</h3>
        <p className="font-light">{product.description}</p>
      </div>
    </div>
  );
}
