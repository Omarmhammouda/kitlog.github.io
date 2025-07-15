import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { apiService, TeamCreate, TeamMembership } from '@/services/api';

const useUserTeams = () => {
  const { user, isAuthenticated, getAccessToken } = useAuth();
  const [userTeams, setUserTeams] = useState<TeamMembership[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated && user.id) {
      const checkUserTeams = async () => {
        try {
          // Set up API service with token
          apiService.setTokenGetter(getAccessToken);
          
          // Check if user has teams
          const teams = await apiService.getUserTeams(user.id);
          setUserTeams(teams);
        } catch (error) {
          console.error('Error fetching user teams:', error);
          setError('Failed to load teams. Please try again.');
        } finally {
          setLoading(false);
        }
      };
      
      checkUserTeams();
    }
  }, [user, isAuthenticated, getAccessToken]);

  const hasTeam = userTeams.length > 0;
  const defaultTeam = userTeams.find(team => team.role === 'owner') || userTeams[0];

  const createTeam = async (teamData: TeamCreate) => {
    try {
      setLoading(true);
      setError(null);
      
      // Create the team
      const createdTeam = await apiService.createTeam(teamData);
      
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
      
      return createdTeam;
    } catch (error) {
      console.error('Error creating team:', error);
      setError('Failed to create team. Please try again.');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { 
    hasTeam, 
    userTeams, 
    defaultTeam, 
    loading, 
    error, 
    createTeam,
    refetch: () => {
      setLoading(true);
      setError(null);
    }
  };
};

export default useUserTeams;
