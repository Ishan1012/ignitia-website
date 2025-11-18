'use client';
import { useCursor } from '@/context/CursorContext';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const MenuIcon: React.FC = () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor">
        <path d="M4 6H20M4 12H20M4 18H20" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const CloseIcon: React.FC = () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor">
        <path d="M18 6L6 18M6 6L18 18" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const Header: React.FC = () => {
    const { setHovered } = useCursor();
    const [isScrolled, setIsScrolled] = useState<boolean>(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

    useEffect(() => {
        const handleScroll = (): void => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMobileMenu = (): void => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = (): void => {
        setIsMobileMenuOpen(false);
    };

    const headerClasses: string = `
        fixed top-0 left-0 w-full flex justify-between items-center z-[100]
        transition-all duration-300 ease-in-out font-sans
        ${isScrolled ? 'bg-zinc-950 py-4 px-6 shadow-lg' : 'bg-transparent py-6 px-6'}
    `;

    const navLinkClasses: string = `
        relative text-white font-medium text-sm
        after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-yellow-300
        after:-bottom-1 after:left-0
        after:scale-x-0 after:origin-right
        after:transition-transform after:duration-250 after:ease-out
        hover:text-yellow-300 hover:after:scale-x-100 hover:after:origin-left
    `;

    const registerButtonClasses: string = `
        font-bold text-yellow-300 text-sm border-2 border-yellow-300 py-2 px-4 rounded
        hover:bg-yellow-300 hover:text-black hover:shadow-[0_0_20px_rgba(253,224,71,0.5)] transition-colors duration-500
    `;

    return (
        <>
            <header className={headerClasses}>
                <div className="z-[101]" onMouseOver={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
                    <Link href="/" className="flex gap-3 font-extrabold text-2xl text-yellow-300 tracking-wider">
                        <Image src={'/icon.png'} width={500} height={500} className='h-auto w-5' alt='icon' />
                        IGNITIA
                    </Link>
                </div>

                <nav className="hidden md:flex items-center gap-8">
                    <Link href="/#about" className={navLinkClasses}>ABOUT</Link>
                    <Link href="/#events" className={navLinkClasses}>EVENTS</Link>
                    <Link href="/#gallery" className={navLinkClasses}>GALLERY</Link>
                    <Link href="/#sponsors" className={navLinkClasses}>SPONSORS</Link>
                    <Link href="/#teams" className={navLinkClasses}>TEAMS</Link>
                    <Link href="/signup" className={registerButtonClasses} onMouseOver={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
                        REGISTER
                    </Link>
                </nav>

                <button
                    className="md:hidden text-white z-[101]"
                    onClick={toggleMobileMenu}
                    aria-label="Toggle menu"
                >
                    {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
                </button>
            </header>

            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.nav
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black bg-opacity-95 z-[100] flex flex-col items-center justify-center gap-10 md:hidden"
                        onClick={closeMobileMenu}
                    >
                        <motion.a
                            href="#events"
                            className="text-white text-2xl font-medium"
                            initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}
                            onClick={closeMobileMenu}
                        >
                            EVENTS
                        </motion.a>
                        <motion.a
                            href="#schedule"
                            className="text-white text-2xl font-medium"
                            initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}
                            onClick={closeMobileMenu}
                        >
                            SCHEDULE
                        </motion.a>
                        <motion.a
                            href="#sponsors"
                            className="text-white text-2xl font-medium"
                            initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}
                            onClick={closeMobileMenu}
                        >
                            SPONSORS
                        </motion.a>
                        <motion.a
                            href="#register"
                            className={`${registerButtonClasses} text-lg`}
                            initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}
                            onClick={closeMobileMenu}
                        >
                            [ REGISTER ]
                        </motion.a>
                    </motion.nav>
                )}
            </AnimatePresence>
        </>
    );
};

export default Header;