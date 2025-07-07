
import { motion } from 'framer-motion';
import { Facebook, Mail, MessageCircle, Settings, LogOut, User, Instagram, Linkedin, MessageSquare, Send, Crown, Zap, BarChart3, Users, Calendar, FileText, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You've been successfully logged out.",
    });
    navigate('/');
  };

  const socialPlatforms = [
    {
      name: 'Facebook',
      icon: Facebook,
      color: 'from-blue-600 to-blue-700',
      hoverColor: 'hover:from-blue-700 hover:to-blue-800',
      route: '/platform/facebook',
      available: false
    },
    {
      name: 'X',
      icon: () => (
        <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ),
      color: 'from-gray-800 to-black',
      hoverColor: 'hover:from-gray-900 hover:to-gray-800',
      route: '/platform/twitter',
      available: false
    },
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      color: 'from-green-600 to-green-700',
      hoverColor: 'hover:from-green-700 hover:to-green-800',
      route: '/platform/whatsapp',
      available: false
    },
    {
      name: 'Instagram',
      icon: Instagram,
      color: 'from-pink-500 to-purple-600',
      hoverColor: 'hover:from-pink-600 hover:to-purple-700',
      route: '/platform/instagram',
      available: false
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      color: 'from-blue-500 to-blue-600',
      hoverColor: 'hover:from-blue-600 hover:to-blue-700',
      route: '/platform/linkedin',
      available: false
    },
    {
      name: 'Telegram',
      icon: Send,
      color: 'from-blue-400 to-blue-500',
      hoverColor: 'hover:from-blue-500 hover:to-blue-600',
      route: '/platform/telegram',
      available: true
    },
    {
      name: 'Phone Message',
      icon: MessageSquare,
      color: 'from-green-500 to-green-600',
      hoverColor: 'hover:from-green-600 hover:to-green-700',
      route: '/platform/phone',
      available: true
    },
    {
      name: 'Email',
      icon: Mail,
      color: 'from-purple-600 to-purple-700',
      hoverColor: 'hover:from-purple-700 hover:to-purple-800',
      route: '/platform/email',
      available: true
    }
  ];

  const handlePlatformClick = (platform: any) => {
    if (platform.available) {
      navigate(platform.route);
    } else {
      toast({
        title: "Coming Soon",
        description: `${platform.name} integration is coming soon!`,
      });
    }
  };

  const handleQuickAction = (actionType: string) => {
    switch (actionType) {
      case 'post-now':
        navigate('/post-now');
        break;
      case 'bulk-schedule':
        navigate('/bulk-schedule');
        break;
      case 'templates':
        navigate('/templates');
        break;
    }
  };

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
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10"></div>
      </div>
      
      <motion.div
        className="container mx-auto px-4 py-4 md:py-8 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.header 
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 md:mb-12 gap-4"
          variants={itemVariants}
        >
          <div className="flex items-center gap-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center"
            >
              <Crown className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <h1 className="text-2xl md:text-4xl font-bold text-white mb-1">
                Scheduler
              </h1>
              <p className="text-white/70 text-sm md:text-lg">Welcome back, {user?.username || 'User'}!</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 md:gap-4">
            {/* Premium Button */}
            <motion.div
              animate={{ 
                boxShadow: [
                  "0 0 20px rgba(255, 215, 0, 0.3)",
                  "0 0 40px rgba(255, 215, 0, 0.5)",
                  "0 0 20px rgba(255, 215, 0, 0.3)"
                ]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="rounded-full"
            >
              <Button
                className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold px-4 md:px-6 py-2 md:py-3 rounded-full shadow-xl border-2 border-yellow-300 text-sm md:text-base"
                onClick={() => navigate('/premium')}
              >
                <Crown className="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2 animate-pulse" />
                <motion.span
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  Go Premium
                </motion.span>
                <Zap className="w-3 h-3 md:w-4 md:h-4 ml-1 md:ml-2" />
              </Button>
            </motion.div>

            {/* Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="cursor-pointer"
                >
                  <Avatar className="w-10 h-10 md:w-12 md:h-12 border-2 border-white/20 hover:border-white/40 transition-colors">
                    <AvatarImage src="/placeholder.svg" alt={user?.username} />
                    <AvatarFallback className="bg-purple-600 text-white font-bold">
                      {user?.username?.[0]?.toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                </motion.div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white/10 backdrop-blur-md border-white/20 z-50 w-48">
                <DropdownMenuItem 
                  className="text-white/80 hover:text-white hover:bg-white/10 cursor-pointer"
                  onClick={() => navigate('/profile')}
                >
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="text-white/80 hover:text-white hover:bg-white/10 cursor-pointer"
                  onClick={() => navigate('/analytics')}
                >
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Explore
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="text-white/80 hover:text-white hover:bg-white/10 cursor-pointer"
                  onClick={() => navigate('/premium')}
                >
                  <Crown className="w-4 h-4 mr-2" />
                  Premium
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="text-white/80 hover:text-white hover:bg-white/10 cursor-pointer"
                  onClick={() => navigate('/settings')}
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="text-white/80 hover:text-white hover:bg-white/10 cursor-pointer"
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </motion.header>

        {/* Stats Cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8 md:mb-12"
          variants={itemVariants}
        >
          {[
            { label: 'Connected Accounts', value: '3', color: 'text-blue-400' },
            { label: 'Scheduled Posts', value: '12', color: 'text-green-400' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-4 md:p-6 border border-white/20"
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <p className="text-white/70 text-sm font-medium mb-1">{stat.label}</p>
              <p className={`text-2xl md:text-3xl font-bold ${stat.color}`}>{stat.value}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Platform Grid */}
        <motion.div variants={itemVariants}>
          <h2 className="text-xl md:text-2xl font-bold text-white mb-6 md:mb-8">Your Platforms</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {socialPlatforms.map((platform, index) => {
              const IconComponent = platform.icon;
              return (
                <motion.div
                  key={platform.name}
                  className={`bg-gradient-to-br ${platform.color} ${platform.hoverColor} rounded-2xl p-4 md:p-8 cursor-pointer shadow-2xl group relative overflow-hidden ${!platform.available ? 'opacity-75' : ''}`}
                  whileHover={{ 
                    y: -10, 
                    scale: 1.05,
                    rotateY: 5 
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  onClick={() => handlePlatformClick(platform)}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{ transitionDelay: `${index * 0.1}s` }}
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-white/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="relative z-10">
                    <div className="mb-2 md:mb-4 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent />
                    </div>
                    <h3 className="text-sm md:text-xl font-bold text-white mb-1 md:mb-2">{platform.name}</h3>
                    <p className="text-white/80 text-xs md:text-sm hidden md:block">Manage your {platform.name.toLowerCase()} presence</p>
                    
                    <div className="flex items-center mt-2 md:mt-4">
                      <div className={`w-2 h-2 ${platform.available ? 'bg-green-400' : 'bg-yellow-400'} rounded-full mr-2 animate-pulse`}></div>
                      <span className="text-white/70 text-xs">{platform.available ? 'Available' : 'Coming Soon'}</span>
                    </div>
                  </div>

                  <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div 
          className="mt-12 md:mt-16"
          variants={itemVariants}
        >
          <h2 className="text-xl md:text-2xl font-bold text-white mb-6 md:mb-8">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {[
              { title: 'Post Now', description: 'Create and publish content instantly', action: 'post-now', icon: Calendar },
              { title: 'Bulk Schedule', description: 'Schedule multiple posts at once', action: 'bulk-schedule', icon: Layers },
              { title: 'Content Templates', description: 'Use pre-made content templates', action: 'templates', icon: FileText }
            ].map((action, index) => {
              const IconComponent = action.icon;
              return (
                <motion.div
                  key={index}
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-4 md:p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 cursor-pointer"
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  onClick={() => handleQuickAction(action.action)}
                >
                  <IconComponent className="w-8 h-8 text-purple-400 mb-3" />
                  <h3 className="text-base md:text-lg font-semibold text-white mb-2">{action.title}</h3>
                  <p className="text-white/70 text-sm mb-4">{action.description}</p>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-purple-300 hover:text-white hover:bg-purple-600/20"
                  >
                    {action.title === 'Post Now' ? 'Create' : action.title === 'Bulk Schedule' ? 'Schedule' : 'Browse'}
                  </Button>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </motion.div>

      {/* Floating Elements */}
      <motion.div 
        className="absolute top-20 left-10 w-20 h-20 bg-purple-500/20 rounded-full blur-xl"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ 
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="absolute bottom-20 right-10 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl"
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.5, 0.2]
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
      <motion.div 
        className="absolute top-1/2 right-20 w-16 h-16 bg-pink-500/20 rounded-full blur-lg"
        animate={{ 
          scale: [1, 1.4, 1],
          opacity: [0.4, 0.7, 0.4]
        }}
        transition={{ 
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />
    </div>
  );
};

export default Dashboard;
