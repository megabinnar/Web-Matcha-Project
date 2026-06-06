import React, { useState, useEffect } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Menu, X, Instagram, Twitter, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SiInstagram, SiX, SiTiktok, SiWhatsapp } from "react-icons/si";

// Mock @assets imports (assuming vite resolves this or we provide correct paths)
// Actually, I'll use standard relative or absolute paths based on typical setups.
// To be safe and since @assets is explicitly requested:
import heroImg from "@assets/hero-matcha.png";
import product1Img from "@assets/product-1.png";
import product2Img from "@assets/product-2.png";
import product3Img from "@assets/product-3.png";
import product4Img from "@assets/product-4.png";
import product5Img from "@assets/product-5.png";
import product6Img from "@assets/product-6.png";
import cat1Img from "@assets/category-1.png";
import cat2Img from "@assets/category-2.png";
import cat3Img from "@assets/category-3.png";
import cat4Img from "@assets/product-6.png"; // Fallback as image generation limit reached

const queryClient = new QueryClient();

// Types
type CartItem = {
  id: string;
  name: string;
  price: number;
  qty: number;
};

// Data
const PRODUCTS = [
  { id: "1", name: "Ceremonial Matcha Premium", price: 120000, desc: "Pure ceremonial grade A matcha from Uji, Kyoto. Perfect for traditional preparation.", img: product1Img },
  { id: "2", name: "Matcha Latte Blend", price: 85000, desc: "Smooth, creamy blend of culinary-grade matcha perfect for lattes and daily drinks.", img: product2Img },
  { id: "3", name: "Sakura Matcha Limited", price: 145000, desc: "Seasonal blend with subtle cherry blossom notes. A unique tea experience.", img: product3Img },
  { id: "4", name: "Organic Everyday Matcha", price: 95000, desc: "USDA certified organic matcha for your daily ritual. Mild and balanced.", img: product4Img },
  { id: "5", name: "Hojicha Matcha Blend", price: 105000, desc: "A unique fusion of roasted hojicha and premium matcha. Rich and warming.", img: product5Img },
  { id: "6", name: "Matcha Starter Kit", price: 280000, desc: "Everything you need: ceremonial matcha, chawan bowl, and bamboo whisk.", img: product6Img },
];

const CATEGORIES = [
  { id: "c1", name: "Ceremonial Matcha", desc: "The purest form", img: cat1Img },
  { id: "c2", name: "Matcha Latte", desc: "Creamy daily rituals", img: cat2Img },
  { id: "c3", name: "Matcha Desserts", desc: "Sweet indulgences", img: cat3Img },
  { id: "c4", name: "Tools & Accessories", desc: "Craft your ceremony", img: cat4Img },
];

const TESTIMONIALS = [
  { id: "t1", quote: "Uma Matcha completely changed how I start my mornings. The ceremonial grade is unlike anything I've tasted outside Japan.", author: "Anisa R., Jakarta", initial: "A", color: "bg-primary" },
  { id: "t2", quote: "The latte blend is my go-to. Perfectly balanced, not bitter at all. Fast delivery too!", author: "Budi S., Surabaya", initial: "B", color: "bg-accent" },
  { id: "t3", quote: "I gifted the starter kit to my sister and she loved it. Beautiful packaging, premium quality.", author: "Dinda P., Bali", initial: "D", color: "bg-primary/80" },
];

// Formatting
const formatPrice = (price: number) => {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(price).replace("Rp", "Rp ");
};

