import React, { useState } from 'react';
import { Camera, Instagram, Youtube, Facebook, Percent, Mail, Bell, Shield } from 'lucide-react';
import { FaTiktok } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import XIcon from '../components/icons/XIcon';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [socialLinks, setSocialLinks] = useState({
    facebook: '',
    instagram: '',
    x: '',
    youtube: '',
    tiktok: ''
  });
  const [email, setEmail] = useState('user@example.com');
  const [notifications, setNotifications] = useState({
    engagement: true,
    community: false,
    marketing: true
  });
  const [isEditing, setIsEditing] = useState(false);

  const { user, getDiscountInfo } = useAuth();
  const discountInfo = getDiscountInfo();

  const handleSave = () => {
    setIsEditing(false);
    // In a real app, save changes to backend
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Profile Header */}
      <div className="mb-8 text-center">
        <div className="relative inline-block">
          <img
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde"
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-[#00ff3f]"
          />
          <button className="absolute bottom-0 right-0 p-2 bg-[#022424] rounded-full border border-[#03ffc3]/20">
            <Camera size={20} />
          </button>
        </div>
        <h1 className="text-2xl font-bold mt-4">@username</h1>
        <p className="text-[#03ffc3]/80">Content Creator</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={() => setActiveTab('profile')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            activeTab === 'profile'
              ? 'bg-[#00ff3f] text-[#022424]'
              : 'text-[#03ffc3] hover:bg-[#03ffc3]/10'
          }`}
        >
          Profile
        </button>
        <button
          onClick={() => setActiveTab('settings')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            activeTab === 'settings'
              ? 'bg-[#00ff3f] text-[#022424]'
              : 'text-[#03ffc3] hover:bg-[#03ffc3]/10'
          }`}
        >
          Settings
        </button>
      </div>

      <div className="grid gap-6">
        {/* Discount Progress - Always visible */}
        {discountInfo.totalPosts >= 5 && (
          <div className="bg-[#022424] border border-[#03ffc3]/20 rounded-xl p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <Percent size={24} className="text-[#00ff3f]" />
                  Subscription Discount Progress
                </h2>
                <p className="text-[#03ffc3]/80 mt-1">
                  {discountInfo.discountPercentage}% discount earned
                </p>
              </div>
              {discountInfo.discountPercentage < 50 && (
                <div className="text-right">
                  <p className="text-sm text-[#03ffc3]/60">
                    {discountInfo.postsUntilNextPercent} posts until next 1%
                  </p>
                </div>
              )}
            </div>
            <div className="relative h-2 bg-[#03ffc3]/20 rounded-full overflow-hidden">
              <div 
                className="absolute left-0 top-0 h-full bg-[#00ff3f] rounded-full transition-all duration-500"
                style={{ width: `${(discountInfo.discountPercentage / 50) * 100}%` }}
              />
            </div>
            <div className="mt-4 flex justify-between text-sm text-[#03ffc3]/60">
              <span>0%</span>
              <span>50%</span>
            </div>
            <p className="mt-4 text-sm text-[#03ffc3]/80">
              {discountInfo.totalPosts} total posts made
              {discountInfo.discountPercentage < 50 && ` • ${20 - (discountInfo.totalPosts % 20)} posts until next discount increase`}
            </p>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="bg-[#022424] border border-[#03ffc3]/20 rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Social Accounts</h2>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 text-sm bg-[#03ffc3]/10 rounded-lg hover:bg-[#03ffc3]/20 transition-colors"
                >
                  Edit Profile
                </button>
              )}
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Facebook</label>
                <div className="relative">
                  <Facebook className="absolute left-3 top-1/2 -translate-y-1/2 text-[#03ffc3]/60" size={20} />
                  <input
                    type="text"
                    value={socialLinks.facebook}
                    onChange={(e) => setSocialLinks(prev => ({ ...prev, facebook: e.target.value }))}
                    disabled={!isEditing}
                    className="w-full bg-transparent border border-[#03ffc3]/20 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:border-[#00ff3f] disabled:opacity-50"
                    placeholder="facebook.com/username"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Instagram</label>
                <div className="relative">
                  <Instagram className="absolute left-3 top-1/2 -translate-y-1/2 text-[#03ffc3]/60" size={20} />
                  <input
                    type="text"
                    value={socialLinks.instagram}
                    onChange={(e) => setSocialLinks(prev => ({ ...prev, instagram: e.target.value }))}
                    disabled={!isEditing}
                    className="w-full bg-transparent border border-[#03ffc3]/20 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:border-[#00ff3f] disabled:opacity-50"
                    placeholder="@yourusername"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">X (Twitter)</label>
                <div className="relative">
                  <XIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-[#03ffc3]/60" size={20} />
                  <input
                    type="text"
                    value={socialLinks.x}
                    onChange={(e) => setSocialLinks(prev => ({ ...prev, x: e.target.value }))}
                    disabled={!isEditing}
                    className="w-full bg-transparent border border-[#03ffc3]/20 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:border-[#00ff3f] disabled:opacity-50"
                    placeholder="@handle"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">YouTube</label>
                <div className="relative">
                  <Youtube className="absolute left-3 top-1/2 -translate-y-1/2 text-[#03ffc3]/60" size={20} />
                  <input
                    type="text"
                    value={socialLinks.youtube}
                    onChange={(e) => setSocialLinks(prev => ({ ...prev, youtube: e.target.value }))}
                    disabled={!isEditing}
                    className="w-full bg-transparent border border-[#03ffc3]/20 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:border-[#00ff3f] disabled:opacity-50"
                    placeholder="channel-url"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">TikTok</label>
                <div className="relative">
                  <FaTiktok className="absolute left-3 top-1/2 -translate-y-1/2 text-[#03ffc3]/60" size={20} />
                  <input
                    type="text"
                    value={socialLinks.tiktok}
                    onChange={(e) => setSocialLinks(prev => ({ ...prev, tiktok: e.target.value }))}
                    disabled={!isEditing}
                    className="w-full bg-transparent border border-[#03ffc3]/20 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:border-[#00ff3f] disabled:opacity-50"
                    placeholder="@tiktokhandle"
                  />
                </div>
              </div>
            </div>
            {isEditing && (
              <div className="flex justify-end gap-4 mt-6">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-6 py-2 border border-[#03ffc3]/20 rounded-lg hover:bg-[#03ffc3]/10 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-6 py-2 bg-[#00ff3f] text-[#022424] rounded-lg font-semibold hover:opacity-90 transition-opacity"
                >
                  Save Changes
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'settings' && (
          <>
            <div className="bg-[#022424] border border-[#03ffc3]/20 rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Mail size={24} className="text-[#00ff3f]" />
                Contact Information
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent border border-[#03ffc3]/20 rounded-lg py-2 px-4 focus:outline-none focus:border-[#00ff3f]"
                  />
                </div>
              </div>
            </div>

            <div className="bg-[#022424] border border-[#03ffc3]/20 rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Bell size={24} className="text-[#00ff3f]" />
                Notifications
              </h2>
              <div className="space-y-4">
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={notifications.engagement}
                    onChange={(e) => setNotifications(prev => ({ ...prev, engagement: e.target.checked }))}
                    className="form-checkbox text-[#00ff3f] rounded"
                  />
                  <span>Engagement notifications</span>
                </label>
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={notifications.community}
                    onChange={(e) => setNotifications(prev => ({ ...prev, community: e.target.checked }))}
                    className="form-checkbox text-[#00ff3f] rounded"
                  />
                  <span>Community updates</span>
                </label>
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={notifications.marketing}
                    onChange={(e) => setNotifications(prev => ({ ...prev, marketing: e.target.checked }))}
                    className="form-checkbox text-[#00ff3f] rounded"
                  />
                  <span>Marketing emails</span>
                </label>
              </div>
            </div>

            <div className="bg-[#022424] border border-[#03ffc3]/20 rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Shield size={24} className="text-[#00ff3f]" />
                Security
              </h2>
              <button className="px-4 py-2 bg-[#03ffc3]/10 rounded-lg hover:bg-[#03ffc3]/20 transition-colors">
                Change Password
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;