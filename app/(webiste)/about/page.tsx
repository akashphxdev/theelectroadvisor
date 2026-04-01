"use client";

import Link from "next/link";

// ── Types ──────────────────────────────────────────────────────────────────────
interface StatItem {
  value: string;
  label: string;
  icon: React.ReactNode;
}

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  avatar: string;
  accent: string;
}

interface ValueItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface MilestoneItem {
  year: string;
  title: string;
  description: string;
}

// ── SVG Icons ──────────────────────────────────────────────────────────────────
const IconUsers = () => (
  <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
      d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
  </svg>
);

const IconArticle = () => (
  <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
      d="M9 12h6M9 16h6M7 8h10M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z" />
  </svg>
);

const IconPen = () => (
  <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
      d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 012.828 2.828L11.828 15.828a4 4 0 01-1.414.94l-3.414 1.138 1.138-3.414A4 4 0 019 13z" />
  </svg>
);

const IconGrid = () => (
  <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
      d="M4 6h16M4 10h16M4 14h16M4 18h16" />
  </svg>
);

const IconSearch = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M21 21l-4.35-4.35M17 11A6 6 0 105 11a6 6 0 0012 0z" />
  </svg>
);

const IconBalance = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M3 6l9-3 9 3M3 6l3 9a6 6 0 0012 0l3-9M3 6h18M12 3v18" />
  </svg>
);

const IconRefresh = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M4 4v6h6M20 20v-6h-6M4.93 14a8 8 0 1014.14-8.14" />
  </svg>
);

const IconGlobe = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" strokeWidth={2} />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" />
  </svg>
);

const IconHeart = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);

const IconBarChart = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M18 20V10M12 20V4M6 20v-6" />
  </svg>
);

