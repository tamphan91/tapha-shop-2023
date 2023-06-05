import "./globals.css";
import { Inter } from "next/font/google";
import Header from './header';
import NavigationBar from "./navigation-bar";
import Footer from './footer';
import { getCategories } from '@/db/category';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Home Page",
  description: "E-commerce website",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  // const categories = await getCategories();
  console.log('layout');
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true} >
        <Header />
        <NavigationBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
