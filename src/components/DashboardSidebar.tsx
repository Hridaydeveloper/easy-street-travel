
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
    id: 'profile',
    icon: <User className="h-5 w-5" />,
    label: 'Profile'
  },
  {
    id: 'history',
    icon: <History className="h-5 w-5" />,
    label: 'Ride History'
  },
  {
    id: 'home',
    icon: <MapPin className="h-5 w-5" />,
    label: 'Book Ride'
  },
  {
    id: 'settings',
    icon: <Settings className="h-5 w-5" />,
    label: 'Settings'
  }];


  return (
    <div className="w-full md:w-64 bg-white shadow-lg border-r border-gray-200 min-h-screen">
      <div className="p-4 md:p-6 border-b border-gray-200">
        <div className="flex items-center justify-center md:justify-start space-x-2">
          <span className="text-xl md:text-2xl font-bold text-[#6e42d7]">​Drivio</span>
        </div>
      </div>

      <nav className="mt-4 md:mt-6 px-2 md:px-0">
        <div className="grid grid-cols-4 md:grid-cols-1 gap-1 md:gap-0">
          {sidebarItems.map((item) =>
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col md:flex-row items-center justify-center md:justify-start space-y-1 md:space-y-0 md:space-x-3 px-2 md:px-6 py-3 md:py-3 text-center md:text-left transition-colors duration-200 rounded-md md:rounded-none ${
            activeTab === item.id ?
            'bg-black text-white md:border-r-2 md:border-black' :
            'text-black hover:bg-gray-100'}`
            }>
            
              {item.icon}
              <span className="text-xs md:text-base font-medium">{item.label}</span>
            </button>
          )}
        </div>
      </nav>

      <div className="absolute bottom-0 w-full md:w-64 p-4 md:p-6 border-t border-gray-200 space-y-2 bg-white">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="w-full justify-center md:justify-start text-black hover:text-black hover:bg-gray-100">
          
          <Home className="h-5 w-5 mr-0 md:mr-3" />
          <span className="hidden md:inline">Back to Home</span>
        </Button>
        <Button
          variant="ghost"
          onClick={handleLogout}
          className="w-full justify-center md:justify-start text-black hover:text-black hover:bg-gray-100">
          
          <LogOut className="h-5 w-5 mr-0 md:mr-3" />
          <span className="hidden md:inline">Sign Out</span>
        </Button>
      </div>
    </div>);

};

export default DashboardSidebar;