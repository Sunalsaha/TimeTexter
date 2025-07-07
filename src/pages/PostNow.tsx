
import { motion } from 'framer-motion';
import { ArrowLeft, Send, Image, Calendar, Hash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';

const PostNow = () => {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 dark:from-gray-900 dark:via-gray-800 dark:to-black relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10"></div>
      </div>
      
      <motion.div
        className="container mx-auto px-4 py-8 relative z-10 max-w-4xl"
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
          <h1 className="text-3xl font-bold text-white">Post Now</h1>
        </motion.div>

        <motion.div 
          className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20"
          variants={itemVariants}
        >
          <div className="space-y-6">
            <div>
              <label className="text-white font-medium mb-2 block">Content</label>
              <Textarea 
                placeholder="What's on your mind?"
                className="bg-white/5 border-white/20 text-white placeholder-white/50 resize-none h-32"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-white font-medium mb-2 block">Hashtags</label>
                <Input 
                  placeholder="#marketing #social #content"
                  className="bg-white/5 border-white/20 text-white placeholder-white/50"
                />
              </div>
              <div>
                <label className="text-white font-medium mb-2 block">Category</label>
                <Input 
                  placeholder="General, Marketing, News..."
                  className="bg-white/5 border-white/20 text-white placeholder-white/50"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-4 items-center">
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                <Image className="w-4 h-4 mr-2" />
                Add Media
              </Button>
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                <Hash className="w-4 h-4 mr-2" />
                Add Hashtags
              </Button>
            </div>

            <div className="flex justify-end gap-4">
              <Button 
                variant="outline" 
                className="border-white/30 text-white hover:bg-white/10"
                onClick={() => navigate('/dashboard')}
              >
                Cancel
              </Button>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                  <Send className="w-4 h-4 mr-2" />
                  Post Now
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PostNow;
