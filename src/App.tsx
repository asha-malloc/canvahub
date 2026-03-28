/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform } from "motion/react";
import { 
  TrendingUp, 
  BookOpen, 
  Download, 
  PlayCircle, 
  ChevronRight, 
  ExternalLink,
  Menu,
  X,
  Sparkles,
  ArrowRight,
  Zap,
  Layers,
  Palette,
  Copy,
  RefreshCcw,
  Check
} from "lucide-react";
import React, { useState, useRef } from "react";

const Section = ({ children, className, id }: { children: React.ReactNode, className?: string, id?: string }) => (
  <motion.section
    id={id}
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    className={className}
  >
    {children}
  </motion.section>
);

const FeatureCard = ({ icon: Icon, title, description, gradient, delay }: { 
  icon: any, 
  title: string, 
  description: string, 
  gradient: string,
  delay: number
}) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    whileHover={{ y: -12, scale: 1.03 }}
    className={`p-8 rounded-[2.5rem] shadow-2xl text-white ${gradient} flex flex-col items-start text-left group cursor-pointer relative overflow-hidden transition-shadow hover:shadow-indigo-200/50`}
  >
    <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
    
    <div className="bg-white/20 p-4 rounded-2xl mb-6 backdrop-blur-sm group-hover:bg-white/30 transition-colors">
      <Icon className="w-8 h-8" />
    </div>
    <h3 className="text-2xl font-bold mb-3 tracking-tight">{title}</h3>
    <p className="text-base text-white/80 leading-relaxed mb-6">{description}</p>
    
    <div className="mt-auto flex items-center gap-2 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0 duration-300">
      Learn more <ArrowRight className="w-4 h-4" />
    </div>
  </motion.div>
);

const ResourceCard = ({ logo, name, description, delay }: { 
  logo: string, 
  name: string, 
  description: string,
  delay: number
}) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    whileHover={{ y: -8, scale: 1.02 }}
    className="bg-white rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex flex-col items-center text-center group transition-all hover:shadow-[0_20px_50px_rgba(99,102,241,0.12)]"
  >
    <div className="h-16 flex items-center justify-center mb-6 grayscale group-hover:grayscale-0 transition-all duration-500">
      <img src={logo} alt={name} className="h-10 object-contain" referrerPolicy="no-referrer" />
      <span className="ml-3 text-2xl font-black text-slate-800 tracking-tighter">{name}</span>
    </div>
    <p className="text-slate-500 text-sm mb-8 leading-relaxed">{description}</p>
    <button className="w-full py-4 px-6 bg-slate-50 hover:bg-indigo-600 text-slate-600 hover:text-white rounded-2xl transition-all duration-300 text-sm font-bold flex items-center justify-center gap-2 border border-slate-100 hover:border-indigo-600 hover:scale-[1.02] active:scale-[0.98]">
      Explore <ExternalLink className="w-4 h-4" />
    </button>
  </motion.div>
);

const TutorialCard = ({ image, title, category, delay }: { image: string, title: string, category: string, delay: number }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
    whileHover={{ y: -15, scale: 1.02 }}
    className="bg-white rounded-[2.5rem] shadow-[0_10px_40px_rgba(0,0,0,0.03)] overflow-hidden border border-slate-100 group cursor-pointer hover:shadow-indigo-100/50 transition-shadow"
  >
    <div className="aspect-[16/10] overflow-hidden relative">
      <img 
        src={image} 
        alt={title} 
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out" 
        referrerPolicy="no-referrer"
      />
      <div className="absolute top-6 left-6">
        <span className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest text-indigo-600 shadow-sm">
          {category}
        </span>
      </div>
    </div>
    <div className="p-8">
      <h4 className="text-xl font-bold text-slate-900 leading-snug mb-4 group-hover:text-indigo-600 transition-colors">{title}</h4>
      <div className="flex items-center gap-2 text-sm font-bold text-slate-400">
        <span>12 min read</span>
        <span className="w-1 h-1 bg-slate-200 rounded-full" />
        <span>Beginner</span>
      </div>
    </div>
  </motion.div>
);

