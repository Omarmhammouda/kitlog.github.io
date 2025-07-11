console.log('🔍 Environment variable VITE_API_URL:', import.meta.env.VITE_API_URL);
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
console.log('🔍 Final API_BASE_URL:', API_BASE_URL);

// Also show alert for debugging
if (typeof window !== 'undefined') {
  window.KITLOG_DEBUG = {
    VITE_API_URL: import.meta.env.VITE_API_URL,
    API_BASE_URL: API_BASE_URL,
    allEnv: import.meta.env
  };
}

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
    const fullUrl = `${API_BASE_URL}${endpoint}`;
    
    console.log('🔍 Making API request to:', fullUrl);
    console.log('🔍 API_BASE_URL:', API_BASE_URL);
    console.log('🔍 endpoint:', endpoint);
    
    const response = await fetch(fullUrl, {
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
    const endpoint = `/api/v1/equipment${queryString ? `?${queryString}` : ''}`;
    
    return this.makeRequest<Equipment[]>(endpoint);
  }

  async getEquipmentById(id: number): Promise<Equipment> {
    return this.makeRequest<Equipment>(`/api/v1/equipment/${id}`);
  }

  async createEquipment(equipment: EquipmentCreate): Promise<Equipment> {
    return this.makeRequest<Equipment>('/api/v1/equipment', {
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
    return this.makeRequest<{ categories: string[] }>('/api/v1/equipment/categories/list');
  }
}

export const apiService = new ApiService();
