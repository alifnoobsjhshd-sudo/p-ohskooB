export interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  category: 'fiction' | 'non-fiction' | 'poetry' | 'philosophy' | 'design';
  coverUrl: string;
  isBestseller?: boolean;
  isNew?: boolean;
  rating: number;
  year: number;
  pages: number;
  publisher: string;
  description: string;
  longDescription: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatarUrl: string;
  content: string;
  rating: number;
}

export const BOOK_CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'fiction', label: 'Fiction' },
  { id: 'non-fiction', label: 'Non-Fiction' },
  { id: 'philosophy', label: 'Philosophy' },
  { id: 'poetry', label: 'Poetry' },
  { id: 'design', label: 'Design' }
];

export const BOOKS_DATA: Book[] = [
  {
    id: '1',
    title: 'The Silent Echo',
    author: 'Elena Marchetti',
    price: 28.00,
    category: 'fiction',
    coverUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&q=80',
    isBestseller: true,
    rating: 4.5,
    year: 2023,
    pages: 342,
    publisher: 'Veritas Publishing',
    description: 'A poetic exploration of memory, loss, and the silent language of old Italian coastal towns.',
    longDescription: 'Set against the backdrop of the rugged Ligurian coast, The Silent Echo traces the life of a young cartographer who discovers an archive of letters hidden behind a chapel wall. As she deciphers the calligraphy, she uncovers an interconnected heritage spanning three generations of lighthouse keepers, artisans, and dreamers.'
  },
  {
    id: '2',
    title: 'Atlas of Forgotten Places',
    author: 'James Whitfield',
    price: 45.00,
    category: 'design',
    coverUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&q=80',
    isBestseller: true,
    rating: 5,
    year: 2022,
    pages: 280,
    publisher: 'Horizon Press London',
    description: 'A gorgeous large-format photographic overview of spaces reclaimed by nature across six continents.',
    longDescription: 'From abandoned Art Deco theaters in Brussels to forgotten sub-glacial laboratories, Whitfield captures the haunting elegance of historical architecture that is slowly fading from memory. Printed on premium heavy stock paper with custom linen casing.'
  },
  {
    id: '3',
    title: 'Midnight in the Garden',
    author: 'Sarah Chen',
    price: 32.00,
    category: 'poetry',
    coverUrl: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=800&q=80',
    isNew: true,
    rating: 4,
    year: 2024,
    pages: 180,
    publisher: 'Lumière Editions',
    description: 'An elegant collection of modern free-verse poetry contemplating urban solitude and botanical magic.',
    longDescription: 'Chen’s poems are microscopic portraits of night-blooming jasmine, damp concrete, and neon glows reflections. This collector’s edition is bound in soft-touch emerald fabric with gilt page edges, including original hand-dawn botanical prints.'
  },
  {
    id: '4',
    title: 'The Art of Stillness',
    author: 'Pico Iyer',
    price: 24.00,
    category: 'philosophy',
    coverUrl: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=800&q=80',
    rating: 4.5,
    year: 2021,
    pages: 216,
    publisher: 'Athenaeum Books',
    description: 'An inspirational treatise on the virtues of slowing down, seeking quiet spaces, and looking inward.',
    longDescription: 'In an age of constant connectivity, Pico Iyer reminds us that the ultimate luxury is taking a pause. Combining wisdom from classical monastic traditions and contemporary neuroscience, it is a manual for preserving peace of mind.'
  },
  {
    id: '5',
    title: 'Design as an Attitude',
    author: 'Alice Rawsthorn',
    price: 38.00,
    category: 'design',
    coverUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&q=82',
    isNew: true,
    rating: 4.8,
    year: 2023,
    pages: 312,
    publisher: 'JRP Editions',
    description: 'An authoritative survey of how design is responding to severe social, ecological, and technological issues.',
    longDescription: 'Rawsthorn analyzes design’s role in a post-industrial landscape, charting how it has escaped its decorative roots to become a dynamic agent of social empowerment and environmental rehabilitation.'
  },
  {
    id: '6',
    title: 'Echoes of the Agora',
    author: 'Marcus Diogenes',
    price: 29.50,
    category: 'philosophy',
    coverUrl: 'https://images.unsplash.com/photo-1474932430478-367dbb6832c1?w=801&q=80',
    rating: 4.9,
    year: 2022,
    pages: 410,
    publisher: 'Athens Academic Press',
    description: 'Revisiting Socratic dialogue and Stoic discipline in a hyper-digitized and high-velocity world.',
    longDescription: 'A monumental investigation into Greek ethics and Roman stoicism translated into immediate actions for modern leaders, scientists, and creatives trying to maintain an authentic moral compass.'
  },
  {
    id: '7',
    title: 'Wild Grasses & Gilded Skies',
    author: 'Evelyn Sterling',
    price: 19.00,
    category: 'poetry',
    coverUrl: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=801&q=80',
    rating: 4.7,
    year: 2023,
    pages: 144,
    publisher: 'Penumbra Press',
    description: 'Sonnets and villanelles dedicated to the sublime vastness of the Scottish highlands in late autumn.',
    longDescription: 'Sterling captures the brisk chill of mountain crags, the whispers of ancient heaths, and the warm crackle of cottage firesides with rhythmically immaculate, modern metered verse.'
  },
  {
    id: '8',
    title: 'In Search of Lost Time',
    author: 'Marcel Proust',
    price: 52.00,
    category: 'fiction',
    coverUrl: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=801&q=80',
    isBestseller: true,
    rating: 5,
    year: 2020,
    pages: 650,
    publisher: 'Classic Editions Group',
    description: 'A luxurious new translation of Proust’s masterpiece, complete with leatherette styling and gold foil stamp.',
    longDescription: 'Swann’s Way and beyond. This premium volume is designed for reading clubs and private libraries, featuring a gorgeous ribbon marker, custom endpapers, and introductory critical essays.'
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: '1',
    name: 'Alexandra Reed',
    role: 'Literary Critic, The Guardian',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&q=80',
    content: '"Lumière Books has transformed my reading habits. Their curation is impeccable—every recommendation feels personally tailored. The rare first edition I acquired is the crown jewel of my collection."',
    rating: 5
  },
  {
    id: '2',
    name: 'Dr. Thomas Wright',
    role: 'Professor of Philosophy, Oxford',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&q=80',
    content: '"The attention to detail is extraordinary. From the bespoke packaging to the handwritten note, every interaction with Lumière feels like a luxury experience. Their philosophy section is unmatched."',
    rating: 5
  },
  {
    id: '3',
    name: 'Isabelle Moreau',
    role: 'Author & Poet',
    avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&q=80',
    content: '"I\'ve been a patron for fifteen years. The team at Lumière doesn\'t just sell books—they cultivate relationships with literature. Their monthly reading club has introduced me to authors I now cherish."',
    rating: 5
  }
];
