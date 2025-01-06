import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Header } from "./components/Header";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Fire Homes",
  description: "Fire Homes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased font-serif`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
