import { useAuth } from './useAuth';
import { useEffect, useState } from 'react';

export type UserRole = 'free' | 'paid' | 'superadmin';

export interface UserPermissions {
  canAccessDashboard: boolean;
  canManageEquipment: boolean;
  canViewReports: boolean;
  canAccessAdmin: boolean;
  isSuper: boolean;
}

// Your email addresses - add all superadmin emails here
const SUPERADMIN_EMAILS = [
  'imarey96@gmail.com',
  'abaq123@gmail.com',
  // Add more superadmin emails as needed:
  // 'admin2@example.com',
  // 'admin3@example.com',
]; // 👈 ADD MORE EMAILS TO THIS ARRAY

export const useUserRole = () => {
  const { user, isAuthenticated } = useAuth();
  const [role, setRole] = useState<UserRole>('free');
  const [permissions, setPermissions] = useState<UserPermissions>({
    canAccessDashboard: false,
    canManageEquipment: false,
    canViewReports: false,
    canAccessAdmin: false,
    isSuper: false,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated || !user) {
      setRole('free');
      setPermissions({
        canAccessDashboard: false,
        canManageEquipment: false,
        canViewReports: false,
        canAccessAdmin: false,
        isSuper: false,
      });
      setLoading(false);
      return;
    }

    // Determine user role
    const determineRole = (): UserRole => {
      // Check if user is superadmin (check against all superadmin emails)
      if (user.email && SUPERADMIN_EMAILS.includes(user.email)) {
        return 'superadmin';
      }

      // Check if user has paid subscription
      // For now, we'll simulate this - you can integrate with your payment system later
      const hasPaidSubscription = checkPaidSubscription(user.email);
      
      return hasPaidSubscription ? 'paid' : 'free';
    };

    // Set role and permissions
    const userRole = determineRole();
    setRole(userRole);
    setPermissions(getRolePermissions(userRole));
    setLoading(false);
  }, [user, isAuthenticated]);

  return { role, permissions, loading };
};

// Simulate paid subscription check - replace with real logic later
const checkPaidSubscription = (email: string): boolean => {
  // For now, return false for everyone except superadmin
  // Later, you can integrate with Stripe, etc.
  return false;
};

// Define permissions for each role
const getRolePermissions = (role: UserRole): UserPermissions => {
  switch (role) {
    case 'superadmin':
      return {
        canAccessDashboard: true,
        canManageEquipment: true,
        canViewReports: true,
        canAccessAdmin: true,
        isSuper: true,
      };
    case 'paid':
      return {
        canAccessDashboard: true,
        canManageEquipment: true,
        canViewReports: true,
        canAccessAdmin: false,
        isSuper: false,
      };
    case 'free':
    default:
      return {
        canAccessDashboard: false,
        canManageEquipment: false,
        canViewReports: false,
        canAccessAdmin: false,
        isSuper: false,
      };
  }
};
