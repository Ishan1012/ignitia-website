'use client';
import SponsorsPage from '@/pages/SponsorsPage'
import dynamic from 'next/dynamic';
import React from 'react'

const Header = dynamic(() => import("@/components/header"), { ssr: false });

const Sponsors = () => {
  return (
    <>
      <Header />
      <SponsorsPage />
    </>
  );
}

export default Sponsors