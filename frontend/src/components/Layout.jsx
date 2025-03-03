import { Outlet } from 'react-router-dom'
import { FaThermometerHalf, FaGithub, FaChartLine, FaTable } from 'react-icons/fa'
import { Link, useLocation } from 'react-router-dom'

const Layout = () => {
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname === path;
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <FaThermometerHalf className="text-2xl" />
              <h1 className="text-xl font-bold">Fridge Settings Dashboard</h1>
            </div>
            
            <div className="flex items-center space-x-6">
              <nav className="hidden md:flex space-x-1">
                <Link 
                  to="/settings" 
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    isActive('/settings') 
                      ? 'bg-white/20 text-white' 
                      : 'text-white/80 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <span className="flex items-center">
                    <FaTable className="mr-1" />
                    Settings
                  </span>
                </Link>
                <Link 
                  to="/stats" 
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    isActive('/stats') 
                      ? 'bg-white/20 text-white' 
                      : 'text-white/80 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <span className="flex items-center">
                    <FaChartLine className="mr-1" />
                    Statistics
                  </span>
                </Link>
              </nav>
              
              <a
                href="https://github.com/yourusername/fridge-settings-dashboard"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-200"
                aria-label="GitHub Repository"
              >
                <FaGithub className="text-2xl" />
              </a>
            </div>
          </div>
        </div>
      </header>
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <Outlet />
      </main>
      
      <footer className="bg-gray-800 text-gray-300 py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm">
              &copy; {new Date().getFullYear()} Fridge Settings Dashboard
            </p>
            <div className="mt-4 md:mt-0">
              <p className="text-sm">
                Built with React and FastAPI
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Layout 