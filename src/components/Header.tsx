
import { Camera } from 'lucide-react';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-8 h-8 bg-blue rounded-lg">
              <Camera className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-semibold text-gray-900">KitLog</span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium">
              Features
            </a>
            <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium">
              Pricing
            </a>
            <button className="bg-blue text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-blue-600 transition-colors shadow-apple">
              Join Beta
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
