import { motion } from 'framer-motion';

// From lucide-react (for general UI)
import {
  FaFacebook,
  FaYoutube,
  FaInstagram,
  FaWhatsapp,
  FaLinkedin,
  FaTwitter
} from 'react-icons/fa';

import {
  ArrowRight,
  Sparkles,
  Users,
  Zap,
  Clock,
  Shield,
  BarChart3,
  Globe,
  CheckCircle,
  Star,
  MessageCircle,
  Mail
} from 'lucide-react';


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

  const itemVariants = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 dark:from-gray-900 dark:via-gray-800 dark:to-black relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10"></div>
        <motion.div 
          className="absolute top-20 left-10 w-20 h-20 bg-purple-500/30 rounded-full blur-xl"
          animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-20 right-10 w-32 h-32 bg-blue-500/30 rounded-full blur-2xl"
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div 
          className="absolute top-1/2 right-20 w-16 h-16 bg-pink-500/30 rounded-full blur-lg"
          animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>
      
      <motion.div 
        className="container mx-auto px-4 py-16 relative z-10"
        initial="initial"
        animate="animate"
        variants={staggerChildren}
      >
        {/* Hero Section */}
        <motion.header className="text-center mb-20" variants={fadeInUp}>
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
          <motion.div className="flex flex-wrap justify-center gap-8 mb-12" variants={fadeInUp}>
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
        {/* Floating Icons */}
          {/* Floating Social Icons in Background */}
<div className="absolute inset-0 pointer-events-none z-0">
  {/* Instagram */}
  <motion.div
    className="absolute top-20 left-10"
    animate={{ y: [0, -20, 0], rotate: [0, 15, -15, 0] }}
    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
  >
    <FaInstagram className="h-10 w-10 text-pink-400 opacity-60" />
  </motion.div>

  {/* YouTube */}
  <motion.div
    className="absolute top-20 right-10"
    animate={{ y: [0, 15, 0], scale: [1, 1.2, 1] }}
    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
  >
    <FaYoutube className="h-10 w-10 text-red-500 opacity-60" />
  </motion.div>

  {/* Twitter */}
  <motion.div
    className="absolute top-60 right-40"
    animate={{ y: [0, -15, 0], rotate: [-5, 5, -5] }}
    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
  >
    <FaTwitter className="h-10 w-10 text-blue-400 opacity-60" />
  </motion.div>

  {/* WhatsApp */}
  <motion.div
    className="absolute top-10 right-40"
    animate={{ y: [0, 10, 0], rotate: [0, 10, -10, 0] }}
    transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
  >
    <FaWhatsapp className="h-10 w-10 text-green-500 opacity-60" />
  </motion.div>

  {/* Facebook */}
  <motion.div
    className="absolute top-40 left-60"
    animate={{ y: [0, -15, 0], rotate: [-5, 5, -5] }}
    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
  >
    <FaFacebook className="h-10 w-10 text-blue-600 opacity-60" />
  </motion.div>

  {/* Mail */}
  <motion.div
    className="absolute top-80 left-10"
    animate={{ y: [0, 15, 0], rotate: [0, 20, -20, 0] }}
    transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
  >
    <Mail className="h-10 w-10 text-yellow-500 opacity-60" />
  </motion.div>

  {/* LinkedIn */}
  <motion.div
    className="absolute top-40 left-160"
    animate={{ y: [10, 20, 0], rotate: [0, 20, -10, 0] }}
    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
  >
    <FaLinkedin className="h-10 w-10 text-blue-500 opacity-60" />
  </motion.div>
</div>



        {/* Features Grid */}
        <motion.section className="mb-20" variants={fadeInUp}>
          <motion.h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12" variants={fadeInUp}>
            Why Choose TimeTexter?
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
                transition={{ duration: 0.5, delay: index * 0.1, type: "spring", stiffness: 300 }}
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
        {/* ✨ AI Assistant Section - Visually Enhanced */}
<motion.section
  className="mb-24 relative z-20 text-center"
  variants={fadeInUp}
