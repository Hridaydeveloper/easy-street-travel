
import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Index from './pages/Index'
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'
import RidePricing from './pages/RidePricing'
import DriverPortal from './pages/DriverPortal'
import DriverLogin from './pages/DriverLogin'
import TrackRide from './pages/TrackRide'
import Payment from './pages/Payment'
import Services from './pages/Services'
import About from './pages/About'
import Contact from './pages/Contact'
import MapExplorer from './pages/MapExplorer'
import Careers from './pages/Careers'
import Business from './pages/Business'
import Airports from './pages/Airports'
import Cities from './pages/Cities'
import Estimates from './pages/Estimates'
import GiftCards from './pages/GiftCards'
import OurTeam from './pages/OurTeam'
import Press from './pages/Press'
import Ride from './pages/Ride'
import Drive from './pages/Drive'
import Freight from './pages/Freight'
import Safety from './pages/Safety'
import Diversity from './pages/Diversity'
import Transparency from './pages/Transparency'
import Sustainability from './pages/Sustainability'
import NotFound from './pages/NotFound'
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
              <Route path="/payment" element={<Payment />} />
              <Route path="/driver-portal" element={<DriverPortal />} />
              <Route path="/driver-login" element={<DriverLogin />} />
              <Route path="/track-ride/:id" element={<TrackRide />} />
              <Route path="/services" element={<Services />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/map-explorer" element={<MapExplorer />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/business" element={<Business />} />
              <Route path="/airports" element={<Airports />} />
              <Route path="/cities" element={<Cities />} />
              <Route path="/estimates" element={<Estimates />} />
              <Route path="/gift-cards" element={<GiftCards />} />
              <Route path="/our-team" element={<OurTeam />} />
              <Route path="/press" element={<Press />} />
              <Route path="/ride" element={<Ride />} />
              <Route path="/drive" element={<Drive />} />
              <Route path="/freight" element={<Freight />} />
              <Route path="/safety" element={<Safety />} />
              <Route path="/diversity" element={<Diversity />} />
              <Route path="/transparency" element={<Transparency />} />
              <Route path="/sustainability" element={<Sustainability />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster />
          </div>
        </RideRequestProvider>
      </AuthProvider>
    </Router>
  )
}

export default App
