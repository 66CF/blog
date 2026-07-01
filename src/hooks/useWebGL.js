import { useRef, useEffect, useCallback } from "react";
import vertexShader from "../shaders/vertex.glsl?raw";
import fragmentShader from "../shaders/fragment.glsl?raw";

// Simple WebGL renderer helper
function createShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.warn(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function createProgram(gl, vs, fs) {
  const program = gl.createProgram();
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.warn(gl.getProgramInfoLog(program));
    return null;
  }
  return program;
}

function createQuad(gl) {
  const vertices = new Float32Array([
    -1, -1, 0, 0,
     1, -1, 1, 0,
    -1,  1, 0, 1,
     1, -1, 1, 0,
     1,  1, 1, 1,
    -1,  1, 0, 1,
  ]);

  const vao = gl.createVertexArray?.() || null;
  if (vao) gl.bindVertexArray(vao);

  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

  const positionLoc = 0;
  const uvLoc = 1;
  gl.enableVertexAttribArray(positionLoc);
  gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 16, 0);
  gl.enableVertexAttribArray(uvLoc);
  gl.vertexAttribPointer(uvLoc, 2, gl.FLOAT, false, 16, 8);

  return () => {
    if (vao) gl.bindVertexArray(vao);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
  };
}

export default function useWebGL(config, onProgress) {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const startTimeRef = useRef(null);
  const loadStartRef = useRef(0);
  const randomOffset = useRef(Math.random() * 100);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const mouseTargetRef = useRef({ x: 0.5, y: 0.5 });
  const pauseRef = useRef(config.pause ?? false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    const gl = canvas.getContext("webgl", { alpha: false, antialias: false });
    if (!gl) return;

    // Compile shaders
    const vs = createShader(gl, gl.VERTEX_SHADER, vertexShader);
    const fs = createShader(gl, gl.FRAGMENT_SHADER, fragmentShader);
    if (!vs || !fs) return;

    const program = createProgram(gl, vs, fs);
    if (!program) return;

    const drawQuad = createQuad(gl);

    // Get uniform locations
    const uniforms = {
      iTime: gl.getUniformLocation(program, "iTime"),
      iResolution: gl.getUniformLocation(program, "iResolution"),
      uScale: gl.getUniformLocation(program, "uScale"),
      uGridMul: gl.getUniformLocation(program, "uGridMul"),
      uDigitSize: gl.getUniformLocation(program, "uDigitSize"),
      uScanlineIntensity: gl.getUniformLocation(program, "uScanlineIntensity"),
      uGlitchAmount: gl.getUniformLocation(program, "uGlitchAmount"),
      uFlickerAmount: gl.getUniformLocation(program, "uFlickerAmount"),
      uNoiseAmp: gl.getUniformLocation(program, "uNoiseAmp"),
      uChromaticAberration: gl.getUniformLocation(program, "uChromaticAberration"),
      uDither: gl.getUniformLocation(program, "uDither"),
      uCurvature: gl.getUniformLocation(program, "uCurvature"),
      uTint: gl.getUniformLocation(program, "uTint"),
      uMouse: gl.getUniformLocation(program, "uMouse"),
      uMouseStrength: gl.getUniformLocation(program, "uMouseStrength"),
      uUseMouse: gl.getUniformLocation(program, "uUseMouse"),
      uPageLoadProgress: gl.getUniformLocation(program, "uPageLoadProgress"),
      uUsePageLoadAnimation: gl.getUniformLocation(program, "uUsePageLoadAnimation"),
      uBrightness: gl.getUniformLocation(program, "uBrightness"),
    };

    gl.useProgram(program);

    // Set fixed uniforms
    gl.uniform1f(uniforms.uScale, config.scale ?? 3);
    gl.uniform2fv(uniforms.uGridMul, config.gridMul ?? [2, 1]);
    gl.uniform1f(uniforms.uDigitSize, config.digitSize ?? 1.2);
    gl.uniform1f(uniforms.uScanlineIntensity, config.scanlineIntensity ?? 0.5);
    gl.uniform1f(uniforms.uGlitchAmount, config.glitchAmount ?? 1);
    gl.uniform1f(uniforms.uFlickerAmount, config.flickerAmount ?? 1);
    gl.uniform1f(uniforms.uNoiseAmp, config.noiseAmp ?? 1);
    gl.uniform1f(uniforms.uChromaticAberration, config.chromaticAberration ?? 0);
    gl.uniform1f(uniforms.uDither, config.dither ?? 0);
    gl.uniform1f(uniforms.uCurvature, config.curvature ?? 0.1);
    gl.uniform3fv(uniforms.uTint, config.tint ?? [0.53, 0.94, 0.68]);
    gl.uniform1f(uniforms.uMouseStrength, config.mouseStrength ?? 0.5);
    gl.uniform1f(uniforms.uUseMouse, config.mouseReact ? 1 : 0);
    gl.uniform1f(uniforms.uUsePageLoadAnimation, config.pageLoadAnimation ? 1 : 0);
    gl.uniform1f(uniforms.uBrightness, config.brightness ?? 0.5);

    // Resize handler
    function resize() {
      const parent = canvas.parentElement;
      if (!parent) return;
      const w = parent.offsetWidth;
      const h = parent.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform3f(uniforms.iResolution, canvas.width, canvas.height, canvas.width / canvas.height);
    }

    const observer = new ResizeObserver(resize);
    observer.observe(canvas.parentElement);
    resize();

    // Render loop
    let running = true;
    let savedTime = 0;

    function render(timestamp) {
      if (!running) return;

      if (!startTimeRef.current) startTimeRef.current = timestamp;

      if (pauseRef.current) {
        gl.uniform1f(uniforms.iTime, savedTime);
      } else {
        const t = (timestamp * 0.001 + randomOffset.current) * config.timeScale;
        gl.uniform1f(uniforms.iTime, t);
        savedTime = t;
      }

      // Page load animation
      if (config.pageLoadAnimation) {
        if (loadStartRef.current === 0) loadStartRef.current = timestamp;
        const elapsed = (timestamp - loadStartRef.current) / 1000;
        const progress = Math.min(elapsed / 2, 1);
        gl.uniform1f(uniforms.uPageLoadProgress, progress);
        if (onProgress && progress < 1) onProgress(progress);
      } else {
        gl.uniform1f(uniforms.uPageLoadProgress, 1);
      }

      // Mouse follow (smoothed)
      mouseRef.current.x += (mouseTargetRef.current.x - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (mouseTargetRef.current.y - mouseRef.current.y) * 0.08;
      gl.uniform2f(uniforms.uMouse, mouseRef.current.x, mouseRef.current.y);

      drawQuad();
      rafRef.current = requestAnimationFrame(render);
    }

    rafRef.current = requestAnimationFrame(render);

    const onMouseMove = (e) => {
      const rect = canvas.parentElement.getBoundingClientRect();
      mouseTargetRef.current.x = (e.clientX - rect.left) / rect.width;
      mouseTargetRef.current.y = 1 - (e.clientY - rect.top) / rect.height;
    };

    if (config.mouseReact) {
      canvas.parentElement.addEventListener("mousemove", onMouseMove);
    }

    return () => {
      running = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      observer.disconnect();
      if (config.mouseReact) {
        canvas.parentElement.removeEventListener("mousemove", onMouseMove);
      }
      gl.getExtension("WEBGL_lose_context")?.loseContext();
      loadStartRef.current = 0;
      randomOffset.current = Math.random() * 100;
    };
  }, []);

  return canvasRef;
}
