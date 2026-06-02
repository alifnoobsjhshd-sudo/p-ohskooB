import React, { useState, useMemo } from 'react';
import {
  BOOK_CATEGORIES,
  BOOKS_DATA,
  TESTIMONIALS_DATA,
  Book
} from './data';
import Header from './components/Header';
import CartDrawer from './components/CartDrawer';
import BookDetailModal from './components/BookDetailModal';
import {
  ArrowRight,
  Star,
  Eye,
  ShoppingBag,
  MapPin,
  Phone,
  Mail,
  Clock,
  Instagram,
  Twitter,
  Compass,
  Check,
  Send,
  Sparkles,
  BookOpen
} from 'lucide-react';
import { motion } from 'motion/react';

interface CartItem {
  book: Book;
  quantity: number;
}

export default function App() {
  // Application Interactive States
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Newsletter Form State
  const [emailInput, setEmailInput] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [submittingNewsletter, setSubmittingNewsletter] = useState(false);

  // Cart Handler Actions
  const handleAddToCart = (book: Book) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find((item) => item.book.id === book.id);
      if (existing) {
        return prevItems.map((item) =>
          item.book.id === book.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { book, quantity: 1 }];
    });
    // Trigger drawer on first addition or keep user updated
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (bookId: string, delta: number) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) => {
          if (item.book.id === bookId) {
            const nextQty = item.quantity + delta;
            return { ...item, quantity: nextQty };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveFromCart = (bookId: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.book.id !== bookId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Newsletter Submission
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) return;

    setSubmittingNewsletter(true);
    setTimeout(() => {
      setSubmittingNewsletter(false);
      setIsSubscribed(true);
      setEmailInput('');
    }, 1200);
  };

  // Memoized search and category catalog filtering
  const filteredBooks = useMemo(() => {
    return BOOKS_DATA.filter((book) => {
      const matchesCategory = activeCategory === 'all' || book.category === activeCategory;
      const matchesSearch =
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-warm-50 text-warm-900 transition-colors duration-300 antialiased selection:bg-gold selection:text-white pb-0">
      
      {/* Absolute Header Navigation */}
      <Header
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
      />

      {/* Hero Landing Section */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden" id="hero-landing">
        {/* Immersive high resolution background */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1920&q=80"
            alt="Centenary Library"
            className="w-full h-full object-cover select-none scale-105"
            loading="eager"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 hero-gradient" />
        </div>

        {/* Hero Interactive Header content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-gold text-xs sm:text-sm uppercase tracking-[0.4em] mb-4 sm:mb-5 font-semibold drop-shadow-sm flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4" /> Est. 1924 · Paris · London · New York
            </p>
            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-medium text-white leading-[1.1] mb-6 tracking-wide">
              Where Stories<br className="sm:block hidden" />
              <span className="italic text-gold-light">Come Alive</span>
            </h1>
            <p className="text-warm-350 text-sm sm:text-base md:text-lg max-w-xl sm:max-w-2xl mx-auto mb-10 font-normal leading-relaxed text-warm-200">
              Curating the world's finest literature since 1924. Discover rare first editions,
              contemporary masterpieces, and timeless classics in our sanctuary of words.
            </p>
            
            {/* Primary Calls-to-action */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="#collections"
                className="w-full sm:w-auto px-8 sm:px-10 py-4 bg-gold hover:bg-gold-dark text-white font-semibold tracking-widest text-xs uppercase shadow-lg transition-all duration-300 rounded-[4px] text-center"
              >
                Explore Collections
              </a>
              <a
                href="#about"
                className="w-full sm:w-auto px-8 sm:px-10 py-4 border border-warm-400 text-warm-200 hover:text-white hover:bg-white/10 font-semibold tracking-widest text-xs uppercase transition-all duration-300 rounded-[4px] text-center"
              >
                Our Heritage
              </a>
            </div>
          </motion.div>
        </div>

        {/* Bouncing Elegant Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-80 sm:opacity-100">
          <span className="text-[10px] text-warm-400 uppercase tracking-widest font-medium">Scroll to explore</span>
          <div className="w-5 h-8 border border-warm-400/80 rounded-full flex justify-center pt-1.5">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-1 h-2 bg-gold rounded-full"
            />
          </div>
        </div>
      </section>

      {/* Featured Genres Curation zone */}
      <section className="py-20 sm:py-24 bg-white" id="collections">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12 sm:mb-16">
            <p className="text-gold text-xs sm:text-sm uppercase tracking-[0.3em] mb-3 font-semibold">Browse By Genre</p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-warm-900 leading-tight">
              Curated Masterpieces
            </h2>
            <div className="w-12 h-[2px] bg-gold mx-auto mt-4 rounded-full" />
          </div>

          {/* Curation Quick Link grid cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              {
                id: 'fiction',
                title: 'Literary Fiction',
                count: '248 Titles',
                bg: 'https://images.unsplash.com/photo-1474932430478-367dbb6832c1?w=600&q=80'
              },
              {
                id: 'philosophy',
                title: 'Rare Philosophy',
                count: '173 Volumes',
                bg: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&q=80'
              },
              {
                id: 'poetry',
                title: 'Modern Poetry',
                count: '124 Collections',
                bg: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&q=80'
              },
              {
                id: 'design',
                title: 'Architecture & Art',
                count: '98 Art Editions',
                bg: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=600&q=80'
              }
            ].map((genre, idx) => (
              <motion.div
                key={genre.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                onClick={() => {
                  setActiveCategory(genre.id);
                  document.getElementById('bestsellers')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group relative h-96 rounded-xl overflow-hidden shadow-md hover:shadow-xl cursor-pointer transform transition-all duration-300"
              >
                <img
                  src={genre.bg}
                  alt={genre.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Visual Glass filter overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-warm-950/90 via-warm-950/40 to-warm-900/10 transition-opacity duration-300" />
                
                {/* Content layer */}
                <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end text-left">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-gold mb-1">
                    Century Collection
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-white mb-2 group-hover:text-gold-light transition-colors duration-200">
                    {genre.title}
                  </h3>
                  <div className="flex items-center justify-between">
                    <p className="text-warm-300 text-sm font-light">
                      {genre.count}
                    </p>
                    <div className="w-7 h-7 rounded-full bg-white/10 group-hover:bg-gold flex items-center justify-center text-white transition-all duration-300">
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </div>

                {/* Micro outer border highlight on hover */}
                <div className="absolute inset-3 border border-gold/0 group-hover:border-gold/45 rounded-lg transition-all duration-350 pointer-events-none" />
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* Main Catalog & Bestsellers section */}
      <section className="py-20 sm:py-24 bg-warm-100/50 border-t border-b border-warm-200/50" id="bestsellers">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12 gap-6">
            <div className="text-left">
              <p className="text-gold text-xs sm:text-sm uppercase tracking-[0.3em] mb-2 font-semibold">Our Curation</p>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-warm-900 leading-tight">
                Seasonal Favorites
              </h2>
              <p className="text-warm-650 text-xs sm:text-sm font-normal max-w-md mt-2">
                Hand-picked masterpieces spanning diverse themes, formatted in premium paper with bespoke cased covers.
              </p>
            </div>

            {/* Beautiful responsive slider filter list */}
            <div className="flex flex-wrap gap-2 overflow-x-auto pb-2 scrollbar-none max-w-full">
              {BOOK_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id);
                  }}
                  id={`cat-filter-[${cat.id}]`}
                  className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer whitespace-nowrap ${
                    activeCategory === cat.id
                      ? 'bg-warm-900 text-gold shadow-sm border border-warm-900'
                      : 'bg-white text-warm-700 border border-warm-200 hover:border-warm-400 hover:text-warm-955'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Grid matching filtered outcomes */}
          {filteredBooks.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-xl p-12 text-center border border-warm-200/60 max-w-md mx-auto"
            >
              <Compass className="w-12 h-12 text-warm-400 mx-auto mb-4 stroke-[1.2]" />
              <h4 className="font-serif text-lg font-semibold text-warm-900 mb-1">No matches found</h4>
              <p className="text-warm-600 text-xs leading-relaxed mb-4">
                We couldn't find items in classification "{activeCategory}" matching search query. Give other titles a try.
              </p>
              <button
                onClick={() => {
                  setActiveCategory('all');
                  setSearchQuery('');
                }}
                className="px-5 py-2 bg-gold hover:bg-gold-dark text-white rounded text-xs font-medium uppercase tracking-wider"
              >
                Reset catalog filters
              </button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredBooks.map((book) => (
                <motion.div
                  key={book.id}
                  layoutId={`book-card-${book.id}`}
                  className="bg-white rounded-xl p-4 shadow-xs border border-warm-200/40 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    {/* Picture cover container */}
                    <div className="relative aspect-[2/3] w-full rounded-md overflow-hidden bg-warm-100 border border-warm-100 shadow-sm mb-4">
                      <img
                        src={book.coverUrl}
                        alt={book.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />

                      {/* Labels tags */}
                      {book.isBestseller && (
                        <span className="absolute top-3 left-3 px-2 py-0.5 bg-gold text-white text-[9px] font-bold uppercase tracking-wider shadow-xs rounded-sm">
                          Bestseller
                        </span>
                      )}
                      {book.isNew && (
                        <span className="absolute top-3 left-3 px-2 py-0.5 bg-warm-850 text-white text-[9px] font-bold uppercase tracking-wider shadow-xs rounded-sm">
                          New Arrive
                        </span>
                      )}

                      {/* Desktop Cover Hover overlay */}
                      <div className="absolute inset-0 bg-warm-950/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                        <button
                          onClick={() => setSelectedBook(book)}
                          id={`quickview-${book.id}`}
                          className="w-10 h-10 bg-white hover:bg-gold hover:text-white text-warm-900 rounded-full flex items-center justify-center transition-all duration-200 shadow-md"
                          title="View complete specifications"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleAddToCart(book)}
                          id={`add-to-cart-overlay-${book.id}`}
                          className="w-10 h-10 bg-white hover:bg-gold hover:text-white text-warm-900 rounded-full flex items-center justify-center transition-all duration-200 shadow-md"
                          title="Reserve in store bag"
                        >
                          <ShoppingBag className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Book Metadata details */}
                    <span className="text-[10px] uppercase font-semibold text-gold tracking-widest block mb-0.5">
                      {book.category}
                    </span>
                    <h3 className="font-serif text-lg font-bold text-warm-900 group-hover:text-gold transition-colors duration-200 line-clamp-1 leading-snug">
                      {book.title}
                    </h3>
                    <p className="text-warm-500 text-xs mb-2">by {book.author}</p>
                    <p className="text-warm-600 text-xs line-clamp-2 leading-relaxed mb-4 font-light">
                      {book.description}
                    </p>
                  </div>

                  {/* Pricing row with mobile fallback triggers */}
                  <div>
                    <div className="flex items-center justify-between border-t border-warm-100 pt-3">
                      <span className="text-gold font-bold text-base">
                        ${book.price.toFixed(2)}
                      </span>
                      <div className="flex text-gold text-[10px]">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${
                              i < Math.floor(book.rating) ? 'fill-gold text-gold' : 'text-warm-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Touch devices bottom trigger button */}
                    <div className="mt-3 grid grid-cols-2 gap-2 lg:hidden">
                      <button
                        onClick={() => setSelectedBook(book)}
                        id={`mob-quickview-${book.id}`}
                        className="py-2 border border-warm-300 hover:border-warm-600 text-[10px] uppercase font-bold tracking-wider text-warm-700 text-center rounded bg-warm-50 rounded-[4px]"
                      >
                        Details
                      </button>
                      <button
                        onClick={() => handleAddToCart(book)}
                        id={`mob-add-to-cart-${book.id}`}
                        className="py-2 bg-gold hover:bg-gold-dark text-white text-[10px] uppercase font-bold tracking-wider text-center rounded flex items-center justify-center gap-1 rounded-[4px]"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" /> Reserve
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

        </div>
      </section>

      {/* Our Heritage Centenary Description Section */}
      <section className="py-20 sm:py-24 bg-white" id="about">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Visual Portrait illustration block */}
            <div className="lg:col-span-5 relative">
              <div className="relative z-10 rounded-xl overflow-hidden shadow-2xl aspect-[4/5] max-w-md mx-auto">
                <img
                  src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800&q=80"
                  alt="Century Library interior"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gold/5 blend-multiply" />
              </div>

              {/* Ornamental geometric frames */}
              <div className="absolute -bottom-6 -right-6 w-36 h-36 bg-warm-100 rounded-xl -z-10 hidden sm:block border-r border-b border-warm-200" />
              <div className="absolute -top-6 -left-6 w-36 h-36 border-2 border-gold rounded-xl -z-10 hidden sm:block" />
            </div>

            {/* Narrative description column */}
            <div className="lg:col-span-7 text-left">
              <p className="text-gold text-xs sm:text-sm uppercase tracking-[0.3em] mb-3 font-semibold">Our Century Story</p>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-warm-900 leading-tight mb-6">
                A Century of<br />
                <span className="italic text-gold">Literary Passion</span>
              </h2>
              
              <div className="space-y-4 text-warm-700 text-sm leading-relaxed font-light">
                <p>
                  Founded in 1924 on the cobblestone streets of Paris, Lumière Books began as a modest reading room for expatriate writers and intellectuals. What started as a sanctuary for the Lost Generation has evolved into one of the world's most respected purveyors of fine literature and scarce first edition items.
                </p>
                <p>
                  Today, we continue our founder’s vision: to connect discerning readers with books that challenge, inspire, and transform. Our curators travel the globe to discover emerging voices and secure rare editions for our distinguished international clientele.
                </p>
                <p>
                  Every volume in our collection is hand-selected, reflecting our unwavering commitment to literary excellence and the enduring, transformative power of the written word.
                </p>
              </div>

              {/* High precision statistical meters */}
              <div className="mt-10 pt-8 border-t border-warm-200 grid grid-cols-3 gap-4 sm:gap-6">
                <div>
                  <span className="font-serif text-2xl sm:text-4xl font-bold text-gold block">
                    100+
                  </span>
                  <p className="text-warm-500 text-[10px] sm:text-xs uppercase tracking-wider font-semibold mt-1">
                    Years of Heritage
                  </p>
                </div>
                <div>
                  <span className="font-serif text-2xl sm:text-4xl font-bold text-gold block">
                    50k+
                  </span>
                  <p className="text-warm-500 text-[10px] sm:text-xs uppercase tracking-wider font-semibold mt-1">
                    Books Curated
                  </p>
                </div>
                <div>
                  <span className="font-serif text-2xl sm:text-4xl font-bold text-gold block">
                    12
                  </span>
                  <p className="text-warm-500 text-[10px] sm:text-xs uppercase tracking-wider font-semibold mt-1">
                    Global Lounges
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Elegant Poetic Quote Band */}
      <section className="py-24 bg-warm-900 text-white relative overflow-hidden" id="quote-marquee">
        {/* Giant quotation watermarks */}
        <div className="absolute top-0 left-8 text-gold/15 text-[140px] md:text-[200px] font-serif select-none pointer-events-none leading-none">
          “
        </div>
        <div className="absolute bottom-[-60px] right-8 text-gold/15 text-[140px] md:text-[200px] font-serif select-none pointer-events-none leading-none">
          ”
        </div>

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10 py-4">
          <p className="font-serif text-2xl sm:text-4xl lg:text-5xl text-warm-100 leading-normal italic font-light mb-8 px-4">
            A room without books is like a body without a soul.
          </p>
          <div className="w-16 h-[1.5px] bg-gold mx-auto mb-5 rounded-full" />
          <p className="text-gold text-xs sm:text-sm uppercase tracking-[0.3em] font-semibold">
            Marcus Tullius Cicero
          </p>
        </div>
      </section>

      {/* Reader & Critic Testimonials Row */}
      <section className="py-20 sm:py-24 bg-warm-50" id="testimonials">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12 sm:mb-16">
            <p className="text-gold text-xs sm:text-sm uppercase tracking-[0.3em] mb-2 font-semibold">Reader Diaries</p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-warm-900 leading-tight">
              Words from Our Path patrons
            </h2>
            <div className="w-12 h-[2px] bg-gold mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {TESTIMONIALS_DATA.map((testimonial, idx) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white p-6 sm:p-8 rounded-xl border border-warm-200/40 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex text-gold mb-5 gap-0.5">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star key={index} className="w-4 h-4 fill-gold text-gold" />
                    ))}
                  </div>
                  <p className="text-warm-700 text-xs sm:text-sm leading-relaxed italic mb-6 font-light">
                    {testimonial.content}
                  </p>
                </div>

                <div className="flex items-center gap-4 mt-auto border-t border-warm-100 pt-4">
                  <img
                    src={testimonial.avatarUrl}
                    alt={testimonial.name}
                    referrerPolicy="no-referrer"
                    className="w-11 h-11 rounded-full object-cover border border-warm-200 shadow-sm"
                  />
                  <div className="text-left">
                    <h4 className="font-serif text-sm font-bold text-warm-900">
                      {testimonial.name}
                    </h4>
                    <p className="text-[11px] text-warm-500">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* Newsletter Signup & Book Club Circle */}
      <section className="py-20 sm:py-24 bg-white" id="inner-circle">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <div className="w-14 h-14 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <BookOpen className="w-6 h-6 text-gold" />
          </div>
          
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-warm-900 leading-tight mb-4">
            Join the Inner Circle
          </h2>
          <p className="text-warm-600 text-sm max-w-xl mx-auto leading-relaxed mb-8 font-light">
            Subscribe to receive early access to rare editions, exclusive author interviews,
            and curated reading lists delivered to your inbox each fortnight.
          </p>

          {/* Interactive signup state */}
          {isSubscribed ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-warm-100/60 p-6 rounded-lg text-center max-w-md mx-auto border border-warm-200/50"
            >
              <Check className="w-8 h-8 text-gold mx-auto mb-3" />
              <h3 className="font-serif text-lg font-semibold text-warm-900 mb-1">Welcome on board!</h3>
              <p className="text-warm-600 text-xs font-light">
                You have been enrolled in Lumière Books fortnightly correspondence. Keep watch of your mail folder.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto" id="newsletter-form">
              <input
                type="email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="Enter your personal email..."
                required
                className="flex-1 px-4 py-3.5 border border-warm-200 rounded-md focus:outline-none focus:border-gold bg-warm-50 text-warm-900 text-xs placeholder-warm-400 font-light"
                aria-label="Email address for publication correspondence"
              />
              <button
                type="submit"
                disabled={submittingNewsletter}
                className="px-6 py-3.5 bg-warm-900 hover:bg-gold text-white font-semibold rounded-md text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 whitespace-nowrap min-w-[140px] shadow-sm cursor-pointer disabled:bg-warm-400"
              >
                {submittingNewsletter ? 'Joining...' : (
                  <>
                    Join Circle <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>
          )}
          
          <p className="text-warm-450 text-[11px] text-warm-400 mt-4 italic">
            Zero spam. Unsubscribe at any preferred interval.
          </p>
        </div>
      </section>

      {/* Footer Navigation & Signature Details */}
      <footer className="bg-warm-900 text-warm-300 pt-16 pb-12 border-t border-warm-950" id="contact">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
            
            {/* Column 1: Brand Pitch */}
            <div className="col-span-1 md:col-span-4 text-left">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 border border-gold rounded-full flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-gold stroke-[1.5]" />
                </div>
                <div className="flex flex-col">
                  <span className="font-serif text-xl font-bold tracking-wide text-white">Lumière</span>
                  <span className="text-[9px] uppercase tracking-[0.3em] text-warm-400 -mt-1 font-semibold">Books</span>
                </div>
              </div>
              <p className="text-warm-400 text-xs leading-relaxed mb-6 font-light">
                Curating literary excellence since 1924. Discover original first releases, signed editions, and timeless philosophies in our boutique vaults.
              </p>
              
              {/* Custom styled vector social icons */}
              <div className="flex gap-3">
                <a
                  href="#instagram"
                  className="w-9 h-9 border border-warm-800 rounded-full flex items-center justify-center hover:border-gold hover:text-gold transition-colors text-warm-400"
                  aria-label="Instagram gallery"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="#twitter"
                  className="w-9 h-9 border border-warm-800 rounded-full flex items-center justify-center hover:border-gold hover:text-gold transition-colors text-warm-400"
                  aria-label="Twitter feeds"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Column 2: Directory */}
            <div className="col-span-1 sm:col-span-6 md:col-span-2 text-left">
              <h4 className="text-white text-xs font-semibold uppercase tracking-widest mb-5">Explore</h4>
              <ul className="space-y-3.5 text-xs font-light">
                <li>
                  <a href="#collections" className="hover:text-gold transition-colors">
                    New Arrivals
                  </a>
                </li>
                <li>
                  <a href="#bestsellers" className="hover:text-gold transition-colors">
                    Best Sellers
                  </a>
                </li>
                <li>
                  <a href="#collections" className="hover:text-gold transition-colors">
                    Rare Philosophy
                  </a>
                </li>
                <li>
                  <a href="#about" className="hover:text-gold transition-colors">
                    Centenary Heritage Guide
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Logistics Assistance */}
            <div className="col-span-1 sm:col-span-6 md:col-span-2 text-left">
              <h4 className="text-white text-xs font-semibold uppercase tracking-widest mb-5">Assistance</h4>
              <ul className="space-y-3.5 text-xs font-light">
                <li>
                  <a href="#shipping" className="hover:text-gold transition-colors">
                    Shipping & Hand-wrapping
                  </a>
                </li>
                <li>
                  <a href="#reserve" className="hover:text-gold transition-colors">
                    Bespoke Reservation policy
                  </a>
                </li>
                <li>
                  <a href="#faq" className="hover:text-gold transition-colors">
                    FAQ Directory
                  </a>
                </li>
                <li>
                  <a href="#about" className="hover:text-gold transition-colors">
                    Our curators
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 4: Contact desk */}
            <div className="col-span-1 md:col-span-4 text-left">
              <h4 className="text-white text-xs font-semibold uppercase tracking-widest mb-5">Visit Our Boutique</h4>
              <ul className="space-y-4 text-xs font-light text-warm-400">
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-gold shrink-0 mt-0.5 stroke-[1.8]" />
                  <span>
                    42 Rue de la Paix<br />75002 Paris, France
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-gold shrink-0 stroke-[1.8]" />
                  <span>+33 1 42 60 00 00</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-gold shrink-0 stroke-[1.8]" />
                  <span>concierge@lumierebooks.com</span>
                </li>
                <li className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-gold shrink-0 stroke-[1.8]" />
                  <span>Monday–Saturday: 10am – 8pm</span>
                </li>
              </ul>
            </div>

          </div>

          {/* Bottom Copyright line */}
          <div className="border-t border-warm-800/80 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-warm-500">
            <p>© 2026 Lumière Books. Curated Literary Excellence since 1924.</p>
            <div className="flex gap-5">
              <a href="#terms" className="hover:text-gold transition-colors">Terms of reservation</a>
              <a href="#privacy" className="hover:text-gold transition-colors">Privacy declaration</a>
              <a href="#cookies" className="hover:text-gold transition-colors">Cookies settings</a>
            </div>
          </div>

        </div>
      </footer>

      {/* Cart side shelf drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemove={handleRemoveFromCart}
        onClearCart={handleClearCart}
      />

      {/* Selection detail quick view modal */}
      <BookDetailModal
        book={selectedBook}
        onClose={() => setSelectedBook(null)}
        onAddToCart={handleAddToCart}
      />

    </div>
  );
}
