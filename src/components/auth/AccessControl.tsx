import { ReactNode } from 'react';
import { useUserRole } from '@/hooks/useUserRole';
import { useAuth } from '@/hooks/useAuth';
import { Lock, Crown, CreditCard, ArrowRight } from 'lucide-react';

interface AccessControlProps {
  children: ReactNode;
  requireDashboard?: boolean;
  requireEquipment?: boolean;
  requireReports?: boolean;
  requireAdmin?: boolean;
}

const AccessControl = ({ 
  children, 
  requireDashboard = false,
  requireEquipment = false,
  requireReports = false,
  requireAdmin = false 
}: AccessControlProps) => {
  const { user, login } = useAuth();
  const { role, permissions, loading } = useUserRole();

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-orange-200 border-t-orange-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Checking access...</p>
        </div>
      </div>
    );
  }

  // Check if user has required permissions
  const hasAccess = 
    (!requireDashboard || permissions.canAccessDashboard) &&
    (!requireEquipment || permissions.canManageEquipment) &&
    (!requireReports || permissions.canViewReports) &&
    (!requireAdmin || permissions.canAccessAdmin);

  if (hasAccess) {
    return <>{children}</>;
  }

  // Access denied - show upgrade page
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-br from-orange-50 to-gray-50 py-16 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
            {role === 'superadmin' ? (
              <Crown className="h-10 w-10 text-orange-600" />
            ) : role === 'paid' ? (
              <CreditCard className="h-10 w-10 text-orange-600" />
            ) : (
              <Lock className="h-10 w-10 text-orange-600" />
            )}
          </div>
          
          <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
            {requireAdmin ? 'Admin Access Required' : 'Upgrade to Pro'}
          </h1>
          
          <p className="text-xl text-gray-600 mb-8">
            {requireAdmin 
              ? 'Only administrators can access this feature.'
              : 'This feature is available to Pro users only.'
            }
          </p>
          
          <div className="inline-flex items-center px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
            Current Plan: <span className="ml-1 capitalize font-semibold">{role}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="py-16 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {requireAdmin ? (
            // Admin access denied
            <div className="text-center">
              <div className="bg-red-50 border border-red-200 rounded-3xl p-8 mb-8">
                <h2 className="text-2xl font-light text-gray-900 mb-4">Access Restricted</h2>
                <p className="text-gray-600 mb-6">
                  This area is restricted to system administrators only.
                </p>
                <button
                  onClick={() => window.history.back()}
                  className="inline-flex items-center px-6 py-3 bg-gray-600 text-white rounded-2xl hover:bg-gray-700 transition-colors"
                >
                  <ArrowRight className="h-5 w-5 mr-2 rotate-180" />
                  Go Back
                </button>
              </div>
            </div>
          ) : (
            // Pro upgrade
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Current Plan */}
              <div className="bg-gray-50 rounded-3xl p-8">
                <h2 className="text-2xl font-light text-gray-900 mb-6">Your Current Plan</h2>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    </div>
                    <span className="text-gray-700">Access to landing page</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    </div>
                    <span className="text-gray-700">Beta waitlist signup</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mr-3">
                      <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                    </div>
                    <span className="text-gray-500">Equipment management</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mr-3">
                      <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                    </div>
                    <span className="text-gray-500">Dashboard access</span>
                  </div>
                </div>
              </div>

              {/* Pro Plan */}
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-3xl p-8 border-2 border-orange-200">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-light text-gray-900">Pro Plan</h2>
                  <span className="px-3 py-1 bg-orange-600 text-white text-sm font-medium rounded-full">
                    Recommended
                  </span>
                </div>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    </div>
                    <span className="text-gray-700">Full equipment management</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    </div>
                    <span className="text-gray-700">Complete dashboard access</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    </div>
                    <span className="text-gray-700">Advanced reporting</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    </div>
                    <span className="text-gray-700">Priority support</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <button 
                    onClick={() => {
                      // TODO: Integrate with your payment system
                      alert('Payment integration coming soon!');
                    }}
                    className="w-full bg-orange-600 text-white py-4 px-6 rounded-2xl font-medium hover:bg-orange-700 transition-colors flex items-center justify-center group"
                  >
                    Upgrade to Pro
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                  
                  <button
                    onClick={() => window.history.back()}
                    className="w-full bg-white text-gray-700 py-4 px-6 rounded-2xl font-medium hover:bg-gray-50 transition-colors border border-gray-200"
                  >
                    Go Back
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccessControl;