const ColorPaletteGenerator = () => {
  const [colors, setColors] = useState(["#6366f1", "#ec4899", "#f59e0b", "#10b981", "#3b82f6"]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const generatePalette = () => {
    const newColors = Array.from({ length: 5 }, () => 
      `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`
    );
    setColors(newColors);
    setCopiedIndex(null);
  };

  const copyToClipboard = (color: string, index: number) => {
    navigator.clipboard.writeText(color);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="bg-white rounded-[3rem] p-8 sm:p-12 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-slate-100">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-8 mb-12">
        <div className="text-center sm:text-left">
          <h3 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">Instant Inspiration</h3>
          <p className="text-slate-500 font-medium">Generate unique color palettes for your next Canva project.</p>
        </div>
        <button 
          onClick={generatePalette}
          className="flex items-center gap-3 bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 active:scale-95"
        >
          <RefreshCcw className="w-5 h-5" /> Generate New
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 h-[400px] sm:h-[250px]">
        {colors.map((color, index) => (
          <motion.div 
            key={index}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className="relative group rounded-3xl overflow-hidden cursor-pointer h-full"
            onClick={() => copyToClipboard(color, index)}
          >
            <div 
              className="w-full h-full transition-transform duration-500 group-hover:scale-110"
              style={{ backgroundColor: color }}
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 backdrop-blur-[2px]">
              <div className="bg-white/90 p-3 rounded-xl shadow-lg mb-2">
                {copiedIndex === index ? <Check className="w-5 h-5 text-green-600" /> : <Copy className="w-5 h-5 text-slate-900" />}
              </div>
              <span className="text-white font-black text-sm tracking-wider drop-shadow-md">{color.toUpperCase()}</span>
            </div>
            <div className="absolute bottom-4 left-4 sm:hidden flex items-center gap-2">
               <span className="bg-white/90 px-3 py-1 rounded-full text-[10px] font-black text-slate-900 shadow-sm">{color.toUpperCase()}</span>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-10 text-center">
        <p className="text-xs font-black text-slate-300 uppercase tracking-[0.2em]">Click any color to copy hex code</p>
      </div>
    </div>
  );
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 45]);

  return (
    <div className="min-h-screen flex flex-col selection:bg-indigo-100 selection:text-indigo-900">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-xl sticky top-0 z-50 py-4 sm:py-5 px-4 sm:px-8 border-b border-slate-100 transition-all duration-300">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3 group cursor-pointer"
          >
            <div className="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200 group-hover:rotate-12 transition-transform">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-black tracking-tighter text-slate-900">CANVA HUB</span>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-10">
            {["Trending", "Tools", "Resources", "Tutorials", "Templates"].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                className="text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all group-hover:w-full" />
              </a>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <button className="text-sm font-bold text-slate-900 px-6 py-2 hover:text-indigo-600 transition-colors">Sign In</button>
            <button className="bg-indigo-600 text-white px-8 py-3.5 rounded-2xl text-sm font-bold shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all hover:-translate-y-1 hover:shadow-indigo-200 active:scale-95">
              Join Hub
            </button>
          </div>

          <button className="lg:hidden p-2 text-slate-900" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:hidden absolute top-full left-0 w-full bg-white border-b border-slate-100 p-8 flex flex-col gap-6 shadow-2xl"
          >
            {["Trending", "Tools", "Resources", "Tutorials", "Templates"].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                className="text-xl font-bold text-slate-900"
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </a>
            ))}
            <button className="bg-indigo-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-indigo-100">Get Started</button>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative overflow-hidden bg-white pt-16 pb-32 sm:pt-24 sm:pb-48 px-4 sm:px-8">
        {/* Animated Background Accents */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
          <motion.div 
            style={{ y: y1 }}
            className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-50 rounded-full blur-[120px] opacity-60" 
          />
          <motion.div 
            style={{ y: y2 }}
            className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-pink-50 rounded-full blur-[120px] opacity-60" 
          />
        </div>

        {/* Floating Shapes */}
        <motion.div 
          animate={{ y: [0, -30, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-40 left-[5%] w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 hidden xl:flex"
        >
          <Zap className="w-6 h-6" />
        </motion.div>
        <motion.div 
          animate={{ y: [0, 40, 0], rotate: [0, -15, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-40 right-[5%] w-16 h-16 bg-pink-100 rounded-2xl flex items-center justify-center text-pink-600 hidden xl:flex"
        >
          <Palette className="w-8 h-8" />
        </motion.div>
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute top-20 right-[20%] w-4 h-4 bg-amber-400 rounded-full hidden xl:block"
        />
        
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-600 px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-widest mb-10 shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5" /> New 2026 Masterclass
            </motion.div>
            <h1 className="text-4xl sm:text-6xl lg:text-[6rem] font-black text-slate-900 mb-8 sm:mb-10 leading-[1.1] sm:leading-[0.95] tracking-tighter text-balance">
              Master Canva <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500">Like a Pro.</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-500 mb-10 sm:mb-14 leading-relaxed max-w-lg">
              The world's most comprehensive resource hub for designers and creators looking to dominate visual storytelling.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5">
              <button className="w-full sm:w-auto bg-indigo-600 text-white px-8 sm:px-12 py-4 sm:py-6 rounded-2xl sm:rounded-[1.8rem] text-base sm:text-lg font-bold shadow-2xl shadow-indigo-200 hover:bg-indigo-700 transition-all hover:-translate-y-1.5 hover:shadow-indigo-300 flex items-center justify-center gap-3 group active:scale-95">
                Start Learning <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="w-full sm:w-auto bg-white text-slate-900 border border-slate-200 px-8 sm:px-12 py-4 sm:py-6 rounded-2xl sm:rounded-[1.8rem] text-base sm:text-lg font-bold hover:bg-slate-50 transition-all hover:border-slate-300 hover:-translate-y-1 active:scale-95">
                View Templates
              </button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <motion.div 
              style={{ rotate }}
              className="relative z-10 p-5 bg-white rounded-[3.5rem] shadow-[0_60px_120px_-20px_rgba(0,0,0,0.18)] border border-slate-100"
            >
              <img 
                src="https://picsum.photos/seed/canva-premium-v2/1200/800" 
                alt="Canva Interface" 
                className="rounded-[2.5rem] w-full"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            
            {/* Floating UI Elements */}
            <motion.div 
              animate={{ y: [0, -25, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-12 -right-12 glass-card p-7 rounded-[2rem] z-20 hidden md:block shadow-2xl"
            >
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 bg-indigo-100 rounded-2xl flex items-center justify-center">
                  <TrendingUp className="w-7 h-7 text-indigo-600" />
                </div>
                <div>
                  <div className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Growth</div>
                  <div className="text-xl font-bold text-slate-900">+124%</div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              animate={{ y: [0, 25, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-12 -left-12 glass-card p-7 rounded-[2rem] z-20 hidden md:block shadow-2xl"
            >
              <div className="flex items-center gap-5">
                <div className="flex -space-x-4">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="w-12 h-12 rounded-full border-4 border-white overflow-hidden shadow-sm">
                      <img src={`https://i.pravatar.cc/100?img=${i+20}`} alt="User" />
                    </div>
                  ))}
                </div>
                <div className="text-base font-bold text-slate-900">15k+ Students</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Feature Cards Section */}
      <div id="trending" className="max-w-7xl mx-auto px-4 sm:px-8 -mt-16 sm:-mt-28 relative z-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-10">
        <FeatureCard 
          icon={TrendingUp} 
          title="Trending" 
          description="Stay ahead with the latest design movements and color trends." 
          gradient="bg-gradient-to-br from-indigo-600 to-indigo-800"
          delay={0.1}
        />
        <FeatureCard 
          icon={BookOpen} 
          title="Guides" 
          description="Deep dives into every Canva feature, from basic to advanced." 
          gradient="bg-gradient-to-br from-pink-500 to-rose-600"
          delay={0.2}
        />
        <FeatureCard 
          icon={Download} 
          title="Resources" 
          description="Curated list of premium assets, icons, and stock libraries." 
          gradient="bg-gradient-to-br from-amber-400 to-orange-600"
          delay={0.3}
        />
        <FeatureCard 
          icon={PlayCircle} 
          title="Tutorials" 
          description="Bite-sized video lessons designed for rapid skill growth." 
          gradient="bg-gradient-to-br from-slate-800 to-slate-950"
          delay={0.4}
        />
      </div>

      {/* Resources Section */}
      <Section id="resources" className="max-w-7xl mx-auto px-4 sm:px-8 py-24 sm:py-40 w-full">
        <div className="text-center mb-16 sm:mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-6xl font-black text-slate-900 mb-6 sm:mb-8 tracking-tight"
          >
            Premium Asset Libraries
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg sm:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed"
          >
            The best free and premium stock photos, vectors, and videos to elevate your Canva projects.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          <ResourceCard 
            logo="https://www.vectorlogo.zone/logos/pexels/pexels-icon.svg"
            name="Pexels"
            description="High-quality free photos for any project."
            delay={0.1}
          />
          <ResourceCard 
            logo="https://www.vectorlogo.zone/logos/unsplash/unsplash-icon.svg"
            name="Unsplash"
            description="The internet's source for visuals."
            delay={0.2}
          />
          <ResourceCard 
            logo="https://www.vectorlogo.zone/logos/pixabay/pixabay-icon.svg"
            name="Pixabay"
            description="Stunning free images & royalty free stock."
            delay={0.3}
          />
          <ResourceCard 
            logo="https://www.vectorlogo.zone/logos/freepik/freepik-icon.svg"
            name="Freepik"
            description="High-quality photos, vectors and PSD."
            delay={0.4}
          />
        </div>
      </Section>

      {/* Tutorials Section */}
      <Section id="tutorials" className="bg-slate-50/50 py-24 sm:py-40 px-4 sm:px-8 border-y border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 sm:gap-10 mb-16 sm:mb-24">
            <div className="max-w-2xl">
              <h2 className="text-3xl sm:text-4xl lg:text-6xl font-black text-slate-900 mb-6 sm:mb-8 tracking-tight">Latest Masterclasses</h2>
              <p className="text-lg sm:text-xl text-slate-500 leading-relaxed">Step-by-step guides from industry experts to help you master the art of design.</p>
            </div>
            <motion.button 
              whileHover={{ scale: 1.05, x: 5 }}
              whileActive={{ scale: 0.95 }}
              className="w-full sm:w-auto bg-white text-slate-900 border border-slate-200 px-8 sm:px-10 py-4 sm:py-5 rounded-2xl font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-3 shadow-sm"
            >
              All Tutorials <ArrowRight className="w-5 h-5" />
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-32">
            <TutorialCard 
              image="https://picsum.photos/seed/insta-v3/800/600"
              title="Creating High-Conversion Instagram Content"
              category="Social Media"
              delay={0.1}
            />
            <TutorialCard 
              image="https://picsum.photos/seed/ai-v3/800/600"
              title="Leveraging Magic Studio for AI Design"
              category="AI Tools"
              delay={0.2}
            />
            <TutorialCard 
              image="https://picsum.photos/seed/poster-v3/800/600"
              title="Advanced Typography & Layout Principles"
              category="Graphic Design"
              delay={0.3}
            />
          </div>

          <ColorPaletteGenerator />
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="py-24 sm:py-40 px-4 sm:px-8">
        <motion.div 
          whileHover={{ scale: 1.01 }}
          className="max-w-6xl mx-auto bg-premium-gradient rounded-[2.5rem] sm:rounded-[4rem] p-8 sm:p-16 md:p-32 text-center text-white relative overflow-hidden shadow-[0_50px_100px_-20px_rgba(99,102,241,0.3)]"
        >
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
          <div className="relative z-10">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-3xl sm:text-5xl md:text-7xl font-black mb-6 sm:mb-10 tracking-tighter"
            >
              Ready to level up your design game?
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg sm:text-2xl text-white/80 mb-10 sm:mb-16 max-w-2xl mx-auto leading-relaxed"
            >
              Join 15,000+ creators and get access to exclusive templates, guides, and tutorials.
            </motion.p>
            <motion.button 
              whileHover={{ scale: 1.05, shadow: "0 25px 50px -12px rgba(0,0,0,0.5)" }}
              whileActive={{ scale: 0.95 }}
              className="w-full sm:w-auto bg-white text-indigo-600 px-10 sm:px-16 py-5 sm:py-7 rounded-2xl sm:rounded-[2.5rem] text-xl sm:text-2xl font-black shadow-2xl transition-all"
            >
              Join the Hub Today
            </motion.button>
          </div>
        </motion.div>
      </Section>

      {/* Footer */}
      <footer className="bg-white pt-20 sm:pt-32 pb-10 sm:pb-16 px-4 sm:px-8 border-t border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 sm:gap-20 mb-16 sm:mb-24">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-10">
                <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-100">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <span className="text-3xl font-black tracking-tighter text-slate-900">CANVA HUB</span>
              </div>
              <p className="text-slate-500 text-lg max-w-sm leading-relaxed">
                The world's most comprehensive resource for Canva creators. We provide the tools, tutorials, and inspiration you need to succeed.
              </p>
            </div>
            <div>
              <h5 className="font-black text-slate-900 mb-10 uppercase tracking-widest text-xs">Platform</h5>
              <ul className="space-y-5">
                {["Tutorials", "Guides", "Resources", "Templates"].map(item => (
                  <li key={item}><a href="#" className="text-slate-500 hover:text-indigo-600 transition-colors font-bold text-lg">{item}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h5 className="font-black text-slate-900 mb-10 uppercase tracking-widest text-xs">Company</h5>
              <ul className="space-y-5">
                {["About", "Contact", "Privacy", "Terms"].map(item => (
                  <li key={item}><a href="#" className="text-slate-500 hover:text-indigo-600 transition-colors font-bold text-lg">{item}</a></li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-10 pt-16 border-t border-slate-100">
            <p className="text-slate-400 text-base font-bold">© 2026 Canva Master Hub. Built for creators.</p>
            <div className="flex gap-10">
              {["Twitter", "Instagram", "YouTube"].map(item => (
                <a key={item} href="#" className="text-slate-400 hover:text-indigo-600 transition-colors font-black text-base tracking-tight">{item}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
