
import { motion } from 'framer-motion';
import { ArrowLeft, FileText, Copy, Edit, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Templates = () => {
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

  const templates = [
    {
      id: 1,
      title: "Product Launch",
      content: "🚀 Excited to announce our latest product! Get ready to experience innovation like never before. #ProductLaunch #Innovation",
      category: "Marketing",
      rating: 4.8,
      uses: 245
    },
    {
      id: 2,
      title: "Weekly Motivation",
      content: "💪 Monday Motivation: Success is not final, failure is not fatal. It's the courage to continue that counts. Have a great week! #MondayMotivation",
      category: "Motivation",
      rating: 4.9,
      uses: 189
    },
    {
      id: 3,
      title: "Behind the Scenes",
      content: "👀 Behind the scenes at our office today! Here's how we make the magic happen. What would you like to see more of? #BehindTheScenes",
      category: "Engagement",
      rating: 4.7,
      uses: 156
    },
    {
      id: 4,
      title: "Thank You Post",
      content: "🙏 Thank you to our amazing community for your continued support! You make everything we do worthwhile. #Grateful #Community",
      category: "Appreciation",
      rating: 4.9,
      uses: 203
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 dark:from-gray-900 dark:via-gray-800 dark:to-black relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10"></div>
      </div>
      
      <motion.div
        className="container mx-auto px-4 py-8 relative z-10 max-w-6xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          className="flex items-center justify-between mb-8"
          variants={itemVariants}
        >
          <div className="flex items-center">
            <Button
              variant="ghost"
              onClick={() => navigate('/dashboard')}
              className="text-white/80 hover:text-white hover:bg-white/10 mr-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            <h1 className="text-3xl font-bold text-white">Content Templates</h1>
          </div>
          <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
            <FileText className="w-4 h-4 mr-2" />
            Create Template
          </Button>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={itemVariants}
        >
          {templates.map((template, index) => (
            <motion.div
              key={template.id}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300"
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">{template.title}</h3>
                  <span className="text-xs bg-purple-600/20 text-purple-300 px-2 py-1 rounded-full">
                    {template.category}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-yellow-400">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-xs text-white/70">{template.rating}</span>
                </div>
              </div>

              <p className="text-white/80 text-sm mb-4 line-clamp-3">
                {template.content}
              </p>

              <div className="flex justify-between items-center mb-4">
                <span className="text-xs text-white/60">{template.uses} uses</span>
              </div>

              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="bg-transparent text-white border border-white/30 hover:bg-white/10 hover:border-white/50"
                >
                  <Copy className="w-3 h-3 mr-1" />
                  Copy
                </Button>
                <Button 
                  size="sm" 
                  className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  <Edit className="w-3 h-3 mr-1" />
                  Use
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Templates;
