"use client";

import { Spinner } from "@/components";
import { useCartStore } from "@/store/cart/cart-store";
import { currencyFormat } from "@/utils";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/react/shallow";

export const OrderSummary = () => {
  const [loaded, setLoaded] = useState(false);
  const { itemsInCart, subTotal, tax, total } = useCartStore(
    useShallow((state) => state.getSummaryInformation()),
  );

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoaded(true);
  }, []);

  if (!loaded) return <Spinner />;

  return (
    <div className="grid grid-cols-2">
      <span>№ Products</span>
      <span className="text-right">
        {itemsInCart === 1 ? "1 article" : `${itemsInCart} articles`}
      </span>
      <span>Subtotal</span>
      <span className="text-right">{currencyFormat(subTotal)}</span>
      <span>Taxes 15%</span>
      <span className="text-right">{currencyFormat(tax)}</span>
      <span className="text-2xl mt-5">Total:</span>
      <span className="text-right mt-5 text-2xl">{currencyFormat(total)}</span>
    </div>
  );
};
