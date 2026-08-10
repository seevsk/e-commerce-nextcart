"use client";

import { Product } from "@/interfaces";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface Props {
  product: Product;
}

export const ProductGridItem = ({ product }: Props) => {
  const [displayImage, setDisplayImage] = useState(product.images[0]);

  return (
    <div className="rounded-md overflow-hidden fade-in">
      <Link
        href={`/product/${product.slug}`}
        className="group block overflow-hidden"
        onMouseEnter={() => setDisplayImage(product.images[1])}
        onMouseLeave={() => setDisplayImage(product.images[0])}
        onFocus={() => setDisplayImage(product.images[1])}
        onBlur={() => setDisplayImage(product.images[0])}
      >
        <Image
          src={`/products/${displayImage}`}
          alt={product.title}
          className="w-full object-cover rounded transition-transform duration-300 ease-in-out group-hover:scale-105 group-focus:scale-105"
          width={500}
          height={500}
        />
      </Link>
      <div className="p-4 flex flex-col">
        <Link
          className="hover:text-blue-900"
          href={`/product/${product.slug}`}
        >
          {product.title}
        </Link>
        <span className="font-bold">${product.price}</span>
      </div>
    </div>
  );
};
