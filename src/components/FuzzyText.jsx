import { useRef, useEffect, useState, useMemo } from "react";

export default function FuzzyText({
  children,
  fontSize = "clamp(2rem, 8vw, 8rem)",
  fontWeight = 900,
  fontFamily = "inherit",
  color = "#fff",
  enableHover = true,
  baseIntensity = 0.18,
  hoverIntensity = 0.5,
  fuzzRange = 30,
  fps = 60,
  direction = "horizontal",
  transitionDuration = 0,
  clickEffect = false,
  glitchMode = false,
  glitchInterval = 2000,
  glitchDuration = 200,
  gradient = null,
  letterSpacing = 0,
  className = "",
}) {
  const canvasRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    let cancelled = false;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const fontFam =
      fontFamily === "inherit"
        ? window.getComputedStyle(canvas).fontFamily || "sans-serif"
        : fontFamily;
    const fontSizeStr =
      typeof fontSize === "number" ? `${fontSize}px` : fontSize;
    const fontStr = `${fontWeight} ${fontSizeStr} ${fontFam}`;

    let fontSizePx;
    if (typeof fontSize === "number") {
      fontSizePx = fontSize;
    } else {
      const test = document.createElement("span");
      test.style.fontSize = fontSizeStr;
      document.body.appendChild(test);
      fontSizePx = parseFloat(window.getComputedStyle(test).fontSize);
      document.body.removeChild(test);
    }

    const text = String(children);
    const offCtx = document.createElement("canvas").getContext("2d");
    offCtx.font = fontStr;
    offCtx.textBaseline = "alphabetic";

    let totalWidth = 0;
    if (letterSpacing !== 0) {
      for (const ch of text) {
        totalWidth += offCtx.measureText(ch).width + letterSpacing;
      }
      totalWidth -= letterSpacing;
    } else {
      totalWidth = offCtx.measureText(text).width;
    }

    const metrics = offCtx.measureText(text);
    const left = metrics.actualBoundingBoxLeft ?? 0;
    const right =
      letterSpacing === 0
        ? (metrics.actualBoundingBoxRight ?? metrics.width)
        : totalWidth;
    const ascent = metrics.actualBoundingBoxAscent ?? fontSizePx;
    const descent = metrics.actualBoundingBoxDescent ?? fontSizePx * 0.2;
    const tWidth = Math.ceil(letterSpacing === 0 ? left + right : totalWidth);
    const tHeight = Math.ceil(ascent + descent);

    offCtx.canvas.width = tWidth + 10;
    offCtx.canvas.height = tHeight;
    offCtx.font = fontStr;
    offCtx.textBaseline = "alphabetic";

    if (gradient && Array.isArray(gradient) && gradient.length >= 2) {
      const grad = offCtx.createLinearGradient(0, 0, offCtx.canvas.width, 0);
      gradient.forEach((c, i) =>
        grad.addColorStop(i / (gradient.length - 1), c)
      );
      offCtx.fillStyle = grad;
    } else {
      offCtx.fillStyle = color;
    }

    if (letterSpacing !== 0) {
      let x = 5;
      for (const ch of text) {
        offCtx.fillText(ch, x - left, ascent);
        x += offCtx.measureText(ch).width + letterSpacing;
      }
    } else {
      offCtx.fillText(text, 5 - left, ascent);
    }

    const paddingX = fuzzRange + 20;
    const paddingY = direction === "vertical" || direction === "both" ? fuzzRange + 10 : 0;
    canvas.width = tWidth + paddingX * 2;
    canvas.height = tHeight + paddingY * 2;
    ctx.translate(paddingX, paddingY);

    const canvasLeft = paddingX;
    const canvasTop = paddingY;
    const canvasRight = canvasLeft + tWidth;
    const canvasBottom = canvasTop + tHeight;
    let isHovering = false;
    let isGlitching = false;

    const interval = 1000 / fps;
    let lastTime = 0;
    let animationId;
    let glitchTimeout;
    let glitchEndTimeout;

    function startGlitch() {
      if (cancelled || !glitchMode) return;
      isGlitching = true;
      glitchEndTimeout = setTimeout(() => {
        isGlitching = false;
        glitchTimeout = setTimeout(startGlitch, glitchInterval);
      }, glitchDuration);
    }

    if (glitchMode) {
      glitchTimeout = setTimeout(startGlitch, glitchInterval);
    }

    let currentIntensity = baseIntensity;

    function isInside(x, y) {
      return x >= canvasLeft && x <= canvasRight && y >= canvasTop && y <= canvasBottom;
    }

    function onMouseMove(e) {
      if (!enableHover) return;
      const rect = canvas.getBoundingClientRect();
      isHovering = isInside(e.clientX - rect.left, e.clientY - rect.top);
    }

    function onMouseLeave() {
      isHovering = false;
    }

    function onClick() {
      if (clickEffect) {
        isHovering = true;
        clearTimeout(glitchEndTimeout);
        setTimeout(() => {
          isHovering = false;
        }, 150);
      }
    }

    function onTouchMove(e) {
      if (!enableHover) return;
      e.preventDefault();
      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];
      isHovering = isInside(touch.clientX - rect.left, touch.clientY - rect.top);
    }

    function onTouchEnd() {
      isHovering = false;
    }

    if (enableHover) {
      canvas.addEventListener("mousemove", onMouseMove);
      canvas.addEventListener("mouseleave", onMouseLeave);
      canvas.addEventListener("touchmove", onTouchMove, { passive: false });
      canvas.addEventListener("touchend", onTouchEnd);
    }
    if (clickEffect) {
      canvas.addEventListener("click", onClick);
    }

    function render(timestamp) {
      if (cancelled) return;

      if (timestamp - lastTime < interval) {
        animationId = requestAnimationFrame(render);
        return;
      }
      lastTime = timestamp;

      ctx.clearRect(
        -fuzzRange - 20,
        -fuzzRange - 10,
        canvas.width + 2 * (fuzzRange + 20),
        canvas.height + 2 * (fuzzRange + 10)
      );

      const targetIntensity = isHovering || isGlitching
        ? hoverIntensity
        : baseIntensity;

      if (transitionDuration > 0) {
        const step = 1 / (transitionDuration / interval);
        if (currentIntensity < targetIntensity)
          currentIntensity = Math.min(currentIntensity + step, targetIntensity);
        else if (currentIntensity > targetIntensity)
          currentIntensity = Math.max(currentIntensity - step, targetIntensity);
      } else {
        currentIntensity = targetIntensity;
      }

      for (let row = 0; row < tHeight; row++) {
        let offsetX = 0;
        let offsetY = 0;
        if (direction === "horizontal" || direction === "both") {
          offsetX = Math.floor(currentIntensity * (Math.random() - 0.5) * fuzzRange);
        }
        if (direction === "vertical" || direction === "both") {
          offsetY = Math.floor(currentIntensity * (Math.random() - 0.5) * fuzzRange * 0.5);
        }
        ctx.drawImage(offCtx.canvas, 0, row, tWidth, 1, offsetX, row + offsetY, tWidth, 1);
      }

      animationId = requestAnimationFrame(render);
    }

    animationId = requestAnimationFrame(render);

    return () => {
      cancelled = true;
      cancelAnimationFrame(animationId);
      clearTimeout(glitchTimeout);
      clearTimeout(glitchEndTimeout);
      if (enableHover) {
        canvas.removeEventListener("mousemove", onMouseMove);
        canvas.removeEventListener("mouseleave", onMouseLeave);
        canvas.removeEventListener("touchmove", onTouchMove);
        canvas.removeEventListener("touchend", onTouchEnd);
      }
      if (clickEffect) {
        canvas.removeEventListener("click", onClick);
      }
    };
  }, [mounted]);

  return <canvas ref={canvasRef} className={className} />;
}
