
import { AlertTriangle, Search, Clock, MapPin } from 'lucide-react';

const ProblemSection = () => {
  const problems = [
    {
      icon: Search,
      title: "Where's my 85mm lens?",
      description: "Spend more time searching than shooting"
    },
    {
      icon: AlertTriangle,
      title: "Who last used the gimbal?",
      description: "No accountability when gear goes missing"
    },
    {
      icon: Clock,
      title: "Is that light still under repair?",
      description: "Lost track of maintenance and repairs"
    },
    {
      icon: MapPin,
      title: "Did we bring everything back?",
      description: "Equipment left behind on location shoots"
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-kitlog-text mb-6">
            Built for Creatives — Not Warehouses
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stop losing valuable time and expensive equipment. KitLog solves the gear tracking problems 
            that creative professionals face every day.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {problems.map((problem, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow duration-300 text-center group animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-16 h-16 bg-red-50 rounded-2xl mx-auto mb-6 flex items-center justify-center group-hover:bg-red-100 transition-colors">
                <problem.icon className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-xl font-semibold text-kitlog-text mb-3">
                "{problem.title}"
              </h3>
              <p className="text-gray-600">
                {problem.description}
              </p>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <p className="text-lg text-gray-700 font-medium mb-4">
            Sound familiar? You're not alone.
          </p>
          <div className="inline-flex items-center bg-orange-50 text-orange-700 px-6 py-3 rounded-full">
            <span className="font-semibold">87% of creatives</span>
            <span className="mx-2">•</span>
            <span>struggle with gear organization</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
