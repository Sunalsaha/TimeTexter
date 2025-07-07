
import { motion } from 'framer-motion';
import { ArrowLeft, Users, UserPlus, Shield, Crown, Settings, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const TeamManagement = () => {
  const navigate = useNavigate();

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

  const teamMembers = [
    { name: 'John Doe', email: 'john@example.com', role: 'Admin', avatar: '/placeholder.svg', status: 'active' },
    { name: 'Jane Smith', email: 'jane@example.com', role: 'Editor', avatar: '/placeholder.svg', status: 'active' },
    { name: 'Mike Johnson', email: 'mike@example.com', role: 'Viewer', avatar: '/placeholder.svg', status: 'pending' },
    { name: 'Sarah Wilson', email: 'sarah@example.com', role: 'Editor', avatar: '/placeholder.svg', status: 'active' }
  ];

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'Admin': return Crown;
      case 'Editor': return Settings;
      default: return Shield;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Admin': return 'text-yellow-400';
      case 'Editor': return 'text-blue-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10"></div>
      </div>
      
      <motion.div
        className="container mx-auto px-4 py-8 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          className="flex items-center justify-between mb-8"
          variants={itemVariants}
        >
          <div className="flex items-center">
            <Button
              variant="ghost"
              onClick={() => navigate('/dashboard')}
              className="text-white/80 hover:text-white hover:bg-white/10 mr-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            <h1 className="text-3xl font-bold text-white">Team Management</h1>
          </div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
              <UserPlus className="w-4 h-4 mr-2" />
              Invite Member
            </Button>
          </motion.div>
        </motion.div>

        {/* Team Stats */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          variants={itemVariants}
        >
          {[
            { label: 'Total Members', value: '4', icon: Users, color: 'text-blue-400' },
            { label: 'Active Members', value: '3', icon: Shield, color: 'text-green-400' },
            { label: 'Pending Invites', value: '1', icon: Mail, color: 'text-yellow-400' }
          ].map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <motion.div
                key={index}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <IconComponent className={`w-8 h-8 ${stat.color}`} />
                  <span className="text-white/70">{stat.label}</span>
                </div>
                <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Team Members */}
        <motion.div variants={itemVariants}>
          <h2 className="text-2xl font-bold text-white mb-6">Team Members</h2>
          <div className="space-y-4">
            {teamMembers.map((member, index) => {
              const RoleIcon = getRoleIcon(member.role);
              const roleColor = getRoleColor(member.role);
              
              return (
                <motion.div
                  key={index}
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <Avatar className="w-12 h-12 border-2 border-white/20">
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback className="bg-purple-600 text-white">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                      </motion.div>
                      
                      <div>
                        <h3 className="text-lg font-bold text-white">{member.name}</h3>
                        <p className="text-white/70 text-sm">{member.email}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <RoleIcon className={`w-5 h-5 ${roleColor}`} />
                        <span className={`font-medium ${roleColor}`}>{member.role}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${member.status === 'active' ? 'bg-green-400' : 'bg-yellow-400'} animate-pulse`}></div>
                        <span className="text-white/70 text-sm capitalize">{member.status}</span>
                      </div>
                      
                      <Button size="sm" variant="ghost" className="text-white/70 hover:text-white hover:bg-white/10">
                        <Settings className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default TeamManagement;
