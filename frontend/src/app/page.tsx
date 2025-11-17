'use client';
import { CursorProvider } from '@/context/CursorContext';
import dynamic from 'next/dynamic';
import React from 'react'

const Header = dynamic(() => import("@/components/header"), { ssr: false });
const LandingPage = dynamic(() => import("@/pages/LandingPage"), { ssr: false });

const Home = () => {
  return (
    <CursorProvider>
      <Header />
      <LandingPage />
    </CursorProvider>
  )
}

export default Home