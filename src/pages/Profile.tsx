import { motion } from 'framer-motion';
import { ArrowLeft, Mail, Calendar, MapPin, Camera, Edit3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Profile = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 dark:from-gray-900 dark:via-gray-800 dark:to-black relative overflow-hidden text-white">
      {/* Gradient Overlay */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10"></div>
      </div>

      {/* Main Content */}
      <motion.div
        className="container mx-auto px-4 py-8 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div className="flex items-center mb-8" variants={itemVariants}>
          <Button
            variant="ghost"
            onClick={() => navigate('/dashboard')}
            className="text-white/80 hover:text-white hover:bg-white/10 mr-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          <h1 className="text-3xl font-bold">Profile</h1>
        </motion.div>

        {/* Profile Card */}
        <motion.div
          className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 mb-8"
          variants={itemVariants}
        >
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Avatar */}
            <div className="relative">
              <Avatar className="w-32 h-32">
                <AvatarImage src="/placeholder.svg" alt={user?.username} />
                <AvatarFallback className="bg-purple-600 text-white text-2xl">
                  {user?.username?.[0]?.toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
              <Button
                size="sm"
                className="absolute -bottom-2 -right-2 rounded-full bg-purple-600 hover:bg-purple-700"
              >
                <Camera className="w-4 h-4" />
              </Button>
            </div>

            {/* Info */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center gap-3 mb-4 justify-center md:justify-start">
                <h2 className="text-2xl font-bold">{user?.username || 'User'}</h2>
                <Button

  size="sm"
  variant="ghost"
  className="bg-white/30 text-white border border-white/30 hover:bg-white/10 hover:border-white/50"
>
  <Edit3 className="w-4 h-4 mr-2" />
  Edit
</Button>


              </div>

              <div className="space-y-2 text-white/70">
                <div className="flex items-center gap-2 justify-center md:justify-start">
                  <Mail className="w-4 h-4" />
                  <span>{user?.email || 'user@example.com'}</span>
                </div>
                <div className="flex items-center gap-2 justify-center md:justify-start">
                  <Calendar className="w-4 h-4" />
                  <span>Joined December 2024</span>
                </div>
                <div className="flex items-center gap-2 justify-center md:justify-start">
                  <MapPin className="w-4 h-4" />
                  <span>New York, USA</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8" variants={itemVariants}>
          {[
            { label: 'Connected Platforms', value: '6', color: 'text-blue-400' },
            { label: 'Posts Scheduled', value: '24', color: 'text-green-400' },
            { label: 'Total Followers', value: '12.5K', color: 'text-purple-400' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 text-center"
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <p className="text-white/70 text-sm font-medium mb-1">{stat.label}</p>
              <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Account Settings */}
        <motion.div
          className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
          variants={itemVariants}
        >
          <h3 className="text-xl font-bold mb-6">Account Settings</h3>
          <div className="space-y-4">
            {[
              { label: 'Change Password', description: 'Update your account password' },
              { label: 'Privacy Settings', description: 'Manage your privacy preferences' },
              { label: 'Notification Settings', description: 'Configure how you receive notifications' },
              { label: 'Connected Apps', description: 'Manage third-party app connections' },
            ].map((setting, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
              >
                <div>
                  <p className="font-medium">{setting.label}</p>
                  <p className="text-white/60 text-sm">{setting.description}</p>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-purple-300 hover:text-white hover:bg-purple-600/20"
                >
                  Edit
                </Button>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Profile;
