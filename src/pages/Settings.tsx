
import { motion } from 'framer-motion';
import { ArrowLeft, Bell, Shield, Palette, Globe, Database, Key, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useTheme } from '@/contexts/ThemeContext';
import { Link } from 'react-router-dom';

const Settings = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

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

  const settingSections = [
    {
      title: 'Appearance',
      icon: Palette,
      settings: [
        { 
          id: 'dark-mode', 
          label: 'Dark Mode', 
          description: 'Use dark theme',
          isTheme: true,
          checked: theme === 'dark'
        },
        { id: 'compact-view', label: 'Compact View', description: 'Show more content in less space' },
        { id: 'animations', label: 'Animations', description: 'Enable interface animations' }
      ]
    },
    {
      title: 'Notifications',
      icon: Bell,
      settings: [
        { id: 'email-notifications', label: 'Email Notifications', description: 'Receive updates via email' },
        { id: 'push-notifications', label: 'Push Notifications', description: 'Browser push notifications' },
        { id: 'post-reminders', label: 'Post Reminders', description: 'Remind me before scheduled posts' }
      ]
    },
    {
      title: 'Privacy & Security',
      icon: Shield,
      settings: [
        { id: 'two-factor', label: 'Two-Factor Authentication', description: 'Add extra security to your account' },
        { id: 'data-sharing', label: 'Data Sharing', description: 'Allow analytics data sharing' },
        { id: 'profile-visibility', label: 'Profile Visibility', description: 'Make profile public' }
      ]
    },
    {
      title: 'General',
      icon: Globe,
      settings: [
        { id: 'auto-save', label: 'Auto Save Drafts', description: 'Automatically save post drafts' },
        { id: 'timezone-sync', label: 'Timezone Sync', description: 'Sync with system timezone' },
        { id: 'analytics-tracking', label: 'Analytics Tracking', description: 'Track usage for improvements' }
      ]
    }
  ];

  const handleSwitchChange = (settingId: string, isTheme: boolean) => {
    if (isTheme) {
      toggleTheme();
    }
    // Handle other settings here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 dark:from-gray-900 dark:via-gray-800 dark:to-black relative overflow-hidden">
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
          <h1 className="text-3xl font-bold text-white">Settings</h1>
        </motion.div>

        {/* Settings Sections */}
        <div className="space-y-8">
          {settingSections.map((section, sectionIndex) => {
            const IconComponent = section.icon;
            return (
              <motion.div
                key={section.title}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
                variants={itemVariants}
              >
                <div className="flex items-center gap-3 mb-6">
                  <IconComponent className="w-6 h-6 text-purple-400" />
                  <h2 className="text-xl font-bold text-white">{section.title}</h2>
                </div>
                
                <div className="space-y-4">
                  {section.settings.map((setting, index) => (
                    <div key={setting.id} className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                      <div className="flex-1">
                        <Label htmlFor={setting.id} className="text-white font-medium cursor-pointer flex items-center gap-2">
                          {setting.isTheme && (theme === 'dark' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />)}
                          {setting.label}
                        </Label>
                        <p className="text-white/60 text-sm mt-1">{setting.description}</p>
                      </div>
                      <Switch 
                        id={setting.id} 
                        className="data-[state=checked]:bg-purple-600"
                        checked={setting.checked}
                        onCheckedChange={() => handleSwitchChange(setting.id, setting.isTheme || false)}
                      />
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Danger Zone */}
        <motion.div 
          className="bg-red-500/10 backdrop-blur-md rounded-2xl p-6 border border-red-500/20 mt-8"
          variants={itemVariants}
        >
          <h2 className="text-xl font-bold text-red-400 mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Danger Zone
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-red-500/5 rounded-xl">
              <div>
                <p className="text-white font-medium">Delete Account</p>
                <p className="text-white/60 text-sm">Permanently delete your account and all data</p>
              </div>
              <Link to="/lo">
  <Button variant="destructive" size="sm">
    Delete Account
  </Button>
</Link>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Settings;
