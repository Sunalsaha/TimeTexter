
import { motion } from 'framer-motion';
import { Facebook, Mail, MessageCircle, Settings, LogOut, User, Instagram, Linkedin, MessageSquare, Send, Crown, Zap } from 'lucide-react';
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
      available: true
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
      available: true
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
      case 'schedule':
        navigate('/platform/facebook');
        toast({
          title: "Schedule Post",
          description: "Redirecting to Facebook platform to schedule a post.",
        });
        break;
      case 'analytics':
        toast({
          title: "Analytics Dashboard",
          description: "Opening analytics overview...",
        });
        break;
      case 'team':
        toast({
          title: "Team Management",
          description: "Opening team management panel...",
        });
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
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10"></div>
      </div>
      
      <motion.div
        className="container mx-auto px-4 py-8 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.header 
          className="flex justify-between items-center mb-12"
          variants={itemVariants}
        >
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Welcome back, {user?.username || 'User'}!
            </h1>
            <p className="text-white/70 text-lg">Manage all your social platforms from one place</p>
          </div>
          
          <div className="flex items-center gap-4">
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
                className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold px-6 py-3 rounded-full shadow-xl border-2 border-yellow-300"
                onClick={() => toast({ title: "Premium", description: "Premium features coming soon!" })}
              >
                <Crown className="w-5 h-5 mr-2 animate-pulse" />
                <motion.span
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  Go Premium
                </motion.span>
                <Zap className="w-4 h-4 ml-2" />
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
                  <Avatar className="w-12 h-12 border-2 border-white/20 hover:border-white/40 transition-colors">
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
                  onClick={() => toast({ title: "Explore", description: "Explore features coming soon!" })}
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Explore
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="text-white/80 hover:text-white hover:bg-white/10 cursor-pointer"
                  onClick={() => toast({ title: "Premium", description: "Premium features coming soon!" })}
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
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
          variants={itemVariants}
        >
          {[
            { label: 'Connected Accounts', value: '6', color: 'text-blue-400' },
            { label: 'Scheduled Posts', value: '12', color: 'text-green-400' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <p className="text-white/70 text-sm font-medium mb-1">{stat.label}</p>
              <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Platform Grid */}
        <motion.div variants={itemVariants}>
          <h2 className="text-2xl font-bold text-white mb-8">Your Platforms</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {socialPlatforms.map((platform, index) => {
              const IconComponent = platform.icon;
              return (
                <motion.div
                  key={platform.name}
                  className={`bg-gradient-to-br ${platform.color} ${platform.hoverColor} rounded-2xl p-8 cursor-pointer shadow-2xl group relative overflow-hidden ${!platform.available ? 'opacity-75' : ''}`}
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
                  {/* Background Glow */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-white/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="relative z-10">
                    <div className="mb-4 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{platform.name}</h3>
                    <p className="text-white/80 text-sm">Manage your {platform.name.toLowerCase()} presence</p>
                    
                    {/* Status Indicator */}
                    <div className="flex items-center mt-4">
                      <div className={`w-2 h-2 ${platform.available ? 'bg-green-400' : 'bg-yellow-400'} rounded-full mr-2 animate-pulse`}></div>
                      <span className="text-white/70 text-xs">{platform.available ? 'Available' : 'Coming Soon'}</span>
                    </div>
                  </div>

                  {/* Hover Effect Overlay */}
                  <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div 
          className="mt-16"
          variants={itemVariants}
        >
          <h2 className="text-2xl font-bold text-white mb-8">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Schedule Post', description: 'Plan your content across platforms', action: 'schedule' },
              { title: 'Analytics', description: 'View your performance metrics', action: 'analytics' },
              { title: 'Team Management', description: 'Manage your team access', action: 'team' }
            ].map((action, index) => (
              <motion.div
                key={index}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 cursor-pointer"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
                onClick={() => handleQuickAction(action.action)}
              >
                <h3 className="text-lg font-semibold text-white mb-2">{action.title}</h3>
                <p className="text-white/70 text-sm mb-4">{action.description}</p>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-purple-300 hover:text-white hover:bg-purple-600/20"
                >
                  {action.title === 'Schedule Post' ? 'Create' : action.title === 'Analytics' ? 'View' : 'Manage'}
                </Button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-purple-500/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl animate-pulse"></div>
      <div className="absolute top-1/2 right-20 w-16 h-16 bg-pink-500/20 rounded-full blur-lg animate-pulse"></div>
    </div>
  );
};

export default Dashboard;
