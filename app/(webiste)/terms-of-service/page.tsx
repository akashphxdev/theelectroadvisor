// app/terms-of-service/page.tsx
import Link from "next/link";

export default function TermsOfServicePage() {
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
            <span className="text-gray-400">Terms of Service</span>
          </div>
          <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-100 rounded-full px-3 py-1 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
            <span className="text-xs font-bold tracking-widest text-orange-500 uppercase">Legal</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">Terms of Service</h1>
          <p className="text-sm text-gray-400 mt-3">Last updated: March 26, 2026</p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-10">

          <div className="bg-orange-50 border border-orange-100 rounded-2xl px-5 py-4">
            <p className="text-sm text-gray-700 leading-relaxed">
              By accessing or using ElectroAdvisor, you agree to be bound by these Terms of Service.
              Please read them carefully before using our website.
            </p>
          </div>

          {[
            {
              num: "1",
              title: "Acceptance of Terms",
              content: "By accessing and using ElectroAdvisor (electroadvisor.com), you accept and agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, please do not use our website.",
            },
            {
              num: "2",
              title: "Use of the Website",
              content: "You may use our website for lawful purposes only. You agree not to use the site in any way that violates applicable laws, infringes on the rights of others, or restricts other users from enjoying the site. Unauthorized use, scraping, or reproduction of our content is strictly prohibited.",
            },
            {
              num: "3",
              title: "Intellectual Property",
              content: "All content on ElectroAdvisor — including articles, reviews, images, logos, and design — is the property of ElectroAdvisor and is protected by copyright and intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written permission.",
            },
            {
              num: "4",
              title: "Editorial Independence",
              content: "ElectroAdvisor maintains full editorial independence. Our reviews and recommendations are based solely on our testing and research. While we may earn affiliate commissions when you purchase through our links, this does not influence our editorial judgment or ratings.",
            },
            {
              num: "5",
              title: "Affiliate Disclosure",
              content: "Some links on our website are affiliate links. This means we may earn a small commission if you click through and make a purchase, at no additional cost to you. We only recommend products we have genuinely tested and believe are worth your money.",
            },
            {
              num: "6",
              title: "Disclaimer of Warranties",
              content: "ElectroAdvisor is provided on an 'as is' and 'as available' basis. We make no warranties, express or implied, regarding the accuracy, completeness, or reliability of any content. Product prices, availability, and specifications are subject to change and should be verified with the retailer.",
            },
            {
              num: "7",
              title: "Limitation of Liability",
              content: "To the fullest extent permitted by law, ElectroAdvisor shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the website or reliance on any content published herein.",
            },
            {
              num: "8",
              title: "Third-Party Links",
              content: "Our website contains links to third-party websites including retailers and manufacturers. We are not responsible for the content, accuracy, or practices of these external sites. Visiting them is at your own risk.",
            },
            {
              num: "9",
              title: "Changes to Terms",
              content: "We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting. Your continued use of the website after any changes constitutes your acceptance of the new terms.",
            },
            {
              num: "10",
              title: "Governing Law",
              content: "These Terms shall be governed by and construed in accordance with applicable laws. Any disputes arising from these terms shall be resolved through good-faith negotiation or, if necessary, through binding arbitration.",
            },
            {
              num: "11",
              title: "Contact",
              content: null,
              isContact: true,
            },
          ].map((section) => (
            <div key={section.num}>
              <h2 className="text-xl font-extrabold text-gray-900 mb-3">
                {section.num}. {section.title}
              </h2>
              {section.isContact ? (
                <div>
                  <p className="text-gray-600 text-sm mb-3">For questions about these Terms, contact us at:</p>
                  <div className="bg-orange-50 border border-orange-100 rounded-2xl px-5 py-4 text-sm text-gray-700 space-y-1">
                    <p className="font-bold text-gray-900">ElectroAdvisor</p>
                    <p>Email: <a href="mailto:legal@theelectroadvisor.com" className="text-orange-500 hover:underline">legal@theelectroadvisor.com</a></p>
                    <p>Website: <a href="/" className="text-orange-500 hover:underline">www.theelectroadvisor.com</a></p>
                  </div>
                </div>
              ) : (
                <p className="text-gray-600 leading-relaxed text-sm">{section.content}</p>
              )}
            </div>
          ))}

        </div>

        {/* Related Links */}
        <div className="mt-12 pt-8 border-t border-gray-100 flex flex-wrap gap-3">
          <Link href="/privacy-policy" className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-600 hover:text-orange-500 transition-colors bg-gray-50 hover:bg-orange-50 border border-gray-100 px-4 py-2 rounded-xl">
            Privacy Policy
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