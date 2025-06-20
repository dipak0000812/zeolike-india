import React, { useState } from 'react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How do I list my property on Zeolike?",
      answer: "To list your property, simply click on the 'List Property' button in the navigation bar, create an account if you haven't already, and fill out the property listing form with all the required details and photos. Our team will review your listing within 24 hours."
    },
    {
      question: "What fees are involved in listing a property?",
      answer: "We offer different listing packages: Basic (free), Premium, and Featured. The Basic package is free but has limited features. Premium and Featured packages include additional benefits like priority listing, virtual tours, and professional photography. Contact our sales team for detailed pricing."
    },
    {
      question: "How do I schedule a property viewing?",
      answer: "You can schedule a viewing directly through the property listing page. Click on the 'Schedule Viewing' button, select your preferred date and time, and provide your contact information. The property agent will confirm your appointment within 24 hours."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers. For property purchases, we also work with escrow services to ensure secure transactions."
    },
    {
      question: "How do I verify a property's authenticity?",
      answer: "All properties listed on Zeolike are verified by our team. We check property ownership, legal documents, and physical verification. You can also request additional verification documents through the property listing page."
    },
    {
      question: "Can I save properties to view later?",
      answer: "Yes! You can save properties to your favorites by clicking the heart icon on any property listing. You'll need to create an account to use this feature. Saved properties can be accessed from your dashboard."
    },
    {
      question: "What happens if I find incorrect information in a listing?",
      answer: "If you find any incorrect information, please use the 'Report Issue' button on the property listing page. Our team will review the report and update the information if necessary. You can also contact our support team directly."
    },
    {
      question: "How do I contact a property agent?",
      answer: "You can contact property agents through the 'Contact Agent' button on any property listing. This will open a form where you can send a message directly to the agent. Agents typically respond within 24 hours."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-gray-600">
            Find answers to common questions about our services
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <button
                className="w-full px-6 py-4 text-left focus:outline-none"
                onClick={() => toggleFAQ(index)}
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900">{faq.question}</h3>
                  <svg
                    className={`w-6 h-6 text-gray-500 transform transition-transform ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact Support */}
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Still have questions?</h2>
          <p className="text-gray-600 mb-6">
            Our support team is here to help you with any other questions you might have.
          </p>
          <a
            href="/contact"
            className="inline-block bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition-colors"
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
};

export default FAQ; 