import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ErgoChair",
  description: "Trgovina s pisarniškimi stoli in 3D konfiguratorjem",
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
