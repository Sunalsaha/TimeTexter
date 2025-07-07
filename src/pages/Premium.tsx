import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Crown,
  Check,
  Zap,
  Star,
  Users,
  BarChart3,
  Calendar,
  Shield,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Premium = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const features = [
    {
      icon: Users,
      title: 'Unlimited Team Members',
      description: 'Add unlimited team members to collaborate',
    },
    {
      icon: Calendar,
      title: 'Advanced Scheduling',
      description: 'Schedule posts up to 1 year in advance',
    },
    {
      icon: BarChart3,
      title: 'Advanced Analytics',
      description: 'Detailed insights and performance metrics',
    },
    {
      icon: Shield,
      title: 'Priority Support',
      description: '24/7 priority customer support',
    },
    {
      icon: Star,
      title: 'Custom Branding',
      description: 'Remove Scheduler branding and add your own',
    },
    {
      icon: Zap,
      title: 'AI Content Suggestions',
      description: 'AI-powered content recommendations',
    },
  ];

  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      features: [
        '3 Team Members',
        'Basic Analytics',
        'Email Support',
        '5 Platforms',
      ],
      color: 'from-gray-600 to-gray-700',
      popular: false,
    },
    {
      name: 'Premium',
      price: '$29',
      period: 'per month',
      features: [
        'Unlimited Team Members',
        'Advanced Analytics',
        'Priority Support',
        'All Platforms',
        'AI Features',
        'Custom Branding',
      ],
      color: 'from-yellow-400 to-orange-500',
      popular: true,
    },
    {
      name: 'Enterprise',
      price: '$99',
      period: 'per month',
      features: [
        'Everything in Premium',
        'Custom Integrations',
        'Dedicated Manager',
        'SLA Guarantee',
        'Custom Training',
      ],
      color: 'from-purple-600 to-blue-600',
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 dark:from-gray-900 dark:via-gray-800 dark:to-black relative overflow-hidden text-white">
      {/* Background Glow Layer */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10"></div>
      </div>

      {/* Main Content */}
      <motion.div
        className="container mx-auto px-4 py-8 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div className="flex items-center mb-8" variants={itemVariants}>
          <Button
            variant="ghost"
            onClick={() => navigate('/dashboard')}
            className="text-white/80 hover:text-white hover:bg-white/10 mr-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          <h1 className="text-3xl font-bold text-white">Premium Plans</h1>
        </motion.div>

        {/* Hero Section */}
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <motion.div
            animate={{ scale: [1, 1.05, 1], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="inline-block mb-6"
          >
            <Crown className="w-20 h-20 text-yellow-400 mx-auto" />
          </motion.div>
          <h2 className="text-5xl font-bold text-white mb-4">
            Unlock Your Potential
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Take your social media management to the next level with our
            premium features
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
          variants={itemVariants}
        >
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={index}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
                whileHover={{ y: -10, scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mb-4"
                >
                  <IconComponent className="w-6 h-6 text-white" />
                </motion.div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-white/70 text-sm">{feature.description}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Pricing Plans */}
        <motion.div variants={itemVariants}>
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Choose Your Plan
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                className={`bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 relative ${
                  plan.popular ? 'ring-2 ring-yellow-400' : ''
                }`}
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300 }}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                {plan.popular && (
                  <motion.div
                    animate={{
                      boxShadow: [
                        '0 0 20px rgba(255, 215, 0, 0.3)',
                        '0 0 40px rgba(255, 215, 0, 0.5)',
                        '0 0 20px rgba(255, 215, 0, 0.3)',
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-6 py-2 rounded-full text-sm font-bold"
                  >
                    Most Popular
                  </motion.div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-4xl font-bold text-white">
                      {plan.price}
                    </span>
                    <span className="text-white/70">/{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-center gap-3"
                    >
                      <Check className="w-5 h-5 text-green-400" />
                      <span className="text-white/80">{feature}</span>
                    </li>
                  ))}
                </ul>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    className={`w-full bg-gradient-to-r ${plan.color} hover:opacity-90 text-white font-bold py-3 text-lg`}
                    disabled={plan.name === 'Free'}
                  >
                    {plan.name === 'Free'
                      ? 'Current Plan'
                      : `Get ${plan.name}`}
                  </Button>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Premium;
