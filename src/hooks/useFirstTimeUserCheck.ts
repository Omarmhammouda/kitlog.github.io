import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { apiService, TeamCreate, TeamMembership } from '@/services/api';

const useFirstTimeUserCheck = () => {
  const { user, isAuthenticated, getAccessToken } = useAuth();
  const [userTeams, setUserTeams] = useState<TeamMembership[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated && user.id) {
      const checkAndCreateTeam = async () => {
        try {
          // Set up API service with token
          apiService.setTokenGetter(getAccessToken);
          
          // Check if user has teams
          const teams = await apiService.getUserTeams(user.id);
          
          if (teams.length > 0) {
            setUserTeams(teams);
          } else {
            // Create default team
            const defaultTeam: TeamCreate = {
              name: `${user.name}'s Team`,
              description: 'Your personal team',
              subscription_type: 'free',
            };
            
            const createdTeam = await apiService.createTeam(defaultTeam);
            
            // Add user as owner of the team
            await apiService.addTeamMember(createdTeam.id, {
              user_id: user.id,
              role: 'owner',
              user_name: user.name,
              user_email: user.email,
            });
            
            // Fetch updated teams
            const updatedTeams = await apiService.getUserTeams(user.id);
            setUserTeams(updatedTeams);
          }
        } catch (error) {
          console.error('Error checking or creating team:', error);
          setError('Failed to set up team. Please try again.');
        } finally {
          setLoading(false);
        }
      };
      
      checkAndCreateTeam();
    }
  }, [user, isAuthenticated, getAccessToken]);

  const hasTeam = userTeams.length > 0;
  const defaultTeam = userTeams.find(team => team.role === 'owner') || userTeams[0];

  return { 
    hasTeam, 
    userTeams, 
    defaultTeam, 
    loading, 
    error, 
    refetch: () => {
      setLoading(true);
      setError(null);
    }
  };
};

export default useFirstTimeUserCheck;
