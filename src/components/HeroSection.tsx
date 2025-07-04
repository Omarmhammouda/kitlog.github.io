
import { ArrowRight, Play } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center bg-teal-50 text-teal-700 px-4 py-2 rounded-full text-sm font-medium mb-8 animate-fade-in">
            <span className="w-2 h-2 bg-teal-500 rounded-full mr-2"></span>
            Now in Beta • Join the Waitlist
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-kitlog-text mb-8 animate-fade-in text-balance">
            Never Lose Track of Your{' '}
            <span className="text-orange">Gear</span> Again
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-12 animate-fade-in text-balance max-w-3xl mx-auto">
            A smarter way to manage creative equipment — check-in/out, assign gear, 
            and track maintenance. No more messy spreadsheets.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-scale-in">
            <button className="bg-orange text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-orange-600 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center group">
              Join Beta Waitlist
              <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>
            
            <button className="flex items-center text-gray-600 hover:text-kitlog-text transition-colors group">
              <div className="flex items-center justify-center w-12 h-12 bg-white border-2 border-gray-200 rounded-full mr-3 group-hover:border-orange transition-colors">
                <Play className="w-5 h-5 ml-1" />
              </div>
              Watch Demo
            </button>
          </div>
          
          {/* Mockup Preview */}
          <div className="relative max-w-4xl mx-auto animate-fade-in">
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-8">
              <div className="bg-gradient-to-br from-orange-50 to-teal-50 rounded-xl p-8 h-64 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-orange rounded-xl mx-auto mb-4 flex items-center justify-center">
                    <div className="w-8 h-8 bg-white rounded-lg"></div>
                  </div>
                  <p className="text-gray-600 font-medium">App Preview Coming Soon</p>
                </div>
              </div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-4 -left-4 w-20 h-20 bg-teal rounded-2xl opacity-20 animate-pulse"></div>
            <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-orange rounded-2xl opacity-20 animate-pulse delay-1000"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
