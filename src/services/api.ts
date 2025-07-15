const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export interface Equipment {
  id: number;
  name: string;
  description?: string;
  category: string;
  brand?: string;
  model?: string;
  serial_number?: string;
  condition: string;
  is_available: boolean;
  location?: string;
  notes?: string;
  owner_id?: string;
  owner_name?: string;
  created_at: string;
  updated_at?: string;
}

export interface EquipmentCreate {
  name: string;
  description?: string;
  category: string;
  brand?: string;
  model?: string;
  serial_number?: string;
  condition?: string;
  is_available?: boolean;
  location?: string;
  notes?: string;
  owner_id?: string;
  owner_name?: string;
}

export interface EquipmentStats {
  total_items: number;
  available_items: number;
  in_use_items: number;
  categories: number;
}

export interface TeamCreate {
  name: string;
  description?: string;
  subscription_type: 'free' | 'paid' | 'enterprise';
}

export interface Team {
  id: number;
  name: string;
  description?: string;
  subscription_type: 'free' | 'paid' | 'enterprise';
  created_at: string;
  updated_at?: string;
}

export interface TeamMembership {
  id: number;
  team_id: number;
  user_id: string;
  role: 'owner' | 'admin' | 'member';
  user_name?: string;
  user_email?: string;
  team_name?: string;
  team_description?: string;
  created_at: string;
}

export interface TeamMemberCreate {
  user_id: string;
  role: 'owner' | 'admin' | 'member';
  user_name?: string;
  user_email?: string;
}

class ApiService {
  private getAccessToken: (() => Promise<string>) | null = null;

  // Set the token getter function (to be called from components)
  setTokenGetter(getAccessToken: () => Promise<string>) {
    this.getAccessToken = getAccessToken;
  }

  private async getAuthHeaders(): Promise<HeadersInit> {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    // Add Authorization header if token getter is available
    if (this.getAccessToken) {
      try {
        const token = await this.getAccessToken();
        headers['Authorization'] = `Bearer ${token}`;
      } catch (error) {
        console.warn('Failed to get access token:', error);
      }
    }

    return headers;
  }

  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const headers = await this.getAuthHeaders();
    
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        ...headers,
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    return response.json();
  }

  // Equipment endpoints
  async getEquipment(params: {
    skip?: number;
    limit?: number;
    category?: string;
    available_only?: boolean;
    owner_id?: string;
  } = {}): Promise<Equipment[]> {
    const searchParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        searchParams.append(key, value.toString());
      }
    });

    const queryString = searchParams.toString();
    const endpoint = `/api/v1/equipment/${queryString ? `?${queryString}` : ''}`;
    
    return this.makeRequest<Equipment[]>(endpoint);
  }

  async getEquipmentById(id: number): Promise<Equipment> {
    return this.makeRequest<Equipment>(`/api/v1/equipment/${id}`);
  }

  async createEquipment(equipment: EquipmentCreate): Promise<Equipment> {
    return this.makeRequest<Equipment>('/api/v1/equipment/', {
      method: 'POST',
      body: JSON.stringify(equipment),
    });
  }

  async updateEquipment(id: number, equipment: Partial<EquipmentCreate>): Promise<Equipment> {
    return this.makeRequest<Equipment>(`/api/v1/equipment/${id}`, {
      method: 'PUT',
      body: JSON.stringify(equipment),
    });
  }

  async deleteEquipment(id: number): Promise<{ message: string }> {
    return this.makeRequest<{ message: string }>(`/api/v1/equipment/${id}`, {
      method: 'DELETE',
    });
  }

  async getEquipmentStats(owner_id?: string): Promise<EquipmentStats> {
    const endpoint = `/api/v1/equipment/stats/summary${owner_id ? `?owner_id=${owner_id}` : ''}`;
    return this.makeRequest<EquipmentStats>(endpoint);
  }

  async getEquipmentCategories(): Promise<{ categories: string[] }> {
    return this.makeRequest<{ categories: string[] }>('/api/v1/equipment/categories/list/');
  }

  // Team endpoints
  async createTeam(team: TeamCreate): Promise<Team> {
    return this.makeRequest<Team>('/api/v1/teams/', {
      method: 'POST',
      body: JSON.stringify(team),
    });
  }

  async getUserTeams(userId: string): Promise<TeamMembership[]> {
    return this.makeRequest<TeamMembership[]>(`/api/v1/users/${userId}/teams`);
  }

  async getTeamById(teamId: number): Promise<Team> {
    return this.makeRequest<Team>(`/api/v1/teams/${teamId}`);
  }

  async addTeamMember(teamId: number, member: TeamMemberCreate): Promise<TeamMembership> {
    return this.makeRequest<TeamMembership>(`/api/v1/teams/${teamId}/members`, {
      method: 'POST',
      body: JSON.stringify(member),
    });
  }

  async getTeamMembers(teamId: number): Promise<TeamMembership[]> {
    return this.makeRequest<TeamMembership[]>(`/api/v1/teams/${teamId}/members`);
  }

  async updateTeamMember(teamId: number, memberId: number, updates: Partial<TeamMemberCreate>): Promise<TeamMembership> {
    return this.makeRequest<TeamMembership>(`/api/v1/teams/${teamId}/members/${memberId}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  async removeTeamMember(teamId: number, memberId: number): Promise<{ message: string }> {
    return this.makeRequest<{ message: string }>(`/api/v1/teams/${teamId}/members/${memberId}`, {
      method: 'DELETE',
    });
  }
}

export const apiService = new ApiService();
