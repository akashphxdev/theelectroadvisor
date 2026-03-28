import Footer from '@/components/Footer';
import Header from '@/components/Header';
import React from 'react'

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
        <Header />
            {children}
        <Footer />
    </div>
  )
}
