import "./globals.css";
export const metadata = { title: "ShopX — Everything You Need, One Place", description: "Discover everyday favourites at ShopX." };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}