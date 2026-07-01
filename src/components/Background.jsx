import useWebGL from "../hooks/useWebGL";
import { backgroundConfig } from "../data/config";

export default function Background({ className = "", tint } = {}) {
  const config = {
    ...backgroundConfig,
    ...(tint ? { tint } : {}),
  };

  const canvasRef = useWebGL(config);

  return (
    <div className={`fixed inset-0 z-0 overflow-hidden ${className}`}>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
}
