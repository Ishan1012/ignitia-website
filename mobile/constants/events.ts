import { Event } from "@/types/type";

const events: Event[] = [
    {
        id: 1,
        name: 'Chopstick Marble Race',
        desc: 'A thrilling test of dexterity...',
        location: 'R Block Ground',
        date: 'Wednesday, April 1, 2026',
        time: '10:00 - 14:00',
        contact: 'Aditya Alok - N/A',
        price: '₹20',
        imageSrc: require('../assets/images/events/event1.png'),
        imageAlt: 'Chopstick Marble Race Event',
    },
    {
        id: 2,
        name: 'Battle of Bands',
        desc: 'Feel the rhythm and unleash...',
        location: 'Main Stage Arena',
        date: 'Wednesday, April 1, 2026',
        time: '16:00 - 20:00',
        contact: 'Priya Sharma - 9876543210',
        price: '₹100',
        imageSrc: require('../assets/images/events/event2.png'),
        imageAlt: 'Battle of Bands Event',
    },
    {
        id: 3,
        name: 'Imposter Challenge',
        desc: 'Find the imposters among you...',
        location: 'Seminar Hall 3',
        date: 'Thu, April 2, 2026',
        time: '11:00 - 13:00',
        contact: 'Vikas Singh',
        price: '₹50',
        imageSrc: require('../assets/images/events/event3.png'),
        imageAlt: 'Imposter Challenge Event',
    },
    {
        id: 4,
        name: 'The Developer League',
        desc: 'Developers, unite!',
        location: 'Computer Lab 5',
        date: 'Thu, April 2, 2026',
        time: '09:00 - 15:00',
        contact: 'Meera Rao',
        price: '₹50',
        imageSrc: require('../assets/images/events/event4.png'),
        imageAlt: 'The Developer League Event',
    },
];

export default events;