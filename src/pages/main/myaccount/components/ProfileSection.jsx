import React from 'react'
import { Camera, Edit } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'

const ProfileSection = ({ profileData, setProfileData, handleProfileUpdate, isSubmitting }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900">Profile</h2>

      <Card className="p-6">
        <form onSubmit={handleProfileUpdate} className="space-y-6">
          {/* Avatar Section */}
          <div className="flex items-start space-x-6">
            <div className="flex flex-col items-center space-y-3">
              <div className="relative">
                <img
                  src={profileData.imageUrl || 'https://via.placeholder.com/96'}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover"
                />
                <label
                  htmlFor="profile_image"
                  className="absolute -bottom-2 -right-2 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors cursor-pointer"
                >
                  <Camera className="w-4 h-4" />
                </label>
                <input
                  id="profile_image"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) {
                      setProfileData({ ...profileData, file })
                    }
                  }}
                />
              </div>
              <Button type="button" variant="outline" size="sm" className="text-xs" onClick={() => document.getElementById('profile_image')?.click()}>
                <Camera className="w-3 h-3 mr-1" />
                Change Photo
              </Button>
            </div>

            {/* Profile Fields */}
            <div className="flex-1 space-y-4">
              <div>
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  value={profileData.fullName}
                  onChange={(e) => setProfileData({ ...profileData, fullName: e.target.value })}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                  className="mt-1"
                  disabled
                />
              </div>

              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={profileData.phone}
                  onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                  className="mt-1"
                />
              </div>
            </div>
          </div>

          <Button type="submit" className="bg-blue-500 hover:bg-blue-600" disabled={isSubmitting}>
            <Edit className="w-4 h-4 mr-2" />
            {isSubmitting ? 'Updating...' : 'Update Profile'}
          </Button>
        </form>
      </Card>
    </div>
  )
}

export default ProfileSection
