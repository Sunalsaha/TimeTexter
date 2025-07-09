
import { useState, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';

export interface ScheduledPost {
  id: string;
  platform: string;
  content: string;
  scheduledTime: string;
  status: 'pending' | 'sent' | 'failed';
  createdAt: string;
}

export const useScheduledPosts = (platform: string) => {
  const [scheduledPosts, setScheduledPosts] = useState<ScheduledPost[]>([]);

  useEffect(() => {
    loadScheduledPosts();
    const interval = setInterval(checkAndSendPosts, 60000);
    return () => clearInterval(interval);
  }, [platform]);

  const loadScheduledPosts = () => {
    const saved = localStorage.getItem(`scheduledPosts_${platform}`);
    if (saved) {
      setScheduledPosts(JSON.parse(saved));
    }
  };

  const saveScheduledPosts = (posts: ScheduledPost[]) => {
    localStorage.setItem(`scheduledPosts_${platform}`, JSON.stringify(posts));
    setScheduledPosts(posts);
  };

  const checkAndSendPosts = () => {
    const now = new Date();
    const posts = JSON.parse(localStorage.getItem(`scheduledPosts_${platform}`) || '[]');
    
    const updatedPosts = posts.map((post: ScheduledPost) => {
      if (post.status === 'pending' && new Date(post.scheduledTime) <= now) {
        console.log(`Sending post for ${platform}:`, post);
        toast({
          title: "Post Sent!",
          description: `Your ${platform} post has been published.`,
        });
        return { ...post, status: 'sent' as const };
      }
      return post;
    });

    if (JSON.stringify(posts) !== JSON.stringify(updatedPosts)) {
      saveScheduledPosts(updatedPosts);
    }
  };

  const addScheduledPost = (content: string, scheduledTime: string) => {
    const newPost: ScheduledPost = {
      id: Date.now().toString(),
      platform,
      content,
      scheduledTime,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    const updated = [...scheduledPosts, newPost];
    saveScheduledPosts(updated);

    toast({
      title: "Post Scheduled!",
      description: `Your ${platform} post has been scheduled successfully.`,
    });
  };

  const deleteScheduledPost = (postId: string) => {
    const updated = scheduledPosts.filter(post => post.id !== postId);
    saveScheduledPosts(updated);
    toast({
      title: "Post Deleted",
      description: "Scheduled post has been removed.",
    });
  };

  return {
    scheduledPosts,
    addScheduledPost,
    deleteScheduledPost,
  };
};
