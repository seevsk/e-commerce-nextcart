import type { Metadata } from "next";
import "./globals.css";
import { inter } from "@/config/fonts";
import { Provider } from "@/components";

export const metadata: Metadata = {
  title: {
    template: "%s - Ecommerce | Shop",
    default: "Home - Ecommerce | Shop",
  },
  description: "An e-commerce site for products",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.className}h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
