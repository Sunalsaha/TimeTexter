
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Plus, Trash2, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';

const BulkSchedule = () => {
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

  const posts = [
    { id: 1, content: "Sample post 1", date: "2024-01-15", time: "10:00" },
    { id: 2, content: "Sample post 2", date: "2024-01-16", time: "14:30" },
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
            <h1 className="text-3xl font-bold text-white">Bulk Schedule</h1>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
              <Upload className="w-4 h-4 mr-2" />
              Import CSV
            </Button>
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Post
            </Button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Add New Post */}
          <motion.div 
            className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
            variants={itemVariants}
          >
            <h2 className="text-xl font-bold text-white mb-6">Create New Post</h2>
            <div className="space-y-4">
              <Textarea 
                placeholder="Write your post content..."
                className="bg-white/5 border-white/20 text-white placeholder-white/50 resize-none h-24"
              />
              <div className="grid grid-cols-2 gap-4">
                <Input 
                  type="date"
                  className="bg-white/5 border-white/20 text-white"
                />
                <Input 
                  type="time"
                  className="bg-white/5 border-white/20 text-white"
                />
              </div>
              <Button className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800">
                <Plus className="w-4 h-4 mr-2" />
                Add to Schedule
              </Button>
            </div>
          </motion.div>

          {/* Scheduled Posts */}
          <motion.div 
            className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
            variants={itemVariants}
          >
            <h2 className="text-xl font-bold text-white mb-6">Scheduled Posts ({posts.length})</h2>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {posts.map((post) => (
                <motion.div 
                  key={post.id}
                  className="bg-white/5 rounded-xl p-4 border border-white/10"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex justify-between items-start mb-2">
                    <p className="text-white text-sm flex-1">{post.content}</p>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="text-red-400 hover:text-red-300 hover:bg-red-500/20"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-4 text-white/60 text-xs">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {post.date}
                    </span>
                    <span>{post.time}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div 
          className="mt-8 text-center"
          variants={itemVariants}
        >
          <Button 
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-8"
          >
            Schedule All Posts
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default BulkSchedule;
