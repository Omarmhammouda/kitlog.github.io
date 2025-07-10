import { useAuth } from '@/hooks/useAuth';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, BarChart3, Activity, User, ArrowRight, Plus } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();

  const stats = [
    { label: 'Total Items', value: '0', icon: Package, color: 'bg-orange-50 text-orange-600' },
    { label: 'Categories', value: '0', icon: BarChart3, color: 'bg-blue-50 text-blue-600' },
    { label: 'Available', value: '0', icon: Activity, color: 'bg-green-50 text-green-600' },
    { label: 'In Use', value: '0', icon: User, color: 'bg-purple-50 text-purple-600' },
  ];

  const quickActions = [
    { label: 'Add New Item', description: 'Add equipment to your inventory', icon: Plus },
    { label: 'Check Out Item', description: 'Assign equipment to a project', icon: ArrowRight },
    { label: 'View Reports', description: 'See usage analytics', icon: BarChart3 },
  ];

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-white">
        {/* Header */}
        <div className="bg-gradient-to-br from-orange-50 to-gray-50 py-12 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-4 animate-fade-in">
                Welcome back, <span className="text-orange font-normal">{user.name}</span>
              </h1>
              <p className="text-xl text-gray-600 animate-fade-in">
                Ready to manage your creative equipment?
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="bg-white rounded-2xl p-6 shadow-apple hover:shadow-apple-lg transition-all duration-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                        <p className="text-3xl font-light text-gray-900 mt-1">{stat.value}</p>
                      </div>
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${stat.color}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="py-12 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Quick Actions */}
            <div className="mb-12">
              <h2 className="text-2xl font-light text-gray-900 mb-6">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {quickActions.map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <button
                      key={index}
                      className="bg-white rounded-2xl p-6 shadow-apple hover:shadow-apple-lg transition-all duration-200 text-left group hover:scale-105 transform"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center group-hover:bg-orange-100 transition-colors">
                          <Icon className="w-6 h-6 text-orange-600" />
                        </div>
                        <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-orange-600 transition-colors" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">{action.label}</h3>
                      <p className="text-sm text-gray-600">{action.description}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Main Cards */}
            <div className="grid gap-8 md:grid-cols-2">
              {/* Profile Card */}
              <div className="bg-white rounded-3xl p-8 shadow-apple border border-gray-100">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center mr-4">
                    <User className="w-8 h-8 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-gray-900">Profile Information</h3>
                    <p className="text-gray-600">Your account details</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Name</span>
                    <span className="text-gray-900 font-medium">{user.name}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Email</span>
                    <span className="text-gray-900 font-medium">{user.email}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">ID</span>
                    <span className="text-gray-900 font-medium font-mono text-sm">{user.id}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600">Email Verified</span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      user.emailVerified 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {user.emailVerified ? 'Verified' : 'Pending'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Recent Activity Card */}
              <div className="bg-white rounded-3xl p-8 shadow-apple border border-gray-100">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mr-4">
                    <Activity className="w-8 h-8 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-gray-900">Recent Activity</h3>
                    <p className="text-gray-600">Latest updates and actions</p>
                  </div>
                </div>
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-50 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                    <Activity className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500 font-medium">No recent activity</p>
                  <p className="text-sm text-gray-400 mt-1">Your equipment actions will appear here</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;
