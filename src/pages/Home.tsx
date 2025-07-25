import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronRight } from 'lucide-react';

const Home = () => {
  const { scrollY } = useScroll();
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef);
  
  // Parallax effects
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  const products = [
    {
      id: 1,
      name: 'iPhone 15 Pro',
      tagline: 'Titanium. So strong. So light. So Pro.',
      image: '/api/placeholder/600/400',
      color: 'from-blue-600 to-purple-600',
      price: 'From $999'
    },
    {
      id: 2,
      name: 'MacBook Air',
      tagline: 'Lean. Mean. M3 machine.',
      image: '/api/placeholder/600/400',
      color: 'from-gray-800 to-gray-600',
      price: 'From $1,099'
    },
    {
      id: 3,
      name: 'Apple Watch',
      tagline: 'Smarter. Brighter. Mightier.',
      image: '/api/placeholder/600/400',
      color: 'from-red-500 to-pink-500',
      price: 'From $399'
    },
    {
      id: 4,
      name: 'iPad Pro',
      tagline: 'Unbelievably thin. Incredibly powerful.',
      image: '/api/placeholder/600/400',
      color: 'from-purple-600 to-blue-600',
      price: 'From $799'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <motion.section 
        ref={heroRef}
        className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900"
        style={{ y: heroY, opacity: heroOpacity }}
      >
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <motion.h1 
            className="text-4xl md:text-7xl font-sf-pro-display font-bold mb-6 leading-tight"
            initial={{ opacity: 0, y: 50 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            iPhone 15 Pro
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl mb-8 text-gray-200 font-sf-pro-text"
            initial={{ opacity: 0, y: 30 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Titanium. So strong. So light. So Pro.
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Button 
              size="lg" 
              className="btn-apple bg-apple-blue hover:bg-apple-blue/90 text-white px-8 py-3 rounded-full text-lg font-medium"
            >
              Learn more
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="btn-apple border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3 rounded-full text-lg font-medium"
            >
              Buy <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
        
        {/* Hero Product Image */}
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isHeroInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <div className="w-64 h-64 md:w-96 md:h-96 bg-gradient-to-br from-gray-400 to-gray-600 rounded-3xl shadow-apple-xl"></div>
        </motion.div>
      </motion.section>

      {/* Featured Products Grid */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </section>

      {/* Secondary Hero Section */}
      <section className="relative py-32 bg-black text-white overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <motion.h2 
            className="text-5xl md:text-7xl font-sf-pro-display font-bold mb-6"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            MacBook Air
          </motion.h2>
          <motion.p 
            className="text-xl md:text-2xl mb-12 text-gray-300 font-sf-pro-text"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Lean. Mean. M3 machine.
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Button 
              size="lg" 
              className="btn-apple bg-white text-black hover:bg-gray-200 px-8 py-3 rounded-full text-lg font-medium"
            >
              Learn more
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="btn-apple border-white text-white hover:bg-white hover:text-black px-8 py-3 rounded-full text-lg font-medium"
            >
              Buy <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-apple-gray-light">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ServiceCard 
              title="Apple Care+"
              description="Get unlimited repairs for accidental damage protection."
              icon="🛡️"
            />
            <ServiceCard 
              title="Trade In"
              description="Get credit toward a new device when you trade in your current one."
              icon="🔄"
            />
            <ServiceCard 
              title="Financing"
              description="Pay for your new Apple products over time, interest-free."
              icon="💳"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

const ProductCard = ({ product, index }: { product: any; index: number }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef);

  return (
    <motion.div
      ref={cardRef}
      className={`relative h-96 rounded-3xl overflow-hidden shadow-apple-lg cursor-pointer group card-apple bg-gradient-to-br ${product.color}`}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
      <div className="relative z-10 p-8 h-full flex flex-col justify-between text-white">
        <div>
          <h3 className="text-3xl font-sf-pro-display font-bold mb-2">{product.name}</h3>
          <p className="text-lg font-sf-pro-text opacity-90">{product.tagline}</p>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-lg font-medium">{product.price}</span>
          <Button 
            variant="outline" 
            size="sm" 
            className="btn-apple border-white/50 text-white hover:bg-white hover:text-gray-900 rounded-full"
          >
            Learn more
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

const ServiceCard = ({ title, description, icon }: { title: string; description: string; icon: string }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef);

  return (
    <motion.div
      ref={cardRef}
      className="text-center p-8 rounded-2xl bg-white shadow-apple-md hover:shadow-apple-lg transition-shadow duration-300"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
    >
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-sf-pro-display font-semibold mb-3 text-foreground">{title}</h3>
      <p className="text-apple-gray font-sf-pro-text">{description}</p>
    </motion.div>
  );
};

export default Home;