import React, { useEffect, useState } from "react";
import Image from "next/image";

const messages = [
  "Are you sure?",
  "Really sure??",
  "Ok fine, I will stop asking...",
  "Just kidding, say yes please! ❤️",
];

export default function Home() {
  const [changeSection, setChangeSection] = useState<number>(0);

  const handleChangeSection = (section: number) => {
    setChangeSection(section);
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen bg-[#FFC1CB] p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-beth-ellen)]">
      <main className="flex flex-col gap-8 row-start-2 items-center">
        {changeSection === 0 && <PrevSection onClick={handleChangeSection} />}
        {changeSection === 1 && <NextSection />}

        <LoveHeartCursor />
      </main>
    </div>
  );
}

const PrevSection = ({ onClick }: { onClick: (section: number) => void }) => {
  const [messageIndex, setMessageIndex] = useState(0);
  const [yesButtonSize, setYesButtonSize] = useState(1);
  const [noButtonText, setNoButtonText] = useState("No");
  const [windowWidth, setWindowWidth] = useState(0);
  const [showNoButton, setShowNoButton] = useState(true);

  useEffect(() => {
    const loadConfetti = async () => {
      await import("canvas-confetti");
    };
    loadConfetti();

    setWindowWidth(window.innerWidth);
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleNoClick = () => {
    const nextIndex = messageIndex + 1;
    if (nextIndex === messages.length - 1) {
      setNoButtonText(messages[nextIndex]);
      setMessageIndex(nextIndex);
      setTimeout(() => {
        setShowNoButton(false);
      }, 1500);
    } else {
      setMessageIndex(nextIndex);
      setNoButtonText(messages[nextIndex]);
    }
    setYesButtonSize((prev) => Math.min(prev * 1.5, 10));
  };

  const triggerConfetti = async () => {
    const confetti = (await import("canvas-confetti")).default;
    const colors = ["#bb0000", "#ffffff", "#FFC1CB"];
    const end = Date.now() + 3000; // 3 seconds

    const frame = () => {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();
  };

  const handleYesClick = async () => {
    await triggerConfetti();
    setTimeout(() => {
      onClick(1);
    }, 0);
  };

  const baseWidth = 150;
  const baseFont = 16;
  const maxWidth = windowWidth ? windowWidth * 0.9 : baseWidth;
  const calculatedWidth = Math.min(baseWidth * yesButtonSize, maxWidth);
  const calculatedFontSize = Math.min(baseFont * yesButtonSize, 96);

  return (
    <>
      <h1
        className={` text-[#FFFFFF] md:text-[80px] text-[40px] font-semibold text-center`}
      >
        Will you be my Valentine?
      </h1>
      <Image
        src="/GIF/first.gif"
        alt="Valentine gif"
        width={300}
        height={300}
        priority
      />

      <div className="flex items-center gap-4 flex-wrap justify-center">
        <button
          disabled={showNoButton}
          onClick={handleYesClick}
          className={`p-2 rounded-full bg-[#363132] text-white transition-all duration-300 disabled:opacity-50`}
          style={{
            width: `${calculatedWidth}px`,
            fontSize: `${calculatedFontSize}px`,
          }}
        >
          YES
        </button>
        {showNoButton && (
          <button
            onClick={handleNoClick}
            className="p-2 w-[150px] rounded-full bg-[#363132] text-white hover:opacity-90 transition-all duration-300 opacity-100"
          >
            {noButtonText}
          </button>
        )}
      </div>
    </>
  );
};

const NextSection = () => {
  return (
    <>
      <h1
        className={` text-[#FFFFFF] md:text-[80px] text-[40px] font-semibold text-center`}
      >
        I know you would say yes
      </h1>

      <Image
        src="/GIF/second.gif"
        alt="Valentine gif"
        width={300}
        height={300}
        priority
      />
    </>
  );
};

const LoveHeartCursor: React.FC = () => {
  const colours: string[] = ["#f00", "#f06", "#f0f", "#f6f", "#f39", "#f9c"];
  const minisize = 10;
  const maxisize = 20;
  const hearts = 100;
  const overOrUnder = "over";

  let x = 400,
    ox = 400,
    y = 300,
    oy = 300;
  let swide = 800,
    sleft = 0,
    sdown = 0;
  const herz: HTMLDivElement[] = [];
  const herzx: number[] = [];
  const herzy: (number | false)[] = [];
  const herzs: number[] = [];
  let kiss: NodeJS.Timeout | false = false;

  useEffect(() => {
    const mwah = () => {
      for (let i = 0; i < hearts; i++) {
        const heart = createDiv("auto", "auto");
        heart.style.visibility = "hidden";
        heart.style.zIndex = overOrUnder === "over" ? "1001" : "0";
        heart.style.color = colours[i % colours.length];
        heart.style.pointerEvents = "none";
        heart.style.opacity = "0.45";
        heart.textContent = String.fromCharCode(9829);
        document.body.appendChild(heart);
        herz[i] = heart;
        herzy[i] = false;
      }
      setScroll();
      setWidth();
      herzle();
    };

    const herzle = () => {
      if (Math.abs(x - ox) > 1 || Math.abs(y - oy) > 1) {
        ox = x;
        oy = y;
        for (let c = 0; c < hearts; c++) {
          if (herzy[c] === false) {
            herz[c].textContent = String.fromCharCode(9829);
            herz[c].style.left = `${(herzx[c] = x - minisize / 2)}px`;
            herz[c].style.top = `${(herzy[c] = y - minisize)}px`;
            herz[c].style.fontSize = `${minisize}px`;
            herz[c].style.fontWeight = "normal";
            herz[c].style.visibility = "visible";
            herzs[c] = minisize;
            break;
          }
        }
      }
      for (let c = 0; c < hearts; c++) {
        if (herzy[c] !== false) blowMeAKiss(c);
      }
      setTimeout(herzle, 30);
    };

    const pucker = () => {
      ox = -1;
      oy = -1;
      kiss = setTimeout(pucker, 100);
    };

    const blowMeAKiss = (i: number) => {
      if (herzy[i] === false) return;
      herzy[i] = (herzy[i] as number) - herzs[i] / minisize + (i % 2);
      herzx[i] += ((i % 5) - 2) / 5;
      if (
        (herzy[i] as number) < sdown - herzs[i] ||
        herzx[i] < sleft - herzs[i] ||
        herzx[i] > sleft + swide - herzs[i]
      ) {
        herz[i].style.visibility = "hidden";
        herzy[i] = false;
      } else if (herzs[i] > minisize + 1 && Math.random() < 2.5 / hearts) {
        breakMyHeart(i);
      } else {
        if (
          Math.random() < maxisize / (herzy[i] as number) &&
          herzs[i] < maxisize
        ) {
          herz[i].style.fontSize = `${++herzs[i]}px`;
        }
        herz[i].style.top = `${herzy[i]}px`;
        herz[i].style.left = `${herzx[i]}px`;
      }
    };

    const breakMyHeart = (i: number) => {
      herz[i].textContent = String.fromCharCode(9676);
      herz[i].style.fontWeight = "bold";
      herzy[i] = false;
      for (let t = herzs[i]; t <= maxisize; t++) {
        setTimeout(() => {
          herz[i].style.fontSize = `${t}px`;
        }, 60 * (t - herzs[i]));
      }
      setTimeout(() => {
        herz[i].style.visibility = "hidden";
      }, 60 * (maxisize - herzs[i]));
    };

    const mouse = (e: MouseEvent) => {
      x = e.pageX;
      y = e.pageY;
    };

    const setWidth = () => {
      let sw_min = 999999;
      let sh_min = 999999;
      if (document.documentElement && document.documentElement.clientWidth) {
        sw_min = document.documentElement.clientWidth;
        sh_min = document.documentElement.clientHeight;
      }
      if (typeof window.innerWidth === "number") {
        if (window.innerWidth < sw_min) sw_min = window.innerWidth;
        if (window.innerHeight < sh_min) sh_min = window.innerHeight;
      }
      swide = sw_min;
      // shigh = sh_min;
    };

    const setScroll = () => {
      if (typeof window.pageYOffset === "number") {
        sdown = window.pageYOffset;
        sleft = window.pageXOffset;
      } else if (
        document.body &&
        (document.body.scrollTop || document.body.scrollLeft)
      ) {
        sdown = document.body.scrollTop;
        sleft = document.body.scrollLeft;
      } else if (
        document.documentElement &&
        (document.documentElement.scrollTop ||
          document.documentElement.scrollLeft)
      ) {
        sleft = document.documentElement.scrollLeft;
        sdown = document.documentElement.scrollTop;
      } else {
        sdown = 0;
        sleft = 0;
      }
    };

    const createDiv = (height: string, width: string): HTMLDivElement => {
      const div = document.createElement("div");
      div.style.position = "absolute";
      div.style.height = height;
      div.style.width = width;
      div.style.overflow = "hidden";
      div.style.backgroundColor = "transparent";
      return div;
    };

    mwah();
    window.addEventListener("resize", setWidth);
    window.addEventListener("scroll", setScroll);
    document.addEventListener("mousemove", mouse);
    document.addEventListener("mousedown", pucker);
    document.addEventListener("mouseup", () => {
      if (kiss) clearTimeout(kiss);
    });

    return () => {
      window.removeEventListener("resize", setWidth);
      window.removeEventListener("scroll", setScroll);
      document.removeEventListener("mousemove", mouse);
      document.removeEventListener("mousedown", pucker);
      document.removeEventListener("mouseup", () => {
        if (kiss) clearTimeout(kiss);
      });
    };
  }, []);

  return null;
};
