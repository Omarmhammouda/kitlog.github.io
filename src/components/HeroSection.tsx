import { ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { BASE_SIGNUP_COUNT } from '@/constants';

const HeroSection = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [signupCount, setSignupCount] = useState(0);
  const [animatedCount, setAnimatedCount] = useState(0);
  const { toast } = useToast();

  // Fetch real signup count and animate it
  useEffect(() => {
    const fetchSignupCount = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
        const response = await fetch(`${apiUrl}/api/v1/signups/count`);
        if (response.ok) {
          const data = await response.json();
          const realCount = data.count || 0;
          const totalCount = BASE_SIGNUP_COUNT + realCount;
          setSignupCount(totalCount);
          
          // Animate counter
          let current = 0;
          const increment = totalCount / 50;
          const timer = setInterval(() => {
            current += increment;
            if (current >= totalCount) {
              setAnimatedCount(totalCount);
              clearInterval(timer);
            } else {
              setAnimatedCount(Math.floor(current));
            }
          }, 30);
          
          return () => clearInterval(timer);
        } else {
          // Fallback to base count if API fails
          setSignupCount(BASE_SIGNUP_COUNT);
          setAnimatedCount(BASE_SIGNUP_COUNT);
        }
      } catch (error) {
        console.error('Failed to fetch signup count:', error);
        // Fallback to base count if API fails
        setSignupCount(BASE_SIGNUP_COUNT);
        setAnimatedCount(BASE_SIGNUP_COUNT);
      }
    };
    
    fetchSignupCount();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email) {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
        const res = await fetch(`${apiUrl}/api/v1/signups/`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, source: 'hero_section' }),
        });
        
        if (res.ok) {
          setIsSubmitted(true);
          // Increment both counts immediately for instant feedback
          setSignupCount(prev => prev + 1);
          setAnimatedCount(prev => prev + 1);
          toast({
            title: "Welcome to KitLog!",
            description: "You're on the beta waitlist. We'll be in touch soon!",
          });
        } else {
          toast({ title: "Error", description: "Failed to join waitlist." });
        }
      } catch (err) {
        toast({ title: "Error", description: "Network error." });
      }
    }
  };

  if (isSubmitted) {
    return (
      <section className="pt-24 pb-20 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <div className="bg-gray-50 rounded-3xl p-12 animate-scale-in shadow-apple">
              <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                  <ArrowRight className="w-4 h-4 text-white rotate-45" />
                </div>
              </div>
              <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4">
                You're In! 🎉
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Welcome to the KitLog beta waitlist, {name}! We'll send you early access 
                and updates as we get closer to launch.
              </p>
              <div className="text-center">
                <div className="text-5xl md:text-6xl font-light text-orange mb-2">
                  {animatedCount.toLocaleString()}
                </div>
                <p className="text-lg text-gray-500">creatives have joined the waitlist</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-24 pb-20 px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-light text-gray-900 mb-8 animate-fade-in text-balance leading-tight">
            Never Lose Track of Your{' '}
            <span className="text-orange font-normal">Gear</span> Again
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-16 animate-fade-in text-balance max-w-4xl mx-auto font-normal">
            A smarter way to manage creative equipment — check-in/out, assign gear, 
            and track maintenance. No more messy spreadsheets.
          </p>
        </div>
        
        {/* Counter and Signup Form Side by Side */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-16 mb-20 animate-fade-in">
          {/* Signup Counter */}
          <div className="text-center">
            <div className="text-6xl md:text-7xl font-light text-orange mb-3">
              {animatedCount.toLocaleString()}
            </div>
            <p className="text-lg text-gray-500">creatives have joined the waitlist</p>
          </div>
          
          {/* Signup Form */}
          <div className="max-w-sm w-full">
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="w-full px-5 py-4 rounded-2xl text-lg border border-gray-200 focus:border-orange focus:ring-4 focus:ring-orange/10 outline-none transition-all bg-white shadow-apple"
                required
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="w-full px-5 py-4 rounded-2xl text-lg border border-gray-200 focus:border-orange focus:ring-4 focus:ring-orange/10 outline-none transition-all bg-white shadow-apple"
                required
              />
              <button
                type="submit"
                className="w-full bg-orange text-white px-6 py-4 rounded-2xl font-medium text-lg hover:bg-orange-600 transition-all duration-200 shadow-apple hover:shadow-apple-lg flex items-center justify-center group"
              >
                Join Beta Waitlist
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </button>
            </form>
          </div>
        </div>
        
        {/* Mockup Preview */}
        <div className="relative max-w-5xl mx-auto animate-fade-in">
          <div className="bg-white rounded-3xl shadow-apple-lg border border-gray-100 p-12">
            <div className="bg-gradient-to-br from-orange-50 to-gray-50 rounded-2xl p-12 h-80 flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 bg-orange rounded-2xl mx-auto mb-6 flex items-center justify-center">
                  <div className="w-10 h-10 bg-white rounded-xl"></div>
                </div>
                <p className="text-gray-500 font-medium text-lg">App Preview Coming Soon</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
