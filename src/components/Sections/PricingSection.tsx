import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiCloud, FiServer } from 'react-icons/fi';

const pricingData = {
  monthly: [
    {
      plan: 'Admin',
      description: 'Ideal for simple routine workflow, such as data entry, in HR, Finance, Operation, and any Admin department.',
      price: 199,
      features: [
        { value: '20k', text: 'agent credits with unlimited workflows' },
        { value: '2k', text: 'pages of document reading and unlimited webpages reading' },
      ],
      hosting: { icon: <FiCloud />, text: 'Hosted by Younes.ai' },
      buttonText: 'Start free trial',
      extras: [],
    },
    {
      plan: 'Executive',
      description: 'Functional as a team of Engineers, Analysts and Admins to get work done.',
      price: 499,
      features: [
        { value: '100k', text: 'agent credits with unlimited workflows' },
        { value: '10k', text: 'pages of document reading and unlimited webpages reading' },
      ],
      hosting: { icon: <FiCloud />, text: 'Hosted by Younes.ai' },
      buttonText: 'Start free trial',
      extras: [
        'Everything in the Admin plan, plus:',
        'Priority email & chat support',
        'Advanced analytics',
      ],
    },
    {
      plan: 'Enterprise',
      description: 'Ideal for businesses with strict security and performance requirements.',
      price: 'Contact us',
      features: [
        { value: 'up to ∞', text: 'workflow executions with unlimited steps' },
        { value: 'up to ∞', text: 'active workflows and unlimited test ones' },
      ],
      hosting: { icon: <FiServer />, text: 'Self-hosted (or hosted by Younes.ai)' },
      buttonText: 'Contact us',
      extras: [
        'Everything in the Executive plan, plus:',
        'Dedicated account manager',
        'Custom integrations & features',
        'On-premise deployment option',
      ],
    },
  ],
  annually: [

    {
      plan: 'Admin',
      description: 'Ideal for simple routine workflow, such as data entry, in HR, Finance, Operation, and any Admin department.',
      price: 1990,
      features: [
        { value: '240k', text: 'agent credits with unlimited workflows' },
        { value: '24k', text: 'pages of document reading and unlimited webpages reading' },
      ],
      hosting: { icon: <FiCloud />, text: 'Hosted by Younes.ai' },
      buttonText: 'Start free trial',
      extras: [],
    },
    {
      plan: 'Executive',
      description: 'Functional as a team of Engineers, Analysts and Admins to get work done.',
      price: 4990,
      features: [
        { value: '1.2M', text: 'agent credits with unlimited workflows' },
        { value: '120k', text: 'pages of document reading and unlimited webpages reading' },
      ],
      hosting: { icon: <FiCloud />, text: 'Hosted by Younes.ai' },
      buttonText: 'Start free trial',
      extras: [
        'Everything in the Admin plan, plus:',
        'Priority email & chat support',
        'Advanced analytics',
      ],
    },
    {
      plan: 'Enterprise',
      description: 'Ideal for businesses with strict security and performance requirements.',
      price: 'Contact us',
      features: [
        { value: 'up to ∞', text: 'workflow executions with unlimited steps' },
        { value: 'up to ∞', text: 'active workflows and unlimited test ones' },
      ],
      hosting: { icon: <FiServer />, text: 'Self-hosted (or hosted by Younes.ai)' },
      buttonText: 'Contact us',
      extras: [
        'Everything in the Executive plan, plus:',
        'Dedicated account manager',
        'Custom integrations & features',
        'On-premise deployment option',
      ],
    },
  ],
};

const PricingSection = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annually'>('monthly');

  const plans = pricingData[billingCycle];

  return (
    <section id="pricing" className="opacity-75 w-full bg-black py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      <motion.h2
        className="text-5xl sm:text-6xl md:text-7xl font-bold text-center mb-4"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        <span className="bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
          Pricing
        </span>
      </motion.h2>

      <motion.p
        className="text-base sm:text-lg text-gray-400 text-center max-w-xl mb-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        Three different subscriptions to match your companies' needs.
      </motion.p>

      <motion.div
        className="flex items-center justify-center p-1 rounded-lg bg-[#111114] border border-white/10 mb-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <button
          onClick={() => setBillingCycle('monthly')}
          className={`px-4 sm:px-6 py-2 text-sm sm:text-base font-medium rounded-md transition-colors ${billingCycle === 'monthly' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}
        >
          Monthly
        </button>
        <button
          onClick={() => setBillingCycle('annually')}
          className={`px-4 sm:px-6 py-2 text-sm sm:text-base font-medium rounded-md transition-colors ${billingCycle === 'annually' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}
        >
          Annually
        </button>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.plan}
            className="flex flex-col bg-[#0D1117] rounded-xl border border-white/10 p-6 sm:p-8 transition-all duration-300 hover:border-blue-400 hover:shadow-[0_0_24px_4px_rgba(59,130,246,0.2)]"
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.2 + index * 0.1 }}
          >
            <div className="flex-grow">
              <h3 className="text-2xl font-semibold text-white mb-2">{plan.plan}</h3>
              <p className="text-gray-400 mb-6 text-sm h-20">{plan.description}</p>

              {typeof plan.price === 'number' ? (
                <div className="mb-6">
                  <span className="text-5xl font-bold text-white">${plan.price}</span>
                  <span className="text-gray-400 ml-2">per month</span>
                </div>
              ) : (
                <div className="mb-6 text-5xl font-bold bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent h-[60px] flex items-center">
                  {plan.price}
                </div>
              )}

              <div className="bg-black/30 rounded-lg p-6 space-y-6 mb-8">
                {plan.features.map((feature) => (
                  <div key={feature.text} className="flex items-center gap-4">
                    <div className="text-3xl font-bold text-white w-20 text-center">{feature.value}</div>
                    <p className="text-gray-400 text-sm">{feature.text}</p>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-3 text-gray-300 mb-8 text-sm">
                {plan.hosting.icon}
                <span>{plan.hosting.text}</span>
              </div>
            </div>

            <div className="mt-auto">
              <button className="w-full py-3 bg-white/5 border border-white/10 rounded-lg text-white font-medium hover:bg-white/10 hover:border-white/20 transition-colors">
                {plan.buttonText}
              </button>

              {plan.extras.length > 0 && (
                <div className="mt-8 pt-6 border-t border-white/10">
                  <p className="text-white mb-4 text-sm">{plan.extras[0]}</p>
                  <ul className="space-y-3">
                    {plan.extras.slice(1).map(extra => (
                      <li key={extra} className="flex items-center gap-3 text-sm text-gray-300">
                        <FiCheckCircle className="text-blue-400" />
                        <span>{extra}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default PricingSection;
