
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Plus, Send, Image, Hash, Bot, Trash2, X, Users, User, Edit, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';

interface Contact {
  id: number;
  name: string;
  avatar?: string;
  status: 'online' | 'offline';
}

interface ScheduledPost {
  id: number;
  content: string;
  scheduledFor: string;
  status: 'pending' | 'sent';
  contacts: { id: number; name: string }[];
}

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
  const [isAiHelping, setIsAiHelping] = useState(false);
  const [selectedContacts, setSelectedContacts] = useState<Contact[]>([]);
  const [editingPost, setEditingPost] = useState<ScheduledPost | null>(null);
  
  // Sample contacts data
  const [contacts] = useState<Contact[]>([
    { id: 1, name: 'John Doe', status: 'online' },
    { id: 2, name: 'Jane Smith', status: 'online' },
    { id: 3, name: 'Mike Johnson', status: 'offline' },
    { id: 4, name: 'Sarah Wilson', status: 'online' },
    { id: 5, name: 'David Brown', status: 'offline' },
    { id: 6, name: 'Emily Davis', status: 'online' },
    { id: 7, name: 'Chris Martinez', status: 'online' },
    { id: 8, name: 'Lisa Anderson', status: 'offline' },
  ]);

  const [scheduledPosts, setScheduledPosts] = useState<ScheduledPost[]>([
    {
      id: 1,
      content: 'Excited to share our latest product update! 🚀',
      scheduledFor: '2024-01-15 14:30',
      status: 'pending',
      contacts: [{ id: 1, name: 'John Doe' }, { id: 2, name: 'Jane Smith' }]
    },
    {
      id: 2,
      content: 'Behind the scenes of our development process',
      scheduledFor: '2024-01-16 10:00',
      status: 'pending',
      contacts: [{ id: 3, name: 'Mike Johnson' }]
    },
    {
      id: 3,
      content: 'Customer testimonial spotlight',
      scheduledFor: '2024-01-17 16:45',
      status: 'sent',
      contacts: [{ id: 1, name: 'John Doe' }, { id: 4, name: 'Sarah Wilson' }, { id: 5, name: 'David Brown' }]
    }
  ]);

  // Check for posts that should be marked as sent
  useEffect(() => {
    const checkPostStatus = () => {
      const now = new Date();
      setScheduledPosts(prev => 
        prev.map(post => {
          if (post.status === 'pending') {
            const scheduledDateTime = new Date(post.scheduledFor);
            if (scheduledDateTime <= now) {
              toast({
                title: "Post sent!",
                description: `Your post "${post.content.substring(0, 50)}..." has been sent to ${post.contacts.length} contact${post.contacts.length > 1 ? 's' : ''}.`,
              });
              return { ...post, status: 'sent' as const };
            }
          }
          return post;
        })
      );
    };

    // Check immediately
    checkPostStatus();
    
    // Check every minute
    const interval = setInterval(checkPostStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleContactSelect = (contact: Contact) => {
    const isSelected = selectedContacts.some(c => c.id === contact.id);
    if (isSelected) {
      setSelectedContacts(prev => prev.filter(c => c.id !== contact.id));
    } else {
      setSelectedContacts(prev => [...prev, contact]);
    }
  };

  const handleRemoveContact = (contactId: number) => {
    setSelectedContacts(prev => prev.filter(c => c.id !== contactId));
  };

  const handleEditPost = (post: ScheduledPost) => {
    setEditingPost(post);
    setPostContent(post.content);
    const [date, time] = post.scheduledFor.split(' ');
    setScheduleDate(date);
    setScheduleTime(time);
    
    // Set selected contacts based on the post's contacts
    const postContacts = post.contacts.map(pc => 
      contacts.find(c => c.id === pc.id)
    ).filter(Boolean) as Contact[];
    setSelectedContacts(postContacts);
  };

  const handleCancelEdit = () => {
    setEditingPost(null);
    setPostContent('');
    setScheduleDate('');
    setScheduleTime('');
    setSelectedContacts([]);
  };

  const handleCancelPost = (postId: number) => {
    const postToCancel = scheduledPosts.find(post => post.id === postId);
    if (window.confirm(`Are you sure you want to cancel this scheduled post?\n\n"${postToCancel?.content}"`)) {
      setScheduledPosts(prev => prev.filter(post => post.id !== postId));
      toast({
        title: "Post cancelled",
        description: "The scheduled post has been cancelled.",
      });
    }
  };

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

    if (selectedContacts.length === 0) {
      toast({
        title: "No contacts selected",
        description: "Please select at least one contact to send the post to.",
        variant: "destructive",
      });
      return;
    }

    setIsScheduling(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const scheduledDateTime = `${scheduleDate} ${scheduleTime}`;
    
    if (editingPost) {
      // Update existing post
      setScheduledPosts(prev => prev.map(post => 
        post.id === editingPost.id 
          ? {
              ...post,
              content: postContent,
              scheduledFor: scheduledDateTime,
              contacts: selectedContacts.map(c => ({ id: c.id, name: c.name }))
            }
          : post
      ));
      
      toast({
        title: "Post updated!",
        description: `Your ${config.name} post has been updated for ${selectedContacts.length} contact${selectedContacts.length > 1 ? 's' : ''}.`,
      });
      setEditingPost(null);
    } else {
      // Create new post
      const newPost: ScheduledPost = {
        id: scheduledPosts.length + 1,
        content: postContent,
        scheduledFor: scheduledDateTime,
        status: 'pending',
        contacts: selectedContacts.map(c => ({ id: c.id, name: c.name }))
      };

      setScheduledPosts(prev => [newPost, ...prev]);
      
      toast({
        title: "Post scheduled!",
        description: `Your ${config.name} post has been scheduled for ${selectedContacts.length} contact${selectedContacts.length > 1 ? 's' : ''}.`,
      });
    }

    setPostContent('');
    setScheduleDate('');
    setScheduleTime('');
    setSelectedContacts([]);
    setIsScheduling(false);
  };

  const handleAiHelp = async () => {
    setIsAiHelping(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    const aiSuggestions = [
      "🚀 Exciting news! We're launching something amazing today. Stay tuned for more updates!",
      "✨ Behind the scenes: Our team working hard to bring you the best experience possible.",
      "🎉 Thank you to our amazing community for your continued support and feedback!",
      "💡 Pro tip: Consistency is key when building your online presence. Keep posting regularly!",
      "🔥 Just dropped our latest feature update. Check it out and let us know what you think!",
      "👋 HELLO! This is a sample post generated by our AI assistant. Feel free to edit it!",
      "🌟 We're thrilled to announce our partnership with [Partner Name]. Together, we're stronger!",
    ];
    const randomSuggestion = aiSuggestions[Math.floor(Math.random() * aiSuggestions.length)];
    setPostContent(randomSuggestion);
    setIsAiHelping(false);
    toast({
      title: "AI Helper",
      description: "I've generated a post suggestion for you!",
    });
  };

  const handleDeletePost = (postId: number) => {
    const postToDelete = scheduledPosts.find(post => post.id === postId);
    if (window.confirm(`Are you sure you want to delete this post?\n\n"${postToDelete?.content}"`)) {
      setScheduledPosts(prev => prev.filter(post => post.id !== postId));
      toast({
        title: "Post deleted",
        description: "The post has been removed from your history.",
      });
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.1 }
        }
      }}
      className="space-y-8"
    >
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Side - Contacts */}
        <motion.div variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}>
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Users className="w-6 h-6" />
            Select Contacts
          </h2>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 max-h-[600px] overflow-y-auto">
            <div className="space-y-3">
              {contacts.map((contact) => {
                const isSelected = selectedContacts.some(c => c.id === contact.id);
                return (
                  <motion.div
                    key={contact.id}
                    className={`flex items-center justify-between p-4 rounded-xl cursor-pointer transition-all duration-200 ${
                      isSelected 
                        ? 'bg-purple-500/20 border-2 border-purple-400/50' 
                        : 'bg-white/5 border border-white/10 hover:bg-white/10'
                    }`}
                    onClick={() => handleContactSelect(contact)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full flex items-center justify-center text-white font-semibold">
                          {contact.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </div>
                        <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                          contact.status === 'online' ? 'bg-green-400' : 'bg-gray-400'
                        }`} />
                      </div>
                      <div>
                        <p className="text-white font-medium">{contact.name}</p>
                        <p className={`text-xs ${contact.status === 'online' ? 'text-green-300' : 'text-gray-400'}`}>
                          {contact.status}
                        </p>
                      </div>
                    </div>
                    <div className={`w-5 h-5 rounded border-2 transition-all ${
                      isSelected 
                        ? 'bg-purple-500 border-purple-500' 
                        : 'border-white/30'
                    }`}>
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-full h-full flex items-center justify-center"
                        >
                          <div className="w-2 h-2 bg-white rounded-full" />
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
            
            {selectedContacts.length > 0 && (
              <div className="mt-6 p-4 bg-purple-500/10 rounded-xl border border-purple-400/20">
                <p className="text-purple-300 text-sm font-medium mb-2">
                  {selectedContacts.length} contact{selectedContacts.length > 1 ? 's' : ''} selected
                </p>
                <div className="flex flex-wrap gap-2">
                  {selectedContacts.slice(0, 3).map((contact) => (
                    <span key={contact.id} className="text-xs bg-purple-500/20 text-purple-200 px-2 py-1 rounded-full">
                      {contact.name}
                    </span>
                  ))}
                  {selectedContacts.length > 3 && (
                    <span className="text-xs bg-purple-500/20 text-purple-200 px-2 py-1 rounded-full">
                      +{selectedContacts.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Right Side - Schedule New Post */}
        <motion.div variants={{ hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0 } }}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">
              {editingPost ? 'Edit Post' : 'Schedule New Post'}
            </h2>
            {editingPost && (
              <Button
                onClick={handleCancelEdit}
                variant="ghost"
                className="text-white/60 hover:text-white hover:bg-white/10"
              >
                <X className="w-4 h-4 mr-2" />
                Cancel Edit
              </Button>
            )}
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <form onSubmit={handleSchedulePost} className="space-y-6">
              {/* Selected Contacts Display */}
              {selectedContacts.length > 0 && (
                <div>
                  <Label className="text-white/90 mb-3 block">Selected Contacts ({selectedContacts.length})</Label>
                  <div className="flex flex-wrap gap-2 max-h-24 overflow-y-auto">
                    {selectedContacts.map((contact) => (
                      <motion.div
                        key={contact.id}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        className="flex items-center gap-2 bg-purple-500/20 text-purple-200 px-3 py-1 rounded-full text-sm border border-purple-400/30"
                      >
                        <User className="w-3 h-3" />
                        <span>{contact.name}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveContact(contact.id)}
                          className="text-purple-300 hover:text-white transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label htmlFor="content" className="text-white/90">Post Content</Label>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={handleAiHelp}
                    disabled={isAiHelping}
                    className="border border-white/30 text-white/80 hover:bg-white/10 hover:border-white/50"
                  >
                    {isAiHelping ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full mr-2"
                      />
                    ) : (
                      <Bot className="w-4 h-4 mr-2" />
                    )}
                    {isAiHelping ? 'Generating...' : 'AI Helper'}
                  </Button>
                </div>
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
                  variant="ghost"
                  className="bg-white/20 border-white/30 text-white/80 hover:bg-white/10 hover:border-white/50"
                >
                  <Image className="w-4 h-4 mr-2" />
                  Add Media
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  className="bg-white/20 border-white/30 text-white/80 hover:bg-white/10 hover:border-white/50"
                >
                  <Hash className="w-4 h-4 mr-2" />
                  Add Tags
                </Button>
              </div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  type="submit"
                  disabled={isScheduling}
                  className={`w-full bg-gradient-to-r ${config.color} hover:opacity-90 text-white border-0 px-6 py-3 font-semibold rounded-xl shadow-xl`}
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
                  {isScheduling ? 'Scheduling...' : editingPost ? 'Update Post' : 'Schedule Post'}
                </Button>
              </motion.div>
            </form>
          </div>
        </motion.div>
      </div>

      {/* Scheduled Posts */}
      <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
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
                <div className="flex items-center gap-2">
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    post.status === 'pending'
                      ? 'bg-yellow-500/20 text-yellow-300'
                      : 'bg-green-500/20 text-green-300'
                  }`}>
                    {post.status}
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDeletePost(post.id)}
                    className="text-red-400 hover:text-red-300 hover:bg-red-500/10 p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Contact Recipients */}
              <div className="mb-4">
                <p className="text-white/70 text-sm mb-2">Recipients ({post.contacts.length}):</p>
                <div className="flex flex-wrap gap-2">
                  {post.contacts.map((contact) => (
                    <span
                      key={contact.id}
                      className="text-xs bg-blue-500/20 text-blue-200 px-2 py-1 rounded-full border border-blue-400/20"
                    >
                      {contact.name}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between text-white/70 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>Scheduled for {post.scheduledFor}</span>
                </div>
                {post.status === 'pending' && (
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      onClick={() => handleEditPost(post)}
                      className="text-white/60 hover:text-white hover:bg-white/10"
                    >
                      <Edit className="w-3 h-3 mr-1" />
                      Edit
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      onClick={() => handleCancelPost(post.id)}
                      className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                    >
                      <XCircle className="w-3 h-3 mr-1" />
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
      <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
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
