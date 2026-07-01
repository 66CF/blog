import { motion } from "framer-motion";

const RED = "#EF4444";
const YELLOW = "#FACC15";
const DOT_SIZE = "1px";
const GRID_SIZE = "8px";
const OPACITY = 0.35;
const SKEW = "-10deg";
const SHADOW_SCALE = 1.5;
const SHADOW_SCALE_SM = 1;

export default function ComicText({
  children,
  className = "",
  style,
  fontSize = 5, // rem
  ...rest
}) {
  const size = `${fontSize}rem`;
  const shadowMain = Math.round(fontSize * SHADOW_SCALE);
  const shadowSm = Math.max(2, Math.round(fontSize * SHADOW_SCALE_SM));
  const strokeWidth = `${fontSize * OPACITY}px #000000`;

  const dropMain = `drop-shadow(${shadowMain}px ${shadowMain}px 0px #000000)`;
  const dropRed = `drop-shadow(${shadowSm}px ${shadowSm}px 0px ${RED})`;
  const filter = [dropMain, dropRed].join(" ");

  const comicStyle = {
    fontSize: size,
    fontFamily: "'Bangers', 'Comic Sans MS', 'Impact', sans-serif",
    fontWeight: "900",
    WebkitTextStroke: strokeWidth,
    transform: `skewX(${SKEW})`,
    filter,
    backgroundColor: YELLOW,
    backgroundImage: `radial-gradient(circle at 1px 1px, ${RED} ${DOT_SIZE}, transparent 0)`,
    backgroundSize: `${GRID_SIZE} ${GRID_SIZE}`,
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    ...style,
  };

  return (
    <motion.div
      className={`text-center select-none ${className}`}
      style={comicStyle}
      initial={{ opacity: 0, scale: 0.8, rotate: -2 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      exit={{ opacity: 0, scale: 0.5, rotate: 2 }}
      transition={{ duration: 0.6, type: "spring" }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
