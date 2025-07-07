import { motion } from 'framer-motion';
import { Facebook, Mail, MessageCircle, Settings, LogOut, User, Instagram, Linkedin, Youtube, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
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
      route: '/platform/facebook'
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
      route: '/platform/twitter'
    },
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      color: 'from-green-600 to-green-700',
      hoverColor: 'hover:from-green-700 hover:to-green-800',
      route: '/platform/whatsapp'
    },
    {
      name: 'Instagram',
      icon: Instagram,
      color: 'from-pink-500 to-purple-600',
      hoverColor: 'hover:from-pink-600 hover:to-purple-700',
      route: '/platform/instagram'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      color: 'from-blue-500 to-blue-600',
      hoverColor: 'hover:from-blue-600 hover:to-blue-700',
      route: '/platform/linkedin'
    },
    {
      name: 'YouTube',
      icon: Youtube,
      color: 'from-red-600 to-red-700',
      hoverColor: 'hover:from-red-700 hover:to-red-800',
      route: '/platform/youtube'
    },
    {
      name: 'Messenger',
      icon: MessageSquare,
      color: 'from-blue-500 to-purple-600',
      hoverColor: 'hover:from-blue-600 hover:to-purple-700',
      route: '/platform/messenger'
    },
    {
      name: 'Email',
      icon: Mail,
      color: 'from-purple-600 to-purple-700',
      hoverColor: 'hover:from-purple-700 hover:to-purple-800',
      route: '/platform/email'
    }
  ];

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
          title: "Analytics",
          description: "Analytics feature coming soon!",
        });
        break;
      case 'team':
        toast({
          title: "Team Management",
          description: "Team management feature coming soon!",
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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white/80 hover:text-white hover:bg-white/10"
                  >
                    <User className="w-4 h-4 mr-2" />
                    Profile
                  </Button>
                </motion.div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white/10 backdrop-blur-md border-white/20 z-50">
                <DropdownMenuItem 
                  className="text-white/80 hover:text-white hover:bg-white/10 cursor-pointer"
                  onClick={() => toast({ title: "Settings", description: "Settings feature coming soon!" })}
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

        {/* Stats Cards - Only Connected Accounts and Scheduled Posts */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
          variants={itemVariants}
        >
          {[
            { label: 'Connected Accounts', value: '8', color: 'text-blue-400' },
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
                  className={`bg-gradient-to-br ${platform.color} ${platform.hoverColor} rounded-2xl p-8 cursor-pointer shadow-2xl group relative overflow-hidden`}
                  whileHover={{ 
                    y: -10, 
                    scale: 1.05,
                    rotateY: 5 
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  onClick={() => navigate(platform.route)}
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
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                      <span className="text-white/70 text-xs">Connected</span>
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
