// app/cookie-policy/page.tsx
import Link from "next/link";

const cookieTypes = [
  {
    name: "Strictly Necessary Cookies",
    required: true,
    description: "These cookies are essential for the website to function properly. They enable core features like page navigation and access to secure areas. The website cannot function properly without these cookies.",
    examples: ["Session cookies", "Security tokens", "Load balancing cookies"],
  },
  {
    name: "Analytics Cookies",
    required: false,
    description: "These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. We use this data to improve our content and user experience.",
    examples: ["Google Analytics (_ga, _gid)", "Page view tracking", "Traffic source tracking"],
  },
  {
    name: "Functional Cookies",
    required: false,
    description: "These cookies allow the website to remember choices you make (such as your preferred language or region) and provide enhanced, more personal features.",
    examples: ["Language preferences", "Theme preferences", "Recently viewed articles"],
  },
  {
    name: "Marketing & Advertising Cookies",
    required: false,
    description: "These cookies are used to deliver advertisements more relevant to you and your interests. They may also limit the number of times you see an ad and help measure the effectiveness of advertising campaigns.",
    examples: ["Google Ads cookies", "Affiliate tracking cookies", "Retargeting pixels"],
  },
];

export default function CookiePolicyPage() {
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
            <span className="text-gray-400">Cookie Policy</span>
          </div>
          <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-100 rounded-full px-3 py-1 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
            <span className="text-xs font-bold tracking-widest text-orange-500 uppercase">Legal</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">Cookie Policy</h1>
          <p className="text-sm text-gray-400 mt-3">Last updated: March 26, 2026</p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-10">

          <div>
            <h2 className="text-xl font-extrabold text-gray-900 mb-3">What Are Cookies?</h2>
            <p className="text-gray-600 leading-relaxed text-sm">
              Cookies are small text files placed on your device when you visit a website. They are widely used to make
              websites work more efficiently, provide a better user experience, and give website owners useful information
              about how their site is being used. Cookies do not contain personally identifiable information on their own.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-extrabold text-gray-900 mb-3">How We Use Cookies</h2>
            <p className="text-gray-600 leading-relaxed text-sm">
              ElectroAdvisor uses cookies to improve your browsing experience, analyze site traffic, personalize content,
              and serve relevant advertisements. We also use cookies from trusted third-party services such as Google
              Analytics and affiliate networks.
            </p>
          </div>

          {/* Cookie Types */}
          <div>
            <h2 className="text-xl font-extrabold text-gray-900 mb-5">Types of Cookies We Use</h2>
            <div className="space-y-4">
              {cookieTypes.map((cookie) => (
                <div key={cookie.name} className="border border-gray-100 rounded-2xl overflow-hidden">
                  <div className="flex items-center justify-between px-5 py-4 bg-gray-50">
                    <h3 className="text-sm font-extrabold text-gray-900">{cookie.name}</h3>
                    <span
                      className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                        cookie.required
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {cookie.required ? "Required" : "Optional"}
                    </span>
                  </div>
                  <div className="px-5 py-4 space-y-3">
                    <p className="text-sm text-gray-600 leading-relaxed">{cookie.description}</p>
                    <div>
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Examples</p>
                      <div className="flex flex-wrap gap-2">
                        {cookie.examples.map((ex) => (
                          <span key={ex} className="text-xs bg-orange-50 text-orange-600 font-medium px-2.5 py-1 rounded-full border border-orange-100">
                            {ex}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-extrabold text-gray-900 mb-3">Managing Cookies</h2>
            <p className="text-gray-600 leading-relaxed text-sm mb-4">
              You can control and manage cookies in several ways. Please note that removing or blocking certain cookies
              may impact your experience on our website.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { title: "Browser Settings", desc: "Most browsers allow you to view, delete, and block cookies through their settings menu." },
                { title: "Opt-Out Tools", desc: "Use Google Analytics Opt-out Browser Add-on to prevent Analytics tracking." },
                { title: "Cookie Banner", desc: "Use our cookie consent banner to accept or decline optional cookies when you first visit." },
                { title: "Third-Party Tools", desc: "Visit youronlinechoices.com to manage advertising cookies from participating companies." },
              ].map((item) => (
                <div key={item.title} className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-3">
                  <p className="text-sm font-bold text-gray-900 mb-1">{item.title}</p>
                  <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-extrabold text-gray-900 mb-3">Third-Party Cookies</h2>
            <p className="text-gray-600 leading-relaxed text-sm">
              Some cookies on our site are set by third-party services that appear on our pages. We have no control
              over these cookies. Third parties include analytics providers (Google Analytics), advertising networks,
              and affiliate tracking platforms. Please refer to the respective third-party privacy policies for details.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-extrabold text-gray-900 mb-3">Cookie Retention</h2>
            <div className="overflow-hidden border border-gray-100 rounded-2xl">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Cookie Type</th>
                    <th className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Duration</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    { type: "Session Cookies",   duration: "Deleted when browser closes" },
                    { type: "Analytics Cookies", duration: "Up to 2 years"               },
                    { type: "Functional Cookies",duration: "Up to 1 year"                },
                    { type: "Marketing Cookies", duration: "Up to 90 days"               },
                  ].map((row) => (
                    <tr key={row.type} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 font-medium text-gray-900">{row.type}</td>
                      <td className="px-4 py-3 text-gray-500">{row.duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-extrabold text-gray-900 mb-3">Updates to This Policy</h2>
            <p className="text-gray-600 leading-relaxed text-sm">
              We may update this Cookie Policy from time to time to reflect changes in technology, legislation, or our
              data practices. Any changes will be posted on this page with an updated revision date.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-extrabold text-gray-900 mb-3">Contact Us</h2>
            <p className="text-gray-600 text-sm mb-3">Questions about our cookie practices? Get in touch:</p>
            <div className="bg-orange-50 border border-orange-100 rounded-2xl px-5 py-4 text-sm text-gray-700 space-y-1">
              <p className="font-bold text-gray-900">ElectroAdvisor</p>
              <p>Email: <a href="mailto:privacy@electroadvisor.com" className="text-orange-500 hover:underline">privacy@electroadvisor.com</a></p>
              <p>Website: <a href="/" className="text-orange-500 hover:underline">www.electroadvisor.com</a></p>
            </div>
          </div>

        </div>

        {/* Related Links */}
        <div className="mt-12 pt-8 border-t border-gray-100 flex flex-wrap gap-3">
          <Link href="/privacy-policy" className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-600 hover:text-orange-500 transition-colors bg-gray-50 hover:bg-orange-50 border border-gray-100 px-4 py-2 rounded-xl">
            Privacy Policy
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
          </Link>
          <Link href="/terms-of-service" className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-600 hover:text-orange-500 transition-colors bg-gray-50 hover:bg-orange-50 border border-gray-100 px-4 py-2 rounded-xl">
            Terms of Service
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
          </Link>
        </div>
      </section>
    </main>
  );
}