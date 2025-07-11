import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import AccessControl from '@/components/auth/AccessControl';
import { apiService, Equipment } from '@/services/api';
import { Package, Plus, Edit, Trash2, Search, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const EquipmentList = () => {
  const { user, getAccessToken } = useAuth();
  const navigate = useNavigate();
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    apiService.setTokenGetter(getAccessToken);
  }, [getAccessToken]);

  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        setLoading(true);
        const userEquipment = await apiService.getEquipment({
          owner_id: user.id,
        });
        setEquipment(userEquipment);
      } catch (err) {
        console.error('Error fetching equipment:', err);
        setError('Failed to load equipment');
      } finally {
        setLoading(false);
      }
    };

    if (user.id) {
      fetchEquipment();
    }
  }, [user.id]);

  const filteredEquipment = equipment.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (item.brand && item.brand.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = !selectedCategory || item.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const categories = [...new Set(equipment.map(item => item.category))];

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this equipment?')) {
      try {
        await apiService.deleteEquipment(id);
        setEquipment(prev => prev.filter(item => item.id !== id));
      } catch (err) {
        console.error('Error deleting equipment:', err);
        setError('Failed to delete equipment');
      }
    }
  };

  if (loading) {
    return (
      <ProtectedRoute>
        <AccessControl requireEquipment={true}>
          <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading equipment...</p>
            </div>
          </div>
        </AccessControl>
      </ProtectedRoute>
    );
  }

  if (error) {
    return (
      <ProtectedRoute>
        <AccessControl requireEquipment={true}>
          <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center">
              <Package className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <p className="text-red-600 font-medium">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </AccessControl>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <AccessControl requireEquipment={true}>
        <div className="min-h-screen bg-white">
          {/* Header */}
          <div className="bg-gradient-to-br from-orange-50 to-gray-50 py-12 px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-8">
                <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
                  Your Equipment
                </h1>
                <p className="text-xl text-gray-600">
                  Manage your creative equipment inventory
                </p>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-2xl p-6 text-center shadow-apple">
                  <div className="text-3xl font-light text-gray-900 mb-2">
                    {equipment.length}
                  </div>
                  <div className="text-sm text-gray-600">Total Items</div>
                </div>
                <div className="bg-white rounded-2xl p-6 text-center shadow-apple">
                  <div className="text-3xl font-light text-gray-900 mb-2">
                    {equipment.filter(item => item.is_available).length}
                  </div>
                  <div className="text-sm text-gray-600">Available</div>
                </div>
                <div className="bg-white rounded-2xl p-6 text-center shadow-apple">
                  <div className="text-3xl font-light text-gray-900 mb-2">
                    {categories.length}
                  </div>
                  <div className="text-sm text-gray-600">Categories</div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="py-12 px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              {/* Search and Filters */}
              <div className="mb-8 flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
                <div className="flex flex-col sm:flex-row gap-4 flex-1">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search equipment..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div className="relative">
                    <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="pl-10 pr-8 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
                    >
                      <option value="">All Categories</option>
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <button
                  onClick={() => navigate('/equipment/new')}
                  className="flex items-center gap-2 px-6 py-3 bg-orange-600 text-white rounded-2xl hover:bg-orange-700 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105"
                >
                  <Plus className="h-5 w-5" />
                  Add Equipment
                </button>
              </div>

              {/* Equipment Grid */}
              {filteredEquipment.length === 0 ? (
                <div className="text-center py-16">
                  <Package className="h-16 w-16 text-gray-400 mx-auto mb-6" />
                  <h3 className="text-2xl font-light text-gray-900 mb-4">
                    {searchTerm || selectedCategory ? 'No equipment matches your filters' : 'No equipment found'}
                  </h3>
                  <p className="text-gray-600 mb-8 max-w-md mx-auto">
                    {searchTerm || selectedCategory 
                      ? 'Try adjusting your search or filter criteria.'
                      : 'Start by adding your first piece of equipment to get organized.'
                    }
                  </p>
                  {!searchTerm && !selectedCategory && (
                    <button
                      onClick={() => navigate('/equipment/new')}
                      className="inline-flex items-center gap-2 px-8 py-4 bg-orange-600 text-white rounded-2xl hover:bg-orange-700 transition-colors transform hover:scale-105"
                    >
                      <Plus className="h-5 w-5" />
                      Add Your First Equipment
                    </button>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredEquipment.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-apple-lg transition-all duration-200 transform hover:scale-105"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-medium text-gray-900 mb-2">
                            {item.name}
                          </h3>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs font-medium rounded-full">
                              {item.category}
                            </span>
                            <span
                              className={`px-2 py-1 text-xs font-medium rounded-full ${
                                item.is_available
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-red-100 text-red-800'
                              }`}
                            >
                              {item.is_available ? 'Available' : 'In Use'}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => navigate(`/equipment/${item.id}/edit`)}
                            className="p-2 text-gray-400 hover:text-orange-600 transition-colors"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button 
                            onClick={() => handleDelete(item.id)}
                            className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      
                      {item.brand && (
                        <p className="text-sm text-gray-600 mb-2">
                          <span className="font-medium">Brand:</span> {item.brand}
                        </p>
                      )}
                      
                      {item.model && (
                        <p className="text-sm text-gray-600 mb-2">
                          <span className="font-medium">Model:</span> {item.model}
                        </p>
                      )}
                      
                      {item.description && (
                        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                          {item.description}
                        </p>
                      )}
                      
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <span className="text-xs text-gray-500 capitalize">
                          {item.condition}
                        </span>
                        {item.location && (
                          <span className="text-xs text-gray-500">
                            📍 {item.location}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </AccessControl>
    </ProtectedRoute>
  );
};

export default EquipmentList;
