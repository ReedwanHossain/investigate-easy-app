import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Roles } from '../../types/types';
import { useState, useRef, useEffect } from 'react';

const Header = () => {
  const { user, logout, switchRole, activeRole } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const functioningRoles = [Roles.REQUESTER, Roles.INVESTIGATOR, Roles.USER];

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-xl font-bold text-indigo-600">
            InvestiGate
          </Link>
          {user && (
            <nav className="hidden md:flex space-x-8">
              <Link
                to="/profile"
                className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                profile
              </Link>

              <Link
                to="/user-dashboard"
                className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Dashboard
              </Link>
            </nav>
          )}

          {user && activeRole === Roles.REQUESTER && (
            <Link
              to="/requester-dashboard"
              className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
            >
               Requester Panel
            </Link>
          )}
          {user && activeRole === Roles.INVESTIGATOR && (
            <Link
              to="/investigator"
              className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Investigator Panel
            </Link>
          )}
        </div>

        <div className="flex items-center space-x-4">
          {user && (
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center space-x-1 text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                <span>Active as: {activeRole ? activeRole : 'USER'}</span>
                <svg 
                  className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                  <div className="py-1">
                    {functioningRoles.map((role) => (
                      <button
                        key={role}
                        onClick={() => switchRole(role)}
                        className={`block px-4 py-2 text-sm w-full text-left ${
                          activeRole === role
                            ? 'bg-indigo-100 text-indigo-800'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {role}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
          {user ? (
            <>
              <span className="text-sm text-gray-500 hidden sm:inline">
                Welcome, {user.name}
              </span>
              <button
                onClick={logout}
                className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;