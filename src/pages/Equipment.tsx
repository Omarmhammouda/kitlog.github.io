import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import AccessControl from '@/components/auth/AccessControl';
import { apiService, EquipmentCreate } from '@/services/api';
import { Package, Plus, ArrowLeft, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DebugPanel from '@/components/DebugPanel';

const EquipmentPage = () => {
  const { user, getAccessToken } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<EquipmentCreate>({
    name: '',
    category: '',
    description: '',
    brand: '',
    model: '',
    serial_number: '',
    condition: 'good',
    is_available: true,
    location: '',
    notes: '',
    owner_id: user.id,
    owner_name: user.name,
  });

  useEffect(() => {
    apiService.setTokenGetter(getAccessToken);
  }, [getAccessToken]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      await apiService.createEquipment({
        ...formData,
        owner_id: user.id,
        owner_name: user.name,
      });
      
      setSuccess(true);
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } catch (err) {
      console.error('Error creating equipment:', err);
      setError('Failed to add equipment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    'Camera',
    'Lens',
    'Lighting',
    'Audio',
    'Video',
    'Tripod',
    'Drone',
    'Computer',
    'Storage',
    'Accessories',
    'Other'
  ];

  const conditions = [
    { value: 'excellent', label: 'Excellent' },
    { value: 'good', label: 'Good' },
    { value: 'fair', label: 'Fair' },
    { value: 'poor', label: 'Poor' },
    { value: 'needs_repair', label: 'Needs Repair' }
  ];

  if (success) {
    return (
      <ProtectedRoute>
        <AccessControl requireEquipment={true}>
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-light text-gray-900 mb-2">Equipment Added Successfully!</h1>
            <p className="text-gray-600 mb-4">Redirecting to dashboard...</p>
            <div className="w-8 h-8 border-2 border-orange-200 border-t-orange-600 rounded-full animate-spin mx-auto"></div>
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
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center mb-6">
              <button
                onClick={() => navigate('/dashboard')}
                className="mr-4 p-2 text-gray-600 hover:text-orange-600 transition-colors"
              >
                <ArrowLeft className="h-6 w-6" />
              </button>
              <div>
                <h1 className="text-4xl font-light text-gray-900 mb-2">Add Equipment</h1>
                <p className="text-xl text-gray-600">Add a new piece of equipment to your inventory</p>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="py-12 px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Basic Information */}
              <div className="bg-white rounded-3xl p-8 shadow-apple border border-gray-100">
                <h2 className="text-2xl font-light text-gray-900 mb-6">Basic Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Equipment Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
                      placeholder="e.g., Canon EOS R5"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category *
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
                    >
                      <option value="">Select a category</option>
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Brand
                    </label>
                    <input
                      type="text"
                      name="brand"
                      value={formData.brand}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
                      placeholder="e.g., Canon"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Model
                    </label>
                    <input
                      type="text"
                      name="model"
                      value={formData.model}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
                      placeholder="e.g., EOS R5"
                    />
                  </div>
                </div>
                
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
                    placeholder="Brief description of the equipment..."
                  />
                </div>
              </div>

              {/* Details */}
              <div className="bg-white rounded-3xl p-8 shadow-apple border border-gray-100">
                <h2 className="text-2xl font-light text-gray-900 mb-6">Details</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Serial Number
                    </label>
                    <input
                      type="text"
                      name="serial_number"
                      value={formData.serial_number}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
                      placeholder="e.g., 1234567890"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Condition
                    </label>
                    <select
                      name="condition"
                      value={formData.condition}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
                    >
                      {conditions.map(condition => (
                        <option key={condition.value} value={condition.value}>{condition.label}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
                      placeholder="e.g., Studio A, Shelf 2"
                    />
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="is_available"
                      checked={formData.is_available}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-orange-600 rounded focus:ring-orange-500 border-gray-300"
                    />
                    <label className="ml-2 block text-sm text-gray-700">
                      Currently available
                    </label>
                  </div>
                </div>
                
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Notes
                  </label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
                    placeholder="Any additional notes..."
                  />
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}

              {/* Submit Button */}
              <div className="flex items-center justify-end gap-4">
                <button
                  type="button"
                  onClick={() => navigate('/dashboard')}
                  className="px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center gap-2 px-8 py-3 bg-orange-600 text-white rounded-2xl hover:bg-orange-700 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <Plus className="h-5 w-5" />
                  )}
                  {loading ? 'Adding...' : 'Add Equipment'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <DebugPanel />
      </AccessControl>
    </ProtectedRoute>
  );
};

export default EquipmentPage;
