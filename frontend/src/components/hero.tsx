'use client';
import React from 'react';
import {
    AnimatePresence,
    motion,
    Variants,
    useScroll,
    useTransform
} from 'framer-motion';
import { useCursor } from '@/context/CursorContext';
import Link from 'next/link';

const TITLES = [
    "Fueling Creativity, Empowering Innovation",
    "Unleashing Potential, Shaping Futures",
    "Dreaming Boldly, Achieving Greatness",
    "Challenging Limits, Elevating Success",
    "Building Vision, Driving Impact",
];

const cyclingTextVariant: Variants = {
    initial: {
        opacity: 0,
        rotateX: -90,
        y: -20,
        x: "-50%"
    },
    animate: {
        opacity: 1,
        rotateX: 0,
        y: 0,
        x: "-50%",
        transition: { type: "spring", stiffness: 100, damping: 12 }
    },
    exit: {
        opacity: 0,
        rotateX: 90,
        y: 20,
        x: "-50%",
        transition: { duration: 0.2, ease: "easeOut" }
    }
};

const HeroSection: React.FC = () => {
    const { setHovered } = useCursor();
    const [activeIndex, setActiveIndex] = React.useState(0);

    const ref = React.useRef(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    });

    const parallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

    React.useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((current) => (current + 1) % TITLES.length);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: 'spring',
                damping: 15,
                stiffness: 100,
            },
        },
    };

    return (
        <div
            ref={ref}
            className="min-h-screen bg-zinc-950 text-white font-sans flex flex-col relative overflow-hidden"
        >
            <div className="absolute inset-0 z-0 bg-zinc-950"></div>
            <div className="absolute inset-0 z-0 opacity-50">
                <motion.div
                    className="absolute inset-0 bg-cover bg-center filter blur-md"
                    style={{
                        backgroundImage: 'url("hero.png")',
                        y: parallaxY,
                        scale: 1.3,
                        willChange: 'transform'
                    }}
                ></motion.div>
            </div>

            <motion.main
                className="relative z-10 flex-grow flex flex-col cursor-default items-center justify-center text-center px-4 md:px-8 max-w-4xl mx-auto py-16"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <div className="bg-transparent">
                    <motion.h1
                        variants={itemVariants}
                        className="text-4xl text-yellow-200 md:text-[6rem] font-extrabold leading-tight mb-6 tracking-tight"
                        style={{
                            textShadow: "0 0 30px rgba(253,224,71,0.6), 0 0 60px rgba(253,224,71,0.4)"
                        }}
                        onMouseOver={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
                    >
                        IGNITIA 2K26
                    </motion.h1>
                </div>

                <motion.p variants={itemVariants} className="wrapper cursor-default relative h-[1.2em] my-[10px] mb-[25px] text-md md:text-3xl lg:text-5xl font-bold">
                    <AnimatePresence mode="wait">
                        <motion.strong
                            key={TITLES[activeIndex]}
                            variants={cyclingTextVariant}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            style={{
                                textShadow: "0 0 20px rgba(252, 242, 189, 0.6), 0 0 50px rgba(253, 244, 200, 0.4)"
                            }}
                            className="absolute top-0 left-1/2 w-auto min-w-[300px] text-yellow-50 font-inherit block whitespace-nowrap"
                        >
                            {TITLES[activeIndex]}
                        </motion.strong>
                    </AnimatePresence>
                </motion.p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                    <Link
                        href="/events"
                        className="bg-amber-500 rounded-[10px] px-4.5 py-3.5 text-md font-semibold text-white shadow-xs hover:bg-yellow-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 hover:shadow-[0_0_40px_rgba(253,224,71,0.5)] transition-colors duration-600"
                        onMouseOver={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
                    >
                        View Events
                    </Link>
                    <Link
                        href="/#about"
                        className="bg-transparent border-2 border-amber-500 rounded-[10px] px-4.5 py-3 text-md font-semibold text-white shadow-xs hover:bg-yellow-400 focus-visible:outline-2 hover:border-yellow-400 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 transition-colors duration-500"
                        onMouseOver={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
                    >
                        Know More
                    </Link>
                </div>
            </motion.main>
        </div>
    );
};

export default HeroSection;