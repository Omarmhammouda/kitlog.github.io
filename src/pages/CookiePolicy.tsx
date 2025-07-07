import { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const CookiePolicy = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 max-w-3xl mx-auto px-4 py-12 pt-32">
        <h1 className="text-3xl font-bold mb-6">Cookie Policy</h1>
        <p className="mb-4">Last updated: June 2025</p>
        <p className="mb-4">
          KitLog uses cookies and similar technologies to enhance your experience on our website. This Cookie Policy explains what cookies are, how we use them, and your choices regarding cookies.
        </p>
        <h2 className="text-xl font-semibold mt-8 mb-2">1. What Are Cookies?</h2>
        <p className="mb-4">Cookies are small text files stored on your device by your browser. They help us remember your preferences and improve your experience.</p>
        <h2 className="text-xl font-semibold mt-8 mb-2">2. How We Use Cookies</h2>
        <ul className="list-disc pl-6 mb-4">
          <li>To remember your preferences and settings</li>
          <li>To analyze site traffic and usage</li>
          <li>To provide relevant content and features</li>
        </ul>
        <h2 className="text-xl font-semibold mt-8 mb-2">3. Third-Party Cookies</h2>
        <p className="mb-4">We may use third-party services that set their own cookies to help us analyze usage and deliver content.</p>
        <h2 className="text-xl font-semibold mt-8 mb-2">4. Your Choices</h2>
        <p className="mb-4">You can control or delete cookies through your browser settings. Disabling cookies may affect your experience on our site.</p>
        <h2 className="text-xl font-semibold mt-8 mb-2">5. Changes to This Policy</h2>
        <p className="mb-4">We may update this Cookie Policy from time to time. We will notify you of any changes by posting the new policy on this page.</p>
        <h2 className="text-xl font-semibold mt-8 mb-2">6. Contact Us</h2>
        <p>If you have any questions about our Cookie Policy, please contact us at <a href="mailto:info@kitlog.io" className="text-blue-500 underline">info@kitlog.io</a>.</p>
      </main>
      <Footer />
    </div>
  );
};

export default CookiePolicy; 