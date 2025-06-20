import React from 'react';
import { Link } from 'react-router-dom';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
            
            <div className="prose prose-blue max-w-none">
              <p className="text-gray-600 mb-6">Last updated: {new Date().toLocaleDateString()}</p>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
                <p className="text-gray-600 mb-4">
                  At Zeolike, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our Platform.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Information We Collect</h2>
                <div className="text-gray-600 space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">2.1. Personal Information</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Name and contact information</li>
                    <li>Email address</li>
                    <li>Phone number</li>
                    <li>Billing and payment information</li>
                    <li>Property preferences and search history</li>
                  </ul>

                  <h3 className="text-lg font-medium text-gray-900 mt-4">2.2. Usage Information</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>IP address and device information</li>
                    <li>Browser type and version</li>
                    <li>Operating system</li>
                    <li>Pages visited and time spent</li>
                    <li>Search queries and preferences</li>
                  </ul>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. How We Use Your Information</h2>
                <div className="text-gray-600 space-y-4">
                  <p>We use the collected information for:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Providing and maintaining our services</li>
                    <li>Processing transactions</li>
                    <li>Sending notifications and updates</li>
                    <li>Improving our Platform</li>
                    <li>Personalizing your experience</li>
                    <li>Communicating with you about our services</li>
                  </ul>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Information Sharing</h2>
                <div className="text-gray-600 space-y-4">
                  <p>We may share your information with:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Service providers and business partners</li>
                    <li>Legal authorities when required by law</li>
                    <li>Other users (as part of property listings)</li>
                  </ul>
                  <p className="mt-4">
                    We do not sell your personal information to third parties.
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Data Security</h2>
                <p className="text-gray-600 mb-4">
                  We implement appropriate security measures to protect your personal information. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Your Rights</h2>
                <div className="text-gray-600 space-y-4">
                  <p>You have the right to:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Access your personal information</li>
                    <li>Correct inaccurate data</li>
                    <li>Request deletion of your data</li>
                    <li>Opt-out of marketing communications</li>
                    <li>Export your data</li>
                  </ul>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Cookies and Tracking</h2>
                <p className="text-gray-600 mb-4">
                  We use cookies and similar tracking technologies to improve your experience on our Platform. You can control cookie settings through your browser preferences.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Children's Privacy</h2>
                <p className="text-gray-600 mb-4">
                  Our Platform is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Changes to Privacy Policy</h2>
                <p className="text-gray-600 mb-4">
                  We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Contact Us</h2>
                <p className="text-gray-600 mb-4">
                  If you have any questions about this Privacy Policy, please contact us at:
                </p>
                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="text-gray-600">Email: privacy@zeolike.com</p>
                  <p className="text-gray-600">Phone: +1 (555) 123-4567</p>
                  <p className="text-gray-600">Address: 123 Real Estate Street, City, State 12345</p>
                </div>
              </section>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <p className="text-gray-600">
                  By using our Platform, you consent to our Privacy Policy and agree to its terms.
                </p>
                <div className="mt-4">
                  <Link
                    to="/terms"
                    className="text-blue-600 hover:text-blue-500"
                  >
                    View our Terms and Conditions →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy; 