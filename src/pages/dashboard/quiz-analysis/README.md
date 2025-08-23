# Quiz Analytics Module

This module contains the Quiz Analytics page and its sub-components, organized in a modular structure for better maintainability and reusability.

## Structure

```
quiz-analysis/
├── index.jsx                    # Main Quiz Analytics page
├── components/                  # Sub-components folder
│   ├── index.js                # Component exports
│   ├── QuizAnalyticsHeader.jsx  # Blue header banner
│   ├── SummaryStatsCards.jsx    # Summary statistics cards
│   ├── QuizPerformanceHistory.jsx # Quiz history list
│   └── PerformanceBySubject.jsx   # Subject performance chart
└── README.md                   # This documentation
```

## Components

### QuizAnalyticsHeader
- **Purpose**: Displays the main page title and subtitle
- **Features**: Blue gradient background, responsive text
- **Props**: None (static content)

### SummaryStatsCards
- **Purpose**: Shows key metrics in card format
- **Features**: 3 responsive cards with icons, progress bars
- **Data**: Total quizzes, pass rate, average score
- **Props**: None (uses internal data)

### QuizPerformanceHistory
- **Purpose**: Lists individual quiz results
- **Features**: Status badges, detailed metrics, timestamps
- **Data**: Quiz titles, scores, attempts, time taken
- **Props**: None (uses internal data)

### PerformanceBySubject
- **Purpose**: Shows performance breakdown by subject
- **Features**: Progress bars, color-coded status indicators
- **Data**: Subject names, scores, status (good/needs improvement)
- **Props**: None (uses internal data)

## Usage

```jsx
import QuizAnalysis from '@/pages/dashboard/quiz-analysis'

// Or import individual components
import { 
  QuizAnalyticsHeader, 
  SummaryStatsCards 
} from '@/pages/dashboard/quiz-analysis/components'
```

## Benefits of Modular Structure

1. **Maintainability**: Each component has a single responsibility
2. **Reusability**: Components can be used independently
3. **Testing**: Easier to unit test individual components
4. **Development**: Multiple developers can work on different components
5. **Performance**: Potential for code splitting and lazy loading
6. **Scalability**: Easy to add new features or modify existing ones

## Future Enhancements

- Add prop support for dynamic data
- Implement data fetching hooks
- Add loading and error states
- Create shared data types/interfaces
- Add component-level tests

