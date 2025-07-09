
import { CheckCircle, AlertCircle, Clock, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ScheduledPost {
  id: string;
  platform: string;
  content: string;
  scheduledTime: string;
  status: 'pending' | 'sent' | 'failed';
  createdAt: string;
}

interface ScheduledPostCardProps {
  post: ScheduledPost;
  onDelete: (postId: string) => void;
}

export const ScheduledPostCard = ({ post, onDelete }: ScheduledPostCardProps) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'sent':
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'failed':
        return <AlertCircle className="w-4 h-4 text-red-400" />;
      default:
        return <Clock className="w-4 h-4 text-yellow-400" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'sent':
        return 'Sent';
      case 'failed':
        return 'Failed';
      default:
        return 'Pending';
    }
  };

  return (
    <div className="bg-white/5 rounded-lg p-4 flex justify-between items-start">
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-2">
          {getStatusIcon(post.status)}
          <span className={`text-sm font-medium ${
            post.status === 'sent' ? 'text-green-400' :
            post.status === 'failed' ? 'text-red-400' : 'text-yellow-400'
          }`}>
            {getStatusText(post.status)}
          </span>
          <span className="text-white/60 text-sm">
            {new Date(post.scheduledTime).toLocaleString()}
          </span>
        </div>
        
        <p className="text-white mb-2 line-clamp-2">{post.content}</p>
      </div>
      
      {post.status === 'pending' && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDelete(post.id)}
          className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      )}
    </div>
  );
};
