import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useNotifications } from '../../contexts/NotificationContext';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBell, FaUserCircle, FaBars, FaTimes } from 'react-icons/fa';
import NotificationDropdown from '../common/NotificationDropdown';
import UserDropdown from '../common/UserDropdown';

const Header = () => {
  const { currentUser, logout, isAuthenticated } = useAuth();
  const { unreadCount } = useNotifications();
  const navigate = useNavigate();
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationDropdownOpen, setNotificationDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const toggleNotificationDropdown = () => {
    setNotificationDropdownOpen(!notificationDropdownOpen);
    setUserDropdownOpen(false);
  };
  const toggleUserDropdown = () => {
    setUserDropdownOpen(!userDropdownOpen);
    setNotificationDropdownOpen(false);
  };
  
  const handleLogout = () => {
    logout();
    navigate('/');
    setUserDropdownOpen(false);
  };

  // Define navigation links based on user role
  const getNavLinks = () => {
    if (!isAuthenticated) {
      return [];
    }
    
    switch (currentUser.role) {
      case 'student':
        return [
          { to: '/student/dashboard', label: 'Dashboard' },
          { to: '/student/internships', label: 'Find Internships' },
          { to: '/universities', label: 'Universities' },
        ];
      case 'organization':
        return [
          { to: '/organization/dashboard', label: 'Dashboard' },
          { to: '/universities', label: 'Universities' },
        ];
      case 'university':
        return [
          { to: '/university/dashboard', label: 'Dashboard' },
        ];
      default:
        return [];
    }
  };

  const navLinks = getNavLinks();
  
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-primary-500">Island Scholars</span>
            </Link>
          </div>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex space-x-6">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) => 
                  `text-base font-medium ${
                    isActive 
                      ? 'text-primary-600 border-b-2 border-primary-500' 
                      : 'text-gray-600 hover:text-primary-500'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
          
          {/* User actions */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                {/* Notifications */}
                <div className="relative">
                  <button
                    className="p-1 rounded-full text-gray-600 hover:text-primary-500 focus:outline-none"
                    onClick={toggleNotificationDropdown}
                  >
                    <FaBell className="h-6 w-6" />
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-accent-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {unreadCount}
                      </span>
                    )}
                  </button>
                  
                  <AnimatePresence>
                    {notificationDropdownOpen && (
                      <NotificationDropdown onClose={() => setNotificationDropdownOpen(false)} />
                    )}
                  </AnimatePresence>
                </div>
                
                {/* User menu */}
                <div className="relative">
                  <button
                    className="flex items-center text-gray-600 hover:text-primary-500 focus:outline-none"
                    onClick={toggleUserDropdown}
                  >
                    {currentUser.profileImage ? (
                      <img 
                        src={currentUser.profileImage} 
                        alt={currentUser.name}
                        className="h-8 w-8 rounded-full object-cover"
                      />
                    ) : (
                      <FaUserCircle className="h-8 w-8" />
                    )}
                    <span className="ml-2 hidden lg:block">{currentUser.name}</span>
                  </button>
                  
                  <AnimatePresence>
                    {userDropdownOpen && (
                      <UserDropdown user={currentUser} onLogout={handleLogout} onClose={() => setUserDropdownOpen(false)} />
                    )}
                  </AnimatePresence>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login" className="btn-outline">Log In</Link>
                <Link to="/register" className="btn-primary">Sign Up</Link>
              </div>
            )}
            
            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-md text-gray-600 hover:text-primary-500 focus:outline-none"
              onClick={toggleMobileMenu}
            >
              {mobileMenuOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white shadow-lg"
          >
            <nav className="px-4 pt-2 pb-4 space-y-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) => 
                    `block px-3 py-2 rounded-md text-base font-medium ${
                      isActive 
                        ? 'bg-primary-50 text-primary-600' 
                        : 'text-gray-600 hover:bg-neutral-100 hover:text-primary-500'
                    }`
                  }
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </NavLink>
              ))}
              
              {!isAuthenticated && (
                <div className="pt-4 flex flex-col space-y-2">
                  <Link to="/login" className="btn-outline w-full text-center" onClick={() => setMobileMenuOpen(false)}>
                    Log In
                  </Link>
                  <Link to="/register" className="btn-primary w-full text-center" onClick={() => setMobileMenuOpen(false)}>
                    Sign Up
                  </Link>
                </div>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;