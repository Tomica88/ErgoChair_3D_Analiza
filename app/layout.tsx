import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Office chair shop with 3D configurator",
  description: "Office chair shop with 3D configurator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth bg-stone-950">
      <body>
        {children}
      </body>
    </html>
  );
}
