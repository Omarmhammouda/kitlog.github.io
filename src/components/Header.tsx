import { Link } from 'react-router-dom';
import AuthButton from '@/components/auth/AuthButton';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <Link to="/" className="flex items-center justify-center w-8 h-8">
              <img 
                src="/KitLog-Logo-Icon-W.svg" 
                alt="KitLog Logo" 
                className="w-6 h-6"
              />
            </Link>
            <span className="text-xl font-semibold text-gray-900">KitLog</span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="/#features" className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium">
              Features
            </a>
            <a href="/#pricing" className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium">
              Pricing
            </a>
            <a href="#cta" className="bg-orange text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-orange-600 transition-colors shadow-apple">
              Join Beta
            </a>
            <AuthButton />
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
