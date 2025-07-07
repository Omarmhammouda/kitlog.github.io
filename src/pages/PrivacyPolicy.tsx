import { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const PrivacyPolicy = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 max-w-3xl mx-auto px-4 py-12 pt-32">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        <p className="mb-4">Last updated: June 2025</p>
        <p className="mb-4">
          KitLog ("we", "us", or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services.
        </p>
        <h2 className="text-xl font-semibold mt-8 mb-2">1. Information We Collect</h2>
        <ul className="list-disc pl-6 mb-4">
          <li><b>Personal Information:</b> such as your name, email address, and contact details when you register or contact us.</li>
          <li><b>Usage Data:</b> information about how you use our website and services, including IP address, browser type, and device information.</li>
        </ul>
        <h2 className="text-xl font-semibold mt-8 mb-2">2. How We Use Your Information</h2>
        <ul className="list-disc pl-6 mb-4">
          <li>To provide, operate, and maintain our services</li>
          <li>To improve, personalize, and expand our services</li>
          <li>To communicate with you, including customer support and updates</li>
          <li>To comply with legal obligations</li>
        </ul>
        <h2 className="text-xl font-semibold mt-8 mb-2">3. Sharing Your Information</h2>
        <p className="mb-4">
          We do not sell your personal information. We may share your information with trusted third parties who assist us in operating our website and services, as long as those parties agree to keep this information confidential. We may also disclose information if required by law.
        </p>
        <h2 className="text-xl font-semibold mt-8 mb-2">4. Data Security</h2>
        <p className="mb-4">
          We implement reasonable security measures to protect your information. However, no method of transmission over the Internet or electronic storage is 100% secure.
        </p>
        <h2 className="text-xl font-semibold mt-8 mb-2">5. Your Rights</h2>
        <p className="mb-4">
          You have the right to access, correct, or delete your personal information. To exercise these rights, please contact us at <a href="mailto:info@kitlog.io" className="text-blue-500 underline">info@kitlog.io</a>.
        </p>
        <h2 className="text-xl font-semibold mt-8 mb-2">6. Changes to This Policy</h2>
        <p className="mb-4">
          We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page.
        </p>
        <h2 className="text-xl font-semibold mt-8 mb-2">7. Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us at <a href="mailto:info@kitlog.io" className="text-blue-500 underline">info@kitlog.io</a>.
        </p>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy; 