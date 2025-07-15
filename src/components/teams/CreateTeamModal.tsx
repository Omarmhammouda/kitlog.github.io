import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { X, Users, Loader2 } from 'lucide-react';
import { TeamCreate } from '@/services/api';

interface CreateTeamModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateTeam: (teamData: TeamCreate) => Promise<void>;
  isLoading: boolean;
}

const CreateTeamModal = ({ isOpen, onClose, onCreateTeam, isLoading }: CreateTeamModalProps) => {
  const [formData, setFormData] = useState<TeamCreate>({
    name: '',
    description: '',
    subscription_type: 'free',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    try {
      await onCreateTeam(formData);
      setFormData({ name: '', description: '', subscription_type: 'free' });
      onClose();
    } catch (error) {
      console.error('Error creating team:', error);
    }
  };

  const handleChange = (field: keyof TeamCreate, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                <Users className="w-5 h-5 text-orange-600" />
              </div>
              <CardTitle className="text-xl">Create New Team</CardTitle>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="teamName">Team Name *</Label>
              <Input
                id="teamName"
                type="text"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="Enter team name"
                required
                disabled={isLoading}
              />
            </div>
            
            <div>
              <Label htmlFor="teamDescription">Description</Label>
              <Textarea
                id="teamDescription"
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                placeholder="Describe your team's purpose (optional)"
                disabled={isLoading}
                rows={3}
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isLoading}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={!formData.name.trim() || isLoading}
                className="flex-1"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Creating...
                  </>
                ) : (
                  'Create Team'
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateTeamModal;
