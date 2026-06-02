import { useState, useEffect } from 'react';
import { BookOpen, ShoppingBag, Search, Menu, X, Landmark, ArrowRight, Compass } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeCategory: string;
  onSelectCategory: (category: string) => void;
}

export default function Header({
  cartCount,
  onOpenCart,
  searchQuery,
  onSearchChange,
  activeCategory,
  onSelectCategory
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMobileNavLinkClick = (targetId: string) => {
    setIsMobileMenuOpen(false);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-warm-50/95 backdrop-blur-md shadow-md py-4'
          : 'bg-warm-50/90 backdrop-blur-sm shadow-xs py-5'
      } border-b border-warm-200/40`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Majestic Brand Logo */}
          <a href="#" className="flex items-center gap-3 group" id="brand-logo">
            <div className="w-10 h-10 border-2 border-gold rounded-full flex items-center justify-center group-hover:bg-gold transition-all duration-300">
              <BookOpen className="w-5 h-5 text-gold group-hover:text-white transition-colors duration-300 stroke-[1.8]" />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-wide text-warm-900">
                Lumière
              </span>
              <span className="text-[9px] uppercase tracking-[0.3em] text-warm-500 -mt-1 font-semibold">
                Books
              </span>
            </div>
          </a>

          {/* Desktop Fluid Navigation Menu */}
          <nav className="hidden lg:flex items-center gap-8 xl:gap-10">
            <a
              href="#collections"
              className="relative text-sm font-medium text-warm-700 hover:text-gold transition-colors tracking-wide py-1 before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-0 before:h-[1px] before:bg-gold hover:before:w-full before:transition-all before:duration-300"
            >
              Collections
            </a>
            <a
              href="#bestsellers"
              className="relative text-sm font-medium text-warm-700 hover:text-gold transition-colors tracking-wide py-1 before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-0 before:h-[1px] before:bg-gold hover:before:w-full before:transition-all before:duration-300"
            >
              Curation Catalog
            </a>
            <a
              href="#about"
              className="relative text-sm font-medium text-warm-700 hover:text-gold transition-colors tracking-wide py-1 before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-0 before:h-[1px] before:bg-gold hover:before:w-full before:transition-all before:duration-300"
            >
              Our Heritage
            </a>
            <a
              href="#testimonials"
              className="relative text-sm font-medium text-warm-700 hover:text-gold transition-colors tracking-wide py-1 before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-0 before:h-[1px] before:bg-gold hover:before:w-full before:transition-all before:duration-300"
            >
              Reviews
            </a>
            <a
              href="#contact"
              className="relative text-sm font-medium text-warm-700 hover:text-gold transition-colors tracking-wide py-1 before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-0 before:h-[1px] before:bg-gold hover:before:w-full before:transition-all before:duration-300"
            >
              Contact Boutique
            </a>
          </nav>

          {/* Right Action Items */}
          <div className="flex items-center gap-3 sm:gap-4">
            
            {/* Interactive Search toggle bar */}
            <div className="relative flex items-center">
              <AnimatePresence>
                {isSearchOpen && (
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 180, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    className="absolute right-9 mr-1"
                  >
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => onSearchChange(e.target.value)}
                      placeholder="Search title, author..."
                      className="w-full text-xs px-3 py-1.5 rounded-full border border-warm-300 focus:border-gold focus:outline-none bg-white text-warm-900"
                      autoFocus
                    />
                  </motion.div>
                )}
              </AnimatePresence>
              <button
                onClick={() => {
                  setIsSearchOpen(!isSearchOpen);
                  if (isSearchOpen && searchQuery) {
                    onSearchChange(''); // Clear query on close
                  }
                }}
                id="search-toggle-btn"
                className="p-2 text-warm-600 hover:text-gold hover:bg-warm-100/50 rounded-full transition-all duration-200"
                aria-label="Toggle search input"
              >
                <Search className="w-5 h-5 stroke-[1.8]" />
              </button>
            </div>

            {/* Shopping selection bag action */}
            <button
              onClick={onOpenCart}
              id="shopping-bag-trigger"
              className="relative p-2 text-warm-600 hover:text-gold hover:bg-warm-100/50 rounded-full transition-all duration-200"
              aria-label="Open your book bag"
            >
              <ShoppingBag className="w-5 h-5 stroke-[1.8]" />
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0.7 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-gold text-white text-[10px] rounded-full flex items-center justify-center font-bold"
                >
                  {cartCount}
                </motion.span>
              )}
            </button>

            {/* Smartphone Hamburger Trigger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              id="mobile-drawer-trigger"
              className="lg:hidden p-2 text-warm-700 hover:text-gold hover:bg-warm-100/50 rounded-full transition-colors"
              aria-label="Open directory drawer"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Floating Category Filter Bar under header when search has items or scrolled (Optional visual) */}
      {searchQuery && (
        <div className="bg-warm-100/90 border-t border-b border-warm-200/50 py-2.5 px-4 text-center text-xs text-warm-700 font-light">
          Showing curated matches for "<span className="font-semibold text-warm-900">{searchQuery}</span>"
          <button
            onClick={() => onSearchChange('')}
            className="text-gold underline hover:text-gold-dark ml-2 font-medium"
          >
            Clear Search
          </button>
        </div>
      )}

      {/* Mobile Slider Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-warm-50 border-t border-warm-200/60 overflow-hidden shadow-lg"
          >
            <div className="px-5 pt-4 pb-6 space-y-4">
              <div className="grid grid-cols-2 gap-3 pb-4 border-b border-warm-200/50">
                <button
                  onClick={() => handleMobileNavLinkClick('collections')}
                  className="text-xs font-semibold uppercase tracking-wider text-warm-500 hover:text-gold text-left p-2.5 bg-warm-100/50 rounded-lg flex items-center justify-between"
                >
                  Collections <Compass className="w-4 h-4 text-gold" />
                </button>
                <button
                  onClick={() => handleMobileNavLinkClick('bestsellers')}
                  className="text-xs font-semibold uppercase tracking-wider text-warm-500 hover:text-gold text-left p-2.5 bg-warm-100/50 rounded-lg flex items-center justify-between"
                >
                  Live Catalog <Landmark className="w-4 h-4 text-gold" />
                </button>
              </div>

              {/* Navigation Anchors list */}
              <div className="flex flex-col gap-3.5">
                <button
                  onClick={() => handleMobileNavLinkClick('collections')}
                  className="text-left text-sm font-medium text-warm-800 hover:text-gold py-1"
                >
                  Browse Curated Genres
                </button>
                <button
                  onClick={() => handleMobileNavLinkClick('bestsellers')}
                  className="text-left text-sm font-medium text-warm-800 hover:text-gold py-1"
                >
                  Season’s Best Sellers
                </button>
                <button
                  onClick={() => handleMobileNavLinkClick('about')}
                  className="text-left text-sm font-medium text-warm-800 hover:text-gold py-1"
                >
                  Our Century-Long Heritage
                </button>
                <button
                  onClick={() => handleMobileNavLinkClick('testimonials')}
                  className="text-left text-sm font-medium text-warm-800 hover:text-gold py-1"
                >
                  Reviews & Critic Essays
                </button>
                <button
                  onClick={() => handleMobileNavLinkClick('contact')}
                  className="text-left text-sm font-medium text-warm-800 hover:text-gold py-1 shadow-xs"
                >
                  Boutique Concierge & Location
                </button>
              </div>

              {/* Dynamic Instant Search on mobile */}
              <div className="pt-2">
                <label className="text-[10px] uppercase tracking-wider text-warm-400 block mb-1">
                  Instant Search Selection
                </label>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder="Type book or author name..."
                  className="w-full text-xs px-3 py-2 rounded-lg border border-warm-200 focus:border-gold focus:outline-none bg-white text-warm-900"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
