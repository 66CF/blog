import { useTheme } from "../hooks/useTheme";
import FuzzyText from "../components/FuzzyText";

export default function NotFound() {
  const { theme } = useTheme();

  return (
    <div className="mt-20 flex justify-center">
      <FuzzyText
        baseIntensity={0.2}
        fontSize={150}
        color={theme.color}
      >
        404
      </FuzzyText>
    </div>
  );
}
