import { QuantitySelector, Title } from "@/components";
import { initialData } from "@/seed/seed";
import Image from "next/image";
import Link from "next/link";

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
];

export default function CheckoutPage() {
  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-250">
        <Title title="Check Order" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* Cart */}
          <div className="flex flex-col mt-5">
            <span className="text-xl">Adjust Shopping Cart</span>
            <Link href="/cart" className="underline mb-5">
              Edit Shopping
            </Link>

            {/* Cart Items */}
            {productsInCart.map((product) => (
              <div key={product.slug} className="flex mb-5">
                <Image
                  src={`/products/${product.images[0]}`}
                  width={100}
                  height={100}
                  style={{
                    width: "100px",
                    height: "100px",
                  }}
                  alt={product.title}
                  className="mr-5 rounded"
                />

                <div>
                  <p>{product.title}</p>
                  <p>${product.price} x 3</p>
                  <p className="font-bold">Subtotal: ${product.price * 3}</p>
                </div>
              </div>
            ))}
          </div>
          {/* Checkout - Purchase Summary */}
          <div className="bg-white rounded-xl shadow-xl p-7">
            <h2 className="text-2xl mb-2 font-bold">Delivery Address</h2>
            <div className="mb-10">
              <p className="text-xl">Sebastian Salas</p>
              <p>Av. Siempre Viva 123</p>
              <p>Col. Centro</p>
              <p>Alcaldia Cuauhtemoc</p>
              <p>Ciudad de Mexico</p>
              <p>CP 15902</p>
              <p>123-123-123</p>
            </div>

            {/* Divider */}
            <div className="w-full h-0.5 rounded bg-gray-200 mb-10"></div>

            <h2 className="text-2xl mb-2">Order Summary</h2>
            <div className="grid grid-cols-2">
              <span>№ Products</span>
              <span className="text-right">3 articles</span>
              <span>Subtotal</span>
              <span className="text-right">$100</span>
              <span>Taxes 15%</span>
              <span className="text-right">$15</span>
              <span className="text-2xl mt-5">Total:</span>
              <span className="text-right mt-5 text-2xl">$115</span>
            </div>

            <div className="mt-5 mb-2 w-full">
              <p className="mb-5">
                {/* Disclaimer */}
                <span className="text-xs">
                  By clicking &quot;Place an Order,&quot; you agree to our{" "}
                  <a href="#" className="underline">
                    terms and conditions
                  </a>
                  , and{" "}
                  <a href="#" className="underline">
                    privacy policy
                  </a>
                </span>
              </p>

              <Link
                className="flex btn-primary justify-center"
                href="/orders/123"
              >
                Place an Order
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
