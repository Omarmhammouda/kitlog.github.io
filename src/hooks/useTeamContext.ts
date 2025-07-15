import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { apiService, TeamMembership } from '@/services/api';

export const useTeamContext = () => {
  const { user, isAuthenticated, getAccessToken } = useAuth();
  const [userTeams, setUserTeams] = useState<TeamMembership[]>([]);
  const [currentTeam, setCurrentTeam] = useState<TeamMembership | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Get user's teams
  useEffect(() => {
    if (isAuthenticated && user.id) {
      const fetchTeams = async () => {
        try {
          apiService.setTokenGetter(getAccessToken);
          const teams = await apiService.getUserTeams(user.id);
          setUserTeams(teams);
          
          // Set default team (first owned team, or first team if no owned teams)
          const ownedTeam = teams.find(team => team.role === 'owner');
          setCurrentTeam(ownedTeam || teams[0] || null);
        } catch (err) {
          console.error('Error fetching teams:', err);
          setError('Failed to load teams');
        } finally {
          setLoading(false);
        }
      };

      fetchTeams();
    } else {
      setLoading(false);
    }
  }, [user, isAuthenticated, getAccessToken]);

  const switchTeam = (team: TeamMembership) => {
    setCurrentTeam(team);
  };

  const refreshTeams = async () => {
    if (isAuthenticated && user.id) {
      setLoading(true);
      try {
        const teams = await apiService.getUserTeams(user.id);
        setUserTeams(teams);
        
        // Update current team if it still exists
        if (currentTeam) {
          const updatedCurrentTeam = teams.find(t => t.id === currentTeam.id);
          setCurrentTeam(updatedCurrentTeam || teams[0] || null);
        }
      } catch (err) {
        console.error('Error refreshing teams:', err);
        setError('Failed to refresh teams');
      } finally {
        setLoading(false);
      }
    }
  };

  return {
    userTeams,
    currentTeam,
    switchTeam,
    refreshTeams,
    loading,
    error,
    hasTeams: userTeams.length > 0,
    isOwner: currentTeam?.role === 'owner',
    isAdmin: currentTeam?.role === 'admin' || currentTeam?.role === 'owner',
  };
};
