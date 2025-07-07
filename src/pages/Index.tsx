
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Users, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%239C92AC\" fill-opacity=\"0.1\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"4\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
      
      <motion.div 
        className="container mx-auto px-4 py-16 relative z-10"
        initial="initial"
        animate="animate"
        variants={staggerChildren}
      >
        {/* Header */}
        <motion.header 
          className="text-center mb-16"
          variants={fadeInUp}
        >
          <motion.div 
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-6 py-3 mb-8 border border-white/20"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Sparkles className="w-5 h-5 text-yellow-300" />
            <span className="text-white/90 font-medium">Welcome to SocialHub</span>
          </motion.div>
          
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Connect, Manage,
            <br />
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Automate
            </span>
          </h1>
          
          <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            Streamline your social media presence with our powerful dashboard. 
            Manage Facebook, Twitter, WhatsApp, and Email - all in one place.
          </p>
        </motion.header>

        {/* Features Grid */}
        <motion.div 
          className="grid md:grid-cols-3 gap-8 mb-16"
          variants={staggerChildren}
        >
          {[
            {
              icon: Users,
              title: "Multi-Platform",
              description: "Connect all your social accounts seamlessly"
            },
            {
              icon: Zap,
              title: "Smart Automation",
              description: "Schedule and automate your social content"
            },
            {
              icon: Sparkles,
              title: "Analytics",
              description: "Track performance across all platforms"
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300"
              variants={fadeInUp}
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <feature.icon className="w-12 h-12 text-purple-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
              <p className="text-white/70">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          className="text-center"
          variants={fadeInUp}
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 px-8 py-4 text-lg font-semibold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300"
                onClick={() => navigate('/login')}
              >
                Get Started
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="outline"
                size="lg"
                className="border-white/30 text-white hover:bg-white/10 hover:border-white/50 px-8 py-4 text-lg font-semibold rounded-xl backdrop-blur-md"
                onClick={() => navigate('/dashboard')}
              >
                Explore Demo
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* Floating Animation Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-purple-500/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-20 w-16 h-16 bg-pink-500/20 rounded-full blur-lg animate-pulse delay-500"></div>
      </motion.div>
    </div>
  );
};

export default Index;
