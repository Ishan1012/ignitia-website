import React, { useState } from "react"
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import Link from "next/link"
import Image from "next/image"

const products = [
    {
        id: 1,
        name: 'Chopstick Marble Race',
        href: '#',
        desc: 'A thrilling test of dexterity and patience! Compete to race marbles using only chopsticks in this laughter-filled challenge.',
        location: 'R Block Ground',
        date: 'Wednesday, April 1, 2026',
        time: '10:00 - 14:00',
        contact: 'Aditya Alok - N/A',
        price: '₹20',
        imageSrc: '/events/event1.png',
        imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
    },
    {
        id: 2,
        name: 'Battle of Bands',
        href: '#',
        desc: 'A thrilling test of dexterity and patience! Compete to race marbles using only chopsticks in this laughter-filled challenge.',
        location: 'R Block Ground',
        date: 'Wednesday, April 1, 2026',
        time: '10:00 - 14:00',
        contact: 'Aditya Alok - N/A',
        price: '₹20',
        imageSrc: '/events/event2.png',
        imageAlt: 'Olive drab green insulated bottle with flared screw lid and flat top.',
    },
    {
        id: 3,
        name: 'Imposter Challenge',
        href: '#',
        desc: 'A thrilling test of dexterity and patience! Compete to race marbles using only chopsticks in this laughter-filled challenge.',
        location: 'R Block Ground',
        date: 'Wednesday, April 1, 2026',
        time: '10:00 - 14:00',
        contact: 'Aditya Alok - N/A',
        price: '₹20',
        imageSrc: '/events/event3.png',
        imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
    },
    {
        id: 4,
        name: 'The Developer League',
        href: '#',
        desc: 'A thrilling test of dexterity and patience! Compete to race marbles using only chopsticks in this laughter-filled challenge.',
        location: 'R Block Ground',
        date: 'Wednesday, April 1, 2026',
        time: '10:00 - 14:00',
        contact: 'Aditya Alok - N/A',
        price: '₹20',
        imageSrc: '/events/event4.png',
        imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
    },
]

const Quickview = ({ open, setOpen }: { open: boolean, setOpen: (a: boolean) => void }) => {
    return (
        <Dialog open={open} onClose={setOpen} className="relative z-10">
            <DialogBackdrop
                transition
                className="fixed inset-0 hidden bg-gray-900/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in md:block"
            />

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
                    <DialogPanel
                        transition
                        className="flex w-full transform text-left text-base transition data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in md:my-8 md:max-w-2xl md:px-4 data-closed:md:translate-y-0 data-closed:md:scale-95 lg:max-w-4xl"
                    >
                        <div className="relative flex w-full items-center overflow-hidden bg-zinc-950 px-4 pt-14 pb-8 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                            <button
                                type="button"
                                onClick={() => setOpen(false)}
                                className="absolute cursor-pointer top-4 right-4 text-gray-100 hover:text-gray-100 sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-8 lg:right-8"
                            >
                                <span className="sr-only">Close</span>
                                <XMarkIcon aria-hidden="true" className="size-6" />
                            </button>

                            <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
                                <Image
                                    alt={products[0].imageAlt}
                                    src={products[0].imageSrc}
                                    width={500}
                                    height={500}
                                    className="aspect-2/3 w-full rounded bg-gray-100 object-cover sm:col-span-4 lg:col-span-5"
                                />
                                <div className="sm:col-span-8 lg:col-span-7">
                                    <h2 className="text-2xl font-bold text-gray-100 sm:pr-12">{products[0].name}</h2>

                                    <section aria-labelledby="information-heading" className="mt-2">
                                        <h3 id="information-heading" className="sr-only">
                                            Product information
                                        </h3>

                                        <p className="text-2xl text-gray-200">{products[0].price}</p>
                                    </section>

                                    <section aria-labelledby="options-heading" className="mt-10">
                                        <h3 id="options-heading" className="sr-only">
                                            Product options
                                        </h3>
                                    </section>
                                </div>
                            </div>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}

const EventSection: React.FC = () => {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <>
            <Quickview open={open} setOpen={setOpen} />
            <div className="bg-zinc-950 py-8 sm:py-8" id="events">
                <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
                    <p
                        className="mx-auto mt-5 max-w-lg text-center text-4xl font-semibold tracking-tight text-balance text-yellow-50 sm:text-5xl underline underline-offset-8 decoration-yellow-200/50"
                        style={{
                            textShadow: "0 0 30px rgba(253,224,71,0.6), 0 0 60px rgba(253,224,71,0.4)"
                        }}
                    >
                        Explore Events
                    </p>
                    <p className="mt-7 mx-auto max-w-xl text-center text-xl tracking-tight text-balance text-yellow-50">
                        Discover exciting competitions, performances, and challenges across cultural, fun, and technical categories.
                    </p>
                    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 mt-10">
                        {products.map((product) => (
                            <div key={product.id} onClick={() => setOpen(true)} className="group cursor-pointer">
                                <img
                                    alt={product.imageAlt}
                                    src={product.imageSrc}
                                    className="aspect-square w-full rounded-[10px] bg-gray-200 object-cover group-hover:scale-[1.09] xl:aspect-7/8 transition-scale duration-500"
                                />
                                <h3 className="mt-4 text-xl text-gray-100">{product.name}</h3>
                                <p className="mt-1 text-md font-medium text-gray-200">{product.price}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default EventSection;