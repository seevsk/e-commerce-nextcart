"use client";

import { Spinner, Title } from "@/components";
import Link from "next/link";
import { ProductsInCart } from "./ui/ProductsInCart";
import { OrderSummary } from "./ui/OrderSummary";
import { useCartStore } from "@/store/cart/cart-store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CartPage() {
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  const itemsInCart = useCartStore((state) => state.getTotalItems());

  useEffect(() => {
    // Zustand's persist middleware reads localStorage after mount, so the
    // cart contents differ between server and client on first render.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded && itemsInCart === 0) {
      router.replace("/empty");
    }
  }, [loaded, itemsInCart, router]);

  if (!loaded || itemsInCart === 0) {
    return (
      <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-250">
        <Title title="Cart" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* Cart */}
          <div className="flex flex-col mt-5">
            <span className="text-xl">Add another item</span>
            <Link href="/" className="underline mb-5">
              Continue Shopping
            </Link>

            {/* Cart Items */}
            <ProductsInCart />
          </div>
          {/* Checkout - Purchase Summary */}
          <div className="bg-white rounded-xl shadow-xl p-7 h-fit">
            <h2 className="text-2xl mb-2">Order Summary</h2>
            <OrderSummary />

            <div className="mt-5 mb-2 w-full">
              <Link
                className="flex btn-primary justify-center"
                href="/checkout/address"
              >
                Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
