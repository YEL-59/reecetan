# Certificates Module

This module contains the Certificates page and its sub-components, organized in a modular structure for better maintainability and reusability.

## Structure

```
certificates/
├── index.jsx                    # Main Certificates page
├── components/                  # Sub-components folder
│   ├── index.js                # Component exports
│   ├── CertificatesHeader.jsx  # Blue gradient header banner
│   ├── CertificateStatsCards.jsx # Summary statistics cards
│   ├── EarnedCertificates.jsx  # Completed certificates list
│   └── CertificatesInProgress.jsx # In-progress certificates
├── data/                       # Data management
│   └── index.js               # Centralized data & helpers
└── README.md                   # This documentation
```

## Components

### CertificatesHeader
- **Purpose**: Displays the main page title and subtitle
- **Features**: Blue gradient background, centered text
- **Props**: None (static content)

### CertificateStatsCards
- **Purpose**: Shows key metrics in card format
- **Features**: 3 responsive cards with icons
- **Data**: Earned certificates, in progress, training hours
- **Props**: None (uses internal data)

### EarnedCertificates
- **Purpose**: Lists completed certificates with download options
- **Features**: Certificate details, instructor info, download buttons
- **Data**: Certificate titles, instructors, dates, credential IDs
- **Props**: None (uses internal data)

### CertificatesInProgress
- **Purpose**: Shows certificates currently being worked on
- **Features**: Progress bars, estimated completion dates, continue buttons
- **Data**: Certificate titles, progress percentages, completion dates
- **Props**: None (uses internal data)

## Data Management

### certificateStatsData
- Summary statistics for the dashboard
- Earned certificates count, in-progress count, training hours

### earnedCertificatesData
- Array of completed certificates
- Includes instructor, issue date, duration, credential ID

### certificatesInProgressData
- Array of certificates currently in progress
- Includes progress percentage and estimated completion

### Helper Functions
- `calculateCertificateStats()` - Calculates summary statistics
- `getCertificatesByStatus()` - Filters certificates by status
- `getCertificateById()` - Retrieves specific certificate

## Usage

```jsx
import Certificates from '@/pages/dashboard/certificates'

// Or import individual components
import { 
  CertificatesHeader, 
  CertificateStatsCards 
} from '@/pages/dashboard/certificates/components'
```

## Features

### Earned Certificates
- **Download PDF** functionality for each certificate
- **Instructor information** with professional titles
- **Credential IDs** for verification
- **Issue dates** and **duration** information

### Certificates in Progress
- **Progress bars** showing completion percentage
- **Estimated completion dates**
- **Continue Course** buttons for easy navigation
- **Visual progress indicators**

### Summary Statistics
- **Earned Certificates**: Total count of completed certifications
- **In Progress**: Number of certificates being worked on
- **Training Hours**: Total hours of completed training

## Benefits of Modular Structure

1. **Maintainability**: Each component has a single responsibility
2. **Reusability**: Components can be used independently
3. **Testing**: Easier to unit test individual components
4. **Development**: Multiple developers can work on different components
5. **Performance**: Potential for code splitting and lazy loading
6. **Scalability**: Easy to add new features or modify existing ones

## Future Enhancements

- Add certificate verification functionality
- Implement certificate sharing features
- Add certificate expiration tracking
- Create certificate templates
- Add bulk download functionality
- Implement certificate search and filtering
- Add certificate analytics and reporting

