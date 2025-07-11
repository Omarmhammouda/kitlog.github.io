import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { apiService, Equipment } from '@/services/api';
import { Package, Plus, Edit, Trash2, Search } from 'lucide-react';

const EquipmentPage = () => {
  const { user, getAccessToken } = useAuth();
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

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

  const filteredEquipment = equipment.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.brand && item.brand.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleAddEquipment = async () => {
    // For now, let's add a test item
    try {
      const newItem = await apiService.createEquipment({
        name: 'Test Equipment',
        category: 'Test Category',
        description: 'Test equipment added from the UI',
        condition: 'good',
        is_available: true,
        owner_id: user.id,
        owner_name: user.name,
      });
      setEquipment(prev => [...prev, newItem]);
    } catch (err) {
      console.error('Error adding equipment:', err);
    }
  };

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading equipment...</p>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  if (error) {
    return (
      <ProtectedRoute>
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
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-light text-gray-900">Equipment</h1>
            <p className="mt-2 text-gray-600">
              Manage your creative equipment inventory
            </p>
          </div>

          {/* Search and Add */}
          <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search equipment..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            <button
              onClick={handleAddEquipment}
              className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
            >
              <Plus className="h-5 w-5" />
              Add Equipment
            </button>
          </div>

          {/* Equipment List */}
          {filteredEquipment.length === 0 ? (
            <div className="text-center py-12">
              <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No equipment found
              </h3>
              <p className="text-gray-600 mb-4">
                {searchTerm ? 'No equipment matches your search.' : 'Start by adding your first piece of equipment.'}
              </p>
              {!searchTerm && (
                <button
                  onClick={handleAddEquipment}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
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
                  className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-900 mb-1">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-600">{item.category}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-gray-400 hover:text-orange-600 transition-colors">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  
                  {item.brand && (
                    <p className="text-sm text-gray-600 mb-2">
                      <span className="font-medium">Brand:</span> {item.brand}
                    </p>
                  )}
                  
                  {item.description && (
                    <p className="text-sm text-gray-600 mb-4">
                      {item.description}
                    </p>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        item.is_available
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {item.is_available ? 'Available' : 'In Use'}
                    </span>
                    <span className="text-xs text-gray-500">
                      {item.condition}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default EquipmentPage;
