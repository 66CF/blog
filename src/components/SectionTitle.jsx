import AnimatedText from "./AnimatedText";
import { useTheme } from "../hooks/useTheme";

export default function SectionTitle({ children, className = "" }) {
  const { theme } = useTheme();

  return (
    <AnimatedText
      as="h2"
      className={`text-2xl font-bold text-accent ${className}`}
      animateOnHover={false}
      startOnView={false}
      key={theme.name}
    >
      {children}
    </AnimatedText>
  );
}
