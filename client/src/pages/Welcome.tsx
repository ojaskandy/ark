import { useMemo, useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";

type ReelItem =
  | {
      id: string;
      kind: "image";
      src: string;
      alt: string;
      label?: string;
    }
  | {
      id: string;
      kind: "video";
      src: string;
      poster?: string;
      label?: string;
    };

const REEL_ITEMS: ReelItem[] = [
  {
    id: "studio-1",
    kind: "image",
    src: "/images/dance-studio.jpg",
    alt: "ARK Dance Studios — studio space",
  },
  {
    id: "clip-1",
    kind: "video",
    src: "/videos/ark_test.mov",
    poster: "/images/dance-studio.jpg",
  },
  {
    id: "studio-2",
    kind: "image",
    src: "/images/dance-studio.png",
    alt: "ARK Dance Studios — mirrors and floor",
  },
  {
    id: "clip-2",
    kind: "video",
    src: "/videos/reel/ark-dance-01.mp4",
    poster: "/images/dance-studio.jpg",
  },
  {
    id: "clip-3",
    kind: "video",
    src: "/videos/reel/ark-dance-02.mp4",
    poster: "/images/dance-studio.jpg",
  },
];

export default function Welcome() {
  const [, navigate] = useLocation();
  const [showLogin, setShowLogin] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [failedMedia, setFailedMedia] = useState<Record<string, true>>({});

  const markFailed = (id: string) => {
    setFailedMedia((prev) => (prev[id] ? prev : { ...prev, [id]: true }));
  };

  const reelItems = useMemo(() => {
    const usable = REEL_ITEMS.filter((it) => !failedMedia[it.id]);
    const base = usable.length ? usable : REEL_ITEMS;
    return [...base, ...base];
  }, [failedMedia]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          username: "student",
          password: password.toLowerCase().trim(),
        }),
      });

      if (response.ok) {
        window.location.href = "/app";
      } else {
        setError("incorrect password");
      }
    } catch {
      setError("login failed");
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 overflow-x-hidden">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-40 sticky top-0 border-b border-slate-200/50 bg-white/60 backdrop-blur-sm"
      >
        <div className="mx-auto max-w-6xl px-6 md:px-10 py-4 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="flex items-center"
          >
            <img
              src="/images/ark_logo.png"
              alt="ARK Dance Studios"
              className="h-16 w-auto"
            />
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => navigate("/registration")}
              className="hidden sm:inline-flex h-10 items-center rounded-full border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50"
            >
              Book a Free Trial
            </button>

            <button
              type="button"
              onClick={() => navigate("/live-routine")}
              className="inline-flex h-10 items-center rounded-full bg-purple-600 px-4 text-sm font-semibold text-white shadow-sm hover:bg-purple-700"
            >
              Start Now
            </button>

            <button
              type="button"
              onClick={() => setShowLogin(true)}
              className="inline-flex h-10 items-center rounded-full border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50"
            >
              Student Portal
            </button>
          </div>
        </div>
      </motion.header>

      {/* Main content with curved rectangle card */}
      <main className="relative z-10">
        <section className="flex items-center justify-center px-6 md:px-10 py-20">
          {/* Curved rectangle card with video background - expanded */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-full max-w-7xl h-[85vh] max-h-[900px] rounded-[3rem] overflow-hidden shadow-2xl border border-slate-200/50"
          >
            {/* Video background */}
            <video
              className="absolute inset-0 w-full h-full object-cover"
              src="/videos/ark_studio_bg.mov"
              poster="/images/ark-studio-bg.png"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
            />
            
            {/* Overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40" />
            
            {/* Content with white background for ARK Dance Studios */}
            <div className="relative z-10 h-full flex flex-col items-center justify-center p-12 md:p-16">
              <div className="bg-white/95 backdrop-blur-sm rounded-3xl px-10 md:px-16 py-8 md:py-12 shadow-2xl border border-white/50">
                <h1 className="text-5xl md:text-7xl font-semibold text-slate-900 mb-4 leading-tight text-center">
                  ARK Dance Studios
                </h1>
                <p className="text-xl md:text-2xl text-slate-700 text-center">
                  Indian Classical Dance
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Tagline between curved rectangle and reel */}
        <section className="px-6 md:px-10 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <p className="text-2xl md:text-3xl font-semibold text-slate-900">
              The Leading AI Dance Studio — 100x with Cutting Edge Tech
            </p>
          </motion.div>
        </section>

        {/* Horizontal scrolling reel */}
        <section className="px-6 md:px-10 pb-16">
          <div className="max-w-7xl mx-auto">
            <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
              <div className="group">
                <div
                  className="flex w-max gap-4 px-6 py-6 animate-scroll-right motion-reduce:animate-none group-hover:[animation-play-state:paused]"
                  style={{ animationDuration: "55s" }}
                >
                  {reelItems.map((item, idx) => (
                    <div
                      key={`${item.id}-${idx}`}
                      className="relative w-[280px] sm:w-[320px] md:w-[380px] aspect-[4/3] rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 shadow-sm"
                    >
                      {item.kind === "image" ? (
                        <img
                          src={item.src}
                          alt={item.alt}
                          className="absolute inset-0 h-full w-full object-cover"
                          loading="lazy"
                          onError={() => markFailed(item.id)}
                        />
                      ) : (
                        <video
                          className="absolute inset-0 h-full w-full object-cover"
                          src={item.src}
                          poster={item.poster}
                          muted
                          autoPlay
                          loop
                          playsInline
                          preload="metadata"
                          onError={() => markFailed(item.id)}
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Meet Arshia Section */}
        <section className="px-6 md:px-10 py-20 bg-gradient-to-b from-white to-slate-50">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="grid md:grid-cols-2 gap-8 md:gap-12 items-center"
            >
              <div>
                <h2 className="text-4xl md:text-5xl font-semibold text-slate-900 mb-6">
                  Meet Arshia
                </h2>
                <div className="space-y-4 text-lg text-slate-700 leading-relaxed">
                  <p>
                    Hey! I'm Arshia, and I've been dancing since I could walk. 
                    Indian classical dance isn't just movement to me — it's storytelling, 
                    culture, and pure expression.
                  </p>
                  <p>
                    After competing and performing for years, I realized something: 
                    traditional dance training is amazing, but what if we could make it 
                    even better? What if you could practice at 3am and still get real-time 
                    feedback on your form?
                  </p>
                  <p>
                    That's why I built ARK Dance Studios. We combine the beauty of 
                    Indian classical dance with cutting-edge AI tech that helps you 
                    perfect every move, anytime, anywhere.
                  </p>
                  <p className="font-medium text-slate-900">
                    Whether you're just starting or you've been dancing for years, 
                    I'm here to help you find your flow. Let's dance! ✨
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
                  <img
                    src="/src/assets/arshia.png"
                    alt="Arshia Kathpalia"
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Login Modal */}
      {showLogin && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-slate-900/30 backdrop-blur flex items-center justify-center z-50 p-4"
          onClick={() => {
            setShowLogin(false);
            setPassword("");
            setError("");
          }}
        >
          <motion.div
            initial={{ scale: 0.98, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.98, opacity: 0 }}
            transition={{ type: "spring", duration: 0.45 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white border border-slate-200 rounded-3xl p-7 max-w-md w-full shadow-xl"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold tracking-tight">
                Student Portal
              </h2>
              <button
                type="button"
                onClick={() => {
                  setShowLogin(false);
                  setPassword("");
                  setError("");
                }}
                className="text-slate-500 hover:text-slate-800 transition-colors"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm text-slate-600 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-slate-200 text-slate-900 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-colors"
                  placeholder="Enter password"
                  autoFocus
                />
              </div>

              {error && <p className="text-sm text-slate-600">{error}</p>}

              <button
                type="submit"
                className="w-full py-3 bg-purple-600 text-white rounded-2xl font-semibold hover:bg-purple-700 transition-colors"
              >
                Log In
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
