import React from 'react';

const SponsorSection = () => {
    return (
        <div className="bg-zinc-950 py-24 sm:py-12 mt-10" id="sponsors">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <h2
                    className="mx-auto mt-5 max-w-lg text-center text-4xl font-semibold tracking-tight text-balance text-yellow-50 sm:text-5xl underline underline-offset-8 decoration-yellow-200/50"
                    style={{
                        textShadow: "0 0 30px rgba(253,224,71,0.6), 0 0 60px rgba(253,224,71,0.4)"
                    }}
                >
                    Our Sponsors
                </h2>
                <div className="relative lg:row-span-2">
                    <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8 sm:mt-16 rounded-[calc(var(--radius-lg)+1px)] lg:rounded-l-[calc(2rem+1px)]">
                        <div className="bg-zinc-500/40 rounded-[10px] rounded-l-[30px] p-8 space-y-4">
                            <h3
                                className="text-3xl font-medium tracking-tight text-yellow-50"
                                style={{
                                    textShadow: "0 0 30px rgba(253,224,71,0.6), 0 0 60px rgba(253,224,71,0.4)"
                                }}
                            >
                                Acme Financial Solutions
                            </h3>
                            <p className="text-md/6 text-gray-400">
                                Trusted financial solutions and investment services dedicated to empowering individuals and businesses.
                            </p>
                            <div className="relative min-h-[500px] w-full grow max-lg:mx-auto max-lg:max-w-sm">
                                <img
                                    alt="Acme Financial Solutions"
                                    width={500}
                                    height={500}
                                    src="/sponsor1.jpeg"
                                    className="size-full object-cover object-top rounded-[10px]"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-8">
                            <div className="bg-zinc-500/40 p-8 space-y-4 rounded-[10px]">
                                <h3
                                    className="text-3xl font-medium tracking-tight text-yellow-50"
                                    style={{
                                        textShadow: "0 0 30px rgba(253,224,71,0.6), 0 0 60px rgba(253,224,71,0.4)"
                                    }}
                                >
                                    Stellar Jewelry
                                </h3>
                                <p className="text-md/6 text-gray-400">
                                    A modern jewellery house blending craftsmanship with timeless elegance.
                                </p>
                                <img
                                    alt="Stellar Jewelry"
                                    width={500}
                                    height={500}
                                    src="/sponsor3.jpeg"
                                    className="w-full rounded-[10px] object-cover"
                                />
                            </div>

                            <div className="bg-zinc-500/50 p-8 space-y-4 rounded-[10px]">
                                <h3
                                    className="text-3xl font-medium tracking-tight text-yellow-50"
                                    style={{
                                        textShadow: "0 0 30px rgba(253,224,71,0.6), 0 0 60px rgba(253,224,71,0.4)"
                                    }}
                                >
                                    BluePeak Wealth
                                </h3>
                                <p className="text-md/6 text-gray-400">
                                    Your partner in financial growth, wealth management, and long-term prosperity.
                                </p>
                                <img
                                    alt="BluePeak Wealth"
                                    width={500}
                                    height={500}
                                    src="/sponsor4.jpg"
                                    className="w-full rounded-[10px] object-cover"
                                />
                            </div>
                        </div>

                        <div className="bg-zinc-500/40 rounded-[10px] rounded-r-[30px] p-8 space-y-4">
                            <h3
                                className="text-3xl font-medium tracking-tight text-yellow-50"
                                style={{
                                    textShadow: "0 0 30px rgba(253,224,71,0.6), 0 0 60px rgba(253,224,71,0.4)"
                                }}
                            >
                                Sunnyvale Sweets
                            </h3>
                            <p className="text-md/6 text-gray-400">
                                Serving sweetness and tradition — a name synonymous with authentic delicacies.
                            </p>
                            <img
                                alt="Sunnyvale Sweets"
                                width={500}
                                height={500}
                                src="/sponsor2.jpeg"
                                className="w-full rounded-[10px] object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SponsorSection;