import { useMemo, useState, useRef, useEffect } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import arshiaImage from "../assets/arshia.png";

// Video component that plays when near center
function ReelVideo({ 
  src, 
  poster, 
  onError 
}: { 
  src: string; 
  poster?: string; 
  onError: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldPlay, setShouldPlay] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Play when video is 40% visible (near center)
          if (entry.isIntersecting && entry.intersectionRatio > 0.4) {
            setShouldPlay(true);
            video.play().catch(() => {
              // Ignore autoplay errors
            });
          } else {
            setShouldPlay(false);
            video.pause();
          }
        });
      },
      {
        threshold: [0, 0.4, 0.6, 1],
        rootMargin: "0px",
      }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <video
      ref={videoRef}
      className="absolute inset-0 h-full w-full object-cover"
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="metadata"
      onError={onError}
    />
  );
}

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
    id: "asset-1",
    kind: "video",
    src: "/videos/ark_asset1.mov",
  },
  {
    id: "asset-2",
    kind: "video",
    src: "/videos/ark_asset2.mov",
  },
  {
    id: "asset-3",
    kind: "video",
    src: "/videos/ark_asset3.mov",
  },
  {
    id: "asset-4",
    kind: "video",
    src: "/videos/ark_asset4.mov",
  },
];

export default function Welcome() {
  const [, navigate] = useLocation();
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [failedMedia, setFailedMedia] = useState<Record<string, true>>({});
  
  // Signup form state
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPhone, setSignupPhone] = useState("");
  const [signupMessage, setSignupMessage] = useState("");
  const [signupStatus, setSignupStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [signupError, setSignupError] = useState("");
  
  const signupDropdownRef = useRef<HTMLDivElement>(null);

  const markFailed = (id: string) => {
    setFailedMedia((prev) => (prev[id] ? prev : { ...prev, [id]: true }));
  };

  const reelItems = useMemo(() => {
    const usable = REEL_ITEMS.filter((it) => !failedMedia[it.id]);
    const base = usable.length ? usable : REEL_ITEMS;
    return [...base, ...base];
  }, [failedMedia]);

  // Close signup dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (signupDropdownRef.current && !signupDropdownRef.current.contains(event.target as Node)) {
        setShowSignup(false);
      }
    };

    if (showSignup) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSignup]);

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

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setSignupError("");
    setSignupStatus("loading");

    if (!signupName.trim() || !signupEmail.trim()) {
      setSignupError("Name and email are required");
      setSignupStatus("error");
      return;
    }

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: signupName.trim(),
          email: signupEmail.trim(),
          phone: signupPhone.trim() || undefined,
          message: signupMessage.trim() || undefined,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSignupStatus("success");
        setSignupName("");
        setSignupEmail("");
        setSignupPhone("");
        setSignupMessage("");
        setTimeout(() => {
          setShowSignup(false);
          setSignupStatus("idle");
        }, 2000);
      } else {
        setSignupError(data.message || "Something went wrong. Please try again.");
        setSignupStatus("error");
      }
    } catch (err) {
      setSignupError("Failed to submit. Please try again.");
      setSignupStatus("error");
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

          <div className="flex items-center gap-2 relative" ref={signupDropdownRef}>
            <button
              type="button"
              onClick={() => setShowSignup(!showSignup)}
              className="inline-flex h-10 items-center rounded-full bg-purple-600 px-4 text-sm font-semibold text-white shadow-sm hover:bg-purple-700 transition-colors"
            >
              Start Now
            </button>

            {/* Signup Dropdown */}
            <AnimatePresence>
              {showSignup && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full right-0 mt-2 w-80 bg-white border border-slate-200 rounded-2xl shadow-xl p-6 z-50"
                >
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">
                    Get Started
                  </h3>
                  <form onSubmit={handleSignup} className="space-y-4">
                    <div>
                      <label className="block text-sm text-slate-600 mb-1.5">
                        Name *
                      </label>
                      <input
                        type="text"
                        value={signupName}
                        onChange={(e) => setSignupName(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-slate-200 text-slate-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-colors text-sm"
                        placeholder="Your name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-slate-600 mb-1.5">
                        Email *
                      </label>
                      <input
                        type="email"
                        value={signupEmail}
                        onChange={(e) => setSignupEmail(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-slate-200 text-slate-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-colors text-sm"
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-slate-600 mb-1.5">
                        Phone (optional)
                      </label>
                      <input
                        type="tel"
                        value={signupPhone}
                        onChange={(e) => setSignupPhone(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-slate-200 text-slate-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-colors text-sm"
                        placeholder="(555) 123-4567"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-slate-600 mb-1.5">
                        Message (optional)
                      </label>
                      <textarea
                        value={signupMessage}
                        onChange={(e) => setSignupMessage(e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 bg-white border border-slate-200 text-slate-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-colors text-sm resize-none"
                        placeholder="Tell us about your dance goals..."
                      />
                    </div>
                    {signupError && (
                      <p className="text-sm text-red-600">{signupError}</p>
                    )}
                    {signupStatus === "success" && (
                      <p className="text-sm text-green-600">
                        Thank you! We'll be in touch soon.
                      </p>
                    )}
                    <button
                      type="submit"
                      disabled={signupStatus === "loading"}
                      className="w-full py-2.5 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                    >
                      {signupStatus === "loading" ? "Submitting..." : "Submit"}
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>

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
        <section className="flex items-center justify-center px-6 md:px-10 py-12 md:py-14">
          {/* Curved rectangle card with video background - 1.2x spacing */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-full max-w-7xl h-[72vh] max-h-[780px] rounded-[3rem] overflow-hidden shadow-2xl border border-slate-200/50"
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
            <div className="relative z-10 h-full flex flex-col items-center justify-center p-10 md:p-14">
              <div className="bg-white/95 backdrop-blur-sm rounded-3xl px-10 md:px-14 py-7 md:py-10 shadow-2xl border border-white/50">
                <h1 className="text-5xl md:text-7xl font-semibold mb-4 leading-tight text-center bg-gradient-to-b from-amber-600 via-yellow-600 to-amber-700 bg-clip-text text-transparent drop-shadow-lg">
                  ARK Dance Studios
                </h1>
                <p className="text-xl md:text-2xl text-slate-700 text-center mb-3">
                  Indian Classical Dance
                </p>
                <p className="text-sm md:text-base text-amber-700/90 text-center font-medium">
                  Miss Teen India USA • International Indian Icon Season 8th Winner • 14 years of experience
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Tagline and Horizontal scrolling reel - visible together */}
        <section className="px-6 md:px-10 -mt-7 pb-14">
          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center mb-7"
          >
            <p className="text-2xl md:text-3xl font-semibold text-slate-900">
              The Leading AI Dance Studio — 100x with Cutting Edge Tech
            </p>
          </motion.div>

          {/* Horizontal scrolling reel */}
          <div className="max-w-7xl mx-auto">
            <div className="relative overflow-hidden rounded-3xl border border-slate-200/60 bg-white shadow-lg [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
              <div className="group">
                <div
                  className="flex w-max gap-5 px-6 py-6 animate-scroll-right motion-reduce:animate-none group-hover:[animation-play-state:paused]"
                  style={{ animationDuration: "60s" }}
                >
                  {reelItems.map((item, idx) => (
                    <div
                      key={`${item.id}-${idx}`}
                      className="relative w-[300px] sm:w-[360px] md:w-[420px] aspect-[4/3] rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 shadow-md hover:shadow-lg transition-shadow"
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
                        <ReelVideo
                          src={item.src}
                          poster={item.poster}
                          onError={() => markFailed(item.id)}
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
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
                    src={arshiaImage}
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
