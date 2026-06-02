import { X, Star, ShoppingBag, BookOpen, Calendar, Award } from 'lucide-react';
import { Book } from '../data';
import { motion, AnimatePresence } from 'motion/react';

interface BookDetailModalProps {
  book: Book | null;
  onClose: () => void;
  onAddToCart: (book: Book) => void;
}

export default function BookDetailModal({ book, onClose, onAddToCart }: BookDetailModalProps) {
  if (!book) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto" id="book-detail-modal">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-warm-900/80 backdrop-blur-sm"
        />

        {/* Modal wrapper */}
        <div className="flex min-h-full items-center justify-center p-4 sm:p-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="relative transform overflow-hidden rounded-xl bg-warm-50 text-left shadow-2xl transition-all my-8 w-full max-w-4xl border border-warm-200/60"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              id="close-modal-button"
              className="absolute right-4 top-4 z-10 rounded-full p-2 text-warm-500 hover:text-warm-900 bg-white/80 hover:bg-white border border-warm-200/50 shadow-sm transition-all duration-200"
              aria-label="Close details"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Grid layout */}
            <div className="grid grid-cols-1 md:grid-cols-12">
              {/* Product Cover Column */}
              <div className="md:col-span-5 bg-warm-100 flex items-center justify-center p-8 relative min-h-[300px] md:min-h-[450px]">
                {book.isBestseller && (
                  <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 bg-gold text-white text-[11px] font-semibold tracking-wider uppercase shadow-sm">
                    <Award className="w-3.5 h-3.5" /> Bestseller
                  </span>
                )}
                {book.isNew && (
                  <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 bg-warm-800 text-white text-[11px] font-semibold tracking-wider uppercase shadow-sm">
                    New Release
                  </span>
                )}

                <div className="relative shadow-2xl w-48 sm:w-56 md:w-full max-w-[220px] aspect-[2/3] transform hover:scale-105 transition-transform duration-300">
                  <img
                    src={book.coverUrl}
                    alt={book.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover rounded-md"
                  />
                  <div className="absolute inset-0 rounded-md shadow-inner pointer-events-none" />
                </div>
              </div>

              {/* Product Information Column */}
              <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <span className="text-gold text-xs font-semibold tracking-widest uppercase block mb-1">
                    {book.category}
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold text-warm-900 leading-tight mb-1">
                    {book.title}
                  </h2>
                  <p className="text-warm-600 text-base font-medium mb-4">
                    by <span className="text-warm-900">{book.author}</span>
                  </p>

                  {/* Rating & Metadata */}
                  <div className="flex flex-wrap items-center gap-4 border-b border-warm-200 pb-4 mb-4">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star
                          key={index}
                          className={`w-4 h-4 ${
                            index < Math.floor(book.rating)
                              ? 'text-gold fill-gold'
                              : 'text-warm-300'
                          }`}
                        />
                      ))}
                      <span className="text-xs font-semibold text-warm-800 ml-1">
                        ({book.rating.toFixed(1)})
                      </span>
                    </div>
                    <span className="text-warm-300">|</span>
                    <span className="text-xs text-warm-600 font-medium">
                      Pages: <strong className="text-warm-900">{book.pages}</strong>
                    </span>
                    <span className="text-warm-300">|</span>
                    <span className="text-xs text-warm-600 font-medium">
                      Year: <strong className="text-warm-900">{book.year}</strong>
                    </span>
                  </div>

                  {/* Descriptions */}
                  <p className="text-warm-800 text-sm font-medium mb-3 italic">
                    {book.description}
                  </p>
                  <p className="text-warm-600 text-sm leading-relaxed mb-6 font-light">
                    {book.longDescription}
                  </p>

                  {/* Book Metadata Sheet */}
                  <div className="bg-warm-100/50 rounded-lg p-4 grid grid-cols-2 gap-y-3 gap-x-6 text-left mb-6 border border-warm-200/50">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-warm-400 block">Publisher</span>
                      <span className="text-xs text-warm-800 font-medium">{book.publisher}</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-warm-400 block">Format</span>
                      <span className="text-xs text-warm-800 font-medium">Hardcover Collector’s Edition</span>
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-4 border-t border-warm-200 pt-5 mt-auto">
                  <div className="text-left w-full sm:w-auto">
                    <span className="text-xs text-warm-400 block font-light uppercase">Inaugural Price</span>
                    <span className="text-2xl font-bold text-gold">${book.price.toFixed(2)}</span>
                  </div>
                  <button
                    onClick={() => onAddToCart(book)}
                    id={`modal-add-to-cart-${book.id}`}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-gold hover:bg-gold-dark text-white rounded-md font-medium text-xs uppercase tracking-wider shadow-md transition-all duration-200"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Secure In Store
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}
