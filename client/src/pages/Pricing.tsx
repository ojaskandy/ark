import { motion } from "framer-motion";
import { useLocation } from "wouter";

const TIERS = [
  {
    name: "trial",
    price: "$0",
    cadence: "first class",
    highlight: true,
    features: [
      "one in-studio class",
      "level placement",
      "meet your instructor",
      "recommendation for next steps",
    ],
    cta: "book a free trial",
    href: "/registration",
  },
  {
    name: "studio",
    price: "$120–$140",
    cadence: "/month",
    highlight: false,
    features: [
      "8 classes / month",
      "bollywood • hip-hop • contemporary",
      "performance opportunities",
      "supportive community",
    ],
    cta: "see schedule",
    href: "/class-schedule",
  },
  {
    name: "ai practice",
    price: "included",
    cadence: "with membership",
    highlight: false,
    features: [
      "practice at home",
      "AI movement feedback",
      "upload + compare videos",
      "track improvement over time",
    ],
    cta: "start practicing",
    href: "/live-routine",
  },
] as const;

export default function Pricing() {
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen bg-white text-slate-900 overflow-x-hidden">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_top,rgba(124,58,237,0.10),transparent_55%)]" />
      <div className="pointer-events-none fixed inset-0 opacity-[0.06] bg-[url('/noise.png')] mix-blend-multiply" />

      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/80 backdrop-blur"
      >
        <div className="mx-auto max-w-6xl px-6 md:px-10 py-4 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="flex items-center gap-2"
          >
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm">
              <span className="text-sm font-semibold tracking-tight text-ark-purple">
                ARK
              </span>
            </span>
            <span className="text-base font-semibold tracking-tight">
              <span className="bg-gradient-to-r from-ark-purple to-ark-purple-light bg-clip-text text-transparent">
                ARK Dance Studios
              </span>
            </span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => navigate("/class-schedule")}
              className="hidden sm:inline-flex h-10 items-center rounded-full border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50"
            >
              schedule
            </button>
            <button
              type="button"
              onClick={() => navigate("/registration")}
              className="inline-flex h-10 items-center rounded-full bg-ark-purple px-4 text-sm font-semibold text-white shadow-sm hover:bg-ark-purple-dark"
            >
              book trial
            </button>
          </div>
        </div>
      </motion.header>

      <main className="relative z-10 px-6 md:px-10">
        <section className="mx-auto max-w-6xl pt-12 md:pt-16 pb-6">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600 shadow-sm">
              transparent pricing • no surprises
            </div>

            <h1 className="mt-5 text-4xl md:text-6xl font-semibold tracking-tight leading-[1.05]">
              pricing that gets you dancing.
            </h1>
            <p className="mt-4 text-lg text-slate-600">
              Start with a free trial class. Choose a studio plan. Use AI practice
              tools to level up faster.
            </p>
          </motion.div>
        </section>

        <section className="mx-auto max-w-6xl pb-16">
          <div className="grid gap-4 md:grid-cols-3">
            {TIERS.map((tier, idx) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.05 + idx * 0.07 }}
                className={
                  tier.highlight
                    ? "rounded-3xl border border-ark-purple/30 bg-white shadow-md ring-1 ring-ark-purple/10"
                    : "rounded-3xl border border-slate-200 bg-white shadow-sm"
                }
              >
                <div className="p-6 md:p-7">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-sm font-semibold text-slate-900">
                        {tier.name}
                      </div>
                      <div className="mt-2 flex items-baseline gap-2">
                        <div className="text-3xl font-semibold tracking-tight">
                          {tier.price}
                        </div>
                        <div className="text-sm text-slate-500">
                          {tier.cadence}
                        </div>
                      </div>
                    </div>
                    {tier.highlight && (
                      <span className="inline-flex items-center rounded-full border border-ark-purple/20 bg-ark-purple/10 px-3 py-1 text-xs font-semibold text-ark-purple">
                        best start
                      </span>
                    )}
                  </div>

                  <ul className="mt-6 space-y-3 text-sm text-slate-700">
                    {tier.features.map((f) => (
                      <li key={f} className="flex gap-2">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-ark-purple" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    type="button"
                    onClick={() => navigate(tier.href)}
                    className={
                      tier.highlight
                        ? "mt-7 inline-flex h-11 w-full items-center justify-center rounded-full bg-ark-purple px-6 text-sm font-semibold text-white shadow-sm hover:bg-ark-purple-dark"
                        : "mt-7 inline-flex h-11 w-full items-center justify-center rounded-full border border-slate-200 bg-white px-6 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50"
                    }
                  >
                    {tier.cta}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 md:p-7 shadow-sm">
            <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <h2 className="text-lg font-semibold tracking-tight">
                  questions? want a studio tour?
                </h2>
                <p className="mt-2 text-sm text-slate-600">
                  Email us and we’ll help you pick the right class.
                </p>
              </div>
              <a
                href="mailto:arshia.x.kathpalia@gmail.com?subject=ARK%20Dance%20Studios%20Pricing%20Question"
                className="inline-flex h-11 items-center justify-center rounded-full border border-slate-200 bg-white px-6 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50"
              >
                contact
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
