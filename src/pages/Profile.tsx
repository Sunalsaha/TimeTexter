
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Mail, Calendar, MapPin, Camera, Edit3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import ProfileEditModal from '@/components/ProfileEditModal';
import AccountSettingsModal from '@/components/AccountSettingsModal';

const Profile = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [settingsTab, setSettingsTab] = useState<'password' | 'privacy' | 'notifications' | 'apps'>('password');
  const [joinDate, setJoinDate] = useState('');

  useEffect(() => {
    // Get real join date from user data or localStorage
    const userData = localStorage.getItem('userProfile');
    if (userData) {
      const parsed = JSON.parse(userData);
      if (parsed.joinDate) {
        setJoinDate(new Date(parsed.joinDate).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long'
        }));
      } else {
        // Set current date as join date if not exists
        const currentDate = new Date().toISOString();
        const updatedUser = { ...parsed, joinDate: currentDate };
        localStorage.setItem('userProfile', JSON.stringify(updatedUser));
        setJoinDate(new Date(currentDate).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long'
        }));
      }
    } else {
      setJoinDate(new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long'
      }));
    }
  }, []);

  const handleSettingsClick = (tab: 'password' | 'privacy' | 'notifications' | 'apps') => {
    setSettingsTab(tab);
    setIsSettingsModalOpen(true);
  };

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
        className="container mx-auto px-4 py-4 sm:py-8 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div className="flex items-center mb-6 sm:mb-8" variants={itemVariants}>
          <Button
            variant="ghost"
            onClick={() => navigate('/dashboard')}
            className="text-white/80 hover:text-white hover:bg-white/10 mr-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Back to Dashboard</span>
            <span className="sm:hidden">Back</span>
          </Button>
          <h1 className="text-2xl sm:text-3xl font-bold">Profile</h1>
        </motion.div>

        {/* Profile Card */}
        <motion.div
          className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-8 border border-white/20 mb-6 sm:mb-8"
          variants={itemVariants}
        >
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
            {/* Avatar */}
            <div className="relative">
              <Avatar className="w-24 h-24 sm:w-32 sm:h-32">
                <AvatarImage src={user?.profileImage || "/placeholder.svg"} alt={user?.username} />
                <AvatarFallback className="bg-purple-600 text-white text-xl sm:text-2xl">
                  {user?.username?.[0]?.toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
              <Button
                size="sm"
                onClick={() => setIsEditModalOpen(true)}
                className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 rounded-full bg-purple-600 hover:bg-purple-700 w-8 h-8 sm:w-10 sm:h-10 p-0"
              >
                <Camera className="w-3 h-3 sm:w-4 sm:h-4" />
              </Button>
            </div>

            {/* Info */}
            <div className="flex-1 text-center sm:text-left">
              <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 mb-4 justify-center sm:justify-start">
                <h2 className="text-xl sm:text-2xl font-bold">{user?.username || 'User'}</h2>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setIsEditModalOpen(true)}
                  className="bg-white/30 text-white border border-white/30 hover:bg-white/10 hover:border-white/50 text-xs sm:text-sm"
                >
                  <Edit3 className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  Edit
                </Button>
              </div>

              <div className="space-y-2 text-white/70 text-sm sm:text-base">
                <div className="flex items-center gap-2 justify-center sm:justify-start">
                  <Mail className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>{user?.email || 'user@example.com'}</span>
                </div>
                <div className="flex items-center gap-2 justify-center sm:justify-start">
                  <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>Joined {joinDate}</span>
                </div>
                <div className="flex items-center gap-2 justify-center sm:justify-start">
                  <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>{user?.location || 'Location not set'}</span>
                </div>
                {user?.bio && (
                  <div className="mt-3 sm:mt-4">
                    <p className="text-white/80 italic">{user.bio}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8" variants={itemVariants}>
          {[
            { label: 'Connected Platforms', value: '6', color: 'text-blue-400' },
            { label: 'Posts Scheduled', value: '24', color: 'text-green-400' },
            { label: 'Total Followers', value: '12.5K', color: 'text-purple-400' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-white/20 text-center"
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <p className="text-white/70 text-xs sm:text-sm font-medium mb-1">{stat.label}</p>
              <p className={`text-2xl sm:text-3xl font-bold ${stat.color}`}>{stat.value}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Account Settings */}
        <motion.div
          className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-white/20"
          variants={itemVariants}
        >
          <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">Account Settings</h3>
          <div className="space-y-3 sm:space-y-4">
            {[
              { label: 'Change Password', description: 'Update your account password', action: () => handleSettingsClick('password') },
              { label: 'Privacy Settings', description: 'Manage your privacy preferences', action: () => handleSettingsClick('privacy') },
              { label: 'Notification Settings', description: 'Configure how you receive notifications', action: () => handleSettingsClick('notifications') },
              { label: 'Connected Apps', description: 'Manage third-party app connections', action: () => handleSettingsClick('apps') },
            ].map((setting, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 sm:p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
                onClick={setting.action}
              >
                <div>
                  <p className="font-medium text-sm sm:text-base">{setting.label}</p>
                  <p className="text-white/60 text-xs sm:text-sm">{setting.description}</p>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-purple-300 hover:text-white hover:bg-purple-600/20 text-xs sm:text-sm"
                >
                  Edit
                </Button>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Modals */}
      <ProfileEditModal 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)} 
      />
      <AccountSettingsModal 
        isOpen={isSettingsModalOpen} 
        onClose={() => setIsSettingsModalOpen(false)} 
        initialTab={settingsTab}
      />
    </div>
  );
};

export default Profile;