>
  {/* Background Glow Bubbles */}
  <motion.div
    className="absolute -top-10 -left-10 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl animate-pulse"
    animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.5, 0.2] }}
    transition={{ duration: 6, repeat: Infinity }}
  />
  <motion.div
    className="absolute -bottom-10 right-0 w-52 h-52 bg-blue-500/20 rounded-full blur-2xl animate-ping"
    animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
    transition={{ duration: 7, repeat: Infinity }}
  />

  <motion.div
    className="relative z-10 bg-gradient-to-br from-[#2c0047]/60 to-[#00294d]/60 p-12 rounded-3xl backdrop-blur-xl border border-white/10 shadow-[0_0_40px_#ab5aff33] max-w-5xl mx-auto"
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, ease: 'easeOut' }}
  >
    {/* Label */}
    <motion.div
      className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/10 text-white/80 text-sm font-semibold mb-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <Sparkles className="text-yellow-300 animate-bounce" />
      AI-Powered Insights
    </motion.div>

    {/* Heading */}
    <motion.h2
      className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-purple-300 via-pink-300 to-blue-300 bg-clip-text text-transparent mb-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      Meet Your AI Growth Assistant
    </motion.h2>

    {/* Subtext */}
    <motion.p
      className="text-white/70 text-lg max-w-xl mx-auto mb-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
    >
      Create engaging content, track trends, and boost your social media growth with real-time insights and smart recommendations from our powerful AI assistant — your ultimate digital growth partner.
    </motion.p>

    {/* Buttons */}
    <motion.div
      className="flex flex-col sm:flex-row justify-center gap-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <Button
        className="bg-gradient-to-r from-[#7e22ce] to-[#2563eb] text-white px-6 py-3 rounded-xl text-lg font-medium shadow-md hover:scale-105 transition-all"
        onClick={() => navigate('/ai-assistant')}
        onClick={() => navigate('/login')}
      >
        Try the AI Assistant
        <motion.div animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <ArrowRight className="ml-2 w-5 h-5" />
        </motion.div>
        
      </Button>

      <Button
        variant="outline"
        className="relative px-6 py-3 rounded-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 
  hover:scale-105 transition-all duration-300 border 
   before:animate-gradient-x before:z-[-1] before:blur-md before:opacity-50 hover:before:opacity-80 hover:text-white/80" 

        onClick={() => navigate('/how-it-works')}
      >
        See How It Works
      </Button>
    </motion.div>

    {/* Animated icon ring */}
    <motion.div
      className="mt-10 flex justify-center gap-6 flex-wrap text-white/60"
      initial="initial"
      whileInView="animate"
      variants={staggerChildren}
    >
      {[Zap, Users, Clock, BarChart3, Shield].map((Icon, i) => (
        <motion.div
          key={i}
          className="p-4 rounded-full bg-white/5 backdrop-blur-lg border border-white/10 hover:bg-white/10"
          variants={fadeInUp}
          whileHover={{ scale: 1.15 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <Icon className="w-6 h-6" />
        </motion.div>
      ))}
    </motion.div>
  </motion.div>
</motion.section>


        {/* Social Proof */}
        <motion.section className="mb-20" variants={fadeInUp}>
          <div className="text-center mb-12">
            <motion.h2 className="text-3xl md:text-4xl font-bold text-white mb-4" variants={fadeInUp}>
              Trusted by Thousands
            </motion.h2>
            <motion.p className="text-white/70 text-lg" variants={fadeInUp}>
              Join the community of successful content creators and businesses
            </motion.p>
          </div>
          <motion.div className="grid md:grid-cols-3 gap-8" variants={staggerChildren}>
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
                initial="initial"
                animate="animate"
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
          <motion.h2 className="text-3xl md:text-5xl font-bold text-white mb-6" variants={fadeInUp}>
            Ready to Transform Your Social Media?
          </motion.h2>
          <motion.p className="text-xl text-white/80 max-w-2xl mx-auto mb-8" variants={fadeInUp}>
            Join thousands of creators and businesses who trust Scheduler to manage their social media presence.
          </motion.p>

          <motion.div className="flex flex-col sm:flex-row gap-4 justify-center items-center" variants={fadeInUp}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 px-8 py-4 text-lg font-semibold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300"
                onClick={() => navigate('/login')}
              >
                Get Started Free
                <motion.div animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                  <ArrowRight className="ml-2 w-5 h-5" />
                </motion.div>
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                size="lg"
               className="relative px-6 py-3 rounded-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 
  hover:scale-105 transition-all duration-300 border 
   before:animate-gradient-x before:z-[-1] before:blur-md before:opacity-50 hover:before:opacity-80 hover:text-white/80" 

                onClick={() => navigate('/dashboard')}
              >
                Explore Demo
              </Button>
            </motion.div>
          </motion.div>

          <motion.div className="mt-8 flex flex-wrap justify-center gap-6 text-white/60" variants={fadeInUp}>
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
       <motion.footer
      className="relative bg-gradient-to-br from-[#1f0033] via-[#120031] to-[#000212] text-white py-12 px-6 overflow-hidden mt-32"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      {/* Glowing Orbs */}
      <motion.div
        className="absolute -top-10 left-0 w-60 h-60 bg-purple-700/20 rounded-full blur-3xl animate-pulse"
        animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-72 h-72 bg-blue-600/20 rounded-full blur-3xl animate-ping"
        animate={{ scale: [1, 1.4, 1], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 7, repeat: Infinity }}
      />

      <div className="relative z-10 max-w-7xl mx-auto grid md:grid-cols-3 gap-12">
        {/* Company Info */}
        <div>
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
            TimeTexter
          </h2>
          <p className="text-sm text-white/70 mt-3">
            The all-in-one social media assistant to schedule, analyze, and grow.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-white/70">
            <li><a href="/about" className="hover:text-white">About Us</a></li>
            <li><a href="/features" className="hover:text-white">Features</a></li>
            <li><a href="/pricing" className="hover:text-white">Pricing</a></li>
            <li><a href="/contact" className="hover:text-white">Contact</a></li>
          </ul>
        </div>

        {/* Social Icons */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Follow Us</h4>
          <div className="flex space-x-4 text-white/70 text-2xl">
            {[FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaYoutube].map((Icon, idx) => (
              <motion.a
                key={idx}
                whileHover={{ scale: 1.2, color: "#ffffff" }}
                transition={{ type: 'spring', stiffness: 300 }}
                href="#"
              >
                <Icon />
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="mt-12 border-t border-white/20 pt-6 text-center text-sm text-white/60">
        © {new Date().getFullYear()} TimeTexter. All rights reserved.
      </div>
    </motion.footer>


    </div>
  );
};

export default Index;
