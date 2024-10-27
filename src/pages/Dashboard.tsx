import React, { useState } from 'react';
import { BarChart3, Users, ThumbsUp, TrendingUp, Calendar, CreditCard, Instagram, Youtube, Facebook, Percent, ExternalLink, Clock, RefreshCw } from 'lucide-react';
import { FaTiktok } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import XIcon from '../components/icons/XIcon';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [timeframe, setTimeframe] = useState('today');
  const navigate = useNavigate();

  // Mock subscription data
  const subscriptionData = {
    daysRemaining: 23,
    totalDays: 30,
    nextBillingDate: '2024-04-15',
    isExpiringSoon: false, // Will be true when 5 or fewer days remain
    isExpired: false // Will be true when subscription has ended
  };

  // Mock discount information
  const discountInfo = {
    discountPercentage: 12,
    postsUntilNextPercent: 8,
    totalEngagedPosts: 252,
  };

  const handleRenewal = () => {
    navigate('/payment');
  };

  const stats = [
    {
      icon: Users,
      label: 'Community Reach',
      value: '2.4K',
      trend: '+12%',
      color: 'text-[#00ff3f]'
    },
    {
      icon: ThumbsUp,
      label: 'Engagements Made',
      value: '156',
      trend: '+8%',
      color: 'text-[#03ffc3]'
    },
    {
      icon: TrendingUp,
      label: 'Engagement Rate',
      value: '24%',
      trend: '+5%',
      color: 'text-[#00ff3f]'
    },
    {
      icon: Percent,
      label: 'Discount Earned',
      value: `${discountInfo.discountPercentage}%`,
      trend: discountInfo.postsUntilNextPercent > 0 ? 
        `${discountInfo.postsUntilNextPercent} to next %` : 
        'Max discount!',
      color: 'text-[#03ffc3]'
    }
  ];

  const timeframes = [
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'year', label: 'This Year' }
  ];

  const engagedPosts = {
    today: [
      {
        id: 1,
        platform: 'instagram',
        username: '@creator1',
        url: 'https://instagram.com/p/123',
        thumbnail: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0',
        engagedAt: '2h ago'
      }
    ],
    week: [
      {
        id: 2,
        platform: 'youtube',
        username: '@creator2',
        url: 'https://youtube.com/watch?v=abc',
        thumbnail: 'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb',
        engagedAt: '2 days ago'
      }
    ]
  };

  const myPosts = {
    today: [
      {
        id: 1,
        platform: 'instagram',
        url: 'https://instagram.com/p/xyz',
        thumbnail: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0',
        engagements: 45,
        postedAt: '3h ago'
      }
    ],
    week: [
      {
        id: 2,
        platform: 'youtube',
        url: 'https://youtube.com/watch?v=def',
        thumbnail: 'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb',
        engagements: 128,
        postedAt: '2 days ago'
      }
    ]
  };

  const renderStats = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-[#022424] border border-[#03ffc3]/20 rounded-xl p-6"
            >
              <div className="flex justify-between items-start mb-4">
                <Icon size={24} className={stat.color} />
                <span className="text-[#00ff3f] text-sm">{stat.trend}</span>
              </div>
              <h3 className="text-[#03ffc3]/80 text-sm">{stat.label}</h3>
              <p className="text-2xl font-bold mt-1">{stat.value}</p>
            </div>
          );
        })}
      </div>

      <div className="bg-[#022424] border border-[#03ffc3]/20 rounded-xl p-6 mb-8">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Clock size={24} className="text-[#00ff3f]" />
              Subscription Status
            </h2>
            <p className={`mt-1 ${
              subscriptionData.isExpiringSoon ? 'text-yellow-400' : 
              subscriptionData.isExpired ? 'text-red-400' : 
              'text-[#03ffc3]/80'
            }`}>
              {subscriptionData.isExpired ? 'Subscription expired' :
               subscriptionData.daysRemaining === 0 ? 'Last day of subscription' :
               `${subscriptionData.daysRemaining} days remaining`}
            </p>
          </div>
          <p className="text-sm text-[#03ffc3]/60">
            Next billing: {subscriptionData.nextBillingDate}
          </p>
        </div>
        <div className="relative h-2 bg-[#03ffc3]/20 rounded-full overflow-hidden mb-4">
          <div 
            className={`absolute left-0 top-0 h-full rounded-full transition-all duration-500 ${
              subscriptionData.isExpiringSoon ? 'bg-yellow-400' :
              subscriptionData.isExpired ? 'bg-red-400' :
              'bg-[#00ff3f]'
            }`}
            style={{ width: `${(subscriptionData.daysRemaining / subscriptionData.totalDays) * 100}%` }}
          />
        </div>
        <button
          onClick={handleRenewal}
          disabled={!subscriptionData.isExpiringSoon && !subscriptionData.isExpired}
          className={`flex items-center justify-center gap-2 w-full py-2 rounded-lg font-semibold transition-all ${
            subscriptionData.isExpiringSoon || subscriptionData.isExpired
              ? 'bg-[#00ff3f] text-[#022424] hover:opacity-90'
              : 'bg-[#03ffc3]/20 text-[#03ffc3]/60 cursor-not-allowed'
          }`}
        >
          <RefreshCw size={20} />
          <span>
            {subscriptionData.isExpired ? 'Renew Subscription' :
             subscriptionData.isExpiringSoon ? 'Renew Early' :
             'Renewal Available Soon'}
          </span>
        </button>
      </div>
    </>
  );

  const renderEngagedPosts = () => (
    <div className="space-y-6">
      <div className="flex justify-end">
        <select
          value={timeframe}
          onChange={(e) => setTimeframe(e.target.value)}
          className="bg-[#022424] border border-[#03ffc3]/20 rounded-lg px-4 py-2 text-[#03ffc3]"
        >
          {timeframes.map((tf) => (
            <option key={tf.value} value={tf.value}>
              {tf.label}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-6">
        {engagedPosts[timeframe]?.map((post) => (
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
                <h3 className="font-semibold text-lg">{post.username}</h3>
                <a
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#00ff3f] hover:underline flex items-center gap-1 mt-2"
                >
                  <ExternalLink size={16} />
                  View on {post.platform}
                </a>
                <p className="text-[#03ffc3]/60 mt-2">
                  Engaged {post.engagedAt}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderMyPosts = () => (
    <div className="space-y-6">
      <div className="flex justify-end">
        <select
          value={timeframe}
          onChange={(e) => setTimeframe(e.target.value)}
          className="bg-[#022424] border border-[#03ffc3]/20 rounded-lg px-4 py-2 text-[#03ffc3]"
        >
          {timeframes.map((tf) => (
            <option key={tf.value} value={tf.value}>
              {tf.label}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-6">
        {myPosts[timeframe]?.map((post) => (
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
                <div className="flex items-center gap-2 mb-2">
                  <ThumbsUp size={20} className="text-[#00ff3f]" />
                  <span className="font-semibold">{post.engagements} engagements</span>
                </div>
                <a
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#00ff3f] hover:underline flex items-center gap-1 mt-2"
                >
                  <ExternalLink size={16} />
                  View on {post.platform}
                </a>
                <p className="text-[#03ffc3]/60 mt-2">
                  Posted {post.postedAt}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex gap-2">
          {['overview', 'engaged', 'posts'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg capitalize ${
                activeTab === tab
                  ? 'bg-[#00ff3f] text-[#022424]'
                  : 'text-[#03ffc3] hover:bg-[#03ffc3]/10'
              }`}
            >
              {tab === 'posts' ? 'My Posts' : tab}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'overview' && renderStats()}
      {activeTab === 'engaged' && renderEngagedPosts()}
      {activeTab === 'posts' && renderMyPosts()}
    </div>
  );
};

export default Dashboard;