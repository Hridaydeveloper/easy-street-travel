
import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Index from './pages/Index'
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'
import RidePricing from './pages/RidePricing'
import DriverPortal from './pages/DriverPortal'
import DriverLogin from './pages/DriverLogin'
import { AuthProvider } from './contexts/AuthContext'
import { Toaster } from "@/components/ui/toaster"
import { RideRequestProvider } from "@/contexts/RideRequestContext";

function App() {
  return (
    <Router>
      <AuthProvider>
        <RideRequestProvider>
          <div className="min-h-screen bg-white">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/ride-pricing" element={<RidePricing />} />
              <Route path="/driver-portal" element={<DriverPortal />} />
              <Route path="/driver-login" element={<DriverLogin />} />
            </Routes>
            <Toaster />
          </div>
        </RideRequestProvider>
      </AuthProvider>
    </Router>
  )
}

export default App
