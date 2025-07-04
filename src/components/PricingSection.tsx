
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
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-kitlog-text mb-6">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the plan that fits your creative workflow. All plans include core features 
            to help you track your gear effectively.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-2xl p-8 shadow-lg border-2 transition-all duration-300 hover:shadow-xl ${
                plan.popular 
                  ? 'border-orange scale-105' 
                  : 'border-gray-200 hover:border-orange/50'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-orange text-white px-4 py-2 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-kitlog-text mb-2">{plan.name}</h3>
                <div className="text-4xl font-bold text-orange mb-2">{plan.price}</div>
                <p className="text-gray-600">{plan.description}</p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <Check className="w-5 h-5 text-teal mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-200 ${
                  plan.popular
                    ? 'bg-orange text-white hover:bg-orange-600 transform hover:scale-105'
                    : 'bg-gray-100 text-kitlog-text hover:bg-gray-200'
                }`}
              >
                {plan.name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
              </button>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            All plans include a 14-day free trial. No credit card required.
          </p>
          <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-500">
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
