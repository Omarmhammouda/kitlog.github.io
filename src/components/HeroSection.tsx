
import { ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

const HeroSection = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [signupCount, setSignupCount] = useState(0);
  const [animatedCount, setAnimatedCount] = useState(0);
  const { toast } = useToast();

  // Initialize signup count and animate it
  useEffect(() => {
    const targetCount = 847; // Starting number of signups
    setSignupCount(targetCount);
    
    // Animate counter
    let current = 0;
    const increment = targetCount / 50;
    const timer = setInterval(() => {
      current += increment;
      if (current >= targetCount) {
        setAnimatedCount(targetCount);
        clearInterval(timer);
      } else {
        setAnimatedCount(Math.floor(current));
      }
    }, 30);

    return () => clearInterval(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email) {
      setIsSubmitted(true);
      setSignupCount(prev => prev + 1);
      setAnimatedCount(prev => prev + 1);
      toast({
        title: "Welcome to KitLog!",
        description: "You're on the beta waitlist. We'll be in touch soon!",
      });
      console.log('Beta signup:', { name, email });
    }
  };

  if (isSubmitted) {
    return (
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <div className="bg-green-50 rounded-3xl p-12 animate-scale-in">
              <div className="w-20 h-20 bg-green-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                  <ArrowRight className="w-5 h-5 text-white rotate-45" />
                </div>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-kitlog-text mb-4">
                You're In! 🎉
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Welcome to the KitLog beta waitlist, {name}! We'll send you early access 
                and updates as we get closer to launch.
              </p>
              <div className="text-center">
                <div className="text-5xl md:text-6xl font-bold text-orange mb-2 animate-pulse">
                  {animatedCount.toLocaleString()}
                </div>
                <p className="text-lg text-gray-600">creatives have joined the waitlist</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-kitlog-text mb-8 animate-fade-in text-balance">
            Never Lose Track of Your{' '}
            <span className="text-orange">Gear</span> Again
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-12 animate-fade-in text-balance max-w-3xl mx-auto">
            A smarter way to manage creative equipment — check-in/out, assign gear, 
            and track maintenance. No more messy spreadsheets.
          </p>
          
          {/* Counter and Signup Form Side by Side */}
          <div className="flex flex-col lg:flex-row items-center justify-center gap-12 mb-16 animate-fade-in">
            {/* Signup Counter */}
            <div className="text-center animate-scale-in">
              <div className="text-5xl md:text-6xl font-bold text-orange mb-2 animate-pulse">
                {animatedCount.toLocaleString()}
              </div>
              <p className="text-lg text-gray-600">creatives have joined the waitlist</p>
            </div>
            
            {/* Signup Form */}
            <div className="max-w-md w-full">
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="w-full px-6 py-4 rounded-xl text-lg border-2 border-gray-200 focus:border-orange focus:ring-4 focus:ring-orange/20 outline-none transition-all"
                  required
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="w-full px-6 py-4 rounded-xl text-lg border-2 border-gray-200 focus:border-orange focus:ring-4 focus:ring-orange/20 outline-none transition-all"
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-orange text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-orange-600 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center group"
                >
                  Join Beta Waitlist
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                </button>
              </form>
            </div>
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
