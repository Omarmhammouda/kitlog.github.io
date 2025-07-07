import { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const TermsOfService = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 max-w-3xl mx-auto px-4 py-12 pt-32">
        <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
        <p className="mb-4">Last updated: June 2025</p>
        <p className="mb-4">
          Welcome to KitLog. By accessing or using our website and services, you agree to be bound by these Terms of Service. Please read them carefully.
        </p>
        <h2 className="text-xl font-semibold mt-8 mb-2">1. Use of Service</h2>
        <p className="mb-4">You agree to use KitLog only for lawful purposes and in accordance with these Terms. You are responsible for your use of the service and any content you provide.</p>
        <h2 className="text-xl font-semibold mt-8 mb-2">2. Accounts</h2>
        <p className="mb-4">You may be required to create an account to access certain features. You are responsible for maintaining the confidentiality of your account and password.</p>
        <h2 className="text-xl font-semibold mt-8 mb-2">3. Intellectual Property</h2>
        <p className="mb-4">All content, trademarks, and data on this site are the property of KitLog or its licensors. You may not use, reproduce, or distribute any content without permission.</p>
        <h2 className="text-xl font-semibold mt-8 mb-2">4. Termination</h2>
        <p className="mb-4">We reserve the right to suspend or terminate your access to the service at our discretion, without notice, for conduct that we believe violates these Terms or is harmful to other users.</p>
        <h2 className="text-xl font-semibold mt-8 mb-2">5. Disclaimer</h2>
        <p className="mb-4">The service is provided "as is" and "as available" without warranties of any kind. We do not guarantee that the service will be uninterrupted or error-free.</p>
        <h2 className="text-xl font-semibold mt-8 mb-2">6. Limitation of Liability</h2>
        <p className="mb-4">KitLog is not liable for any indirect, incidental, or consequential damages arising from your use of the service.</p>
        <h2 className="text-xl font-semibold mt-8 mb-2">7. Changes to Terms</h2>
        <p className="mb-4">We may update these Terms from time to time. Continued use of the service after changes constitutes acceptance of the new Terms.</p>
        <h2 className="text-xl font-semibold mt-8 mb-2">8. Contact Us</h2>
        <p>If you have any questions about these Terms, please contact us at <a href="mailto:info@kitlog.io" className="text-blue-500 underline">info@kitlog.io</a>.</p>
      </main>
      <Footer />
    </div>
  );
};

export default TermsOfService; 