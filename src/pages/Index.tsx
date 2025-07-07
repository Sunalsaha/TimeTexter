
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Users, Zap, Clock, Shield, BarChart3, Globe, CheckCircle, Star } from 'lucide-react';
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

  const floatingAnimation = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 dark:from-gray-900 dark:via-gray-800 dark:to-black relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10"></div>
        <motion.div 
          className="absolute top-20 left-10 w-20 h-20 bg-purple-500/30 rounded-full blur-xl"
          animate={{ 
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.7, 0.3]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-20 right-10 w-32 h-32 bg-blue-500/30 rounded-full blur-2xl"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.6, 0.2]
          }}
          transition={{ 
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.div 
          className="absolute top-1/2 right-20 w-16 h-16 bg-pink-500/30 rounded-full blur-lg"
          animate={{ 
            scale: [1, 1.4, 1],
            opacity: [0.4, 0.8, 0.4]
          }}
          transition={{ 
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>
      
      <motion.div 
        className="container mx-auto px-4 py-16 relative z-10"
        initial="initial"
        animate="animate"
        variants={staggerChildren}
      >
        {/* Hero Section */}
        <motion.header 
          className="text-center mb-20"
          variants={fadeInUp}
        >
          <motion.div 
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-6 py-3 mb-8 border border-white/20"
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(255,255,255,0.1)" }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-5 h-5 text-yellow-300" />
            </motion.div>
            <span className="text-white/90 font-medium">Welcome to Scheduler</span>
          </motion.div>
          
          <motion.h1 
            className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
            variants={fadeInUp}
          >
            Connect, Manage,
            <br />
            <motion.span 
              className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent"
              animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
              transition={{ duration: 5, repeat: Infinity }}
              style={{ backgroundSize: '200% 200%' }}
            >
              Automate
            </motion.span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed mb-8"
            variants={fadeInUp}
          >
            Streamline your social media presence with our powerful dashboard. 
            Manage multiple platforms, schedule content, and grow your audience - all in one place.
          </motion.p>

          {/* Stats */}
          <motion.div 
            className="flex flex-wrap justify-center gap-8 mb-12"
            variants={fadeInUp}
          >
            {[
              { number: '10K+', label: 'Active Users' },
              { number: '50M+', label: 'Posts Scheduled' },
              { number: '99.9%', label: 'Uptime' }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                className="text-center"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div 
                  className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.2 + 0.5, type: "spring", stiffness: 300 }}
                >
                  {stat.number}
                </motion.div>
                <div className="text-white/60 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.header>

        {/* Features Grid */}
        <motion.section className="mb-20" variants={fadeInUp}>
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-white text-center mb-12"
            variants={fadeInUp}
          >
            Why Choose Scheduler?
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                title: "Multi-Platform Management",
                description: "Connect and manage all your social accounts from one dashboard",
                color: "from-blue-500 to-cyan-500"
              },
              {
                icon: Clock,
                title: "Smart Scheduling",
                description: "AI-powered optimal posting times for maximum engagement",
                color: "from-purple-500 to-pink-500"
              },
              {
                icon: BarChart3,
                title: "Advanced Analytics",
                description: "Deep insights into your performance across all platforms",
                color: "from-green-500 to-emerald-500"
              },
              {
                icon: Zap,
                title: "Automation Tools",
                description: "Automate repetitive tasks and focus on creating great content",
                color: "from-yellow-500 to-orange-500"
              },
              {
                icon: Shield,
                title: "Enterprise Security",
                description: "Bank-level security to keep your accounts and data safe",
                color: "from-red-500 to-pink-500"
              },
              {
                icon: Globe,
                title: "Global Reach",
                description: "Support for multiple languages and time zones worldwide",
                color: "from-indigo-500 to-purple-500"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="group bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 relative overflow-hidden"
                variants={fadeInUp}
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                <motion.div
                  className="relative z-10"
                  variants={floatingAnimation}
                  animate="animate"
                >
                  <feature.icon className="w-12 h-12 text-purple-400 mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-purple-300 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-white/70 group-hover:text-white/90 transition-colors duration-300">
                    {feature.description}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Social Proof */}
        <motion.section className="mb-20" variants={fadeInUp}>
          <div className="text-center mb-12">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-white mb-4"
              variants={fadeInUp}
            >
              Trusted by Thousands
            </motion.h2>
            <motion.p 
              className="text-white/70 text-lg"
              variants={fadeInUp}
            >
              Join the community of successful content creators and businesses
            </motion.p>
          </div>
          
          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            variants={staggerChildren}
          >
            {[
              {
                name: "Sarah Johnson",
                role: "Marketing Manager",
                company: "TechCorp",
                review: "Scheduler has revolutionized how we manage our social media. The analytics are incredible!",
                rating: 5
              },
              {
                name: "Mike Chen",
                role: "Content Creator",
                company: "Independent",
                review: "I've saved hours every week with the bulk scheduling feature. Absolutely love it!",
                rating: 5
              },
              {
                name: "Emma Davis",
                role: "Brand Manager",
                company: "Fashion Co.",
                review: "The multi-platform support is exactly what we needed. Highly recommended!",
                rating: 5
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-white/80 mb-4 italic">"{testimonial.review}"</p>
                <div>
                  <p className="text-white font-semibold">{testimonial.name}</p>
                  <p className="text-white/60 text-sm">{testimonial.role} at {testimonial.company}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* CTA Section */}
        <motion.section 
          className="text-center bg-white/5 backdrop-blur-md rounded-3xl p-12 border border-white/20"
          variants={fadeInUp}
        >
          <motion.h2 
            className="text-3xl md:text-5xl font-bold text-white mb-6"
            variants={fadeInUp}
          >
            Ready to Transform Your Social Media?
          </motion.h2>
          <motion.p 
            className="text-xl text-white/80 max-w-2xl mx-auto mb-8"
            variants={fadeInUp}
          >
            Join thousands of creators and businesses who trust Scheduler to manage their social media presence.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            variants={fadeInUp}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 px-8 py-4 text-lg font-semibold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300"
                onClick={() => navigate('/login')}
              >
                Get Started Free
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="ml-2 w-5 h-5" />
                </motion.div>
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
          </motion.div>

          <motion.div 
            className="mt-8 flex flex-wrap justify-center gap-6 text-white/60"
            variants={fadeInUp}
          >
            {[
              "✓ No credit card required",
              "✓ 14-day free trial",
              "✓ Cancel anytime"
            ].map((feature, index) => (
              <motion.span 
                key={index}
                className="flex items-center gap-2"
                whileHover={{ scale: 1.1, color: "#ffffff" }}
              >
                <CheckCircle className="w-4 h-4 text-green-400" />
                {feature.replace('✓ ', '')}
              </motion.span>
            ))}
          </motion.div>
        </motion.section>
      </motion.div>
    </div>
  );
};

export default Index;
