import Image from 'next/image';
import React from 'react';

const AboutSection: React.FC = () => {
    return (
        <div className="bg-zinc-950" id="about">
            <div className="mx-auto max-w-7xl py-12 sm:px-6 sm:py-12 lg:px-8">
                <div className="relative isolate overflow-hidden bg-zinc-800/20 px-6 pt-16 after:pointer-events-none after:absolute after:inset-0 after:inset-ring after:inset-ring-white/10 sm:rounded-3xl sm:px-16 after:sm:rounded-3xl md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
                    <svg
                        viewBox="0 0 1024 1024"
                        aria-hidden="true"
                        className="absolute top-1/2 left-1/2 -z-10 size-256 -translate-y-1/2 mask-[radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
                    >
                        <circle r={512} cx={512} cy={512} fill="url(#759c1415-0410-454c-8f7c-9a820de03641)" fillOpacity="0.7" />
                        <defs>
                            <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
                                <stop stopColor="#d55f79" />
                                <stop offset={1} stopColor="#edd457" />
                            </radialGradient>
                        </defs>
                    </svg>
                    <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
                        <h2
                            className="font-semibold tracking-tight text-5xl text-yellow-50 cursor-default"
                            style={{
                                textShadow: "0 0 30px rgba(253,224,71,0.6), 0 0 60px rgba(253,224,71,0.4)"
                            }}
                        >
                            About PSIT
                        </h2>
                        <p className="mt-6 text-[1.1rem] text-pretty text-gray-300 cursor-default">
                            Pranveer Singh Institute of Technology (PSIT) is a premier engineering institution located in Kanpur, Uttar Pradesh. Established with a vision to provide quality technical education, PSIT has consistently produced industry-ready professionals who excel in their respective fields.

                            With state-of-the-art infrastructure, experienced faculty, and a vibrant campus life, PSIT offers undergraduate and postgraduate programs in various engineering disciplines. The institute emphasizes holistic development through academic excellence, research opportunities, and extracurricular activities.
                        </p>
                    </div>
                    <div className="relative mt-16 h-75 lg:mt-8">
                        <Image
                            alt="App screenshot"
                            src="/home1.png"
                            width={1080}
                            height={1080}
                            className="absolute top-0 left-0 w-228 max-w-none rounded-md bg-white/5 ring-1 ring-white/10"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutSection;