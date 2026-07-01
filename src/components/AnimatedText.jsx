import { useState, useEffect, useRef, useCallback, Children } from "react";

const CHARS = Object.freeze("#$01+-/*%^@!`~<>&".split(""));
const randomChar = () => CHARS[Math.floor(Math.random() * CHARS.length)];

const tags = {
  article: "article",
  div: "div",
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  li: "li",
  p: "p",
  section: "section",
  span: "span",
};

export default function AnimatedText({
  children,
  className = "",
  duration = 800,
  delay = 0,
  as: Tag = "div",
  startOnView = false,
  animateOnHover = true,
  characterSet = CHARS,
  ...rest
}) {
  const [scrambling, setScrambling] = useState(false);
  const [display, setDisplay] = useState(() =>
    typeof children === "string" ? children.split("") : []
  );
  const progressRef = useRef(0);
  const elRef = useRef(null);

  const startScramble = useCallback(() => {
    if (animateOnHover && !scrambling) {
      progressRef.current = 0;
      setScrambling(true);
    }
  }, [animateOnHover, scrambling]);

  useEffect(() => {
    if (!startOnView) {
      const timer = setTimeout(() => setScrambling(true), delay);
      return () => clearTimeout(timer);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setScrambling(true), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "-30% 0px -30% 0px" }
    );

    if (elRef.current) observer.observe(elRef.current);
    return () => observer.disconnect();
  }, [startOnView, delay]);

  useEffect(() => {
    if (!scrambling) return;

    const text = typeof children === "string" ? children : "";
    const totalChars = text.length;
    const start = performance.now();
    let frameId;

    function tick(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      progressRef.current = progress * totalChars;

      setDisplay((prev) =>
        prev.map((ch, i) => {
          if (ch === " ") return " ";
          return i <= progressRef.current
            ? text[i]
            : randomChar();
        })
      );

      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      } else {
        setScrambling(false);
      }
    }

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [scrambling, children, duration]);

  return (
    <Tag
      ref={elRef}
      className={`overflow-hidden text-4xl font-bold ${className}`}
      onMouseEnter={startScramble}
      {...rest}
    >
      {display.map((char, i) => (
        <span key={i}>{char}</span>
      ))}
    </Tag>
  );
}
