import { Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import AuthLayout from './layouts/AuthLayout'
import DashboardLayout from './layouts/DashboardLayout'
import Landing from './pages/Landing'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Dashboard from './pages/dashboard/Dashboard'

function App() {
  return (
    <Routes>
      {/* Main routes with navigation and footer */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Landing />} />
      </Route>

      {/* Auth routes with split layout */}
      <Route path="/" element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>

      {/* Dashboard routes with sidebar */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="recipes" element={<div>Recipes Page</div>} />
        <Route path="collections" element={<div>Collections Page</div>} />
        <Route path="analytics" element={<div>Analytics Page</div>} />
        <Route path="users" element={<div>Users Page</div>} />
        <Route path="content" element={<div>Content Page</div>} />
        <Route path="messages" element={<div>Messages Page</div>} />
        <Route path="settings" element={<div>Settings Page</div>} />
      </Route>
    </Routes>
  )
}

export default App
