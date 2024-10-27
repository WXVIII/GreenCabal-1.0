import React, { useState } from 'react';
import { Users, Clock, CreditCard, BarChart3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();

  // Mock data - In a real app, this would come from your backend
  const stats = {
    totalUsers: 2547,
    trialUsers: 856,
    activeSubscribers: 1691,
    monthlyRevenue: 3382
  };

  const users = [
    {
      id: 1,
      email: 'user1@example.com',
      subscriptionMonths: 6,
      connectedPlatforms: ['instagram', 'youtube', 'tiktok'],
      status: 'active',
      lastActive: '2024-03-15'
    },
    {
      id: 2,
      email: 'user2@example.com',
      subscriptionMonths: 3,
      connectedPlatforms: ['instagram', 'facebook'],
      status: 'trial',
      lastActive: '2024-03-14'
    }
  ];

  return (
    <div className="min-h-screen bg-[#022424] text-[#03ffc3] p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-[#03ffc3]/20 rounded-lg hover:bg-[#03ffc3]/30 transition-colors"
          >
            Exit Admin Mode
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-[#03ffc3]/10 rounded-xl p-6">
            <div className="flex justify-between items-start mb-4">
              <Users size={24} className="text-[#00ff3f]" />
              <span className="text-[#00ff3f] text-sm">+12%</span>
            </div>
            <h3 className="text-[#03ffc3]/80 text-sm">Total Users</h3>
            <p className="text-2xl font-bold mt-1">{stats.totalUsers}</p>
          </div>

          <div className="bg-[#03ffc3]/10 rounded-xl p-6">
            <div className="flex justify-between items-start mb-4">
              <Clock size={24} className="text-[#00ff3f]" />
              <span className="text-[#00ff3f] text-sm">+8%</span>
            </div>
            <h3 className="text-[#03ffc3]/80 text-sm">Trial Users</h3>
            <p className="text-2xl font-bold mt-1">{stats.trialUsers}</p>
          </div>

          <div className="bg-[#03ffc3]/10 rounded-xl p-6">
            <div className="flex justify-between items-start mb-4">
              <CreditCard size={24} className="text-[#00ff3f]" />
              <span className="text-[#00ff3f] text-sm">+15%</span>
            </div>
            <h3 className="text-[#03ffc3]/80 text-sm">Active Subscribers</h3>
            <p className="text-2xl font-bold mt-1">{stats.activeSubscribers}</p>
          </div>

          <div className="bg-[#03ffc3]/10 rounded-xl p-6">
            <div className="flex justify-between items-start mb-4">
              <BarChart3 size={24} className="text-[#00ff3f]" />
              <span className="text-[#00ff3f] text-sm">+10%</span>
            </div>
            <h3 className="text-[#03ffc3]/80 text-sm">Monthly Revenue</h3>
            <p className="text-2xl font-bold mt-1">${stats.monthlyRevenue}</p>
          </div>
        </div>

        <div className="bg-[#03ffc3]/10 rounded-xl p-6">
          <h2 className="text-xl font-bold mb-6">User Directory</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#03ffc3]/20">
                  <th className="text-left py-3 px-4">Email</th>
                  <th className="text-left py-3 px-4">Subscription</th>
                  <th className="text-left py-3 px-4">Connected Platforms</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Last Active</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b border-[#03ffc3]/20">
                    <td className="py-3 px-4">{user.email}</td>
                    <td className="py-3 px-4">{user.subscriptionMonths} months</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        {user.connectedPlatforms.map((platform) => (
                          <span
                            key={platform}
                            className="px-2 py-1 bg-[#03ffc3]/20 rounded text-sm"
                          >
                            {platform}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded text-sm ${
                          user.status === 'active'
                            ? 'bg-[#00ff3f]/20 text-[#00ff3f]'
                            : 'bg-yellow-500/20 text-yellow-500'
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">{user.lastActive}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;