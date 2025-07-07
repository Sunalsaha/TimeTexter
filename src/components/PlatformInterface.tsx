
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
      recentPosts: [
        { content: 'Just launched our new feature! 🚀', likes: 245, shares: 34, comments: 12 },
        { content: 'Behind the scenes of our team meeting', likes: 189, shares: 8, comments: 23 },
        { content: 'Customer success story spotlight', likes: 312, shares: 67, comments: 45 }
      ]
    },
    twitter: {
      followers: '8.9K',
      engagement: '6.2%',
      recentPosts: [
        { content: 'Building something amazing... Stay tuned! #startup', likes: 156, shares: 23, comments: 8 },
        { content: 'Great insights from today\'s conference', likes: 203, shares: 45, comments: 12 },
        { content: 'Team lunch at our favorite spot 🍕', likes: 89, shares: 5, comments: 15 }
      ]
    },
    whatsapp: {
      followers: '2.1K',
      engagement: '12.8%',
      recentPosts: [
        { content: 'Weekly newsletter sent to subscribers', likes: 98, shares: 12, comments: 34 },
        { content: 'Product update announcement', likes: 156, shares: 23, comments: 18 },
        { content: 'Customer support improvements', likes: 76, shares: 8, comments: 22 }
      ]
    },
    email: {
      followers: '5.4K',
      engagement: '24.3%',
      recentPosts: [
        { content: 'Monthly newsletter - March edition', likes: 234, shares: 45, comments: 12 },
        { content: 'Product launch announcement', likes: 345, shares: 67, comments: 23 },
        { content: 'Customer success stories', likes: 189, shares: 34, comments: 18 }
      ]
    }
  };

  const data = mockData[platform as keyof typeof mockData];

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
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <div className="flex items-center gap-3 mb-3">
              <Users className="w-8 h-8 text-blue-400" />
              <span className="text-white/70">Followers</span>
            </div>
            <p className="text-3xl font-bold text-white">{data.followers}</p>
            <p className="text-green-400 text-sm mt-1">+12% this month</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <div className="flex items-center gap-3 mb-3">
              <TrendingUp className="w-8 h-8 text-purple-400" />
              <span className="text-white/70">Engagement</span>
            </div>
            <p className="text-3xl font-bold text-white">{data.engagement}</p>
            <p className="text-green-400 text-sm mt-1">+2.4% this week</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <div className="flex items-center gap-3 mb-3">
              <Eye className="w-8 h-8 text-pink-400" />
              <span className="text-white/70">Reach</span>
            </div>
            <p className="text-3xl font-bold text-white">45.2K</p>
            <p className="text-green-400 text-sm mt-1">+8.7% this week</p>
          </div>
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
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <p className="text-white mb-4">{post.content}</p>
              <div className="flex items-center gap-6 text-white/70">
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4" />
                  <span className="text-sm">{post.likes}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Share className="w-4 h-4" />
                  <span className="text-sm">{post.shares}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  <span className="text-sm">{post.comments}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Performance Chart Placeholder */}
      <motion.div 
        variants={itemVariants}
        className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
      >
        <h3 className="text-xl font-bold text-white mb-4">Performance Trends</h3>
        <div className="h-64 bg-white/5 rounded-xl flex items-center justify-center">
          <p className="text-white/50">Chart visualization would appear here</p>
        </div>
      </motion.div>
    </motion.div>
  );
};