function Home() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const addToCart = (product: typeof PRODUCTS[0]) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) => (item.id === product.id ? { ...item, qty: item.qty + 1 } : item));
      }
      return [...prev, { id: product.id, name: product.name, price: product.price, qty: 1 }];
    });
  };

  const cartItemCount = cart.reduce((acc, item) => acc + item.qty, 0);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-background font-sans text-foreground overflow-x-hidden">
      {/* HEADER */}
      <header className={`fixed top-0 w-full z-50 transition-colors duration-300 ${isScrolled ? "bg-background/95 backdrop-blur-sm border-b border-border shadow-sm" : "bg-transparent"}`}>
        <div className="container mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className={isScrolled ? "text-foreground" : "text-white"} /> : <Menu className={isScrolled ? "text-foreground" : "text-white"} />}
            </button>
            <div className={`font-serif text-2xl font-semibold tracking-wide ${isScrolled ? "text-primary" : "text-white"}`}>
              Uma Matcha
            </div>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollTo("hero")} className={`text-sm font-medium hover:text-primary transition-colors ${isScrolled ? "text-foreground" : "text-white"}`}>Home</button>
            <button onClick={() => scrollTo("menu")} className={`text-sm font-medium hover:text-primary transition-colors ${isScrolled ? "text-foreground" : "text-white"}`}>Menu</button>
            <button onClick={() => scrollTo("about")} className={`text-sm font-medium hover:text-primary transition-colors ${isScrolled ? "text-foreground" : "text-white"}`}>About</button>
            <button onClick={() => scrollTo("footer")} className={`text-sm font-medium hover:text-primary transition-colors ${isScrolled ? "text-foreground" : "text-white"}`}>Contact</button>
          </nav>

          <div className="flex items-center">
            <button className={`relative p-2 hover:bg-black/5 rounded-full transition-colors ${isScrolled ? "text-foreground" : "text-white"}`}>
              <ShoppingCart className="w-6 h-6" />
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 bg-primary text-primary-foreground text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-background pt-24 px-4 flex flex-col gap-6 md:hidden"
          >
            <button onClick={() => scrollTo("hero")} className="text-xl font-serif text-foreground text-left py-2 border-b border-border">Home</button>
            <button onClick={() => scrollTo("menu")} className="text-xl font-serif text-foreground text-left py-2 border-b border-border">Menu</button>
            <button onClick={() => scrollTo("about")} className="text-xl font-serif text-foreground text-left py-2 border-b border-border">About</button>
            <button onClick={() => scrollTo("footer")} className="text-xl font-serif text-foreground text-left py-2 border-b border-border">Contact</button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION */}
      <section id="hero" className="relative w-full h-[100dvh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={heroImg} alt="Matcha preparation" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto mt-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="font-serif text-5xl md:text-7xl lg:text-8xl text-white font-medium italic mb-6 leading-tight"
          >
            Authentic Japanese Matcha<br />for Your Daily Ritual
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-lg md:text-xl text-white/80 font-light mb-10 max-w-xl mx-auto"
          >
            Premium ceremonial and latte-grade matcha sourced directly from Japan.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Button 
              onClick={() => scrollTo("menu")}
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 py-6 text-lg tracking-wide shadow-lg"
            >
              Shop Now
            </Button>
          </motion.div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section id="menu" className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-8">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif text-center mb-16 text-foreground"
          >
            Featured Products
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PRODUCTS.map((product, i) => (
              <motion.div 
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group bg-card rounded-2xl border border-card-border overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className="aspect-[4/3] overflow-hidden bg-muted">
                  <img src={product.img} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-6">
                  <div className="flex text-yellow-500 mb-3 text-sm">
                    ★★★★★
                  </div>
                  <h3 className="font-bold text-xl mb-2 text-foreground">{product.name}</h3>
                  <p className="text-muted-foreground text-sm line-clamp-2 mb-6 h-10">
                    {product.desc}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-lg text-primary">{formatPrice(product.price)}</span>
                    <Button 
                      variant="outline" 
                      onClick={() => addToCart(product)}
                      className="border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-full px-6 transition-colors"
                    >
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section id="about" className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 md:px-8">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif text-center mb-16 text-foreground"
          >
            Shop by Category
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CATEGORIES.map((cat, i) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative aspect-[4/5] rounded-2xl overflow-hidden cursor-pointer"
              >
                <img src={cat.img} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
                
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <h3 className="text-white font-serif text-2xl font-medium mb-1">{cat.name}</h3>
                  <p className="text-white/80 text-sm mb-4 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    {cat.desc}
                  </p>
                  <Button variant="outline" className="w-fit border-white/50 text-white hover:bg-white hover:text-black rounded-full backdrop-blur-sm transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-100">
                    View
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-8">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif text-center mb-16 text-foreground"
          >
            What Our Customers Say
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((test, i) => (
              <motion.div
                key={test.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card p-8 rounded-2xl border border-card-border shadow-sm flex flex-col"
              >
                <div className="flex text-yellow-500 mb-6 text-sm">
                  ★★★★★
                </div>
                <p className="text-lg text-foreground italic font-serif flex-grow mb-8">
                  "{test.quote}"
                </p>
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full ${test.color} flex items-center justify-center text-white font-bold text-lg`}>
                    {test.initial}
                  </div>
                  <span className="font-medium text-foreground">{test.author}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="footer" className="bg-foreground text-background py-20">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-24 mb-16">
            <div className="flex flex-col gap-6">
              <h3 className="font-serif text-3xl font-semibold text-primary-foreground">Uma Matcha</h3>
              <p className="text-background/70 leading-relaxed max-w-sm">
                Crafted with calm, inspired by Japan.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors text-white">
                  <SiInstagram className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors text-white">
                  <SiX className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors text-white">
                  <SiTiktok className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-6">Quick Links</h4>
              <ul className="space-y-4">
                <li><button onClick={() => scrollTo("hero")} className="text-background/70 hover:text-white transition-colors">Home</button></li>
                <li><button onClick={() => scrollTo("menu")} className="text-background/70 hover:text-white transition-colors">Menu</button></li>
                <li><button onClick={() => scrollTo("about")} className="text-background/70 hover:text-white transition-colors">About</button></li>
                <li><button onClick={() => scrollTo("footer")} className="text-background/70 hover:text-white transition-colors">Contact</button></li>
                <li><a href="#" className="text-background/70 hover:text-white transition-colors">FAQ</a></li>
                <li><a href="#" className="text-background/70 hover:text-white transition-colors">Shipping</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-6">Stay Updated</h4>
              <p className="text-background/70 mb-4">Subscribe to our newsletter for exclusive offers and matcha recipes.</p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 flex-grow focus:outline-none focus:border-primary text-white"
                />
                <Button className="bg-primary hover:bg-primary/90 text-white">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-background/50">
            <p>© 2025 Uma Matcha. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <motion.a
        href="https://wa.me/6287655712?text=Halo%20Uma%20Matcha%2C%20saya%20ingin%20bertanya%20tentang%20produk%20matcha%20Anda"
        target="_blank"
        rel="noopener noreferrer"
        data-testid="button-whatsapp-float"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#25D366] text-white rounded-full shadow-2xl overflow-hidden group"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.2, type: "spring", stiffness: 200 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="flex items-center justify-center w-14 h-14 shrink-0">
          <SiWhatsapp size={26} />
        </span>
        <span className="max-w-0 group-hover:max-w-xs transition-all duration-500 ease-in-out overflow-hidden whitespace-nowrap pr-0 group-hover:pr-5 text-sm font-semibold">
          Chat with Us
        </span>

        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full animate-ping bg-[#25D366] opacity-30 pointer-events-none" />
      </motion.a>
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

// Fallback for missing NotFound component in App.tsx
function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-serif mb-4">404</h1>
        <p className="text-muted-foreground">Page not found</p>
      </div>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL?.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
