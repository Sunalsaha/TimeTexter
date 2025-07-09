
import { useState } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface PlatformConfig {
  name: string;
  color: string;
  bgColor: string;
}

interface SchedulePostFormProps {
  platform: string;
  config: PlatformConfig;
  onSchedule: (content: string, scheduledTime: string) => void;
  onCancel: () => void;
  isLoading: boolean;
}

export const SchedulePostForm = ({ 
  platform, 
  config, 
  onSchedule, 
  onCancel, 
  isLoading 
}: SchedulePostFormProps) => {
  const [content, setContent] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');

  const getMaxLength = () => {
    switch (platform) {
      case 'twitter':
        return 280;
      case 'telegram':
        return 4096;
      case 'phone':
        return 160;
      default:
        return 2000;
    }
  };

  const getPlatformPlaceholder = () => {
    switch (platform) {
      case 'twitter':
        return "What's happening?";
      case 'telegram':
        return "Write your Telegram message...";
      case 'phone':
        return "Write your SMS message...";
      case 'facebook':
        return "What's on your mind?";
      case 'instagram':
        return "Write a caption...";
      case 'linkedin':
        return "Share your professional update...";
      case 'whatsapp':
        return "Write your WhatsApp message...";
      default:
        return `Write your ${platform} post...`;
    }
  };

  const handleSubmit = () => {
    onSchedule(content, scheduledTime);
    setContent('');
    setScheduledTime('');
  };

  return (
    <div className="space-y-6">
      {/* Schedule Date/Time */}
      <div>
        <Label htmlFor="scheduledTime" className="text-white">Schedule Time *</Label>
        <Input
          id="scheduledTime"
          type="datetime-local"
          value={scheduledTime}
          onChange={(e) => setScheduledTime(e.target.value)}
          min={new Date().toISOString().slice(0, 16)}
          className="bg-white/10 border-white/20 text-white"
        />
      </div>

      {/* Post Content */}
      <div>
        <Label htmlFor="content" className="text-white">Post Content *</Label>
        <Textarea
          id="content"
          placeholder={getPlatformPlaceholder()}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="bg-white/10 border-white/20 text-white placeholder:text-white/50 min-h-[120px]"
          maxLength={getMaxLength()}
        />
        <div className="text-right text-white/60 text-sm mt-1">
          {content.length}/{getMaxLength()}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button
          onClick={handleSubmit}
          disabled={isLoading}
          className={`bg-gradient-to-r ${config.color} hover:opacity-90 text-white flex-1`}
        >
          <Send className="w-4 h-4 mr-2" />
          {isLoading ? 'Scheduling...' : 'Schedule Post'}
        </Button>
        <Button
          variant="outline"
          onClick={onCancel}
          className="border-white/20 text-white hover:bg-white/10"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};
