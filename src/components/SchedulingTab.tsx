
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Plus, Send, Image, Hash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';

interface SchedulingTabProps {
  platform: string;
  config: {
    name: string;
    color: string;
    bgColor: string;
  };
}

export const SchedulingTab = ({ platform, config }: SchedulingTabProps) => {
  const [postContent, setPostContent] = useState('');
  const [scheduleDate, setScheduleDate] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');
  const [isScheduling, setIsScheduling] = useState(false);

  const scheduledPosts = [
    {
      id: 1,
      content: 'Excited to share our latest product update! 🚀',
      scheduledFor: '2024-01-15 14:30',
      status: 'pending'
    },
    {
      id: 2,
      content: 'Behind the scenes of our development process',
      scheduledFor: '2024-01-16 10:00',
      status: 'pending'
    },
    {
      id: 3,
      content: 'Customer testimonial spotlight',
      scheduledFor: '2024-01-17 16:45',
      status: 'sent'
    }
  ];

  const handleSchedulePost = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!postContent.trim() || !scheduleDate || !scheduleTime) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields to schedule a post.",
        variant: "destructive",
      });
      return;
    }

    setIsScheduling(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Post scheduled!",
      description: `Your ${config.name} post has been scheduled successfully.`,
    });
    
    // Reset form
    setPostContent('');
    setScheduleDate('');
    setScheduleTime('');
    setIsScheduling(false);
  };

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
      {/* Create New Post */}
      <motion.div variants={itemVariants}>
        <h2 className="text-2xl font-bold text-white mb-6">Schedule New Post</h2>
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
          <form onSubmit={handleSchedulePost} className="space-y-6">
            <div>
              <Label htmlFor="content" className="text-white/90 mb-2 block">Post Content</Label>
              <Textarea
                id="content"
                placeholder={`What would you like to share on ${config.name}?`}
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                className="bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-purple-400 focus:ring-purple-400/20 min-h-[120px]"
                maxLength={280}
              />
              <p className="text-white/50 text-sm mt-1">{postContent.length}/280 characters</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="date" className="text-white/90 mb-2 block">Schedule Date</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
                  <Input
                    id="date"
                    type="date"
                    value={scheduleDate}
                    onChange={(e) => setScheduleDate(e.target.value)}
                    className="pl-12 bg-white/5 border-white/20 text-white focus:border-purple-400 focus:ring-purple-400/20"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="time" className="text-white/90 mb-2 block">Schedule Time</Label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
                  <Input
                    id="time"
                    type="time"
                    value={scheduleTime}
                    onChange={(e) => setScheduleTime(e.target.value)}
                    className="pl-12 bg-white/5 border-white/20 text-white focus:border-purple-400 focus:ring-purple-400/20"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                className="border-white/30 text-white/80 hover:bg-white/10 hover:border-white/50"
              >
                <Image className="w-4 h-4 mr-2" />
                Add Media
              </Button>
              <Button
                type="button"
                variant="outline"
                className="border-white/30 text-white/80 hover:bg-white/10 hover:border-white/50"
              >
                <Hash className="w-4 h-4 mr-2" />
                Add Tags
              </Button>
            </div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                type="submit"
                disabled={isScheduling}
                className={`bg-gradient-to-r ${config.color} hover:opacity-90 text-white border-0 px-6 py-3 font-semibold rounded-xl shadow-xl`}
              >
                {isScheduling ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full mr-2"
                  />
                ) : (
                  <Calendar className="w-4 h-4 mr-2" />
                )}
                {isScheduling ? 'Scheduling...' : 'Schedule Post'}
              </Button>
            </motion.div>
          </form>
        </div>
      </motion.div>

      {/* Scheduled Posts */}
      <motion.div variants={itemVariants}>
        <h2 className="text-2xl font-bold text-white mb-6">Scheduled Posts</h2>
        <div className="space-y-4">
          {scheduledPosts.map((post, index) => (
            <motion.div
              key={post.id}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300"
              whileHover={{ y: -2 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, type: "spring", stiffness: 300 }}
            >
              <div className="flex justify-between items-start mb-4">
                <p className="text-white flex-1 mr-4">{post.content}</p>
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                  post.status === 'pending' 
                    ? 'bg-yellow-500/20 text-yellow-300' 
                    : 'bg-green-500/20 text-green-300'
                }`}>
                  {post.status}
                </div>
              </div>
              
              <div className="flex items-center justify-between text-white/70 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>Scheduled for {post.scheduledFor}</span>
                </div>
                
                {post.status === 'pending' && (
                  <div className="flex gap-2">
                    <Button size="sm" variant="ghost" className="text-white/60 hover:text-white hover:bg-white/10">
                      Edit
                    </Button>
                    <Button size="sm" variant="ghost" className="text-red-400 hover:text-red-300 hover:bg-red-500/10">
                      Cancel
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div variants={itemVariants}>
        <h2 className="text-2xl font-bold text-white mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: 'Post Now', description: 'Share content immediately', icon: Send },
            { title: 'Bulk Schedule', description: 'Schedule multiple posts', icon: Calendar },
            { title: 'Content Templates', description: 'Use pre-made templates', icon: Plus }
          ].map((action, index) => (
            <motion.div
              key={index}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 cursor-pointer"
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <action.icon className="w-8 h-8 text-purple-400 mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">{action.title}</h3>
              <p className="text-white/70 text-sm">{action.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};
