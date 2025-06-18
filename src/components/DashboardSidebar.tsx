
import React from 'react';
import { Button } from "@/components/ui/button";
import { MapPin, History, User, Settings, LogOut, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface SidebarItem {
  id: string;
  icon: React.ReactNode;
  label: string;
}

interface DashboardSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ activeTab, setActiveTab }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const sidebarItems: SidebarItem[] = [
    {
      id: 'home',
      icon: <MapPin className="h-5 w-5" />,
      label: 'Book Ride'
    },
    {
      id: 'history',
      icon: <History className="h-5 w-5" />,
      label: 'Ride History'
    },
    {
      id: 'profile',
      icon: <User className="h-5 w-5" />,
      label: 'Profile'
    },
    {
      id: 'settings',
      icon: <Settings className="h-5 w-5" />,
      label: 'Settings'
    }
  ];

  return (
    <div className="w-64 bg-gray-800 shadow-lg border-r border-gray-700 min-h-screen">
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-white">Uber</span>
        </div>
      </div>

      <nav className="mt-6">
        {sidebarItems.map(item => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center space-x-3 px-6 py-3 text-left transition-colors duration-200 ${
              activeTab === item.id 
                ? 'bg-orange-600/20 text-orange-400 border-r-2 border-orange-500' 
                : 'text-gray-300 hover:bg-gray-700'
            }`}
          >
            {item.icon}
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="absolute bottom-0 w-64 p-6 border-t border-gray-700 space-y-2">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/')} 
          className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-700"
        >
          <Home className="h-5 w-5 mr-3" />
          Back to Home
        </Button>
        <Button 
          variant="ghost" 
          onClick={handleLogout} 
          className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-700"
        >
          <LogOut className="h-5 w-5 mr-3" />
          Sign Out
        </Button>
      </div>
    </div>
  );
};

export default DashboardSidebar;
