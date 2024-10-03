"use client";
import { QueryClient, QueryClientProvider } from 'react-query';
import { RadioProvider } from './_contexts/radioContext';
import { Inter } from "next/font/google";

import { metadata } from "./seo";
import "./globals.css";

const queryClient = new QueryClient();



const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={inter.className}
      >
        <QueryClientProvider client={queryClient}>
          <RadioProvider>
            <title>{metadata.title}</title>  {/* Use metadata.title */}
            <meta name="description" content={metadata.description} />
            {children}
          </RadioProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
