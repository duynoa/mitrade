import React, { useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Wallet,
  BarChart3,
  Settings,
  HelpCircle,
  Menu,
  X,
  LogOut,
  CircleUser,
} from 'lucide-react';
import { cn } from '../../lib/utils';
import logo from '/public/assets/images/logo-mytrade.svg';

interface SidebarLinkProps {
  to: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  end?: boolean;
}

function SidebarLink({ to, icon, children, end }: SidebarLinkProps) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        cn(
          'flex items-center px-4 py-2 mt-2 text-gray-600 rounded-md hover:bg-gray-100 transition-colors',
          isActive && 'bg-primary-50 text-primary-700 font-medium'
        )
      }
    >
      <div className="w-5 h-5 mr-3">{icon}</div>
      <span>{children}</span>
    </NavLink>
  );
}

export function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogout = () => {
    // Redirect to login page on logout
    navigate('/');
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar for desktop */}
      <aside
        className={cn(
          'fixed top-0 left-0 z-40 w-64 h-screen transition-transform md:translate-x-0 border-r border-gray-200 bg-white',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="h-full flex flex-col">
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
            <Link to="/" className="flex items-center space-x-2">
              <img src={logo} alt="MyTrade.vn Logo" style={{ height: '60px' }} /> 
            </Link>
            <button className="md:hidden" onClick={toggleSidebar}>
              <X size={20} />
            </button>
          </div>
          
          <div className="flex-1 px-3 py-4 overflow-y-auto">
            <div className="mb-6">
              <p className="px-4 text-xs font-semibold text-gray-500 uppercase">Menu chính</p>
              <nav className="mt-2 space-y-1">
                <SidebarLink to="/dashboard" icon={<LayoutDashboard size={18} />} end>
                  Tổng quan
                </SidebarLink>
                <SidebarLink to="/dashboard/transactions" icon={<Wallet size={18} />}>
                  Giao dịch
                </SidebarLink>
                <SidebarLink to="/dashboard/members" icon={<Users size={18} />}>
                  Quản lý thành viên
                </SidebarLink>
                <SidebarLink to="/dashboard/analytics" icon={<BarChart3 size={18} />}>
                  Phân tích
                </SidebarLink>
              </nav>
            </div>
            
            <div>
              <p className="px-4 text-xs font-semibold text-gray-500 uppercase">Hỗ trợ</p>
              <nav className="mt-2 space-y-1">
                <SidebarLink to="/dashboard/support" icon={<HelpCircle size={18} />}>
                  Hỗ trợ
                </SidebarLink>
                <SidebarLink to="/dashboard/settings" icon={<Settings size={18} />}>
                  Cài đặt
                </SidebarLink>
              </nav>
            </div>
          </div>
          
          <div className="border-t border-gray-200 p-4">
            <div className="flex items-center">
              <div className="relative flex-shrink-0">
                <CircleUser className="h-9 w-9 text-gray-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">Nguyễn Văn Cường</p>
                <p className="text-xs text-gray-500">admin@mytrade.com</p>
              </div>
              <button className="ml-auto p-1 text-gray-500 hover:text-gray-700" onClick={handleLogout}>
                <LogOut size={18} />
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-col flex-1 md:ml-64">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
          <div className="flex items-center justify-between h-16 px-4 md:px-6 border-b border-gray-200">
            <button
              onClick={toggleSidebar}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 md:hidden"
            >
              <Menu size={20} />
            </button>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <select className="appearance-none pl-3 pr-8 py-1.5 text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                  <option value="vi">Tiếng Việt</option>
                  <option value="en">English</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
      
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-gray-900 bg-opacity-50 z-30 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
}