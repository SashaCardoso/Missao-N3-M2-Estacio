import type { Metadata } from "next";
import 'bootstrap/dist/css/bootstrap.css';
import { Inter } from "next/font/google";
import "./globals.css";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mission 3",
  description: "Estacio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      
      <body className={inter.className}>
        <nav className='d-flex flex-row mb-3 p-1 bg-dark text-light'>
          <a href='/' className="btn p-2 bd-highlight text-light">Home</a>
          <a href='/books' className="btn p-2 bd-highlight text-light">Book List</a>
          <a href='/books/create' className="btn p-2 bd-highlight text-light">Add Book</a>
        </nav>
        {children}
      </body>
      
    </html>
  );
}
