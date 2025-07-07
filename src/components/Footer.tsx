import { Camera, Twitter, Instagram, Linkedin, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-kitlog-text text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="flex items-center justify-center w-10 h-10 bg-orange rounded-xl">
                <img 
                  src="/KitLog-Logo-Icon-W.svg" 
                  alt="KitLog Logo" 
                  className="w-6 h-6 brightness-0 invert"
                />
              </div>
              <span className="text-2xl font-bold">KitLog</span>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed mb-6 max-w-md">
              The modern inventory tracking solution built specifically for creative professionals. 
              Never lose track of your gear again.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/kitlog.io" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center hover:bg-orange transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="mailto:info@kitlog.io" className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center hover:bg-orange transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          {/* Product */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Product</h3>
            <div className="space-y-3">
              <a href="/#features" className="block text-gray-300 hover:text-white transition-colors">Features</a>
              <a href="/#pricing" className="block text-gray-300 hover:text-white transition-colors">Pricing</a>
              <a href="#" className="block text-gray-300 hover:text-white transition-colors">Beta Access</a>
              <a href="#" className="block text-gray-300 hover:text-white transition-colors">Roadmap</a>
            </div>
          </div>
          
<<<<<<< HEAD
        </div>
=======
>>>>>>> 6d46bc103383f8f0f6633e6f7751742c9254b8ae
        
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 KitLog. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy-policy" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</Link>
              <Link to="/terms-of-service" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</Link>
              <Link to="/cookie-policy" className="text-gray-400 hover:text-white text-sm transition-colors">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
