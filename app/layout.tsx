import '@/app/global-styles.css'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className='flex bg-blue-30 justify-center align-center'>
        {children}
      </body>
    </html>
  );
}
