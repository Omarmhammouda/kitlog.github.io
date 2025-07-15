import { useState, useEffect, useCallback } from 'react';
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
    } else if (!isAuthenticated) {
      setLoading(false);
    }
  }, [user.id, isAuthenticated, getAccessToken]);

  const hasTeam = userTeams.length > 0;
  const defaultTeam = userTeams.find(team => team.role === 'owner') || userTeams[0];

  const createTeam = async (teamData: TeamCreate) => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Creating team with data:', teamData);
      
      // Create the team
      const createdTeam = await apiService.createTeam(teamData);
      console.log('Team created:', createdTeam);
      
      // Add user as owner of the team
      const memberData = {
        user_id: user.id,
        role: 'owner' as const,
        user_name: user.name,
        user_email: user.email,
      };
      console.log('Adding team member with data:', memberData);
      
      await apiService.addTeamMember(createdTeam.id, memberData);
      console.log('Team member added successfully');
      
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
