
import { Check } from 'lucide-react';

const PricingSection = () => {
  const plans = [
    {
      name: "Free",
      price: "$0",
      description: "Perfect for individuals getting started",
      features: [
        "1 user",
        "10 gear items",
        "Limited logs",
        "Basic support"
      ]
    },
    {
      name: "Pro",
      price: "$15-$25/mo",
      description: "Ideal for freelancers and small teams",
      features: [
        "Unlimited gear",
        "Barcode scanning",
        "3 users",
        "Advanced logs",
        "Priority support"
      ],
      popular: true
    },
    {
      name: "Team",
      price: "$49-$99/mo",
      description: "For growing creative teams",
      features: [
        "10+ users",
        "Audit logs",
        "Integrations",
        "Custom branding",
        "Advanced analytics"
      ]
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For studios with 50+ staff or locations",
      features: [
        "Unlimited users",
        "Custom features",
        "Dedicated support",
        "On-premise option",
        "SLA guarantee"
      ]
    }
  ];

  return (
    <section id="pricing" className="py-20 px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-normal">
            Choose the plan that fits your creative workflow. All plans include core features 
            to help you track your gear effectively.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-3xl p-8 shadow-apple border transition-all duration-300 hover:shadow-apple-lg ${
                plan.popular 
                  ? 'border-blue ring-1 ring-blue/20 scale-105' 
                  : 'border-gray-100 hover:border-gray-200'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="text-center mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{plan.name}</h3>
                <div className="text-3xl font-light text-blue mb-2">{plan.price}</div>
                <p className="text-gray-500 text-sm">{plan.description}</p>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <Check className="w-4 h-4 text-blue mr-3 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 px-6 rounded-2xl font-medium transition-all duration-200 ${
                  plan.popular
                    ? 'bg-blue text-white hover:bg-blue-600 shadow-apple'
                    : 'bg-gray-50 text-gray-900 hover:bg-gray-100'
                }`}
              >
                {plan.name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
              </button>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-500 mb-4 font-normal">
            All plans include a 14-day free trial. No credit card required.
          </p>
          <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-400">
            <span>✓ Cancel anytime</span>
            <span>✓ 30-day money-back guarantee</span>
            <span>✓ Free migration support</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
