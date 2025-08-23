// Certificates Data
// This file centralizes all data used in the Certificates module

export const certificateStatsData = [
  {
    title: "Earned Certificates",
    value: "03",
    icon: "Award",
    color: "text-blue-600"
  },
  {
    title: "In Progress",
    value: "02",
    icon: "Clock",
    color: "text-blue-600"
  },
  {
    title: "Training Hours",
    value: "26h",
    icon: "GraduationCap",
    color: "text-blue-600"
  }
]

export const earnedCertificatesData = [
  {
    id: 1,
    title: "CPR and First Aid Certification",
    instructor: "Captain Mike Thompson, EMT-P",
    issuedDate: "1/15/2024",
    duration: "8 hours",
    credentialId: "AHA-CPR-2024-001",
    status: "completed"
  },
  {
    id: 2,
    title: "Basic Life Support (BLS) Certification",
    instructor: "Dr. Sarah Johnson, RN",
    issuedDate: "2/20/2024",
    duration: "6 hours",
    credentialId: "AHA-BLS-2024-002",
    status: "completed"
  },
  {
    id: 3,
    title: "Infection Control Certification",
    instructor: "Dr. Michael Chen, MD",
    issuedDate: "3/10/2024",
    duration: "4 hours",
    credentialId: "IC-2024-003",
    status: "completed"
  }
]

export const certificatesInProgressData = [
  {
    id: 1,
    title: "Certified Nursing Assistant (CNA) Training",
    progress: 65,
    estimatedCompletion: "4/15/2024",
    status: "in-progress"
  },
  {
    id: 2,
    title: "Medical Terminology & Documentation",
    progress: 45,
    estimatedCompletion: "5/20/2024",
    status: "in-progress"
  }
]

// Helper functions for data processing
export const calculateCertificateStats = () => {
  const earnedCount = earnedCertificatesData.length
  const inProgressCount = certificatesInProgressData.length
  const totalHours = earnedCertificatesData.reduce((sum, cert) => {
    const hours = parseInt(cert.duration.split(' ')[0])
    return sum + hours
  }, 0)
  
  return {
    earnedCount,
    inProgressCount,
    totalHours: `${totalHours}h`
  }
}

export const getCertificatesByStatus = (status) => {
  if (status === 'completed') {
    return earnedCertificatesData
  } else if (status === 'in-progress') {
    return certificatesInProgressData
  }
  return []
}

export const getCertificateById = (id) => {
  const allCertificates = [...earnedCertificatesData, ...certificatesInProgressData]
  return allCertificates.find(cert => cert.id === id)
}

