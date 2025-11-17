import Image from 'next/image'
import React from 'react'

const products = [
    {
        id: 1,
        href: '#',
        imageSrc: '/gallery/1.jpg',
        imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
    },
    {
        id: 2,
        href: '#',
        imageSrc: '/gallery/2.jpg',
        imageAlt: 'Olive drab green insulated bottle with flared screw lid and flat top.',
    },
    {
        id: 3,
        href: '#',
        imageSrc: '/gallery/3.jpg',
        imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
    },
    {
        id: 4,
        href: '#',
        imageSrc: '/gallery/4.jpg',
        imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
    },
    {
        id: 5,
        href: '#',
        imageSrc: '/gallery/5.jpg',
        imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
    },
    {
        id: 6,
        href: '#',
        imageSrc: '/gallery/6.jpg',
        imageAlt: 'Olive drab green insulated bottle with flared screw lid and flat top.',
    },
    {
        id: 7,
        href: '#',
        imageSrc: '/gallery/7.jpg',
        imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
    },
    {
        id: 8,
        href: '#',
        imageSrc: '/gallery/8.jpg',
        imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
    },
    {
        id: 9,
        href: '#',
        imageSrc: '/gallery/9.jpg',
        imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
    },
    {
        id: 10,
        href: '#',
        imageSrc: '/gallery/10.jpg',
        imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
    },
    {
        id: 11,
        href: '#',
        imageSrc: '/gallery/11.jpg',
        imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
    },
    {
        id: 12,
        href: '#',
        imageSrc: '/gallery/12.jpg',
        imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
    },
]

const GallerySection = () => {
    return (
        <div className="bg-zinc-950 py-8 sm:py-8" id="gallery">
            <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
                <p
                    className="mx-auto mt-5 max-w-lg text-center text-4xl font-semibold tracking-tight text-balance text-yellow-50 sm:text-5xl underline underline-offset-8 decoration-yellow-200/50"
                    style={{
                        textShadow: "0 0 30px rgba(253,224,71,0.6), 0 0 60px rgba(253,224,71,0.4)"
                    }}
                >
                    Our Gallery
                </p>
                <div className="mt-20 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
                    {products.map((product) => (
                        <a key={product.id} href={product.href} className="group">
                            <Image
                                alt={product.imageAlt}
                                src={product.imageSrc}
                                width={500}
                                height={500}
                                className="aspect-square w-full rounded-[10px] bg-gray-200 object-cover group-hover:scale-[1.05] xl:aspect-7/8 transition-scale duration-500"
                            />
                        </a>
                    ))}
                </div>
            </div>
        </div>

    )
}

export default GallerySection