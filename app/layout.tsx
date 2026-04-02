'use client';
import '@/app/global-styles.css'
import {AppProvider} from "@/app/providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className='flex bg-blue-30 justify-center align-center'>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
