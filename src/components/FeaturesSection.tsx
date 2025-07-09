
import { CheckCircle, Smartphone, Wrench, History, Briefcase } from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: CheckCircle,
      title: "Easy Check In/Out",
      description: "Quick gear assignment with simple click or scan. Know who has what, when."
    },
    {
      icon: Smartphone,
      title: "Mobile Barcode Scanning",
      description: "Instant equipment identification with your phone camera. No special hardware needed."
    },
    {
      icon: Wrench,
      title: "Maintenance Logs",
      description: "Track repairs, service dates, and equipment condition. Never miss maintenance again."
    },
    {
      icon: History,
      title: "Usage History",
      description: "Complete timeline of who used what equipment and when. Perfect for billing and accountability."
    },
    {
      icon: Briefcase,
      title: "Job-Based Organization",
      description: "Organize gear by project, location, or team. Perfect for managing multiple shoots."
    }
  ];

  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 text-center">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-kitlog-text mb-6">
            Everything You Need to Stay Organized
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Powerful features designed specifically for creative professionals. 
            Simple enough for solo freelancers, robust enough for entire studios.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8 justify-center max-w-6xl mx-auto">
          {features.slice(0, 3).map((feature, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer animate-fade-in text-center"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-16 h-16 bg-teal-50 rounded-2xl mb-6 flex items-center justify-center group-hover:bg-teal-100 transition-colors mx-auto">
                <feature.icon className="w-8 h-8 text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold text-kitlog-text mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 justify-center max-w-4xl mx-auto">
          {features.slice(3).map((feature, index) => (
            <div 
              key={index + 3}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer animate-fade-in text-center"
              style={{ animationDelay: `${(index + 3) * 0.1}s` }}
            >
              <div className="w-16 h-16 bg-teal-50 rounded-2xl mb-6 flex items-center justify-center group-hover:bg-teal-100 transition-colors mx-auto">
                <feature.icon className="w-8 h-8 text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold text-kitlog-text mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
        
        {/* Feature highlight */}
        <div className="bg-gradient-to-r from-orange-50 to-teal-50 rounded-3xl p-8 md:p-12 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-kitlog-text mb-4">
            And Much More Coming Soon
          </h3>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Advanced analytics, team collaboration tools, rental management, 
            and integrations with popular creative software.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {['Analytics Dashboard', 'Team Permissions', 'Rental Tracking', 'Software Integrations'].map((item, index) => (
              <span 
                key={index}
                className="bg-white px-4 py-2 rounded-full text-sm font-medium text-gray-700 shadow-sm"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
