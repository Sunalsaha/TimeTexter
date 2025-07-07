
import { motion } from 'framer-motion';
import { ArrowLeft, TrendingUp, Users, Eye, Heart, MessageSquare, Share, Calendar, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Analytics = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const platformData = [
    { name: 'Facebook', followers: '12.5K', engagement: '8.4%', reach: '45.2K', color: 'text-blue-400' },
    { name: 'WhatsApp', followers: '2.1K', engagement: '12.8%', reach: '8.9K', color: 'text-green-400' },
    { name: 'Telegram', followers: '3.4K', engagement: '15.2%', reach: '12.1K', color: 'text-blue-300' },
    { name: 'Phone Message', followers: '1.8K', engagement: '18.7%', reach: '5.4K', color: 'text-green-300' },
    { name: 'Email', followers: '5.4K', engagement: '24.3%', reach: '18.7K', color: 'text-purple-400' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10"></div>
      </div>
      
      <motion.div
        className="container mx-auto px-4 py-8 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          className="flex items-center mb-8"
          variants={itemVariants}
        >
          <Button
            variant="ghost"
            onClick={() => navigate('/dashboard')}
            className="text-white/80 hover:text-white hover:bg-white/10 mr-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          <h1 className="text-3xl font-bold text-white">Analytics Dashboard</h1>
        </motion.div>

        {/* Overall Stats */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
          variants={itemVariants}
        >
          {[
            { label: 'Total Followers', value: '25.2K', icon: Users, color: 'text-blue-400' },
            { label: 'Total Engagement', value: '15.9%', icon: Heart, color: 'text-pink-400' },
            { label: 'Total Reach', value: '90.3K', icon: Eye, color: 'text-purple-400' },
            { label: 'Posts This Month', value: '47', icon: Calendar, color: 'text-green-400' }
          ].map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <motion.div
                key={index}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <IconComponent className={`w-8 h-8 ${stat.color}`} />
                  <span className="text-white/70 text-sm">{stat.label}</span>
                </div>
                <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
                <p className="text-green-400 text-sm mt-1">+12% this month</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Platform Analytics */}
        <motion.div variants={itemVariants}>
          <h2 className="text-2xl font-bold text-white mb-6">Platform Performance</h2>
          <div className="space-y-6">
            {platformData.map((platform, index) => (
              <motion.div
                key={platform.name}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="text-xl font-bold text-white mb-4">{platform.name}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <Users className={`w-8 h-8 ${platform.color} mx-auto mb-2`} />
                    <p className="text-white/70 text-sm">Followers</p>
                    <p className={`text-2xl font-bold ${platform.color}`}>{platform.followers}</p>
                  </div>
                  <div className="text-center">
                    <TrendingUp className={`w-8 h-8 ${platform.color} mx-auto mb-2`} />
                    <p className="text-white/70 text-sm">Engagement</p>
                    <p className={`text-2xl font-bold ${platform.color}`}>{platform.engagement}</p>
                  </div>
                  <div className="text-center">
                    <Eye className={`w-8 h-8 ${platform.color} mx-auto mb-2`} />
                    <p className="text-white/70 text-sm">Reach</p>
                    <p className={`text-2xl font-bold ${platform.color}`}>{platform.reach}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Analytics;
