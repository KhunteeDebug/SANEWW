import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import NavbarWrapper from "./components/Navbar/NavbarWrapper";
import { Toaster } from 'react-hot-toast';
import Footer from "./components/Footer/Footer";
const font = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Hello Gamer!",
  description: "Gamer Room",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) 
{
  return (
    <html lang="en">
      <body className={`${font.className} antialiased`} >
        <NavbarWrapper />
        {children}
        <Toaster position="top-right" reverseOrder={false} />
        {/* <Footer/> */}
      </body>
    </html>
  );
}
