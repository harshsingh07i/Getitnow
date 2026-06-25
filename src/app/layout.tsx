import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GetItNow | Instant Local Delivery",
  description: "Find what you need instantly from neighborhood stores and get it delivered in minutes.",
};

import CartDrawer from '@/components/CartDrawer';
import LocationModal from '@/components/LocationModal';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <main>
          {children}
        </main>
        <CartDrawer />
        <LocationModal />
      </body>
    </html>
  );
}
