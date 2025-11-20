'use client';
import EventsPage from '@/pages/EventsPage'
import dynamic from 'next/dynamic';
import React from 'react'

const Header = dynamic(() => import("@/components/header"), { ssr: false });

const Events = () => {
  return (
    <>
      <Header />
      <EventsPage />
    </>
  )
}

export default Events