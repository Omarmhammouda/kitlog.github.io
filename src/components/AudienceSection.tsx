
import { Camera, Video, Building, Users, Palette } from 'lucide-react';

const AudienceSection = () => {
  const audiences = [
    {
      icon: Camera,
      title: "Freelance Photographers",
      description: "Wedding, portrait, and commercial photographers managing personal gear collections."
    },
    {
      icon: Video,
      title: "Videographers",
      description: "Content creators and filmmakers tracking cameras, lenses, audio equipment, and accessories."
    },
    {
      icon: Building,
      title: "Studios",
      description: "Photography and video studios with shared equipment pools and multiple team members."
    },
    {
      icon: Users,
      title: "Rental Teams",
      description: "Equipment rental companies managing inventory and customer checkouts."
    },
    {
      icon: Palette,
      title: "Creative Agencies",
      description: "Marketing and advertising agencies with diverse creative equipment needs."
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-kitlog-text mb-6">
            Who It's For
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Whether you're a solo creator or managing a team, KitLog scales to fit your needs. 
            Join thousands of creative professionals who trust us with their gear.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {audiences.slice(0, 3).map((audience, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 group animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-16 h-16 bg-orange-50 rounded-2xl mb-6 flex items-center justify-center group-hover:bg-orange-100 transition-colors">
                <audience.icon className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-kitlog-text mb-4">
                {audience.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {audience.description}
              </p>
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 max-w-4xl mx-auto">
          {audiences.slice(3).map((audience, index) => (
            <div 
              key={index + 3}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 group animate-fade-in"
              style={{ animationDelay: `${(index + 3) * 0.1}s` }}
            >
              <div className="w-16 h-16 bg-teal-50 rounded-2xl mb-6 flex items-center justify-center group-hover:bg-teal-100 transition-colors">
                <audience.icon className="w-8 h-8 text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold text-kitlog-text mb-4">
                {audience.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {audience.description}
              </p>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-8 text-gray-500">
            <div className="text-center">
              <div className="text-3xl font-bold text-orange">500+</div>
              <div className="text-sm">Beta Users</div>
            </div>
            <div className="w-px h-12 bg-gray-300"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-teal">$2M+</div>
              <div className="text-sm">Gear Tracked</div>
            </div>
            <div className="w-px h-12 bg-gray-300"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange">50+</div>
              <div className="text-sm">Studios</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AudienceSection;
