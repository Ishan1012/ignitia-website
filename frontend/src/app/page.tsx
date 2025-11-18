'use client';
import dynamic from 'next/dynamic';
import React from 'react'

const Header = dynamic(() => import("@/components/header"), { ssr: false });
const LandingPage = dynamic(() => import("@/pages/LandingPage"), { ssr: false });

const Home = () => {
  return (
    <>
      <Header />
      <LandingPage />
    </>
  )
}

export default Home