const IconStar = () => (
  <svg width="20" height="20" fill="none" stroke="white" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round"
      d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const IconMap = () => (
  <svg width="20" height="20" fill="none" stroke="white" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round"
      d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
  </svg>
);

const IconArrowRight = ({ width = 16 }: { width?: number }) => (
  <svg width={width} height={width} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
  </svg>
);

const IconChevronRight = () => (
  <svg width="10" height="10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
  </svg>
);

const IconCheck = () => (
  <svg width="10" height="10" fill="none" stroke="white" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
  </svg>
);

// ── Data ───────────────────────────────────────────────────────────────────────
const STATS: StatItem[] = [
  { value: "2.4M+", label: "Monthly Readers",     icon: <IconUsers /> },
  { value: "1,800+", label: "Articles Published", icon: <IconArticle /> },
  { value: "120+",  label: "Expert Contributors", icon: <IconPen /> },
  { value: "48",    label: "Categories Covered",  icon: <IconGrid /> },
];

const TEAM: TeamMember[] = [
  {
    name: "Arjun Mehta",
    role: "Editor-in-Chief",
    bio: "Former tech journalist with 12 years covering consumer electronics and emerging technologies across Asia and Europe.",
    avatar: "AM",
    accent: "#f97316",
  },
  {
    name: "Priya Sharma",
    role: "Head of Reviews",
    bio: "Certified product tester and UX researcher. Has evaluated over 600 products across 8 years in the industry.",
    avatar: "PS",
    accent: "#3b82f6",
  },
  {
    name: "Rohan Kapoor",
    role: "Comparisons Lead",
    bio: "Data-driven analyst specialising in head-to-head benchmarks. Brings engineering precision to every verdict.",
    avatar: "RK",
    accent: "#8b5cf6",
  },
  {
    name: "Neha Joshi",
    role: "Community & Growth",
    bio: "Built our reader community from 10k to 2M+. Passionate about making expert knowledge accessible to everyone.",
    avatar: "NJ",
    accent: "#10b981",
  },
];

const VALUES: ValueItem[] = [
  {
    icon: <IconSearch />,
    title: "Rigorous Research",
    description: "Every article is backed by hands-on testing, verified data, and expert consultation. We never publish conjecture.",
  },
  {
    icon: <IconBalance />,
    title: "Radical Honesty",
    description: "No paid placements. No sponsored verdicts. If a product disappoints, we say so — clearly and without apology.",
  },
  {
    icon: <IconRefresh />,
    title: "Always Current",
    description: "Our team continuously updates existing articles to reflect new releases, price changes, and evolving user feedback.",
  },
  {
    icon: <IconGlobe />,
    title: "Built for Everyone",
    description: "Written in plain language for real people — whether you're a first-time buyer or a seasoned enthusiast.",
  },
  {
    icon: <IconHeart />,
    title: "Reader-First",
    description: "Your trust is our only metric. We measure success by how well our content helps you make better decisions.",
  },
  {
    icon: <IconBarChart />,
    title: "Data-Driven",
    description: "We back opinions with numbers. Benchmarks, specifications, and real-world performance figures underpin every claim.",
  },
];

const MILESTONES: MilestoneItem[] = [
  { year: "2018", title: "Founded",            description: "Started as a small blog covering smartphone reviews out of a Bangalore apartment." },
  { year: "2019", title: "100k Readers",       description: "Reached our first major milestone and onboarded our first team of contributing writers." },
  { year: "2021", title: "Comparisons Launch", description: "Introduced our signature head-to-head format, which quickly became our most-read content type." },
  { year: "2022", title: "1M Monthly Visits",  description: "Crossed one million monthly readers and expanded into home appliances, audio, and wearables." },
  { year: "2023", title: "Regional Expansion", description: "Launched dedicated coverage for South-East Asian and Middle Eastern markets." },
  { year: "2024", title: "2.4M+ Readers",      description: "Today we serve over 2.4 million monthly readers across 60+ countries worldwide." },
];

const ACCENT_COLORS = [
  "#f97316","#3b82f6","#8b5cf6","#10b981",
  "#ef4444","#f59e0b","#6366f1","#ec4899",
];
function accentColor(idx: number) { return ACCENT_COLORS[idx % ACCENT_COLORS.length]; }

// ── Sub-components ─────────────────────────────────────────────────────────────

function SectionLabel({ color = "#f97316", children }: { color?: string; children: React.ReactNode }) {
  return (
    <p
      className="text-[0.65rem] font-bold tracking-widest uppercase mb-1 font-sans"
      style={{ color }}
    >
      {children}
    </p>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-serif text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
      {children}
    </h2>
  );
}

// ── MAIN PAGE ──────────────────────────────────────────────────────────────────
export default function AboutPage() {
  return (
    <main className="w-full min-h-screen bg-white">

      {/* ══════════════════════════════════════
          HERO BANNER
      ══════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-orange-100/40 to-white">
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(#000 1px,transparent 1px),linear-gradient(90deg,#000 1px,transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-orange-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-orange-300/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-16 py-20 lg:py-28 relative">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-[0.7rem] font-sans text-gray-400 mb-8">
            <Link href="/" className="hover:text-orange-500 transition-colors font-medium">Home</Link>
            <IconChevronRight />
            <span className="text-orange-500 font-bold">About Us</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left */}
            <div className="flex flex-col gap-6">
              <div className="inline-flex items-center gap-2 bg-white border border-orange-200 rounded-full px-4 py-1.5 w-fit shadow-sm">
                <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse inline-block" />
                <span className="font-bold text-[0.65rem] tracking-widest uppercase text-gray-500 font-sans">
                  Our Story
                </span>
              </div>

              <h1 className="font-serif text-4xl xl:text-5xl font-black text-gray-900 leading-tight tracking-tight">
                We Help You Buy{" "}
                <span className="text-orange-500">Smarter,</span>
                <br />
                Not Just Faster.
              </h1>

              <p className="font-serif text-base font-light italic text-gray-500 leading-relaxed max-w-xl">
                Since 2018, we've been the independent voice consumers trust for honest
                reviews, rigorous comparisons, and buying guides that cut through the noise.
              </p>

              <div className="flex items-center gap-3 flex-wrap text-xs text-gray-400 font-medium font-sans">
                <span>Founded 2018</span>
                <span className="opacity-40">|</span>
                <span>Bangalore, India</span>
                <span className="opacity-40">|</span>
                <span>60+ Countries</span>
              </div>

              <div className="flex items-center gap-3 flex-wrap">
                <Link
                  href="/categories"
                  className="inline-flex items-center gap-2 bg-gray-900 hover:bg-orange-500 text-white font-bold text-sm px-7 py-3.5 rounded-xl w-fit transition-all duration-200 font-sans tracking-wide"
                >
                  Explore Articles
                  <IconArrowRight />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-white border border-orange-200 hover:border-orange-400 text-gray-700 hover:text-orange-500 font-bold text-sm px-7 py-3.5 rounded-xl w-fit transition-all duration-200 font-sans tracking-wide"
                >
                  Contact Us
                </Link>
              </div>
            </div>

            {/* Right — stat cards */}
            <div className="grid grid-cols-2 gap-4">
              {STATS.map((s, i) => (
                <div
                  key={s.label}
                  className="bg-white rounded-2xl border border-orange-100 p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center mb-3"
                    style={{ color: accentColor(i), background: accentColor(i) + "15" }}
                  >
                    {s.icon}
                  </div>
                  <p
                    className="font-serif text-3xl font-black leading-none mb-1"
                    style={{ color: accentColor(i) }}
                  >
                    {s.value}
                  </p>
                  <p className="text-xs text-gray-400 font-sans font-medium">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          MISSION STATEMENT
      ══════════════════════════════════════ */}
      <section className="w-full bg-gray-900 px-4 sm:px-8 py-16">
        <div className="max-w-[1280px] mx-auto text-center flex flex-col items-center gap-6">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5">
            <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse inline-block" />
            <span className="font-bold text-[0.65rem] tracking-widest uppercase text-white/70 font-sans">
              Our Mission
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight max-w-3xl">
            "Honest information is the foundation of{" "}
            <span className="text-orange-400">every great purchase.</span>"
          </h2>
          <p className="font-serif text-base font-light italic text-white/60 max-w-2xl leading-relaxed">
            We exist to give every consumer — regardless of budget or background — access to the
            same level of independent, expert insight that was once only available to industry insiders.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════
          WHAT WE DO
      ══════════════════════════════════════ */}
      <section className="w-full bg-white px-4 sm:px-8 py-12 border-b border-orange-100">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex items-end justify-between mb-8 flex-wrap gap-3">
            <div>
              <SectionLabel>What We Do</SectionLabel>
              <SectionHeading>Three Ways We Help You</SectionHeading>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {/* Reviews */}
            <div className="relative rounded-2xl overflow-hidden border border-orange-100 bg-orange-50/50 p-7 flex flex-col gap-4 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-amber-500 flex items-center justify-center text-white shadow-md">
                <IconStar />
              </div>
              <div className="w-1 h-6 rounded-full bg-amber-500" />
              <h3 className="font-serif text-xl font-black text-gray-900 group-hover:text-amber-500 transition-colors">In-Depth Reviews</h3>
              <p className="text-sm text-gray-500 font-sans leading-relaxed">
                Hands-on evaluation of hundreds of products each year. We test in real conditions
                and report exactly what we find — the good, the bad, and the ugly.
              </p>
              <Link href="/review" className="mt-auto text-sm font-bold text-amber-500 font-sans flex items-center gap-1 hover:gap-2 transition-all">
                Browse Reviews
                <IconArrowRight width={13} />
              </Link>
            </div>

            {/* Comparisons */}
            <div className="relative rounded-2xl overflow-hidden border border-orange-100 bg-orange-50/50 p-7 flex flex-col gap-4 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-orange-500 flex items-center justify-center text-white text-xs font-black shadow-md tracking-widest">
                VS
              </div>
              <div className="w-1 h-6 rounded-full bg-orange-500" />
              <h3 className="font-serif text-xl font-black text-gray-900 group-hover:text-orange-500 transition-colors">Head-to-Head Comparisons</h3>
              <p className="text-sm text-gray-500 font-sans leading-relaxed">
                Can't decide between two options? Our structured comparisons lay out every
                spec, test result, and use-case side by side so the choice becomes obvious.
              </p>
              <Link href="/comparison" className="mt-auto text-sm font-bold text-orange-500 font-sans flex items-center gap-1 hover:gap-2 transition-all">
                See Comparisons
                <IconArrowRight width={13} />
              </Link>
            </div>

            {/* Buying Guides */}
            <div className="relative rounded-2xl overflow-hidden border border-orange-100 bg-orange-50/50 p-7 flex flex-col gap-4 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-blue-500 flex items-center justify-center text-white shadow-md">
                <IconMap />
              </div>
              <div className="w-1 h-6 rounded-full bg-blue-500" />
              <h3 className="font-serif text-xl font-black text-gray-900 group-hover:text-blue-500 transition-colors">Buying Guides</h3>
              <p className="text-sm text-gray-500 font-sans leading-relaxed">
                Not sure where to start? Our category guides walk you through exactly what to
                look for, which features matter, and which specs are just marketing noise.
              </p>
              <Link href="/categories" className="mt-auto text-sm font-bold text-blue-500 font-sans flex items-center gap-1 hover:gap-2 transition-all">
                Explore Guides
                <IconArrowRight width={13} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          OUR VALUES
      ══════════════════════════════════════ */}
      <section className="w-full bg-orange-50/50 px-4 sm:px-8 py-12">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex items-center gap-2.5 mb-8">
            <IconHeart />
            <SectionHeading>What We Stand For</SectionHeading>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {VALUES.map((v, i) => (
              <div
                key={v.title}
                className="flex flex-col rounded-2xl overflow-hidden bg-white border border-orange-100 hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300 p-6 gap-4"
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center shadow-sm flex-shrink-0"
                  style={{
                    color: accentColor(i),
                    background: accentColor(i) + "18",
                    border: `1.5px solid ${accentColor(i)}30`,
                  }}
                >
                  {v.icon}
                </div>
                <div>
                  <h3 className="font-serif text-base font-bold text-gray-900 mb-1.5">{v.title}</h3>
                  <p className="text-[0.82rem] text-gray-500 font-sans leading-relaxed">{v.description}</p>
                </div>
                <div
                  className="mt-auto h-0.5 w-10 rounded-full"
                  style={{ background: accentColor(i) }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          TEAM
      ══════════════════════════════════════ */}
      <section className="w-full bg-white px-4 sm:px-8 py-12">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <div className="w-1 h-9 rounded-full bg-gradient-to-b from-orange-500 to-orange-400" />
              <div>
                <SectionLabel>The People Behind It</SectionLabel>
                <SectionHeading>Meet the Team</SectionHeading>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {TEAM.map((member) => (
              <div
                key={member.name}
                className="flex gap-4 items-center bg-white rounded-2xl border border-orange-100 p-4 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 group"
              >
                <div
                  className="w-[72px] h-[72px] rounded-xl flex-shrink-0 flex items-center justify-center font-serif font-black text-xl text-white shadow-md"
                  style={{ background: `linear-gradient(135deg, ${member.accent}, ${member.accent}cc)` }}
                >
                  {member.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                    <h3 className="font-serif text-sm font-bold text-gray-900 group-hover:text-orange-500 transition-colors">
                      {member.name}
                    </h3>
                    <span
                      className="text-[0.55rem] font-black tracking-widest uppercase px-2 py-0.5 rounded-full text-white font-sans"
                      style={{ background: member.accent }}
                    >
                      {member.role}
                    </span>
                  </div>
                  <p className="text-[0.78rem] text-gray-400 font-sans leading-relaxed line-clamp-2">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          TIMELINE
      ══════════════════════════════════════ */}
      <section className="w-full bg-orange-50/40 px-4 sm:px-8 py-12">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-1 h-8 rounded-full bg-purple-500" />
            <div>
              <SectionLabel color="#8b5cf6">Our Journey</SectionLabel>
              <SectionHeading>How We Got Here</SectionHeading>
            </div>
          </div>

          <div className="relative">
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-orange-200 -translate-x-1/2" />

            <div className="flex flex-col gap-6">
              {MILESTONES.map((m, i) => {
                const isLeft = i % 2 === 0;
                return (
                  <div
                    key={m.year}
                    className={`relative flex items-center gap-6 md:gap-0 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}
                  >
                    <div className={`flex-1 md:px-10 ${isLeft ? "md:text-right" : "md:text-left"}`}>
                      <div className="bg-white rounded-2xl border border-orange-100 p-5 hover:shadow-lg transition-shadow duration-300 inline-block w-full">
                        <div
                          className="text-[0.6rem] font-black tracking-widest uppercase font-sans mb-1.5"
                          style={{ color: accentColor(i) }}
                        >
                          {m.year}
                        </div>
                        <h3 className="font-serif text-base font-black text-gray-900 mb-1">{m.title}</h3>
                        <p className="text-[0.82rem] text-gray-500 font-sans leading-relaxed">{m.description}</p>
                      </div>
                    </div>

                    <div
                      className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-4 border-white shadow-md z-10 flex-shrink-0"
                      style={{ background: accentColor(i) }}
                    />

                    <div className="hidden md:block flex-1" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          EDITORIAL STANDARDS
      ══════════════════════════════════════ */}
      <section className="w-full bg-white px-4 sm:px-8 py-12 border-t border-orange-100">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col gap-5">
              <div>
                <SectionLabel>Transparency</SectionLabel>
                <SectionHeading>Our Editorial Standards</SectionHeading>
              </div>
              <p className="text-sm text-gray-500 font-sans leading-relaxed">
                We maintain a strict separation between editorial and commercial operations.
                No brand or advertiser can influence our ratings, verdicts, or rankings.
              </p>
              <div className="flex flex-col gap-3">
                {[
                  "Products are purchased independently or received as press samples — never gifts",
                  "All test data is logged and archived for internal audit",
                  "Affiliate links are clearly disclosed on every relevant page",
                  "Editor conflicts of interest are declared before assignment",
                  "Corrections are published prominently with full context",
                ].map((point, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: accentColor(i) }}
                    >
                      <IconCheck />
                    </div>
                    <p className="text-sm text-gray-600 font-sans leading-relaxed">{point}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2 relative rounded-2xl overflow-hidden bg-gray-900 p-7 flex flex-col gap-3">
                <div className="absolute -top-8 -right-8 w-48 h-48 bg-orange-500/20 rounded-full blur-3xl" />
                <p className="text-[0.6rem] font-bold tracking-widest uppercase text-orange-400 font-sans">Independence</p>
                <p className="font-serif text-3xl font-black text-white leading-snug">
                  100% editorially independent<br />
                  <span className="text-orange-400">since day one.</span>
                </p>
                <p className="text-xs text-white/50 font-sans">No investors. No corporate owners. No agenda.</p>
              </div>
              {[
                { label: "Products Tested in 2024",       value: "340+",  color: "#f97316" },
                { label: "Accuracy Rate (reader audit)",  value: "98.6%", color: "#10b981" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="bg-white rounded-2xl border border-orange-100 p-5 flex flex-col gap-1.5 hover:shadow-lg transition-shadow"
                >
                  <p className="font-serif text-3xl font-black" style={{ color: s.color }}>
                    {s.value}
                  </p>
                  <p className="text-xs text-gray-400 font-sans font-medium">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          CTA BANNER
      ══════════════════════════════════════ */}
      <section className="w-full bg-orange-50/60 px-4 sm:px-8 py-12 pb-20">
        <div className="max-w-[1280px] mx-auto">
          <div className="relative bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl overflow-hidden p-8 sm:p-12 flex flex-col sm:flex-row items-center justify-between gap-8">
            <div
              className="absolute inset-0 opacity-[0.06] pointer-events-none"
              style={{
                backgroundImage:
                  "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
                backgroundSize: "30px 30px",
              }}
            />
            <div className="absolute -top-10 -left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative flex flex-col gap-3">
              <p className="text-[0.65rem] font-bold tracking-widest uppercase text-white/70 font-sans">
                Join Our Community
              </p>
              <h2 className="font-serif text-2xl sm:text-3xl font-black text-white leading-tight">
                Have a question or a tip?<br />We'd love to hear from you.
              </h2>
              <p className="text-sm text-white/70 font-sans max-w-md">
                Whether you're a reader with feedback, a brand seeking editorial consideration,
                or a writer wanting to contribute — our inbox is always open.
              </p>
            </div>

            <div className="relative flex flex-col gap-3 flex-shrink-0">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-white text-orange-600 hover:bg-orange-50 font-bold text-sm px-8 py-3.5 rounded-xl transition-all duration-200 font-sans tracking-wide whitespace-nowrap"
              >
                Get in Touch
                <IconArrowRight width={15} />
              </Link>
              <Link
                href="/categories"
                className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white/40 hover:border-white text-white font-bold text-sm px-8 py-3 rounded-xl transition-all duration-200 font-sans tracking-wide whitespace-nowrap"
              >
                Browse Articles
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}