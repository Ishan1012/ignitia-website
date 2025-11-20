'use client';
import EventSection from '@/components/events'; 
import HeroSection from '@/components/hero'
import AboutSection from '@/components/about'
import React from 'react'
import GallerySection from '@/components/gallery';
import SponsorSection from '@/components/sponsors';
import TeamSection from '@/components/teams';

const LandingPage = () => {
    return (
        <>
            <HeroSection />
            <AboutSection />
            <GallerySection />
            <TeamSection />
        </>
    )
}

export default LandingPage