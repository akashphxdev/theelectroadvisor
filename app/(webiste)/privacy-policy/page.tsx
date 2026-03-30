// app/privacy-policy/page.tsx
import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <main className="w-full min-h-screen bg-white">

      {/* Hero */}
      <section className="w-full bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
            <Link href="/" className="hover:text-orange-500 transition-colors font-medium text-gray-500">Home</Link>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-gray-400">Privacy Policy</span>
          </div>
          <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-100 rounded-full px-3 py-1 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
            <span className="text-xs font-bold tracking-widest text-orange-500 uppercase">Legal</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">Privacy Policy</h1>
          <p className="text-sm text-gray-400 mt-3">Last updated: March 26, 2026</p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-gray max-w-none space-y-10">

          <div>
            <h2 className="text-xl font-extrabold text-gray-900 mb-3">1. Introduction</h2>
            <p className="text-gray-600 leading-relaxed text-sm">
              Welcome to ElectroAdvisor ("we", "our", or "us"). We are committed to protecting your personal information
              and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your
              information when you visit our website electroadvisor.com. Please read this policy carefully. If you
              disagree with its terms, please discontinue use of our site.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-extrabold text-gray-900 mb-3">2. Information We Collect</h2>
            <p className="text-gray-600 leading-relaxed text-sm mb-3">
              We may collect information about you in a variety of ways. The information we may collect includes:
            </p>
            <ul className="list-none space-y-3">
              {[
                { title: "Personal Data", desc: "Name, email address, and contact information you voluntarily provide when subscribing to our newsletter or contacting us." },
                { title: "Usage Data", desc: "Pages visited, time spent on pages, links clicked, and referring URLs — collected automatically via analytics tools." },
                { title: "Device Data", desc: "IP address, browser type, operating system, and device identifiers collected automatically." },
                { title: "Cookies", desc: "Small files placed on your device to improve your experience. See our Cookie Policy for full details." },
              ].map((item) => (
                <li key={item.title} className="flex gap-3 bg-gray-50 rounded-xl px-4 py-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5 flex-shrink-0" />
                  <div>
                    <span className="text-sm font-bold text-gray-900">{item.title}: </span>
                    <span className="text-sm text-gray-600">{item.desc}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-extrabold text-gray-900 mb-3">3. How We Use Your Information</h2>
            <p className="text-gray-600 leading-relaxed text-sm mb-3">We use the information we collect to:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                "Operate and maintain our website",
                "Send newsletters and updates (with your consent)",
                "Analyze usage to improve content and UX",
                "Respond to your comments and inquiries",
                "Prevent fraudulent or abusive activity",
                "Comply with legal obligations",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2.5 bg-gray-50 rounded-xl px-4 py-3">
                  <svg className="w-4 h-4 text-orange-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-extrabold text-gray-900 mb-3">4. Sharing Your Information</h2>
            <p className="text-gray-600 leading-relaxed text-sm">
              We do not sell, trade, or rent your personal information to third parties. We may share data with trusted
              service providers (such as analytics platforms and email delivery services) who assist us in operating our
              website, subject to confidentiality agreements. We may also disclose information when required by law or
              to protect our rights.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-extrabold text-gray-900 mb-3">5. Data Retention</h2>
            <p className="text-gray-600 leading-relaxed text-sm">
              We retain your personal data only for as long as necessary to fulfill the purposes outlined in this policy,
              or as required by law. Newsletter subscribers may unsubscribe at any time, after which we will remove their
              data within 30 days.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-extrabold text-gray-900 mb-3">6. Your Rights</h2>
            <p className="text-gray-600 leading-relaxed text-sm mb-3">Depending on your location, you may have the right to:</p>
            <ul className="list-none space-y-2">
              {[
                "Access the personal data we hold about you",
                "Request correction of inaccurate data",
                "Request deletion of your data",
                "Object to or restrict our processing of your data",
                "Data portability — receive your data in a structured format",
              ].map((right) => (
                <li key={right} className="flex items-center gap-2.5 text-sm text-gray-600">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-400 flex-shrink-0" />
                  {right}
                </li>
              ))}
            </ul>
            <p className="text-gray-600 leading-relaxed text-sm mt-3">
              To exercise any of these rights, contact us at{" "}
              <a href="mailto:privacy@electroadvisor.com" className="text-orange-500 hover:underline font-medium">
                privacy@electroadvisor.com
              </a>.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-extrabold text-gray-900 mb-3">7. Security</h2>
            <p className="text-gray-600 leading-relaxed text-sm">
              We implement appropriate technical and organizational measures to protect your personal information.
              However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-extrabold text-gray-900 mb-3">8. Third-Party Links</h2>
            <p className="text-gray-600 leading-relaxed text-sm">
              Our website may contain links to third-party sites. We are not responsible for the privacy practices
              of those sites and encourage you to review their privacy policies before providing any personal information.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-extrabold text-gray-900 mb-3">9. Changes to This Policy</h2>
            <p className="text-gray-600 leading-relaxed text-sm">
              We may update this Privacy Policy from time to time. We will notify you of significant changes by
              updating the "Last updated" date at the top of this page. Continued use of the site after changes
              constitutes acceptance of the updated policy.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-extrabold text-gray-900 mb-3">10. Contact Us</h2>
            <p className="text-gray-600 leading-relaxed text-sm">
              If you have questions about this Privacy Policy, please contact us at:
            </p>
            <div className="mt-3 bg-orange-50 border border-orange-100 rounded-2xl px-5 py-4 text-sm text-gray-700 space-y-1">
              <p className="font-bold text-gray-900">ElectroAdvisor</p>
              <p>Email: <a href="mailto:privacy@electroadvisor.com" className="text-orange-500 hover:underline">privacy@electroadvisor.com</a></p>
              <p>Website: <a href="/" className="text-orange-500 hover:underline">www.electroadvisor.com</a></p>
            </div>
          </div>

        </div>

        {/* Related Links */}
        <div className="mt-12 pt-8 border-t border-gray-100 flex flex-wrap gap-3">
          <Link href="/terms-of-service" className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-600 hover:text-orange-500 transition-colors bg-gray-50 hover:bg-orange-50 border border-gray-100 px-4 py-2 rounded-xl">
            Terms of Service
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
          </Link>
          <Link href="/cookie-policy" className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-600 hover:text-orange-500 transition-colors bg-gray-50 hover:bg-orange-50 border border-gray-100 px-4 py-2 rounded-xl">
            Cookie Policy
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
          </Link>
        </div>
      </section>
    </main>
  );
}