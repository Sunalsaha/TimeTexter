import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Plus, Send, Paperclip, Hash, Bot, Trash2, X, Mail, Search, Edit, XCircle, Users, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';


interface EmailContact {
  id: string;
  email: string;
  name?: string;
  saved: boolean;
}

interface EmailAttachment {
  id: string;
  name: string;
  size: number;
  type: string;
  file: File;
}

interface ScheduledEmail {
  id: string;
  subject: string;
  content: string;
  to: string[];
  cc: string[];
  bcc: string[];
  scheduledFor: string;
  status: 'pending' | 'sent' | 'failed';
  attachments: EmailAttachment[];
  createdAt: string;
}

interface EmailSchedulingTabProps {
  platform: string;
  config: {
    name: string;
    color: string;
    bgColor: string;
  };
}

export const EmailSchedulingTab = ({ platform, config }: EmailSchedulingTabProps) => {
  const [subject, setSubject] = useState('');
  const [emailContent, setEmailContent] = useState('');
  const [scheduleDate, setScheduleDate] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');
  const [isScheduling, setIsScheduling] = useState(false);
  const [isAiHelping, setIsAiHelping] = useState(false);
  
  // Email specific states
  const [toEmails, setToEmails] = useState<string[]>([]);
  const [ccEmails, setCcEmails] = useState<string[]>([]);
  const [bccEmails, setBccEmails] = useState<string[]>([]);
  const [emailInput, setEmailInput] = useState('');
  const [ccInput, setCcInput] = useState('');
  const [bccInput, setBccInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [savedContacts, setSavedContacts] = useState<EmailContact[]>([]);
  const [attachments, setAttachments] = useState<EmailAttachment[]>([]);
  const [editingEmail, setEditingEmail] = useState<ScheduledEmail | null>(null);
  const [scheduledEmails, setScheduledEmails] = useState<ScheduledEmail[]>([]);

  // Load saved contacts and scheduled emails on component mount
  useEffect(() => {
    loadSavedContacts();
    loadScheduledEmails();
  }, []);

  // Check for emails that should be sent
  useEffect(() => {
    const checkEmailStatus = () => {
      const now = new Date();
      setScheduledEmails(prev => 
        prev.map(email => {
          if (email.status === 'pending') {
            const scheduledDateTime = new Date(email.scheduledFor);
            if (scheduledDateTime <= now) {
              sendEmail(email);
              return { ...email, status: 'sent' };
            }
          }
          return email;
        })
      );
    };

    const interval = setInterval(checkEmailStatus, 30000); // Check every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const loadSavedContacts = async () => {
    // For now, load from localStorage until database is set up
    const saved = localStorage.getItem('email_contacts');
    if (saved) {
      setSavedContacts(JSON.parse(saved));
    }
  };

  const loadScheduledEmails = async () => {
    // For now, load from localStorage until database is set up
    const saved = localStorage.getItem('scheduled_emails');
    if (saved) {
      setScheduledEmails(JSON.parse(saved));
    }
  };

  const saveContact = async (email: string, name?: string) => {
    const newContact: EmailContact = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name: name || email.split('@')[0],
      saved: true
    };
    
    const updatedContacts = [...savedContacts, newContact];
    setSavedContacts(updatedContacts);
    localStorage.setItem('email_contacts', JSON.stringify(updatedContacts));
    
    toast({
      title: "Contact saved",
      description: `${email} has been saved to your contacts.`,
    });
  };

  const sendEmail = async (emailData: ScheduledEmail) => {
    try {
      // Simulate email sending
      await new Promise(resolve => setTimeout(resolve, 1000));

      toast({
        title: "Email sent!",
        description: `Your email "${emailData.subject}" has been sent successfully.`,
      });

      // Update email status in localStorage
      const updatedEmails = scheduledEmails.map(email => 
        email.id === emailData.id ? { ...email, status: 'sent' as const } : email
      );
      setScheduledEmails(updatedEmails);
      localStorage.setItem('scheduled_emails', JSON.stringify(updatedEmails));

    } catch (error) {
      console.error('Error sending email:', error);
      toast({
        title: "Email failed",
        description: "Failed to send the email. Please try again.",
        variant: "destructive",
      });

      // Update email status to failed
      const updatedEmails = scheduledEmails.map(email => 
        email.id === emailData.id ? { ...email, status: 'failed' as const } : email
      );
      setScheduledEmails(updatedEmails);
      localStorage.setItem('scheduled_emails', JSON.stringify(updatedEmails));
    }
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const addEmailToList = (email: string, list: string[], setList: Function) => {
    if (!email.trim()) return;
    
    if (!validateEmail(email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    if (!list.includes(email)) {
      setList([...list, email]);
    }
  };

  const removeEmailFromList = (email: string, list: string[], setList: Function) => {
    setList(list.filter(e => e !== email));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newAttachments: EmailAttachment[] = Array.from(files).map(file => ({
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        size: file.size,
        type: file.type,
        file
      }));
      setAttachments(prev => [...prev, ...newAttachments]);
    }
  };

  const removeAttachment = (id: string) => {
    setAttachments(prev => prev.filter(att => att.id !== id));
  };

  const handleScheduleEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!subject.trim() || !emailContent.trim()) {
      toast({
        title: "Missing information",
        description: "Please fill in subject and content.",
        variant: "destructive",
      });
      return;
    }

    if (toEmails.length === 0) {
      toast({
        title: "No recipients",
        description: "Please add at least one recipient.",
        variant: "destructive",
      });
      return;
    }

    if (!scheduleDate || !scheduleTime) {
      toast({
        title: "Missing schedule",
        description: "Please set a date and time for sending.",
        variant: "destructive",
      });
      return;
    }

    setIsScheduling(true);

    try {
      const scheduledDateTime = `${scheduleDate}T${scheduleTime}:00`;
      
      const emailData = {
        subject,
        content: emailContent,
        to: toEmails,
        cc: ccEmails,
        bcc: bccEmails,
        scheduledFor: scheduledDateTime,
        status: 'pending' as const,
        attachments,
        createdAt: new Date().toISOString()
      };

      if (editingEmail) {
        // Update existing email in localStorage
        const updatedEmails = scheduledEmails.map(email => 
          email.id === editingEmail.id ? { ...emailData, id: editingEmail.id } : email
        );
        setScheduledEmails(updatedEmails);
        localStorage.setItem('scheduled_emails', JSON.stringify(updatedEmails));
        
        toast({
          title: "Email updated!",
          description: "Your scheduled email has been updated.",
        });
        setEditingEmail(null);
      } else {
        // Add new email to localStorage
        const newEmail = { ...emailData, id: Math.random().toString(36).substr(2, 9) };
        const updatedEmails = [newEmail, ...scheduledEmails];
        setScheduledEmails(updatedEmails);
        localStorage.setItem('scheduled_emails', JSON.stringify(updatedEmails));
        
        toast({
          title: "Email scheduled!",
          description: `Your email will be sent on ${scheduleDate} at ${scheduleTime}.`,
        });
      }

      // Reset form
      setSubject('');
      setEmailContent('');
      setScheduleDate('');
      setScheduleTime('');
      setToEmails([]);
      setCcEmails([]);
      setBccEmails([]);
      setAttachments([]);
      
      loadScheduledEmails();
    } catch (error) {
      console.error('Error scheduling email:', error);
      toast({
        title: "Error",
        description: "Failed to schedule email. Please try again.",
        variant: "destructive",
      });
    }

    setIsScheduling(false);
  };

  const handleAiHelp = async () => {
    setIsAiHelping(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const aiSuggestions = [
      {
        subject: "Welcome to our newsletter!",
        content: "Thank you for subscribing to our newsletter. We're excited to share valuable insights and updates with you."
      },
      {
        subject: "Important Update",
        content: "We wanted to inform you about some important changes that will take effect soon. Please review the details below."
      },
      {
        subject: "Meeting Reminder",
        content: "This is a friendly reminder about our upcoming meeting scheduled for tomorrow. Please confirm your attendance."
      }
    ];
    
    const randomSuggestion = aiSuggestions[Math.floor(Math.random() * aiSuggestions.length)];
    setSubject(randomSuggestion.subject);
    setEmailContent(randomSuggestion.content);
    setIsAiHelping(false);
    
    toast({
      title: "AI Helper",
      description: "I've generated an email template for you!",
    });
  };

  const filteredContacts = savedContacts.filter(contact =>
    contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (contact.name && contact.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
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
        {/* Left Side - Email Contacts Search */}
        <motion.div variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}>
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Mail className="w-6 h-6" />
            Email Contacts
          </h2>
          
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 max-h-[600px] overflow-y-auto">
            {/* Search Bar */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
              <Input
                placeholder="Search emails or add new email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-purple-400 focus:ring-purple-400/20"
              />
            </div>

            {/* Add Email Input */}
            <div className="mb-6 p-4 bg-white/5 rounded-xl border border-white/10">
              <Label className="text-white/90 mb-2 block">Add New Email</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="Enter email address"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-purple-400"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      addEmailToList(emailInput, toEmails, setToEmails);
                      setEmailInput('');
                    }
                  }}
                />
                <Button
                  onClick={() => {
                    addEmailToList(emailInput, toEmails, setToEmails);
                    if (validateEmail(emailInput)) {
                      saveContact(emailInput);
                    }
                    setEmailInput('');
                  }}
                  className="bg-purple-500 hover:bg-purple-600"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Saved Contacts */}
            <div className="space-y-3">
              {filteredContacts.map((contact) => (
                <motion.div
                  key={contact.id}
                  className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 cursor-pointer transition-all duration-200"
                  onClick={() => {
                    if (!toEmails.includes(contact.email)) {
                      setToEmails([...toEmails, contact.email]);
                    }
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full flex items-center justify-center text-white font-semibold">
                      {contact.email[0].toUpperCase()}
                    </div>
                    <div>
                      <p className="text-white font-medium">{contact.name || contact.email.split('@')[0]}</p>
                      <p className="text-white/70 text-sm">{contact.email}</p>
                    </div>
                  </div>
                  <Mail className="w-4 h-4 text-white/50" />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right Side - Compose Email */}
        <motion.div variants={{ hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0 } }}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">
              {editingEmail ? 'Edit Email' : 'Compose Email'}
            </h2>
            {editingEmail && (
              <Button
                onClick={() => setEditingEmail(null)}
                variant="ghost"
                className="text-white/60 hover:text-white hover:bg-white/10"
              >
                <X className="w-4 h-4 mr-2" />
                Cancel Edit
              </Button>
            )}
          </div>
          
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <form onSubmit={handleScheduleEmail} className="space-y-6">
              {/* Email Recipients */}
              <div className="space-y-4">
                {/* To Field */}
                <div>
                  <Label className="text-white/90 mb-2 block">To</Label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {toEmails.map((email) => (
                      <motion.div
                        key={email}
                        className="flex items-center gap-2 bg-purple-500/20 text-purple-200 px-3 py-1 rounded-full text-sm border border-purple-400/30"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                      >
                        <span>{email}</span>
                        <button
                          type="button"
                          onClick={() => removeEmailFromList(email, toEmails, setToEmails)}
                          className="text-purple-300 hover:text-white transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* CC Field */}
                <div>
                  <Label className="text-white/90 mb-2 block">CC (Optional)</Label>
                  <div className="flex gap-2 mb-2">
                    <Input
                      placeholder="Add CC recipients"
                      value={ccInput}
                      onChange={(e) => setCcInput(e.target.value)}
                      className="bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-purple-400"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          addEmailToList(ccInput, ccEmails, setCcEmails);
                          setCcInput('');
                        }
                      }}
                    />
                    <Button
                      type="button"
                      onClick={() => {
                        addEmailToList(ccInput, ccEmails, setCcEmails);
                        setCcInput('');
                      }}
                      className="bg-blue-500 hover:bg-blue-600"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {ccEmails.map((email) => (
                      <span
                        key={email}
                        className="flex items-center gap-2 bg-blue-500/20 text-blue-200 px-3 py-1 rounded-full text-sm border border-blue-400/30"
                      >
                        {email}
                        <button
                          type="button"
                          onClick={() => removeEmailFromList(email, ccEmails, setCcEmails)}
                          className="text-blue-300 hover:text-white transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* BCC Field */}
                <div>
                  <Label className="text-white/90 mb-2 block">BCC (Optional)</Label>
                  <div className="flex gap-2 mb-2">
                    <Input
                      placeholder="Add BCC recipients"
                      value={bccInput}
                      onChange={(e) => setBccInput(e.target.value)}
                      className="bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-purple-400"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          addEmailToList(bccInput, bccEmails, setBccEmails);
                          setBccInput('');
                        }
                      }}
                    />
                    <Button
                      type="button"
                      onClick={() => {
                        addEmailToList(bccInput, bccEmails, setBccEmails);
                        setBccInput('');
                      }}
                      className="bg-gray-500 hover:bg-gray-600"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {bccEmails.map((email) => (
                      <span
                        key={email}
                        className="flex items-center gap-2 bg-gray-500/20 text-gray-200 px-3 py-1 rounded-full text-sm border border-gray-400/30"
                      >
                        {email}
                        <button
                          type="button"
                          onClick={() => removeEmailFromList(email, bccEmails, setBccEmails)}
                          className="text-gray-300 hover:text-white transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Subject */}
              <div>
                <Label htmlFor="subject" className="text-white/90 mb-2 block">Subject</Label>
                <Input
                  id="subject"
                  placeholder="Enter email subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-purple-400 focus:ring-purple-400/20"
                />
              </div>

              {/* Content */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label htmlFor="content" className="text-white/90">Email Content</Label>
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
                  placeholder="Type your email content here..."
                  value={emailContent}
                  onChange={(e) => setEmailContent(e.target.value)}
                  className="bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-purple-400 focus:ring-purple-400/20 min-h-[150px]"
                  maxLength={10000}
                />
                <p className="text-white/50 text-sm mt-1">{emailContent.length}/10,000 characters</p>
              </div>

              {/* Attachments */}
              <div>
                <Label className="text-white/90 mb-2 block">Attachments</Label>
                <div className="space-y-3">
                  <div className="flex gap-4">
                    <label className="cursor-pointer">
                      <input
                        type="file"
                        multiple
                        onChange={handleFileUpload}
                        className="hidden"
                        accept="image/*,video/*,.pdf,.doc,.docx,.txt"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        className="bg-white/20 border-white/30 text-white/80 hover:bg-white/10 hover:border-white/50"
                        asChild
                      >
                        <span>
                          <Paperclip className="w-4 h-4 mr-2" />
                          Add Files
                        </span>
                      </Button>
                    </label>

                    <Button
                      type="button"
                      variant="ghost"
                      className="bg-white/20 border-white/30 text-white/80 hover:bg-white/10 hover:border-white/50"
                    >
                      <Hash className="w-4 h-4 mr-2" />
                      Add Tags
                    </Button>
                  </div>

                  {attachments.length > 0 && (
                    <div className="space-y-2">
                      {attachments.map((attachment) => (
                        <div
                          key={attachment.id}
                          className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10"
                        >
                          <div className="flex items-center gap-3">
                            <Paperclip className="w-4 h-4 text-white/70" />
                            <div>
                              <p className="text-white text-sm font-medium">{attachment.name}</p>
                              <p className="text-white/50 text-xs">{formatFileSize(attachment.size)}</p>
                            </div>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            onClick={() => removeAttachment(attachment.id)}
                            className="text-red-400 hover:text-red-300 hover:bg-red-500/10 p-1"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Schedule */}
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

              {/* Submit Button */}
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
                    <Send className="w-4 h-4 mr-2" />
                  )}
                  {isScheduling ? 'Scheduling...' : editingEmail ? 'Update Email' : 'Schedule Email'}
                </Button>
              </motion.div>
            </form>
          </div>
        </motion.div>
      </div>

      {/* Scheduled Emails */}
      <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
        <h2 className="text-2xl font-bold text-white mb-6">Scheduled Emails</h2>
        <div className="space-y-4">
          {scheduledEmails.map((email, index) => (
            <motion.div
              key={email.id}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300"
              whileHover={{ y: -2 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, type: "spring", stiffness: 300 }}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1 mr-4">
                  <h3 className="text-white font-semibold text-lg mb-2">{email.subject}</h3>
                  <p className="text-white/70 text-sm line-clamp-2">{email.content}</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    email.status === 'pending'
                      ? 'bg-yellow-500/20 text-yellow-300'
                      : email.status === 'sent'
                      ? 'bg-green-500/20 text-green-300'
                      : 'bg-red-500/20 text-red-300'
                  }`}>
                    {email.status}
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      if (window.confirm(`Are you sure you want to delete this email?\n\n"${email.subject}"`)) {
                        const updatedEmails = scheduledEmails.filter(e => e.id !== email.id);
                        setScheduledEmails(updatedEmails);
                        localStorage.setItem('scheduled_emails', JSON.stringify(updatedEmails));
                        toast({
                          title: "Email deleted",
                          description: "The scheduled email has been removed.",
                        });
                      }
                    }}
                    className="text-red-400 hover:text-red-300 hover:bg-red-500/10 p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Recipients */}
              <div className="mb-4 space-y-2">
                <div className="flex flex-wrap gap-1">
                  <span className="text-white/70 text-sm font-medium">To:</span>
                  {email.to.map((recipient, idx) => (
                    <span key={idx} className="text-xs bg-purple-500/20 text-purple-200 px-2 py-1 rounded-full">
                      {recipient}
                    </span>
                  ))}
                </div>
                {email.cc.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    <span className="text-white/70 text-sm font-medium">CC:</span>
                    {email.cc.map((recipient, idx) => (
                      <span key={idx} className="text-xs bg-blue-500/20 text-blue-200 px-2 py-1 rounded-full">
                        {recipient}
                      </span>
                    ))}
                  </div>
                )}
                {email.bcc.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    <span className="text-white/70 text-sm font-medium">BCC:</span>
                    {email.bcc.map((recipient, idx) => (
                      <span key={idx} className="text-xs bg-gray-500/20 text-gray-200 px-2 py-1 rounded-full">
                        {recipient}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Attachments */}
              {email.attachments.length > 0 && (
                <div className="mb-4">
                  <span className="text-white/70 text-sm font-medium">Attachments: </span>
                  <span className="text-white/50 text-sm">{email.attachments.length} file(s)</span>
                </div>
              )}

              <div className="flex items-center justify-between text-white/70 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>Scheduled for {new Date(email.scheduledFor).toLocaleString()}</span>
                </div>
                {email.status === 'pending' && (
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      onClick={() => setEditingEmail(email)}
                      className="text-white/60 hover:text-white hover:bg-white/10"
                    >
                      <Edit className="w-3 h-3 mr-1" />
                      Edit
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      onClick={() => {
                        if (window.confirm(`Are you sure you want to cancel this scheduled email?\n\n"${email.subject}"`)) {
                          const updatedEmails = scheduledEmails.filter(e => e.id !== email.id);
                          setScheduledEmails(updatedEmails);
                          localStorage.setItem('scheduled_emails', JSON.stringify(updatedEmails));
                          toast({
                            title: "Email cancelled",
                            description: "The scheduled email has been cancelled.",
                          });
                        }
                      }}
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
    </motion.div>
  );
};