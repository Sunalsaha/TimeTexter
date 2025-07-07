
import { motion } from 'framer-motion';
import { Users, TrendingUp, MessageSquare, Heart, Share, Eye } from 'lucide-react';

interface PlatformInterfaceProps {
  platform: string;
  config: {
    name: string;
    color: string;
    bgColor: string;
  };
}

export const PlatformInterface = ({ platform, config }: PlatformInterfaceProps) => {
  const mockData = {
    facebook: {
      followers: '12.5K',
      engagement: '8.4%',
      reach: '45.2K',
      recentPosts: [
        { content: 'Just launched our new feature! 🚀', likes: 245, shares: 34, comments: 12 },
        { content: 'Behind the scenes of our team meeting', likes: 189, shares: 8, comments: 23 },
        { content: 'Customer success story spotlight', likes: 312, shares: 67, comments: 45 }
      ]
    },
    twitter: {
      followers: '8.9K',
      engagement: '6.2%',
      reach: '32.1K',
      recentPosts: [
        { content: 'Building something amazing... Stay tuned! #startup', likes: 156, shares: 23, comments: 8 },
        { content: 'Great insights from today\'s conference', likes: 203, shares: 45, comments: 12 },
        { content: 'Team lunch at our favorite spot 🍕', likes: 89, shares: 5, comments: 15 }
      ]
    },
    whatsapp: {
      followers: '2.1K',
      engagement: '12.8%',
      reach: '8.9K',
      recentPosts: [
        { content: 'Weekly newsletter sent to subscribers', likes: 98, shares: 12, comments: 34 },
        { content: 'Product update announcement', likes: 156, shares: 23, comments: 18 },
        { content: 'Customer support improvements', likes: 76, shares: 8, comments: 22 }
      ]
    },
    telegram: {
      followers: '3.4K',
      engagement: '15.2%',
      reach: '12.1K',
      recentPosts: [
        { content: 'Channel update: New features coming soon!', likes: 234, shares: 45, comments: 12 },
        { content: 'Community discussion highlights', likes: 189, shares: 23, comments: 34 },
        { content: 'Weekly tech news roundup', likes: 156, shares: 67, comments: 18 }
      ]
    },
    phone: {
      followers: '1.8K',
      engagement: '18.7%',
      reach: '5.4K',
      recentPosts: [
        { content: 'SMS campaign: Holiday promotions', likes: 134, shares: 12, comments: 8 },
        { content: 'Reminder: Appointment confirmations', likes: 89, shares: 5, comments: 15 },
        { content: 'Customer support updates', likes: 67, shares: 23, comments: 12 }
      ]
    },
    email: {
      followers: '5.4K',
      engagement: '24.3%',
      reach: '18.7K',
      recentPosts: [
        { content: 'Monthly newsletter - March edition', likes: 234, shares: 45, comments: 12 },
        { content: 'Product launch announcement', likes: 345, shares: 67, comments: 23 },
        { content: 'Customer success stories', likes: 189, shares: 34, comments: 18 }
      ]
    }
  };

  const data = mockData[platform as keyof typeof mockData] || mockData.email;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Stats Overview */}
      <motion.div variants={itemVariants}>
        <h2 className="text-2xl font-bold text-white mb-6">Analytics Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div 
            className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <Users className="w-8 h-8 text-blue-400" />
              <span className="text-white/70">Followers</span>
            </div>
            <p className="text-3xl font-bold text-white">{data.followers}</p>
            <motion.p 
              className="text-green-400 text-sm mt-1"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              +12% this month
            </motion.p>
          </motion.div>
          
          <motion.div 
            className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <TrendingUp className="w-8 h-8 text-purple-400" />
              <span className="text-white/70">Engagement</span>
            </div>
            <p className="text-3xl font-bold text-white">{data.engagement}</p>
            <motion.p 
              className="text-green-400 text-sm mt-1"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            >
              +2.4% this week
            </motion.p>
          </motion.div>
          
          <motion.div 
            className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <Eye className="w-8 h-8 text-pink-400" />
              <span className="text-white/70">Reach</span>
            </div>
            <p className="text-3xl font-bold text-white">{data.reach}</p>
            <motion.p 
              className="text-green-400 text-sm mt-1"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            >
              +8.7% this week
            </motion.p>
          </motion.div>
        </div>
      </motion.div>

      {/* Recent Posts */}
      <motion.div variants={itemVariants}>
        <h2 className="text-2xl font-bold text-white mb-6">Recent Posts</h2>
        <div className="space-y-4">
          {data.recentPosts.map((post, index) => (
            <motion.div
              key={index}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300"
              whileHover={{ y: -2, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <p className="text-white mb-4">{post.content}</p>
              <div className="flex items-center gap-6 text-white/70">
                <motion.div 
                  className="flex items-center gap-2"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Heart className="w-4 h-4" />
                  <span className="text-sm">{post.likes}</span>
                </motion.div>
                <motion.div 
                  className="flex items-center gap-2"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Share className="w-4 h-4" />
                  <span className="text-sm">{post.shares}</span>
                </motion.div>
                <motion.div 
                  className="flex items-center gap-2"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <MessageSquare className="w-4 h-4" />
                  <span className="text-sm">{post.comments}</span>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Performance Chart Placeholder */}
      <motion.div 
        variants={itemVariants}
        className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <h3 className="text-xl font-bold text-white mb-4">Performance Trends</h3>
        <motion.div 
          className="h-64 bg-white/5 rounded-xl flex items-center justify-center"
          animate={{ 
            background: [
              "rgba(255, 255, 255, 0.05)",
              "rgba(255, 255, 255, 0.08)",
              "rgba(255, 255, 255, 0.05)"
            ]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <p className="text-white/50">Chart visualization would appear here</p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
