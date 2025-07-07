
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Calendar, Send, Settings, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { PlatformInterface } from '@/components/PlatformInterface';
import { SchedulingTab } from '@/components/SchedulingTab';

const Platform = () => {
  const { platform } = useParams<{ platform: string }>();
  const navigate = useNavigate();
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [activeTab, setActiveTab] = useState('interface');

  useEffect(() => {
    // Check if platform is already connected (simulate OAuth check)
    const connectedPlatforms = JSON.parse(localStorage.getItem('connectedPlatforms') || '[]');
    setIsConnected(connectedPlatforms.includes(platform));
  }, [platform]);

  const handleOAuthConnect = async () => {
    setIsConnecting(true);
    
    // Simulate OAuth flow
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Store connection
    const connectedPlatforms = JSON.parse(localStorage.getItem('connectedPlatforms') || '[]');
    if (!connectedPlatforms.includes(platform)) {
      connectedPlatforms.push(platform);
      localStorage.setItem('connectedPlatforms', JSON.stringify(connectedPlatforms));
    }
    
    // Store mock access token
    localStorage.setItem(`${platform}_token`, `mock_token_${Date.now()}`);
    
    setIsConnected(true);
    setIsConnecting(false);
    
    toast({
      title: "Connected successfully!",
      description: `Your ${platform} account has been connected.`,
    });
  };

  const platformConfig = {
    facebook: {
      name: 'Facebook',
      color: 'from-blue-600 to-blue-700',
      bgColor: 'bg-blue-600/20'
    },
    twitter: {
      name: 'X (Twitter)',
      color: 'from-gray-800 to-black',
      bgColor: 'bg-gray-800/20'
    },
    whatsapp: {
      name: 'WhatsApp',
      color: 'from-green-600 to-green-700',
      bgColor: 'bg-green-600/20'
    },
    instagram: {
      name: 'Instagram',
      color: 'from-pink-500 to-purple-600',
      bgColor: 'bg-pink-500/20'
    },
    linkedin: {
      name: 'LinkedIn',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-500/20'
    },
    telegram: {
      name: 'Telegram',
      color: 'from-blue-400 to-blue-500',
      bgColor: 'bg-blue-400/20'
    },
    phone: {
      name: 'Phone Message',
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-500/20'
    },
    email: {
      name: 'Email',
      color: 'from-purple-600 to-purple-700',
      bgColor: 'bg-purple-600/20'
    }
  };

  const config = platformConfig[platform as keyof typeof platformConfig];

  if (!config) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-2xl font-bold mb-4">Platform not found</h1>
          <Button onClick={() => navigate('/dashboard')}>Back to Dashboard</Button>
        </div>
      </div>
    );
  }

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10"></div>
        </div>
        
        <div className="container mx-auto px-4 py-8 relative z-10">
          <Button
            variant="ghost"
            onClick={() => navigate('/dashboard')}
            className="text-white/80 hover:text-white hover:bg-white/10 mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>

          <motion.div
            className="max-w-md mx-auto mt-32"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 text-center">
              <div className={`w-20 h-20 ${config.bgColor} rounded-full flex items-center justify-center mx-auto mb-6`}>
                <span className="text-3xl font-bold text-white">{config.name[0]}</span>
              </div>
              
              <h1 className="text-3xl font-bold text-white mb-4">Connect {config.name}</h1>
              <p className="text-white/70 mb-8">
                Connect your {config.name} account to start managing your content and scheduling posts.
              </p>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={handleOAuthConnect}
                  disabled={isConnecting}
                  className={`bg-gradient-to-r ${config.color} hover:opacity-90 text-white border-0 px-8 py-3 text-lg font-semibold rounded-xl shadow-xl`}
                >
                  {isConnecting ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full mr-2"
                    />
                  ) : null}
                  {isConnecting ? 'Connecting...' : `Connect ${config.name}`}
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10"></div>
      </div>
      
      <motion.div
        className="container mx-auto px-4 py-8 relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => navigate('/dashboard')}
              className="text-white/80 hover:text-white hover:bg-white/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            
            <div>
              <h1 className="text-3xl font-bold text-white">{config.name}</h1>
              <p className="text-white/70">Manage your {config.name.toLowerCase()} presence</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-white/70 text-sm">Connected</span>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="bg-white/10 border-white/20 mb-8">
            <TabsTrigger 
              value="interface" 
              className="data-[state=active]:bg-white/20 data-[state=active]:text-white text-white/70"
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Interface
            </TabsTrigger>
            <TabsTrigger 
              value="scheduling" 
              className="data-[state=active]:bg-white/20 data-[state=active]:text-white text-white/70"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Scheduling
            </TabsTrigger>
          </TabsList>

          <AnimatePresence mode="wait">
            <TabsContent value="interface" className="mt-0">
              <motion.div
                key="interface"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <PlatformInterface platform={platform!} config={config} />
              </motion.div>
            </TabsContent>

            <TabsContent value="scheduling" className="mt-0">
              <motion.div
                key="scheduling"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <SchedulingTab platform={platform!} config={config} />
              </motion.div>
            </TabsContent>
          </AnimatePresence>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default Platform;
