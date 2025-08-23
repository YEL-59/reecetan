import React, { useState } from 'react'
import ProfileSection from './components/ProfileSection'
import BillingSection from './components/BillingSection'
import SettingsSection from './components/SettingsSection'

const MyAccount = () => {
  const [activeTab, setActiveTab] = useState('profile')
  const [profileData, setProfileData] = useState({
    fullName: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    phone: '+1 (580) 123-4567'
  })
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [smsNotifications, setSmsNotifications] = useState(false)
  
  // Accordion states
  const [openAccordions, setOpenAccordions] = useState({
    changePassword: false,
    updateEmail: false,
    updatePhone: false
  })

  const tabs = [
    { id: 'profile', label: 'Profile' },
    { id: 'billing', label: 'Billing History' },
    { id: 'settings', label: 'Settings' }
  ]

  const invoices = [
    {
      id: 1,
      date: 'Aug 01, 2025',
      invoiceNumber: 'INV-002345',
      plan: 'Pro Monthly',
      paymentMethod: 'Visa **** 1234',
      amount: '$29.99',
      status: 'Paid'
    },
    {
      id: 2,
      date: 'Jul 01, 2025',
      invoiceNumber: 'INV-002212',
      plan: 'Pro Monthly',
      paymentMethod: 'Visa **** 1234',
      amount: '$29.99',
      status: 'Paid'
    }
  ]

  const handleProfileUpdate = (e) => {
    e.preventDefault()
    console.log('Profile updated:', profileData)
  }

  const toggleAccordion = (accordionKey) => {
    setOpenAccordions(prev => ({
      ...prev,
      [accordionKey]: !prev[accordionKey]
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Account</h1>
          <p className="text-gray-600 mt-2">Manage your profile, billing, and account settings</p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-gray-200 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Render Active Tab Content */}
        {activeTab === 'profile' && (
          <ProfileSection 
            profileData={profileData}
            setProfileData={setProfileData}
            handleProfileUpdate={handleProfileUpdate}
          />
        )}

        {activeTab === 'billing' && (
          <BillingSection invoices={invoices} />
        )}

        {activeTab === 'settings' && (
          <SettingsSection 
            openAccordions={openAccordions}
            toggleAccordion={toggleAccordion}
            emailNotifications={emailNotifications}
            setEmailNotifications={setEmailNotifications}
            smsNotifications={smsNotifications}
            setSmsNotifications={setSmsNotifications}
          />
        )}
      </div>
    </div>
  )
}

export default MyAccount