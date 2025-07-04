
import { Camera } from 'lucide-react';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-10 h-10 bg-orange rounded-xl">
              <Camera className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-kitlog-text">KitLog</span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 hover:text-kitlog-text transition-colors">
              Features
            </a>
            <a href="#pricing" className="text-gray-600 hover:text-kitlog-text transition-colors">
              Pricing
            </a>
            <button className="bg-orange text-white px-6 py-2 rounded-lg font-medium hover:bg-orange-600 transition-colors">
              Join Beta
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
