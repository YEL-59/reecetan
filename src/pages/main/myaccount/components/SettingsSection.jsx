import React from 'react'
import { 
  ChevronDown, 
  ChevronUp, 
  Trash2, 
  Bell, 
  Mail, 
  Phone, 
  Lock 
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'

const SettingsSection = ({ 
  openAccordions, 
  toggleAccordion, 
  emailNotifications, 
  setEmailNotifications, 
  smsNotifications, 
  setSmsNotifications 
}) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900">Settings</h2>
      
      {/* Account Settings Accordion */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Settings</h3>
        
        <div className="space-y-4">
          {/* Change Password */}
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleAccordion('changePassword')}
              className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <Lock className="w-5 h-5 text-gray-500" />
                <div className="text-left">
                  <h4 className="font-medium text-gray-900">Change Password</h4>
                  <p className="text-sm text-gray-600">Update your account password</p>
                </div>
              </div>
              {openAccordions.changePassword ? (
                <ChevronUp className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-400" />
              )}
            </button>
            
            {openAccordions.changePassword && (
              <div className="px-4 pb-4 border-t border-gray-200">
                <div className="pt-4 space-y-4">
                  <div>
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input
                      id="currentPassword"
                      type="password"
                      placeholder="Enter current password"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input
                      id="newPassword"
                      type="password"
                      placeholder="Enter new password"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirm new password"
                      className="mt-1"
                    />
                  </div>
                  <Button className="bg-blue-500 hover:bg-blue-600">
                    Update Password
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Update Email */}
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleAccordion('updateEmail')}
              className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gray-500" />
                <div className="text-left">
                  <h4 className="font-medium text-gray-900">Update Email</h4>
                  <p className="text-sm text-gray-600">Change your email address</p>
                </div>
              </div>
              {openAccordions.updateEmail ? (
                <ChevronUp className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-400" />
              )}
            </button>
            
            {openAccordions.updateEmail && (
              <div className="px-4 pb-4 border-t border-gray-200">
                <div className="pt-4 space-y-4">
                  <div>
                    <Label htmlFor="newEmail">New Email Address</Label>
                    <Input
                      id="newEmail"
                      type="email"
                      placeholder="Enter new email address"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="confirmEmail">Confirm New Email</Label>
                    <Input
                      id="confirmEmail"
                      type="email"
                      placeholder="Confirm new email address"
                      className="mt-1"
                    />
                  </div>
                  <Button className="bg-blue-500 hover:bg-blue-600">
                    Update Email
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Update Phone Number */}
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleAccordion('updatePhone')}
              className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-gray-500" />
                <div className="text-left">
                  <h4 className="font-medium text-gray-900">Update Phone Number</h4>
                  <p className="text-sm text-gray-600">Change your phone number</p>
                </div>
              </div>
              {openAccordions.updatePhone ? (
                <ChevronUp className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-400" />
              )}
            </button>
            
            {openAccordions.updatePhone && (
              <div className="px-4 pb-4 border-t border-gray-200">
                <div className="pt-4 space-y-4">
                  <div>
                    <Label htmlFor="newPhone">New Phone Number</Label>
                    <Input
                      id="newPhone"
                      placeholder="Enter new phone number"
                      className="mt-1"
                    />
                  </div>
                  <Button className="bg-blue-500 hover:bg-blue-600">
                    Update Phone Number
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Notifications Accordion */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Notifications</h3>
        
        <div className="space-y-4">
          {/* Email Notifications */}
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gray-500" />
                <div>
                  <h4 className="font-medium text-gray-900">Email Notifications</h4>
                  <p className="text-sm text-gray-600">Receive updates and reminders</p>
                </div>
              </div>
              <button
                onClick={() => setEmailNotifications(!emailNotifications)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  emailNotifications ? 'bg-blue-500' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    emailNotifications ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* SMS Notifications */}
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Bell className="w-5 h-5 text-gray-500" />
                <div>
                  <h4 className="font-medium text-gray-900">SMS Notifications</h4>
                  <p className="text-sm text-gray-600">Receive important account updates</p>
                </div>
              </div>
              <button
                onClick={() => setSmsNotifications(!smsNotifications)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  smsNotifications ? 'bg-blue-500' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    smsNotifications ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </Card>

      {/* Danger Zone */}
      <Card className="p-6 bg-red-50 border-red-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Danger Zone</h3>
        
        <div className="border border-red-200 rounded-lg p-4 bg-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Trash2 className="w-5 h-5 text-red-500" />
              <div>
                <h4 className="font-medium text-gray-900">Delete Account</h4>
                <p className="text-sm text-gray-600">Permanently delete your account and all data</p>
              </div>
            </div>
            <Button variant="destructive" className="bg-red-500 hover:bg-red-600">
              Delete Account
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default SettingsSection
