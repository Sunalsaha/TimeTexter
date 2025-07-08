
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Eye, EyeOff, Bell, Shield, Link, Key } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

interface AccountSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab: 'password' | 'privacy' | 'notifications' | 'apps';
}

const AccountSettingsModal = ({ isOpen, onClose, initialTab }: AccountSettingsModalProps) => {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('userSettings');
    return saved ? JSON.parse(saved) : {
      privacy: {
        profileVisibility: 'public',
        showEmail: false,
        showLocation: true
      },
      notifications: {
        email: true,
        push: true,
        marketing: false
      }
    };
  });

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "New passwords do not match.",
        variant: "destructive",
      });
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      toast({
        title: "Password Too Short",
        description: "Password must be at least 6 characters long.",
        variant: "destructive",
      });
      return;
    }

    // In a real app, you'd verify the current password
    toast({
      title: "Password Updated",
      description: "Your password has been successfully changed.",
    });
    
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const handleSettingsChange = (category: string, setting: string, value: any) => {
    const newSettings = {
      ...settings,
      [category]: {
        ...settings[category],
        [setting]: value
      }
    };
    setSettings(newSettings);
    localStorage.setItem('userSettings', JSON.stringify(newSettings));
    
    toast({
      title: "Settings Updated",
      description: "Your preferences have been saved.",
    });
  };

  const connectedApps = [
    { name: 'Google', connected: true, icon: '🔗' },
    { name: 'Facebook', connected: true, icon: '🔗' },
    { name: 'Twitter', connected: false, icon: '❌' },
    { name: 'LinkedIn', connected: false, icon: '❌' }
  ];

  const tabs = [
    { id: 'password', label: 'Password', icon: Key },
    { id: 'privacy', label: 'Privacy', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'apps', label: 'Connected Apps', icon: Link }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 max-w-2xl w-full max-h-[80vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Account Settings</h2>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="w-4 h-4 text-white" />
              </Button>
            </div>

            <div className="flex gap-4 mb-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-purple-600 text-white'
                      : 'bg-white/5 text-white/70 hover:bg-white/10'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              ))}
            </div>

            <div className="overflow-y-auto max-h-96">
              {activeTab === 'password' && (
                <form onSubmit={handlePasswordChange} className="space-y-4">
                  <div>
                    <Label htmlFor="currentPassword" className="text-white/90">Current Password</Label>
                    <div className="relative">
                      <Input
                        id="currentPassword"
                        type={showPasswords.current ? "text" : "password"}
                        value={passwordForm.currentPassword}
                        onChange={(e) => setPasswordForm(prev => ({ ...prev, currentPassword: e.target.value }))}
                        className="bg-white/5 border-white/20 text-white pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPasswords(prev => ({ ...prev, current: !prev.current }))}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50"
                      >
                        {showPasswords.current ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="newPassword" className="text-white/90">New Password</Label>
                    <div className="relative">
                      <Input
                        id="newPassword"
                        type={showPasswords.new ? "text" : "password"}
                        value={passwordForm.newPassword}
                        onChange={(e) => setPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))}
                        className="bg-white/5 border-white/20 text-white pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPasswords(prev => ({ ...prev, new: !prev.new }))}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50"
                      >
                        {showPasswords.new ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="confirmPassword" className="text-white/90">Confirm New Password</Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showPasswords.confirm ? "text" : "password"}
                        value={passwordForm.confirmPassword}
                        onChange={(e) => setPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                        className="bg-white/5 border-white/20 text-white pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPasswords(prev => ({ ...prev, confirm: !prev.confirm }))}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50"
                      >
                        {showPasswords.confirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  >
                    Update Password
                  </Button>
                </form>
              )}

              {activeTab === 'privacy' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <div>
                      <p className="text-white font-medium">Profile Visibility</p>
                      <p className="text-white/60 text-sm">Who can see your profile</p>
                    </div>
                    <select
                      value={settings.privacy.profileVisibility}
                      onChange={(e) => handleSettingsChange('privacy', 'profileVisibility', e.target.value)}
                      className="bg-white/10 border border-white/20 text-white rounded px-3 py-1"
                    >
                      <option value="public">Public</option>
                      <option value="private">Private</option>
                      <option value="friends">Friends Only</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <div>
                      <p className="text-white font-medium">Show Email</p>
                      <p className="text-white/60 text-sm">Display email on profile</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.privacy.showEmail}
                      onChange={(e) => handleSettingsChange('privacy', 'showEmail', e.target.checked)}
                      className="w-4 h-4"
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <div>
                      <p className="text-white font-medium">Show Location</p>
                      <p className="text-white/60 text-sm">Display location on profile</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.privacy.showLocation}
                      onChange={(e) => handleSettingsChange('privacy', 'showLocation', e.target.checked)}
                      className="w-4 h-4"
                    />
                  </div>
                </div>
              )}

              {activeTab === 'notifications' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <div>
                      <p className="text-white font-medium">Email Notifications</p>
                      <p className="text-white/60 text-sm">Receive notifications via email</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.notifications.email}
                      onChange={(e) => handleSettingsChange('notifications', 'email', e.target.checked)}
                      className="w-4 h-4"
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <div>
                      <p className="text-white font-medium">Push Notifications</p>
                      <p className="text-white/60 text-sm">Receive push notifications</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.notifications.push}
                      onChange={(e) => handleSettingsChange('notifications', 'push', e.target.checked)}
                      className="w-4 h-4"
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <div>
                      <p className="text-white font-medium">Marketing Emails</p>
                      <p className="text-white/60 text-sm">Receive promotional content</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.notifications.marketing}
                      onChange={(e) => handleSettingsChange('notifications', 'marketing', e.target.checked)}
                      className="w-4 h-4"
                    />
                  </div>
                </div>
              )}

              {activeTab === 'apps' && (
                <div className="space-y-4">
                  {connectedApps.map((app, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{app.icon}</span>
                        <div>
                          <p className="text-white font-medium">{app.name}</p>
                          <p className="text-white/60 text-sm">
                            {app.connected ? 'Connected' : 'Not connected'}
                          </p>
                        </div>
                      </div>
                      <Button
                        onClick={() => {
                          toast({
                            title: app.connected ? "App Disconnected" : "App Connected",
                            description: `${app.name} has been ${app.connected ? 'disconnected' : 'connected'}.`,
                          });
                        }}
                        className={app.connected ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"}
                      >
                        {app.connected ? 'Disconnect' : 'Connect'}
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AccountSettingsModal;
