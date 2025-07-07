
import { useState } from 'react';
import { ArrowRight, Check, Mail, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const CTASection = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      try {
        const res = await fetch('http://localhost:4000/api/collect-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        });
        if (res.ok) {
          setIsSubmitted(true);
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

  const benefits = [
    "Free beta access",
    "Priority invite",
    "Lifetime discount for early adopters",
    "Direct feedback line to our team"
  ];

  if (isSubmitted) {
    return (
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-green-50 rounded-3xl p-12 animate-scale-in">
            <div className="w-20 h-20 bg-green-100 rounded-full mx-auto mb-6 flex items-center justify-center">
              <Check className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-kitlog-text mb-4">
              You're In! 🎉
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Welcome to the KitLog beta waitlist. We'll send you early access 
              and updates as we get closer to launch.
            </p>
            <div className="flex items-center justify-center space-x-2 text-green-700">
              <Mail className="w-5 h-5" />
              <span className="font-medium">Check your email for confirmation</span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="cta" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl p-8 md:p-12 text-white text-center relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-20 translate-x-20"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-16 -translate-x-16"></div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-center mb-6">
              <Star className="w-6 h-6 text-yellow-300 mr-2" />
              <span className="text-lg font-medium">Limited Time Offer</span>
              <Star className="w-6 h-6 text-yellow-300 ml-2" />
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Get Early Access
            </h2>
            
            <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join the waitlist and be among the first to revolutionize how you manage your creative gear.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10 max-w-2xl mx-auto">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center text-left">
                  <Check className="w-5 h-5 text-green-300 mr-3 flex-shrink-0" />
                  <span className="text-lg">{benefit}</span>
                </div>
              ))}
            </div>
            
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 px-6 py-4 rounded-xl text-kitlog-text text-lg border-0 focus:ring-4 focus:ring-white/30 outline-none"
                  required
                />
                <button
                  type="submit"
                  className="bg-white text-orange px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center justify-center group whitespace-nowrap"
                >
                  Join Beta
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </form>
            
            <p className="text-sm opacity-75 mt-6">
              No spam, ever. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
