import React, { useState } from 'react';
import { Instagram, Youtube, Facebook, ExternalLink } from 'lucide-react';
import { FaTiktok } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import XIcon from '../components/icons/XIcon';
import PostPromotionButton from '../components/PostPromotionButton';
import PostPromotionModal from '../components/PostPromotionModal';
import { Platform } from '../types/social';
import { useSocialTracking } from '../hooks/useSocialTracking';
import { useAuth } from '../context/AuthContext';

const CommunityBoard = () => {
  const [engagedToday, setEngagedToday] = useState(0);
  const [isPromotionModalOpen, setIsPromotionModalOpen] = useState(false);
  const [activePlatform, setActivePlatform] = useState<Platform>('instagram');
  const navigate = useNavigate();
  const { trackEngagement, isVerifying } = useSocialTracking();
  const { user } = useAuth();

  const posts = {
    instagram: [
      {
        id: 1,
        username: '@creativemind',
        platform: 'instagram' as Platform,
        thumbnail: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0',
        timestamp: '2h ago',
        url: 'https://instagram.com/p/xyz123'
      },
      {
        id: 2,
        username: '@artistry',
        platform: 'instagram' as Platform,
        thumbnail: 'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb',
        timestamp: '3h ago',
        url: 'https://instagram.com/p/abc456'
      }
    ],
    youtube: [
      {
        id: 3,
        username: '@techreview',
        platform: 'youtube' as Platform,
        thumbnail: 'https://images.unsplash.com/photo-1611162618479-ee4d1e0e5d36',
        timestamp: '1h ago',
        url: 'https://youtube.com/watch?v=xyz123'
      }
    ],
    facebook: [
      {
        id: 4,
        username: '@socialinfluencer',
        platform: 'facebook' as Platform,
        thumbnail: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0',
        timestamp: '1h ago',
        url: 'https://facebook.com/post/123'
      }
    ],
    x: [
      {
        id: 5,
        username: '@techinfluencer',
        platform: 'x' as Platform,
        thumbnail: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113',
        timestamp: '15m ago',
        url: 'https://x.com/status/123'
      }
    ],
    tiktok: [
      {
        id: 6,
        username: '@dancepro',
        platform: 'tiktok' as Platform,
        thumbnail: 'https://images.unsplash.com/photo-1611162616677-f3f6aa2fda41',
        timestamp: '30m ago',
        url: 'https://tiktok.com/@dancepro/video/123'
      }
    ]
  };

  const PlatformIcon = {
    instagram: Instagram,
    youtube: Youtube,
    facebook: Facebook,
    x: XIcon,
    tiktok: FaTiktok
  };

  const platformColor = {
    instagram: 'hover:text-pink-500',
    youtube: 'hover:text-red-500',
    facebook: 'hover:text-blue-500',
    x: 'hover:text-gray-200',
    tiktok: 'hover:text-[#00f2ea]'
  };

  const handlePromotionSubmit = (data: { platform: string; url: string }) => {
    if (engagedToday < 5) {
      toast.error('Please engage with 5 posts before sharing your content');
      return;
    }
    
    console.log('Promoting post:', data);
    toast.success('Post submitted for promotion!');
    setIsPromotionModalOpen(false);
  };

  const handleEngagement = async (post: typeof posts[Platform][0]) => {
    if (isVerifying) return;

    const status = await trackEngagement(post.platform, post.url, 'like');
    if (status.success) {
      setEngagedToday(prev => Math.min(prev + 1, 5));
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold mb-2">Community Board</h1>
          <p className="text-[#03ffc3]/80">
            Engaged today: {engagedToday}/5
            {engagedToday < 5 && (
              <span className="text-[#03ffc3]/60 ml-2">
                (Engage with {5 - engagedToday} more posts to share your content)
              </span>
            )}
          </p>
        </div>
        <PostPromotionButton
          engagedToday={engagedToday}
          onPromote={() => setIsPromotionModalOpen(true)}
        />
      </div>

      <div className="flex gap-4 mb-6">
        {Object.entries(PlatformIcon).map(([platform, Icon]) => (
          <button
            key={platform}
            onClick={() => setActivePlatform(platform as Platform)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              activePlatform === platform
                ? 'bg-[#00ff3f] text-[#022424]'
                : `text-[#03ffc3] hover:bg-[#03ffc3]/10 ${platformColor[platform as Platform]}`
            }`}
          >
            <Icon size={20} />
            <span className="capitalize">{platform}</span>
          </button>
        ))}
      </div>

      <div className="grid gap-6">
        {posts[activePlatform].map((post) => (
          <div
            key={post.id}
            className="bg-[#022424] border border-[#03ffc3]/20 rounded-xl p-4"
          >
            <div className="flex gap-4">
              <img
                src={post.thumbnail}
                alt="Post thumbnail"
                className="w-40 h-40 object-cover rounded-lg"
              />
              <div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg">{post.username}</h3>
                    <button
                      onClick={() => handleEngagement(post)}
                      disabled={isVerifying}
                      className={`text-sm ${platformColor[post.platform]} transition-colors flex items-center gap-1 mt-2 disabled:opacity-50`}
                    >
                      <ExternalLink size={16} />
                      <span>View and engage on {post.platform}</span>
                    </button>
                  </div>
                  <span className="text-sm text-[#03ffc3]/60">{post.timestamp}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <PostPromotionModal
        isOpen={isPromotionModalOpen}
        onClose={() => setIsPromotionModalOpen(false)}
        onSubmit={handlePromotionSubmit}
      />
    </div>
  );
};

export default CommunityBoard;