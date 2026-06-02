import { X, Minus, Plus, Trash2, ShoppingBag, ArrowRight, ShieldCheck, CheckCircle } from 'lucide-react';
import { Book } from '../data';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

interface CartItem {
  book: Book;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (bookId: string, delta: number) => void;
  onRemove: (bookId: string) => void;
  onClearCart: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemove,
  onClearCart
}: CartDrawerProps) {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutComplete, setCheckoutComplete] = useState(false);

  const subtotal = cartItems.reduce((acc, item) => acc + item.book.price * item.quantity, 0);
  const taxRate = 0.05; // 5% literary VAT
  const estimatedTax = subtotal * taxRate;
  const total = subtotal + estimatedTax;

  const handleCheckout = () => {
    setIsCheckingOut(true);
    // Simulate luxury concierge processing
    setTimeout(() => {
      setIsCheckingOut(false);
      setCheckoutComplete(true);
    }, 1800);
  };

  const handleResetCheckoutState = () => {
    setCheckoutComplete(false);
    onClearCart();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden" id="cart-drawer-container">
          <div className="absolute inset-0 overflow-hidden">
            {/* Backdrop over main pages */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="absolute inset-0 bg-warm-900/60 backdrop-blur-xs transition-opacity"
            />

            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-0 sm:pl-10">
              {/* Sliding Card Container */}
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 220 }}
                className="pointer-events-auto w-screen max-w-md"
              >
                <div className="flex h-full flex-col bg-warm-50 shadow-2xl border-l border-warm-200/50">
                  {/* Header */}
                  <div className="flex items-center justify-between border-b border-warm-200 p-6">
                    <div className="flex items-center gap-2">
                      <ShoppingBag className="h-5 w-5 text-gold" />
                      <h2 className="font-serif text-xl font-semibold text-warm-900">Your Selection</h2>
                      <span className="bg-warm-100 text-warm-700 text-xs px-2 py-0.5 rounded-full font-medium sm:inline">
                        {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                      </span>
                    </div>
                    <button
                      onClick={onClose}
                      id="close-cart-btn"
                      className="rounded-full p-1.5 text-warm-400 hover:text-warm-900 hover:bg-warm-100 transition-colors"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  {/* Body Content */}
                  <div className="flex-1 overflow-y-auto px-6 py-6 scrollbar">
                    {checkoutComplete ? (
                      /* Checkout Success State */
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center justify-center text-center h-full py-12"
                      >
                        <CheckCircle className="h-16 w-16 text-gold mb-6 stroke-[1.5]" />
                        <h3 className="font-serif text-2xl font-semibold text-warm-900 mb-3">Order Reserved</h3>
                        <p className="text-warm-600 text-sm leading-relaxed max-w-xs mb-8">
                          Your literary masterpieces have been curated. Our concierge will prepare them for your pickup at <span className="font-medium text-warm-900">42 Rue de la Paix, Paris</span>.
                        </p>
                        <div className="bg-warm-100/60 rounded-lg p-4 text-left w-full border border-warm-200/40 text-xs text-warm-700 font-light space-y-2 mb-8">
                          <p><strong>Reservation Code:</strong> LM-{(Math.random() * 100000).toFixed(0)}</p>
                          <p><strong>Estimated Time:</strong> Ready in 45 minutes</p>
                          <p><strong>Collection Desk:</strong> Fine editions checkout counter</p>
                        </div>
                        <button
                          onClick={handleResetCheckoutState}
                          className="w-full py-3 bg-gold hover:bg-gold-dark text-white rounded-md text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm"
                        >
                          Continue Journeys
                        </button>
                      </motion.div>
                    ) : cartItems.length === 0 ? (
                      /* Empty Selection State */
                      <div className="flex flex-col items-center justify-center h-full py-12 text-center text-warm-500">
                        <div className="w-16 h-16 border border-warm-300 rounded-full flex items-center justify-center mb-4 bg-white">
                          <ShoppingBag className="h-6 w-6 text-warm-400 stroke-[1.5]" />
                        </div>
                        <p className="font-serif text-lg text-warm-800 mb-2 font-medium">Your bag is empty</p>
                        <p className="text-warm-500 text-xs max-w-xs mx-auto leading-relaxed mb-6">
                          Explore our century-long collection of rare editions, philosophy masterpieces, and contemporary fiction.
                        </p>
                        <button
                          onClick={onClose}
                          className="px-6 py-2.5 border border-gold text-gold hover:bg-gold hover:text-white rounded-md text-xs font-semibold uppercase tracking-widest transition-all duration-300"
                        >
                          Return to Catalog
                        </button>
                      </div>
                    ) : (
                      /* Shopping Cart Items List */
                      <div className="space-y-6">
                        {cartItems.map((item) => (
                          <div key={item.book.id} className="flex gap-4 border-b border-warm-200 pb-6 last:border-none">
                            {/* Image cover preview */}
                            <div className="h-24 w-16 flex-shrink-0 overflow-hidden bg-warm-100 rounded border border-warm-200">
                              <img
                                src={item.book.coverUrl}
                                alt={item.book.title}
                                referrerPolicy="no-referrer"
                                className="h-full w-full object-cover"
                              />
                            </div>

                            {/* Book Title & details */}
                            <div className="flex flex-1 flex-col justify-between">
                              <div>
                                <div className="flex justify-between items-start gap-2">
                                  <h3 className="font-serif text-sm font-semibold text-warm-900 group-hover:text-gold transition-colors line-clamp-2">
                                    {item.book.title}
                                  </h3>
                                  <button
                                    onClick={() => onRemove(item.book.id)}
                                    id={`remove-[${item.book.id}]`}
                                    className="text-warm-400 hover:text-red-600 p-0.5"
                                    title="Exclude selection"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </button>
                                </div>
                                <p className="text-warm-500 text-xs mt-0.5">by {item.book.author}</p>
                              </div>

                              <div className="flex items-center justify-between mt-2">
                                {/* Quantity Toggles */}
                                <div className="flex items-center border border-warm-300 rounded-full bg-white px-2 py-0.5">
                                  <button
                                    onClick={() => onUpdateQuantity(item.book.id, -1)}
                                    id={`decrease-[${item.book.id}]`}
                                    className="p-1 text-warm-500 hover:text-warm-950 transition-colors"
                                    disabled={item.quantity <= 1}
                                  >
                                    <Minus className="h-3 w-3" />
                                  </button>
                                  <span className="text-xs font-medium text-warm-900 px-2.5 min-w-[20px] text-center">
                                    {item.quantity}
                                  </span>
                                  <button
                                    onClick={() => onUpdateQuantity(item.book.id, 1)}
                                    id={`increase-[${item.book.id}]`}
                                    className="p-1 text-warm-500 hover:text-warm-950 transition-colors"
                                  >
                                    <Plus className="h-3 w-3" />
                                  </button>
                                </div>

                                {/* Pricing */}
                                <span className="text-sm font-semibold text-gold">
                                  ${(item.book.price * item.quantity).toFixed(2)}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Footer calculations & checkout */}
                  {!checkoutComplete && cartItems.length > 0 && (
                    <div className="border-t border-warm-200 bg-white p-6">
                      <div className="space-y-2.5 text-sm pb-5">
                        <div className="flex justify-between text-warm-600 font-light">
                          <span>Subtotal</span>
                          <span className="font-semibold text-warm-900">${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-warm-600 font-light text-xs">
                          <span className="flex items-center gap-1">Est. Literary Tax (5%)</span>
                          <span className="font-medium text-warm-900">${estimatedTax.toFixed(2)}</span>
                        </div>
                        <div className="border-t border-warm-100 my-2 pt-2 flex justify-between text-warm-900 font-serif text-base font-semibold">
                          <span>Grand Total</span>
                          <span className="text-lg text-gold">${total.toFixed(2)}</span>
                        </div>
                      </div>

                      {/* Security declaration */}
                      <div className="flex items-start gap-2.5 p-3 rounded bg-warm-50 border border-warm-200/50 mb-4 text-[11px] text-warm-600 leading-normal">
                        <ShieldCheck className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                        <span>This serves as a priority reservation sheet. Pay on collection in our physical boutique lounge.</span>
                      </div>

                      {/* Checkout triggering button */}
                      <button
                        onClick={handleCheckout}
                        disabled={isCheckingOut}
                        className="w-full flex items-center justify-center gap-2 py-3.5 bg-warm-900 hover:bg-gold text-white font-semibold rounded-md text-xs uppercase tracking-wider transition-all duration-300 shadow-md group disabled:bg-warm-400"
                      >
                        {isCheckingOut ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Preparing Curator Collection...
                          </>
                        ) : (
                          <>
                            Submit Priority Reservation
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
