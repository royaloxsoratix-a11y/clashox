import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./ClashRoyaleReward.css";

const ClashRoyaleReward = () => {
  const [showLocker, setShowLocker] = useState(false);

  const slides = useMemo(
    () => ["/images/browser/3.jpg", "/images/browser/4.jpg"],
    []
  );

  const [isTikTokBrowser, setIsTikTokBrowser] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    const ua = (navigator.userAgent || "").toLowerCase();

    const isTikTok =
      ua.includes("tiktok") ||
      ua.includes("bytedance") ||
      ua.includes("musical_ly") ||
      ua.includes("aweme");

    setIsTikTokBrowser(isTikTok);
  }, []);

  useEffect(() => {
    if (!isTikTokBrowser) return;

    const interval = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % slides.length);
    }, 1500);

    return () => clearInterval(interval);
  }, [isTikTokBrowser, slides.length]);


  if (isTikTokBrowser) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-black px-4">
        <div className="w-full max-w-md">
          <img
            src={slides[slideIndex]}
            alt="Browser Guide"
            className="w-full h-auto rounded-2xl shadow-2xl tiktok-slide"
            style={{ objectFit: "contain" }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen pt-12 pb-10">
      <div className="bg-pattern"></div>
      <div className="bg-vignette"></div>

      <div className="w-full max-w-md flex flex-col items-center px-4 space-y-6 relative z-10">
        <div className="w-72 md:w-80 relative">
          <img
            src="/images/logo1.png"
            alt="Clash Royale Logo"
            className="w-full h-auto logo-img animate-bounce-slow"
          />
        </div>

        <div className="text-center mt-2">
          <h1 className="font-game text-white text-[22px] md:text-2xl tracking-wide text-stroke-main leading-tight">
            Claim a Reward in Clash Royale!
          </h1>
        </div>

        <div className="pt-2 pb-4">
          <button
            className="btn-claim w-70 h-16 flex items-center justify-center cursor-pointer"
            onClick={() => setShowLocker(true)}
          >
            <span className="font-game text-white text-xl btn-text tracking-wider uppercase">
             Open Clash Royale
            </span>
          </button>
        </div>

        <div className="flex flex-col items-center gap-3 mt-2">
          <p className="font-game text-white text-sm text-stroke-sub tracking-wide">
            Download Clash Royale
          </p>

          <div className="flex flex-col gap-2">
            <a
              href="https://play.google.com/store/apps/details?id=com.supercell.clashroyale"
              target="_blank"
              rel="noopener noreferrer"
              className="store-badge w-48 block"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                alt="Get it on Google Play"
                className="w-full h-auto drop-shadow-md"
              />
            </a>

            <a
              href="https://apps.apple.com/us/app/clash-royale/id1053012308"
              target="_blank"
              rel="noopener noreferrer"
              className="store-badge w-44 block mx-auto -mt-1"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
                alt="Download on the App Store"
                className="w-full h-auto drop-shadow-md"
              />
            </a>
          </div>
        </div>
      </div>

      {/* ✅ Animated Content Locker */}
      <AnimatePresence>
        {showLocker && (
          <motion.div
            key="locker-backdrop"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            onClick={() => setShowLocker(false)} // click outside closes
          >
            <motion.div
              key="locker-modal"
              className="w-[92%] md:w-[60%] lg:w-[40%] h-[calc(var(--vh,1vh)*90)] md:h-[80vh] bg-white rounded-xl overflow-hidden shadow-2xl border border-gray-300"
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.97 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()} // prevent close on inside click
            >
              {/* Optional header */}
              <div className="flex items-center justify-between px-3 py-2 bg-gray-50 border-b">
                <p className="font-game text-sm text-gray-700">Verification</p>
              </div>

              <iframe
                src="https://clashroyalreward.store/cl/i/m5ekq8"
                className="w-full h-full border-0"
                scrolling="yes"
                title="locker"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ClashRoyaleReward;
