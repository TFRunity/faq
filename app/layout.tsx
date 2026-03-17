import '@/app/global-styles.css'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className='bg-purple-50'>
        {children}
      </body>
    </html>
  );
}
