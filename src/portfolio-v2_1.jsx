import certImg1 from "./Src/ML_Cousera.png";
import certImg2 from "./Src/AI_Google.png";
import certImg3 from "./Src/AI_IBM.png";
import certImg4 from "./Src/Python_DS.png";
import certImg5 from "./Src/Flutter_Capstone.png";
import certImg6 from "./Src/ML_Internship.png";
import certImg7 from "./Src/Venura_Intern.png";
import certImg8 from "./Src/elevate.png";
import { useState, useEffect, useRef, useCallback } from "react";

// Credly Icons
import awsIcon from "./Src/aws.png";
import courseraIcon from "./Src/cousera.png";
import skillfestIcon from "./Src/skillfest.png";
import aiFunIcon from "./Src/ai_fun.png";
import mlMethIcon from "./Src/ml_meth.png";
import dataScIcon from "./Src/data_sc.png";
import googAiIcon from "./Src/goog_ai.png";
import webDeIcon from "./Src/web_de.png";
import dataAnaIcon from "./Src/data_ana.png";




const ANIM_CONFIG = {
  colors: { cyan: "#06b6d4", purple: "#8b5cf6", emerald: "#10b981", amber: "#f59e0b", bg: "#03040f" },
  spring: { tension: 0.15, friction: 0.8 },
};

const CANVAS_UTILS = {
  noise2D: (x, y) => (Math.sin(x * 12.9898 + y * 78.233) * 43758.5453) % 1,
  lerp: (start, end, amt) => (1 - amt) * start + amt * end,
  distance: (x1, y1, x2, y2) => Math.hypot(x2 - x1, y2 - y1)
};

function useAnimationFrame(callback) {
  const requestRef = useRef();
  const previousTimeRef = useRef();

  const animate = useCallback((time) => {
    if (previousTimeRef.current != undefined) {
      const deltaTime = time - previousTimeRef.current;
      callback(deltaTime, time);
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  }, [callback]);

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [animate]);
}

function useIntersectionAnimation(options = { threshold: 0.2 }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setInView(true);
        obs.unobserve(el);
      }
    }, options);
    obs.observe(el);
    return () => obs.disconnect();
  }, [options]);

  return [ref, inView];
}

/* ═══════════════════════════════════════════════════════════
   GLOBAL CSS
═══════════════════════════════════════════════════════════ */
const GLOBAL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=JetBrains+Mono:wght@300;400;500&family=Outfit:wght@300;400;500;600&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
.scramble-hover:hover { text-shadow: 2px 0 0 rgba(255,0,0,0.6), -2px 0 0 rgba(0,0,255,0.6); }
@keyframes timelinePulse { 0% { top: -150px; } 100% { top: 100%; } }
.timeline-pulse { animation: timelinePulse 2s linear infinite; }
body{background:#03040f;color:#e2e8f0;overflow-x:hidden;cursor:none}
input,textarea,select,a{cursor:none}
::selection{background:rgba(6,182,212,0.25);color:#e2e8f0}
::-webkit-scrollbar{width:3px}
::-webkit-scrollbar-track{background:#03040f}
::-webkit-scrollbar-thumb{background:linear-gradient(#06b6d4,#8b5cf6);border-radius:2px}
@keyframes liquidShimmer { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
@keyframes pulse-glow{0%,100%{box-shadow:0 0 20px rgba(6,182,212,0.3)}50%{box-shadow:0 0 50px rgba(6,182,212,0.7),0 0 80px rgba(139,92,246,0.4)}}
@keyframes spin-slow{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
@keyframes shimmer{0%{background-position:-200% center}100%{background-position:200% center}}
@keyframes fadeUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
@keyframes scaleIn{from{opacity:0;transform:scale(0.9)}to{opacity:1;transform:scale(1)}}
@keyframes borderRun{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
@keyframes counter{from{opacity:0}to{opacity:1}}
@keyframes glitch{0%,100%{clip-path:none;transform:none}33%{clip-path:polygon(0 30%,100% 30%,100% 50%,0 50%);transform:translateX(-2px)}66%{clip-path:polygon(0 60%,100% 60%,100% 80%,0 80%);transform:translateX(2px)}}
@keyframes particleFly{0%{transform:translate(0,0) scale(1);opacity:1}100%{transform:translate(var(--tx),var(--ty)) scale(0);opacity:0}}
@keyframes gradientShift{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}
@keyframes neuralPulse{0%,100%{r:3;opacity:0.6}50%{r:5;opacity:1}}
@keyframes slideDown{from{opacity:0;transform:translateY(-10px)}to{opacity:1;transform:translateY(0)}}
@keyframes typing{from{width:0}to{width:100%}}
@keyframes shimmerLoad{0%{background-position:-200px 0}100%{background-position:200px 0}}
.flip-card-inner{transform-style:preserve-3d;transition:transform 0.55s cubic-bezier(.4,0,.2,1)}
.flip-card-front,.flip-card-back{-webkit-backface-visibility:hidden;backface-visibility:hidden}
.flip-card-back{transform:rotateY(180deg)}
@media(max-width:768px){
  .hero-grid{grid-template-columns:1fr!important}
  .stats-row{grid-template-columns:1fr 1fr!important}
  .projects-bento{grid-template-columns:1fr!important}
  .skills-grid{grid-template-columns:1fr!important}
  .hide-mobile{display:none!important}
  .hamburger-btn{display:flex!important;align-items:center}
}
@media(max-width:1024px){
  .projects-bento{grid-template-columns:1fr 1fr!important}
}
`;

/* ═══════════════════════════════════════════════════════════
   MAGNETIC CURSOR
═══════════════════════════════════════════════════════════ */
function MagneticCursor() {
  const canvasRef = useRef(null);
  const pos = useRef({ x: -100, y: -100 });
  const mouse = useRef({ x: -100, y: -100 });
  const points = useRef(Array.from({ length: 8 }, () => ({ x: -100, y: -100 })));
  const state = useRef({ type: 'default', text: '' });

  useEffect(() => {
    const onMove = e => { mouse.current = { x: e.clientX, y: e.clientY }; };
    const onOver = e => {
      const tag = e.target.tagName.toLowerCase();
      if (tag === 'button' || tag === 'a' || e.target.closest('a,button')) {
        state.current.type = 'pointer';
      } else if (tag === 'canvas') {
        state.current.type = 'crosshair';
      } else if (tag === 'p' || tag === 'h1' || tag === 'h2' || tag === 'h3' || tag === 'span') {
        state.current.type = 'text';
      } else {
        state.current.type = 'default';
      }
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);
    const resize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };
    resize();
    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      window.removeEventListener('resize', resize);
    };
  }, []);

  useAnimationFrame(() => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;

    pos.current.x += (mouse.current.x - pos.current.x) * ANIM_CONFIG.spring.tension;
    pos.current.y += (mouse.current.y - pos.current.y) * ANIM_CONFIG.spring.tension;

    let target = { ...pos.current };
    points.current.forEach((p, i) => {
      p.x += (target.x - p.x) * (ANIM_CONFIG.spring.tension + i * 0.05);
      p.y += (target.y - p.y) * (ANIM_CONFIG.spring.tension + i * 0.05);
      target = { ...p };
    });

    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    points.current.forEach((p, i) => {
      const size = Math.max(0, 10 - i * 1.2);
      const alpha = 1 - (i / 8);
      ctx.beginPath();
      ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
      // cyan to purple gradient approximation based on index
      ctx.fillStyle = i < 4 ? `rgba(6, 182, 212, ${alpha * 0.4})` : `rgba(139, 92, 246, ${alpha * 0.4})`;
      ctx.fill();
    });

    ctx.beginPath();
    if (state.current.type === 'pointer') {
      ctx.arc(pos.current.x, pos.current.y, 24, 0, Math.PI * 2);
      ctx.strokeStyle = ANIM_CONFIG.colors.purple;
      ctx.lineWidth = 2;
      ctx.stroke();
    } else if (state.current.type === 'crosshair') {
      ctx.moveTo(pos.current.x - 12, pos.current.y); ctx.lineTo(pos.current.x + 12, pos.current.y);
      ctx.moveTo(pos.current.x, pos.current.y - 12); ctx.lineTo(pos.current.x, pos.current.y + 12);
      ctx.strokeStyle = ANIM_CONFIG.colors.amber; ctx.lineWidth = 1.5; ctx.stroke();
    } else if (state.current.type === 'text') {
      ctx.rect(pos.current.x - 2, pos.current.y - 12, 4, 24);
      ctx.fillStyle = ANIM_CONFIG.colors.cyan; ctx.fill();
    } else {
      ctx.arc(pos.current.x, pos.current.y, 6, 0, Math.PI * 2);
      ctx.fillStyle = ANIM_CONFIG.colors.cyan; ctx.fill();
    }
  });

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 99999 }}
    />
  );
}

/* ═══════════════════════════════════════════════════════════
   NEURAL NETWORK CANVAS
═══════════════════════════════════════════════════════════ */
function NeuralCanvas({ fullscreen = false }) {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    let raf, mouse = { x: -1000, y: -1000 };
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);
    canvas.addEventListener("mousemove", e => { const r = canvas.getBoundingClientRect(); mouse = { x: e.clientX - r.left, y: e.clientY - r.top }; });
    const N = fullscreen ? 80 : 40;
    const nodes = Array.from({ length: N }, () => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 2 + 1, layer: Math.floor(Math.random() * 4), pulse: Math.random() * Math.PI * 2,
    }));
    const COLORS = ["#06b6d4", "#8b5cf6", "#10b981", "#f59e0b"];
    let t = 0;
    const draw = () => {
      t += 0.008;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 130) {
            const alpha = (1 - d / 130) * 0.25;
            const pulse = Math.sin(t * 2 + i * 0.5) * 0.15 + alpha;
            ctx.beginPath(); ctx.moveTo(nodes[i].x, nodes[i].y); ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(6,182,212,${Math.max(0, pulse)})`; ctx.lineWidth = 0.6; ctx.stroke();
          }
        }
        // mouse interaction
        const mdx = nodes[i].x - mouse.x, mdy = nodes[i].y - mouse.y;
        const md = Math.sqrt(mdx * mdx + mdy * mdy);
        if (md < 120) { nodes[i].x += mdx / md * 0.8; nodes[i].y += mdy / md * 0.8; }
        nodes[i].x += nodes[i].vx; nodes[i].y += nodes[i].vy;
        if (nodes[i].x < 0 || nodes[i].x > canvas.width) nodes[i].vx *= -1;
        if (nodes[i].y < 0 || nodes[i].y > canvas.height) nodes[i].vy *= -1;
        const pr = nodes[i].r + Math.sin(t * 2 + nodes[i].pulse) * 1;
        ctx.beginPath(); ctx.arc(nodes[i].x, nodes[i].y, pr, 0, Math.PI * 2);
        ctx.fillStyle = COLORS[nodes[i].layer] + "cc"; ctx.fill();
        // glow
        const grd = ctx.createRadialGradient(nodes[i].x, nodes[i].y, 0, nodes[i].x, nodes[i].y, pr * 5);
        grd.addColorStop(0, COLORS[nodes[i].layer] + "40"); grd.addColorStop(1, "transparent");
        ctx.beginPath(); ctx.arc(nodes[i].x, nodes[i].y, pr * 5, 0, Math.PI * 2); ctx.fillStyle = grd; ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, [fullscreen]);
  return <canvas ref={ref} style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />;
}

/* ═══════════════════════════════════════════════════════════
   SCROLL PROGRESS
═══════════════════════════════════════════════════════════ */
function ScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setP(scrolled / total);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: 3, zIndex: 9999, background: "rgba(255,255,255,0.02)" }}>
      <div style={{
        height: "100%", width: `${p * 100}%`,
        background: "linear-gradient(90deg,#06b6d4,#8b5cf6,#10b981)",
        boxShadow: "0 0 10px rgba(6,182,212,0.8), 0 0 20px rgba(139,92,246,0.5)",
        position: "relative", transition: "width 0.1s"
      }}>
        <div style={{ position: "absolute", right: -2, top: -1, width: 5, height: 5, background: "#fff", borderRadius: "50%", boxShadow: "0 0 10px #fff" }} />
      </div>
    </div>
  );
}


/* ═══════════════════════════════════════════════════════════
   SECTION REVEAL
═══════════════════════════════════════════════════════════ */
function Reveal({ children, delay = 0, style = {} }) {
  const ref = useRef(null); const [v, setV] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); obs.disconnect(); } }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return <div ref={ref} style={{ opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(40px)", transition: `opacity 0.7s ${delay}s ease, transform 0.7s ${delay}s ease`, ...style }}>{children}</div>;
}

/* ═══════════════════════════════════════════════════════════
   3D TILT CARD
═══════════════════════════════════════════════════════════ */
function TiltCard({ children, style = {} }) {
  const ref = useRef(null);
  const onMove = e => {
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    ref.current.style.transform = `perspective(800px) rotateX(${-y * 12}deg) rotateY(${x * 12}deg) scale(1.02)`;
    ref.current.style.boxShadow = `${-x * 20}px ${y * 20}px 40px rgba(6,182,212,0.2)`;
  };
  const onLeave = () => { ref.current.style.transform = "perspective(800px) rotateX(0) rotateY(0) scale(1)"; ref.current.style.boxShadow = ""; };
  return <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} style={{ transition: "transform 0.15s ease, box-shadow 0.3s ease", transformStyle: "preserve-3d", ...style }}>{children}</div>;
}

/* ═══════════════════════════════════════════════════════════
   LOADER
═══════════════════════════════════════════════════════════ */
function Loader({ onDone }) {
  const [p, setP] = useState(0); const [done, setDone] = useState(false);
  useEffect(() => {
    const iv = setInterval(() => setP(x => { const n = x + Math.random() * 15 + 3; if (n >= 100) { clearInterval(iv); setDone(true); setTimeout(onDone, 500); return 100; } return n; }), 70);
    return () => clearInterval(iv);
  }, [onDone]);
  return (
    <div style={{ position: "fixed", inset: 0, background: "#03040f", zIndex: 99998, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 32, opacity: done ? 0 : 1, transition: "opacity 0.5s" }}>
      <div style={{ width: 80, height: 80, position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, border: "2px solid transparent", borderTopColor: "#06b6d4", borderRadius: "50%", animation: "spin-slow 1s linear infinite" }} />
        <div style={{ position: "absolute", inset: 8, border: "2px solid transparent", borderTopColor: "#8b5cf6", borderRadius: "50%", animation: "spin-slow 1.5s linear infinite reverse" }} />
        <div style={{ position: "absolute", inset: 16, border: "2px solid transparent", borderTopColor: "#10b981", borderRadius: "50%", animation: "spin-slow 2s linear infinite" }} />
      </div>
      <div style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(1.5rem,4vw,2.5rem)", fontWeight: 800, background: "linear-gradient(135deg,#06b6d4,#8b5cf6,#10b981)", backgroundSize: "200%", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", animation: "shimmer 2s linear infinite" }}>MR V</div>
      <div style={{ width: 280, height: 2, background: "rgba(255,255,255,0.05)", borderRadius: 1 }}>
        <div style={{ height: "100%", width: `${Math.min(p, 100)}%`, background: "linear-gradient(90deg,#06b6d4,#8b5cf6)", borderRadius: 1, transition: "width 0.1s", boxShadow: "0 0 10px rgba(6,182,212,0.8)" }} />
      </div>
      <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "#334155", letterSpacing: 3 }}>INITIALIZING {Math.min(Math.round(p), 100)}%</div>
    </div>
  );
}/* ═══════════════════════════════════════════════════════════
   MISSING UI COMPONENTS (Restored)
═══════════════════════════════════════════════════════════ */
function MagBtn({ children, href, onClick, primary, style = {} }) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) * 0.3;
    const y = (e.clientY - top - height / 2) * 0.3;
    setPos({ x, y });
  };

  const handleMouseLeave = () => { setPos({ x: 0, y: 0 }); };

  const btnStyle = {
    position: "relative", display: "inline-flex", alignItems: "center", justifyContent: "center",
    padding: "12px 24px", borderRadius: 8, fontFamily: "'JetBrains Mono',monospace", fontSize: 13, letterSpacing: 1,
    color: primary ? "#03040f" : "#06b6d4",
    background: primary ? "linear-gradient(135deg,#06b6d4,#8b5cf6)" : "transparent",
    border: primary ? "none" : "1px solid rgba(6,182,212,0.5)", textDecoration: "none", cursor: "pointer",
    transform: `translate(${pos.x}px, ${pos.y}px)`, transition: "transform 0.1s ease-out, box-shadow 0.3s",
    boxShadow: primary && (pos.x !== 0 || pos.y !== 0) ? "0 10px 20px rgba(6,182,212,0.4)" : "none",
    ...style
  };

  if (href) return <a href={href} target="_blank" rel="noopener noreferrer" ref={ref} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} style={btnStyle}>{children}</a>;
  return <button ref={ref} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} onClick={onClick} style={btnStyle}>{children}</button>;
}

function ScrambleText({ text }) {
  const [display, setDisplay] = useState(text);
  const [inView, setInView] = useState(false);
  const ref = useRef(null);
  const chars = "!<>-_\\\\/[]{}—=+*^?#_";

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    let frame = 0; const maxFrames = 20;
    const iv = setInterval(() => {
      frame++; let newText = "";
      for (let i = 0; i < text.length; i++) {
        if (text[i] === " ") { newText += " "; continue; }
        if (frame > maxFrames || Math.random() < frame / maxFrames) newText += text[i];
        else newText += chars[Math.floor(Math.random() * chars.length)];
      }
      setDisplay(newText);
      if (frame > maxFrames) clearInterval(iv);
    }, 40);
    return () => clearInterval(iv);
  }, [inView, text]);

  return <span ref={ref} className="scramble-hover" style={{ transition: "all 0.2s" }}>{display}</span>;
}

function OrbitalBadges() {
  const badges = [{ icon: aiFunIcon, angle: 0 }, { icon: mlMethIcon, angle: 120 }, { icon: dataScIcon, angle: 240 }];
  return (
    <div style={{ position: "absolute", inset: -40, pointerEvents: "none", animation: "spin-slow 20s linear infinite" }}>
      {badges.map((b, i) => (
        <div key={i} style={{
          position: "absolute", top: "50%", left: "50%", width: 44, height: 44, marginTop: -22, marginLeft: -22,
          transform: `rotate(${b.angle}deg) translateX(160px) rotate(-${b.angle}deg)`,
          background: "rgba(3,4,15,0.8)", border: "1px solid rgba(6,182,212,0.3)", borderRadius: "50%",
          display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", boxShadow: "0 0 15px rgba(6,182,212,0.2)"
        }}>
          <img src={b.icon} alt="" style={{ width: "70%", height: "70%", objectFit: "contain" }} />
        </div>
      ))}
    </div>
  );
}

function Typer() {
  const words = ["AI Engineer", "Full-Stack Dev", "Flutter Developer"];
  const [text, setText] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    const delay = isDeleting ? 40 : 100;
    const timeout = setTimeout(() => {
      if (!isDeleting && text === current) setTimeout(() => setIsDeleting(true), 1500);
      else if (isDeleting && text === "") { setIsDeleting(false); setWordIdx((wordIdx + 1) % words.length); }
      else setText(current.substring(0, text.length + (isDeleting ? -1 : 1)));
    }, delay);
    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIdx]);

  return <span>{text}<span style={{ animation: "blink 1s step-end infinite" }}>|</span></span>;
}

function Counter({ to, suffix = "" }) {
  const [count, setCount] = useState(0);
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    let start = 0; const duration = 2000; const stepTime = Math.max(16, Math.floor(duration / to));
    const timer = setInterval(() => {
      start += Math.ceil(to / (duration / stepTime));
      if (start >= to) { setCount(to); clearInterval(timer); }
      else setCount(start);
    }, stepTime);
    return () => clearInterval(timer);
  }, [inView, to]);

  return <span ref={ref}>{count}{suffix}</span>;
}

/* ═══════════════════════════════════════════════════════════
   NAVBAR
═══════════════════════════════════════════════════════════ */
const NAVLINKS = ["Hero", "About", "Skills", "Projects", "Experience", "Contact"];
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("Hero");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      // Active section detection
      const offsets = NAVLINKS.map(n => {
        const el = document.getElementById(n.toLowerCase());
        return el ? { n, top: el.getBoundingClientRect().top } : { n, top: 9999 };
      });
      const curr = offsets.filter(o => o.top <= 120).pop();
      if (curr) setActive(curr.n);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goto = id => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, background: scrolled ? "rgba(3,4,15,0.92)" : "transparent", backdropFilter: scrolled ? "blur(24px)" : "none", borderBottom: scrolled ? "1px solid rgba(6,182,212,0.1)" : "none", transition: "all 0.4s" }}>
      <div style={{ maxWidth: 1300, margin: "0 auto", padding: "0 5vw", height: 68, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {/* Logo */}
        <div onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 22, background: "linear-gradient(135deg,#06b6d4,#8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", cursor: "pointer", letterSpacing: 1 }}>MR V</div>

        {/* Desktop links */}
        <div style={{ display: "flex", gap: 4, alignItems: "center" }} className="hide-mobile">
          {NAVLINKS.map(n => (
            <button key={n} onClick={() => goto(n)} style={{ position: "relative", background: "none", border: "none", color: active === n ? "#06b6d4" : "#64748b", fontFamily: "'JetBrains Mono',monospace", fontSize: 11, cursor: "pointer", letterSpacing: 2, transition: "color 0.2s", textTransform: "uppercase", padding: "8px 14px", borderRadius: 8 }}
              onMouseEnter={e => { if (active !== n) e.currentTarget.style.color = "#94a3b8"; e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
              onMouseLeave={e => { e.currentTarget.style.color = active === n ? "#06b6d4" : "#64748b"; e.currentTarget.style.background = "transparent"; }}>
              {n}
              {active === n && <div style={{ position: "absolute", bottom: 2, left: "50%", transform: "translateX(-50%)", width: 16, height: 2, background: "linear-gradient(90deg,#06b6d4,#8b5cf6)", borderRadius: 1 }} />}
            </button>
          ))}
          <div style={{ width: 1, height: 20, background: "rgba(255,255,255,0.08)", margin: "0 8px" }} />
          <MagBtn href="/pdfs/MrV_Resume.pdf" style={{ padding: "8px 18px", fontSize: 11, whiteSpace: "nowrap" }}>📄 Resume</MagBtn>
          <MagBtn primary href="https://github.com/Dev-MrV" style={{ padding: "8px 18px", fontSize: 11, whiteSpace: "nowrap" }}>⬡ GitHub</MagBtn>
        </div>

        {/* Hamburger */}
        <button onClick={() => setOpen(o => !o)} style={{ display: "none", background: "none", border: "1px solid rgba(255,255,255,0.1)", color: "#94a3b8", fontSize: 18, cursor: "pointer", padding: "6px 10px", borderRadius: 8, lineHeight: 1 }} className="hamburger-btn">
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile drawer */}
      <div style={{ maxHeight: open ? 420 : 0, overflow: "hidden", transition: "max-height 0.4s cubic-bezier(.4,0,.2,1)", background: "rgba(3,4,15,0.98)", borderBottom: open ? "1px solid rgba(6,182,212,0.1)" : "none" }}>
        <div style={{ padding: "16px 5vw 24px", display: "flex", flexDirection: "column", gap: 4 }}>
          {NAVLINKS.map(n => (
            <button key={n} onClick={() => goto(n)} style={{ background: active === n ? "rgba(6,182,212,0.08)" : "none", border: active === n ? "1px solid rgba(6,182,212,0.2)" : "1px solid transparent", color: active === n ? "#06b6d4" : "#64748b", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, cursor: "pointer", textAlign: "left", padding: "12px 16px", borderRadius: 8, letterSpacing: 2, textTransform: "uppercase", transition: "all 0.2s" }}>
              {n}
            </button>
          ))}
          <a href="/pdfs/MrV_Resume.pdf" target="_blank" rel="noopener noreferrer" style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 8, fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: "#03040f", padding: "12px 16px", borderRadius: 8, background: "linear-gradient(135deg,#06b6d4,#8b5cf6)", textDecoration: "none", letterSpacing: 2, fontWeight: 700 }}>📄 RESUME ↗</a>
          <a href="https://github.com/Dev-MrV" target="_blank" rel="noopener noreferrer" style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 8, fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: "#06b6d4", padding: "12px 16px", borderRadius: 8, border: "1px solid rgba(6,182,212,0.3)", background: "rgba(6,182,212,0.06)", textDecoration: "none", letterSpacing: 2 }}>⬡ GITHUB ↗</a>
        </div>
      </div>
    </nav>
  );
}

/* ═══════════════════════════════════════════════════════════
   HERO
═══════════════════════════════════════════════════════════ */
/* ═══════════════════════════════════════════════════════════
   HERO AVATAR — ANIMATED AI BRAIN CANVAS
═══════════════════════════════════════════════════════════ */
function HeroAvatarCanvas() {
  const ref = useRef(null);
  const raf = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const SIZE = 274;
    canvas.width = SIZE; canvas.height = SIZE;
    const ctx = canvas.getContext("2d");
    const cx = SIZE / 2, cy = SIZE / 2;
    let t = 0;

    // Build stable neural graph
    const NODE_COUNT = 22;
    const nodes = Array.from({ length: NODE_COUNT }, (_, i) => {
      const layer = Math.floor(i / 5);
      const angle = ((i % 5) / 5) * Math.PI * 2 + layer * 0.4;
      const r = 30 + layer * 28 + (i % 3) * 8;
      return {
        x: cx + r * Math.cos(angle),
        y: cy + r * Math.sin(angle),
        r: 2.5 + Math.random() * 2,
        baseR: r,
        angle: angle,
        speed: 0.0004 + Math.random() * 0.0003,
        orbitR: r,
        pulse: Math.random() * Math.PI * 2,
        color: i % 3 === 0 ? "#06b6d4" : i % 3 === 1 ? "#8b5cf6" : "#10b981",
      };
    });

    // Connect nearby nodes
    const edges = [];
    for (let i = 0; i < nodes.length; i++)
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y;
        if (Math.sqrt(dx * dx + dy * dy) < 72) edges.push({ a: i, b: j, pulse: Math.random() * Math.PI * 2 });
      }

    // Floating data particles
    const particles = Array.from({ length: 18 }, () => ({
      x: cx + (Math.random() - 0.5) * 220,
      y: cy + (Math.random() - 0.5) * 220,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      size: 1 + Math.random() * 1.5,
      color: Math.random() > 0.5 ? "#06b6d4" : "#8b5cf6",
      alpha: 0.2 + Math.random() * 0.5,
    }));

    const draw = () => {
      t += 0.012;
      ctx.clearRect(0, 0, SIZE, SIZE);

      // ── Background glow ─────────────────────────────────
      const bgGrd = ctx.createRadialGradient(cx, cy, 0, cx, cy, 130);
      bgGrd.addColorStop(0, "rgba(6,182,212,0.06)");
      bgGrd.addColorStop(0.5, "rgba(139,92,246,0.04)");
      bgGrd.addColorStop(1, "transparent");
      ctx.fillStyle = bgGrd; ctx.fillRect(0, 0, SIZE, SIZE);

      // ── Update node positions (gentle orbit drift) ──────
      nodes.forEach(n => {
        n.angle += n.speed;
        n.x = cx + n.orbitR * Math.cos(n.angle) + Math.sin(t * 0.7 + n.pulse) * 5;
        n.y = cy + n.orbitR * Math.sin(n.angle) + Math.cos(t * 0.5 + n.pulse) * 5;
      });

      // ── Neural edges with travelling pulses ─────────────
      edges.forEach(({ a, b, pulse }) => {
        const na = nodes[a], nb = nodes[b];
        const dx = nb.x - na.x, dy = nb.y - na.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const alpha = Math.max(0, 0.18 - dist * 0.0015);

        ctx.beginPath();
        ctx.moveTo(na.x, na.y); ctx.lineTo(nb.x, nb.y);
        ctx.strokeStyle = `rgba(6,182,212,${alpha})`; ctx.lineWidth = 0.7; ctx.stroke();

        // Travelling energy dot
        const pct = ((t * 0.6 + pulse) % 2) / 2;
        if (pct < 1) {
          const px = na.x + pct * dx, py = na.y + pct * dy;
          const pg = ctx.createRadialGradient(px, py, 0, px, py, 4);
          pg.addColorStop(0, "rgba(6,182,212,0.9)"); pg.addColorStop(1, "transparent");
          ctx.beginPath(); ctx.arc(px, py, 4, 0, Math.PI * 2); ctx.fillStyle = pg; ctx.fill();
        }
      });

      // ── Nodes ────────────────────────────────────────────
      nodes.forEach(n => {
        const pulse = Math.sin(t * 1.4 + n.pulse);
        const nr = n.r + pulse * 1.2;

        // Glow aura
        const aura = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, nr * 4);
        aura.addColorStop(0, n.color + "50"); aura.addColorStop(1, "transparent");
        ctx.beginPath(); ctx.arc(n.x, n.y, nr * 4, 0, Math.PI * 2); ctx.fillStyle = aura; ctx.fill();

        // Core dot
        ctx.beginPath(); ctx.arc(n.x, n.y, nr, 0, Math.PI * 2); ctx.fillStyle = n.color; ctx.fill();
      });

      // ── Central AI core ──────────────────────────────────
      const coreR = 14 + Math.sin(t * 1.2) * 2;

      // Multi-layer glow
      for (let l = 3; l >= 0; l--) {
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreR + l * 10);
        g.addColorStop(0, `rgba(6,182,212,${0.3 / (l + 1)})`);
        g.addColorStop(1, "transparent");
        ctx.beginPath(); ctx.arc(cx, cy, coreR + l * 10, 0, Math.PI * 2); ctx.fillStyle = g; ctx.fill();
      }

      // Core solid
      const cg = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreR);
      cg.addColorStop(0, "#ffffff"); cg.addColorStop(0.4, "#06b6d4"); cg.addColorStop(1, "#8b5cf6");
      ctx.beginPath(); ctx.arc(cx, cy, coreR, 0, Math.PI * 2); ctx.fillStyle = cg; ctx.fill();

      // Energy wave rings from core
      for (let w = 0; w < 3; w++) {
        const ph = ((t * 0.7 + w * 0.9) % 2.2) / 2.2;
        ctx.beginPath(); ctx.arc(cx, cy, ph * 110, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(6,182,212,${(1 - ph) * 0.25})`; ctx.lineWidth = 1; ctx.stroke();
      }

      // Rotating spokes on core
      for (let s = 0; s < 6; s++) {
        const a = t * 0.9 + (s * Math.PI) / 3;
        ctx.beginPath();
        ctx.moveTo(cx + Math.cos(a) * coreR, cy + Math.sin(a) * coreR);
        ctx.lineTo(cx + Math.cos(a) * (coreR + 7), cy + Math.sin(a) * (coreR + 7));
        ctx.strokeStyle = "rgba(6,182,212,0.7)"; ctx.lineWidth = 1.2; ctx.stroke();
      }

      // ── Floating data particles ───────────────────────────
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > SIZE) p.vx *= -1;
        if (p.y < 0 || p.y > SIZE) p.vy *= -1;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color + Math.floor(p.alpha * 255).toString(16).padStart(2, "0");
        ctx.fill();
      });

      // ── Holographic scan line ─────────────────────────────
      const slY = cy + Math.sin(t * 0.6) * 90;
      ctx.beginPath(); ctx.moveTo(cx - 120, slY); ctx.lineTo(cx + 120, slY);
      ctx.strokeStyle = "rgba(6,182,212,0.08)"; ctx.lineWidth = 1; ctx.stroke();

      // ── Binary ghost text ─────────────────────────────────
      if (Math.sin(t * 0.4) > 0.7) {
        ctx.font = "7px JetBrains Mono";
        ctx.fillStyle = "rgba(6,182,212,0.12)";
        ctx.fillText("01 10 11", cx - 28, cy + 95);
      }

      raf.current = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(raf.current);
  }, []);

  return (
    <canvas
      ref={ref}
      style={{ width: "100%", height: "100%", borderRadius: "50%" }}
    />
  );
}

const STATS = [{ val: 6, suffix: "+", label: "AI Projects" }, { val: 4, suffix: "+", label: "Frameworks" }, { val: 20, suffix: "K+", label: "Lines of Code" }, { val: 3, suffix: "+", label: "Years Learning" }];
function Hero() {
  return (
    <section id="hero" style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden", padding: "80px 5vw 60px" }}>
      <NeuralCanvas fullscreen />
      {/* Gradient blobs */}
      <div style={{ position: "absolute", top: "20%", left: "5%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle,rgba(6,182,212,0.08) 0%,transparent 70%)", filter: "blur(60px)" }} />
      <div style={{ position: "absolute", bottom: "10%", right: "5%", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle,rgba(139,92,246,0.08) 0%,transparent 70%)", filter: "blur(60px)" }} />
      <div style={{ position: "relative", zIndex: 1, maxWidth: 1300, margin: "0 auto", width: "100%" }}>
        <div className="hero-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          {/* Left */}
          <div style={{ animation: "fadeUp 0.8s ease forwards" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "'JetBrains Mono',monospace", fontSize: 11, letterSpacing: 3, color: "#06b6d4", textTransform: "uppercase", marginBottom: 24, padding: "7px 16px", border: "1px solid rgba(6,182,212,0.25)", borderRadius: 20, background: "rgba(6,182,212,0.05)" }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#10b981", display: "inline-block", animation: "pulse-glow 2s ease-in-out infinite" }} />
              Available for opportunities
            </div>
            <h1 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "clamp(2.5rem,7vw,5rem)", lineHeight: 1.05, marginBottom: 20 }}>
              <span style={{ background: "linear-gradient(135deg,#f8fafc,#94a3b8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Hello, I'm</span>
              <br />
              <span style={{ background: "linear-gradient(135deg, #06b6d4, #f8fafc, #8b5cf6, #10b981)", backgroundSize: "400% 400%", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", animation: "liquidShimmer 8s ease infinite" }}>Mr V</span>
            </h1>
            <div style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(1rem,2.5vw,1.4rem)", color: "#64748b", marginBottom: 32, height: 40 }}>
              <Typer />
            </div>
            <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: 16, color: "#64748b", lineHeight: 1.8, marginBottom: 40, maxWidth: 520 }}>
              Building production-grade AI systems — from real-time computer vision (YOLOv8) and medical imaging CNNs, to RAG chatbots (LangChain + FAISS), real-time collaborative editors (Yjs + Socket.io), and cross-platform Flutter apps.
            </p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 48 }}>
              <MagBtn primary onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}>
                🚀 View Projects
              </MagBtn>
              <MagBtn href="https://github.com/Dev-MrV">
                ⬡ GitHub
              </MagBtn>
              <MagBtn onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
                ✉ Contact
              </MagBtn>
            </div>
            {/* Mini stats */}
            <div className="stats-row" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
              {STATS.map(s => (
                <div key={s.label} style={{ textAlign: "center", padding: "14px 8px", borderRadius: 12, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
                  <div style={{ fontFamily: "'Syne',sans-serif", fontSize: "1.5rem", fontWeight: 800, background: "linear-gradient(135deg,#06b6d4,#8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                    <Counter to={s.val} suffix={s.suffix} />
                  </div>
                  <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "#475569", letterSpacing: 1.5, marginTop: 4 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
          {/* Right — profile visual */}
          <div style={{ display: "flex", justifyContent: "center", animation: "scaleIn 0.9s 0.2s ease forwards", opacity: 0 }}>
            <div style={{ position: "relative", animation: "float 4s ease-in-out infinite" }}>
              <div style={{ width: 280, height: 280, borderRadius: "50%", background: "linear-gradient(135deg,#06b6d4,#8b5cf6)", padding: 3, animation: "pulse-glow 3s ease-in-out infinite" }}>
                <div style={{ width: "100%", height: "100%", borderRadius: "50%", background: "linear-gradient(135deg,#0d1117,#0f172a)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", position: "relative" }}>
                  <HeroAvatarCanvas />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   SECTION HEADER
═══════════════════════════════════════════════════════════ */
function SectionHeader({ tag, title, sub }) {
  return (
    <Reveal style={{ textAlign: "center", marginBottom: 64 }}>
      <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, letterSpacing: 4, color: "#06b6d4", textTransform: "uppercase", marginBottom: 12 }}>{tag}</div>
      <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem,4vw,3rem)", background: "linear-gradient(135deg,#f8fafc,#94a3b8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", lineHeight: 1.2, marginBottom: 16 }}><ScrambleText text={title} /></h2>
      {sub && <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: 16, color: "#64748b", maxWidth: 600, margin: "0 auto" }}>{sub}</p>}
      <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
        <div style={{ width: 60, height: 2, background: "linear-gradient(90deg,transparent,#06b6d4,#8b5cf6,transparent)" }} />
      </div>
    </Reveal>
  );
}

/* ═══════════════════════════════════════════════════════════
   ABOUT
═══════════════════════════════════════════════════════════ */
const ABOUT_CARDS = [
  { icon: "🧠", title: "AI & Computer Vision", desc: "YOLOv8 object detection, CNN medical imaging, RAG pipelines with FAISS and LangChain — from model training to deployment.", color: "#06b6d4" },
  { icon: "⚡", title: "Real-time Systems", desc: "Collaborative apps with Yjs CRDTs, Socket.io presence layers, and live multi-user synchronisation at scale.", color: "#10b981" },
  { icon: "📱", title: "Mobile & Full-Stack", desc: "Cross-platform Flutter apps (iOS/Android) with Node.js/Express backends, Firebase, MongoDB, and Supabase.", color: "#8b5cf6" },
  { icon: "🔗", title: "NLP & RAG", desc: "Contextual chatbot systems using LangChain, FAISS vector stores, and emotion-aware NLP for real-world support apps.", color: "#f59e0b" },
];
function About() {
  return (
    <section id="about" style={{ padding: "100px 5vw", borderTop: "1px solid rgba(255,255,255,0.03)" }}>
      <div style={{ maxWidth: 1300, margin: "0 auto" }}>
        <SectionHeader tag="02 — About" title="Who I Am" sub="An AI engineer obsessed with turning complex research into products that actually work." />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center", marginBottom: 64 }} className="skills-grid">
          <Reveal>
            <div>
              <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: 16, color: "#64748b", lineHeight: 1.9, marginBottom: 20 }}>
                I'm <span style={{ color: "#06b6d4", fontWeight: 500 }}>Mr V</span> — an AI Engineer and Full-Stack Developer. I build systems that are intelligent, real-time, and production-ready.
              </p>
              <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: 16, color: "#64748b", lineHeight: 1.9, marginBottom: 20 }}>
                My work spans the full AI stack — from training <span style={{ color: "#f59e0b" }}>computer vision models</span> (YOLOv8, CNNs) and designing <span style={{ color: "#8b5cf6" }}>RAG pipelines</span> with FAISS + LangChain, to shipping real-time collaborative apps with Yjs + Socket.io and polished <span style={{ color: "#06b6d4" }}>Flutter mobile apps</span>.
              </p>
              <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: 16, color: "#64748b", lineHeight: 1.9, marginBottom: 36 }}>
                Currently focused on <span style={{ color: "#10b981" }}>production-grade AI systems</span> and scalable web/mobile architectures that solve real-world problems.
              </p>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {["Python", "Flutter", "LangChain", "TensorFlow", "Node.js", "RAG", "YOLOv8", "React", "FAISS", "Socket.io", "Yjs", "MongoDB"].map(t => (
                  <span key={t} style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, letterSpacing: 2, padding: "6px 14px", borderRadius: 20, border: "1px solid rgba(6,182,212,0.2)", color: "#7dd3fc", background: "rgba(6,182,212,0.05)" }}>{t}</span>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div style={{ position: "relative" }}>
              {/* Code snippet visual */}
              <div style={{ borderRadius: 16, background: "rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.06)", overflow: "hidden" }}>
                <div style={{ padding: "12px 16px", borderBottom: "1px solid rgba(255,255,255,0.04)", display: "flex", gap: 6, alignItems: "center" }}>
                  {["#f43f5e", "#f59e0b", "#10b981"].map(c => <span key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c, display: "inline-block" }} />)}
                  <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "#334155", marginLeft: 8 }}>mrv_profile.py</span>
                </div>
                <div style={{ padding: "20px 24px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 2 }}>
                  {[
                    { t: "class", c: "#06b6d4" }, { t: " MrV:", c: "#f8fafc" },
                    { t: "    name", c: "#8b5cf6" }, { t: " = ", c: "#64748b" }, { t: '"Mr V"', c: "#10b981" },
                    { t: "    role", c: "#8b5cf6" }, { t: " = ", c: "#64748b" }, { t: '"AI Engineer & Full-Stack Dev"', c: "#10b981" },
                    { t: "    stack", c: "#8b5cf6" }, { t: " = [", c: "#64748b" }, { t: '"Python","Flutter","React"', c: "#10b981" }, { t: "]", c: "#64748b" },
                    { t: "    projects", c: "#8b5cf6" }, { t: " = [", c: "#64748b" }, { t: '"AccidentDetect","MedAI"', c: "#f59e0b" }, { t: "]", c: "#64748b" },
                    { t: "    ", c: "" },
                    { t: "    def ", c: "#06b6d4" }, { t: "build(self, idea):", c: "#f8fafc" },
                    { t: "        return ", c: "#06b6d4" }, { t: "AI(idea).ship() 🚀", c: "#f8fafc" },
                  ].map((line, i) => (
                    <div key={i} style={{ color: line.c || "transparent", minHeight: "1.5em" }}>{line.t}</div>
                  ))}
                </div>
              </div>
              {/* Floating accent */}
              <div style={{ position: "absolute", top: -12, right: -12, padding: "8px 14px", borderRadius: 10, background: "rgba(6,182,212,0.1)", border: "1px solid rgba(6,182,212,0.2)", fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "#06b6d4", backdropFilter: "blur(8px)" }}>
                Open to work ✦
              </div>
            </div>
          </Reveal>
        </div>
        {/* Highlight cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 20 }}>
          {ABOUT_CARDS.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.1}>
              <TiltCard style={{ padding: "24px 20px", borderRadius: 16, background: "rgba(255,255,255,0.02)", border: `1px solid rgba(255,255,255,0.06)`, cursor: "default" }}>
                <div style={{ fontSize: 28, marginBottom: 14 }}>{c.icon}</div>
                <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 15, color: "#e2e8f0", marginBottom: 10 }}>{c.title}</div>
                <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 13, color: "#475569", lineHeight: 1.7 }}>{c.desc}</div>
                <div style={{ width: 32, height: 2, background: c.color, borderRadius: 1, marginTop: 16 }} />
              </TiltCard>
            </Reveal>
          ))}
        </div>

        {/* PDF Certificates Stack */}
        <div style={{ marginTop: 80 }}>
          <h3 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 24, color: "#e2e8f0", marginBottom: 24, paddingLeft: 8, borderLeft: "4px solid #06b6d4" }}>
            Official Certificates
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[
              { title: "Microsoft AI & ML Engineering Professional", issuer: "Microsoft", file: "/pdfs/Microsoft_AI_ML_cert.pdf", color: "#06b6d4", icon: "🧠", img: certImg1 },
              { title: "Google AI Fundamentals", issuer: "Google", file: "/pdfs/Google_AI_fund.pdf", color: "#8b5cf6", icon: "🌐", img: certImg2 },
              { title: "Artificial Intelligence Fundamentals", issuer: "IBM", file: "/pdfs/IBMDesign20260719-8-kndgqc.pdf", color: "#10b981", icon: "⚙️", img: certImg3 },
              { title: "Machine Learning Methods & Tools", issuer: "IBM", file: "/pdfs/IBMDesign20260719-8-mrbuto.pdf", color: "#f59e0b", icon: "🤖", img: certImg4 },
              { title: "Flutter Capstone Project", issuer: "Coursera", file: "/pdfs/Flutter_Capstone_cert.pdf", color: "#f43f5e", icon: "📱", img: certImg5 },
              { title: "Elevate Labs Internship Certificate", issuer: "Elevate Labs", file: "/pdfs/AIML 1 (1)_compressed-74.pdf", color: "#0ea5e9", icon: "🔖", img: certImg8 },
            ].map((pdf, i) => (
              <Reveal key={pdf.title} delay={i * 0.1}>
                <a
                  href={pdf.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "20px 24px", borderRadius: 16,
                    background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)",
                    textDecoration: "none", transition: "all 0.3s",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = `${pdf.color}0a`; e.currentTarget.style.borderColor = `${pdf.color}40`; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.02)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <div style={{ fontSize: 24 }}>{pdf.icon}</div>
                    <div>
                      <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 16, color: "#f1f5f9" }}>{pdf.title}</div>
                      <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: pdf.color, marginTop: 4 }}>{pdf.issuer}</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#94a3b8", fontFamily: "'Outfit',sans-serif", fontSize: 14 }}>
                    View PDF <span style={{ fontSize: 18 }}>📄</span>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   SKILLS
═══════════════════════════════════════════════════════════ */
const SKILLS_DATA = [
  {
    cat: "AI / Machine Learning", color: "#06b6d4", icon: "🧠",
    items: [
      { n: "Python", p: 95 }, { n: "TensorFlow", p: 88 }, { n: "PyTorch", p: 82 },
      { n: "OpenCV / YOLOv8", p: 90 }, { n: "LangChain", p: 86 }, { n: "RAG Systems", p: 87 },
      { n: "FAISS", p: 80 }, { n: "NLP", p: 85 }, { n: "Scikit-Learn", p: 88 },
    ],
  },
  {
    cat: "Frontend & Mobile", color: "#8b5cf6", icon: "📱",
    items: [
      { n: "Flutter / Dart", p: 90 }, { n: "React", p: 82 },
      { n: "JavaScript", p: 82 }, { n: "TypeScript", p: 76 },
    ],
  },
  {
    cat: "Backend & Real-time", color: "#10b981", icon: "⚙️",
    items: [
      { n: "Node.js", p: 84 }, { n: "Express", p: 82 },
      { n: "Socket.io", p: 85 }, { n: "Yjs (CRDTs)", p: 80 },
      { n: "REST APIs", p: 88 },
    ],
  },
  {
    cat: "Cloud & Databases", color: "#f59e0b", icon: "☁️",
    items: [
      { n: "MongoDB", p: 83 }, { n: "Firebase", p: 85 },
      { n: "Supabase", p: 78 }, { n: "PostgreSQL", p: 74 },
    ],
  },
];
function Skills() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="skills" style={{ padding: "100px 5vw", borderTop: "1px solid rgba(255,255,255,0.03)" }}>
      <div style={{ maxWidth: 1300, margin: "0 auto" }}>
        <SectionHeader tag="03 — Skills" title="Technical Arsenal" sub="Specialised toolset for building AI-driven solutions." />

        <div style={{ display: "flex", justifyContent: "center", gap: 16, marginBottom: 60, flexWrap: "wrap" }}>
          {SKILLS_DATA.map((cat, i) => (
            <button
              key={cat.cat}
              onClick={() => setActiveTab(i)}
              style={{
                background: activeTab === i ? `${cat.color}20` : "rgba(255,255,255,0.02)",
                border: `1px solid ${activeTab === i ? cat.color : "rgba(255,255,255,0.05)"}`,
                color: activeTab === i ? "#fff" : "#94a3b8",
                padding: "12px 24px",
                borderRadius: 8,
                fontFamily: "'Syne',sans-serif",
                fontSize: 16,
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.3s ease",
                boxShadow: activeTab === i ? `0 0 15px ${cat.color}40` : "none"
              }}
            >
              <span style={{ marginRight: 8, fontSize: 20 }}>{cat.icon}</span> {cat.cat}
            </button>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 80 }}>
          {SKILLS_DATA.map((cat, i) => (
            i === activeTab && (
              <div key={cat.cat} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }} className="skills-grid">
                <Reveal delay={0.1}>
                  <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 32 }}>
                    <div style={{ fontSize: 32 }}>{cat.icon}</div>
                    <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: 24, fontWeight: 700, color: cat.color }}>{cat.cat}</h3>
                  </div>
                  <div>
                    {cat.items.map((skill, j) => (
                      <SkillBar key={skill.n} name={skill.n} pct={skill.p} color={cat.color} delay={j * 0.05} />
                    ))}
                  </div>
                </Reveal>
                <Reveal delay={0.2}>
                  <div style={{ maxWidth: 320, margin: "0 auto" }}>
                    <RadarChart skills={cat.items.map(s => s.n).slice(0, 6)} color={cat.color} />
                  </div>
                </Reveal>
              </div>
            )
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillBar({ name, pct, color, delay }) {
  const [ref, inView] = useIntersectionAnimation();
  const nodes = Array.from({ length: 20 });
  const activeNodes = Math.round((pct / 100) * 20);

  return (
    <div ref={ref} style={{ marginBottom: 20, opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(20px)', transition: `all 0.6s ease ${delay}s` }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: '#e2e8f0', letterSpacing: 1, textTransform: 'uppercase' }}>
        <span>{name}</span>
        <span style={{ color }}>{pct}%</span>
      </div>
      <div style={{ display: 'flex', gap: 4, height: 6 }} className="neural-bar">
        {nodes.map((_, i) => (
          <div key={i} style={{
            flex: 1,
            background: inView && i < activeNodes ? color : 'rgba(255,255,255,0.05)',
            boxShadow: inView && i < activeNodes ? `0 0 8px ${color}` : 'none',
            borderRadius: 2,
            transition: `all 0.3s ease ${delay + i * 0.04}s`
          }} />
        ))}
      </div>
    </div>
  );
}
function RadarChart({ skills, color }) {
  const [ref, inView] = useIntersectionAnimation();
  const [time, setTime] = useState(0);

  useAnimationFrame((delta) => {
    setTime(t => t + delta * 0.1);
  });

  return (
    <div ref={ref} style={{
      position: 'relative', width: '100%', aspectRatio: '1/1',
      border: `1px solid ${color}30`, borderRadius: '50%',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: `radial-gradient(circle, ${color}05, transparent)`,
      overflow: 'hidden', opacity: inView ? 1 : 0, transition: 'opacity 1s ease'
    }}>
      {[1, 2, 3].map(i => (
        <div key={i} style={{ position: 'absolute', width: `${i * 33}%`, height: `${i * 33}%`, borderRadius: '50%', border: `1px dashed ${color}15` }} />
      ))}
      <div style={{
        position: 'absolute', width: '50%', height: '50%', top: 0, right: 0,
        transformOrigin: 'bottom left',
        background: `conic-gradient(from 180deg, transparent 0deg, ${color}80 90deg, transparent 90deg)`,
        transform: `rotate(${time}deg)`
      }} />
      {skills.map((skill, i) => {
        const angle = (i / skills.length) * Math.PI * 2 - Math.PI / 2;
        const radius = 22 + (i % 2) * 12;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        const sweepAngle = ((time % 360) / 180) * Math.PI;

        let diff = sweepAngle - (angle + Math.PI * 2) % (Math.PI * 2);
        if (diff < 0) diff += Math.PI * 2;
        const pulse = Math.max(0, 1 - diff * 2);

        return (
          <div key={skill} style={{
            position: 'absolute', left: `calc(50% + ${x}%)`, top: `calc(50% + ${y}%)`,
            transform: 'translate(-50%, -50%)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 10
          }}>
            <div style={{
              width: 6, height: 6, borderRadius: '50%', background: color,
              boxShadow: `0 0 ${pulse * 20 + 2}px ${color}`,
              transform: `scale(${1 + pulse})`
            }} />
            <div style={{
              position: 'absolute', top: 12, fontFamily: "'JetBrains Mono',monospace",
              fontSize: 10, color: `rgba(255,255,255,${0.4 + pulse * 0.6})`, whiteSpace: 'nowrap'
            }}>{skill}</div>
          </div>
        );
      })}
    </div>
  );
}
const PROJECTS = [
  {
    title: "Collaborative Code Editor",
    desc: "Real-time collaborative code editor with CRDT-based conflict-free synchronization, live cursors, syntax highlighting, and multi-user editing.",
    tags: ["JavaScript (JSX)", "Node.js", "Express", "Yjs", "CRDT", "WebSocket"],
    color: "#10b981",
    icon: "💻",
    github: "https://github.com/Dev-MrV/Collaborative_Code_Editor",
  },
  {
    title: "Habit Tracker",
    desc: "Feature-rich habit tracking application with progress analytics, push notifications, MongoDB synchronization, and intuitive visualizations.",
    tags: ["Flutter", "MongoDB", "Supabase", "Push Notifications"],
    color: "#f59e0b",
    icon: "📅",
    github: "https://github.com/Dev-MrV/habit_tracker",
  },
  {
    title: "AI Road Accident Detection",
    desc: "AI-powered accident detection and emergency response system with real-time alerts, GPS tracking, and automated hospital notifications.",
    tags: ["JavaScript (JSX)", "Node.js", "MongoDB", "Google Maps", "AI/ML"],
    color: "#ef4444",
    icon: "🚑",
    github: "https://github.com/Dev-MrV/Ai_Road_Accident_Detection",
  },
  {
    title: "Enterprise CRAG Platform",
    desc: "Enterprise-grade Corrective RAG platform with hybrid retrieval, citation-backed responses, agentic workflows, and offline knowledge search.",
    tags: ["FastAPI", "LangGraph", "Ollama", "MongoDB", "RAG", "Qwen2.5"],
    color: "#8b5cf6",
    icon: "🧠",
    github: "https://github.com/Dev-MrV/rag_platform",
  },
  {
    title: "DeepQuant",
    desc: "LSTM-powered stock price prediction system featuring technical indicators, interactive dashboards, and real-time market trend forecasting.",
    tags: ["Python", "TensorFlow", "Keras", "FastAPI", "LSTM"],
    color: "#06b6d4",
    icon: "📈",
    github: "https://github.com/Dev-MrV/elevate_task/tree/main/stock",
  },
  {
    title: "CinematicVerse",
    desc: "Content-based movie recommendation engine using TF-IDF vectorization and cosine similarity with regional filtering and personalized suggestions.",
    tags: ["Python", "Scikit-learn", "Pandas", "FastAPI", "NLP"],
    color: "#ec4899",
    icon: "🎬",
    github: "https://github.com/Dev-MrV/elevate_task/tree/main/movie",
  },
  {
    title: "Ai Pneumonia Detection",
    desc: "CNN pipeline trained on chest X-ray datasets. Grad-CAM highlights infected regions for explainable, medical-grade diagnosis.",
    tags: ["Python", "FastAI", "PyTorch", "NumPy", "Matplotlib"],
    color: "#ec4899",
    icon: "🎬",
    github: "https://github.com/Dev-MrV/Ai_pneumonia_detection",
  },

];

function ProjectCard({ proj, delay, isHovered, isNeighbor, hoveredIdx, myIdx }) {
  return (
    <div
      style={{
        position: "relative", height: "100%", padding: 32, borderRadius: 16,
        background: "rgba(10,15,30,0.6)",
        border: `1px solid ${isHovered ? proj.color : 'rgba(255,255,255,0.05)'}`,
        boxShadow: isHovered ? `0 20px 40px rgba(0,0,0,0.5), 0 0 20px ${proj.color}40` : "none",
        overflow: "hidden"
      }}
    >
      <div style={{
        position: "absolute", inset: 0, opacity: isHovered ? 0.1 : 0,
        background: "linear-gradient(135deg, red, yellow, green, cyan, blue, magenta, red)",
        backgroundSize: "200% 200%", animation: "liquidShimmer 5s linear infinite",
        pointerEvents: "none", transition: "opacity 0.4s"
      }} />
      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
          <div style={{
            width: 50, height: 50, borderRadius: 12, background: `${proj.color}15`, color: proj.color,
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24,
            boxShadow: isHovered ? `0 0 15px ${proj.color}80` : "none",
            transform: isHovered ? "scale(1.1)" : "scale(1)", transition: "all 0.3s"
          }}>
            {proj.icon}
          </div>
          {proj.github && (
            <a href={proj.github} target="_blank" rel="noreferrer" style={{ color: "#64748b", textDecoration: "none", fontSize: 20 }}>
              🔗
            </a>
          )}
        </div>
        <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: 22, fontWeight: 700, color: "#f8fafc", marginBottom: 12 }}>{proj.title}</h3>
        <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: 14, color: "#94a3b8", lineHeight: 1.6, marginBottom: 24 }}>{proj.desc}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {proj.tags.map((t, i) => (
            <span key={t} style={{
              fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: proj.color,
              padding: "4px 10px", borderRadius: 20, background: `${proj.color}10`, border: `1px solid ${proj.color}25`,
              transform: isHovered ? `translateY(${(i % 2 == 0 ? -2 : 2)}px)` : "translateY(0)",
              transition: `transform 0.3s ${i * 0.05}s`
            }}>
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function Projects() {
  const [hoveredIdx, setHoveredIdx] = useState(null);
  return (
    <section id="projects" style={{ padding: "100px 5vw", borderTop: "1px solid rgba(255,255,255,0.03)" }}>
      <div style={{ maxWidth: 1300, margin: "0 auto" }}>
        <SectionHeader tag="04 — Work" title="Featured Projects" sub="A selection of AI systems and apps built for real-world impact." />
        <div className="projects-bento" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20, perspective: 1200 }}>
          {PROJECTS.map((p, i) => {
            const isHovered = hoveredIdx === i;
            const isNeighbor = hoveredIdx !== null && Math.abs(hoveredIdx - i) === 1;

            return (
              <Reveal key={p.title} delay={i * 0.07} style={{ height: "100%" }}>
                <div
                  onMouseEnter={() => setHoveredIdx(i)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  style={{
                    height: "100%",
                    transform: isHovered ? "translateZ(30px)" : (isNeighbor ? `translateZ(-10px) rotateY(${hoveredIdx > i ? -3 : 3}deg)` : "translateZ(0) rotateY(0)"),
                    transition: "transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                    transformStyle: "preserve-3d"
                  }}
                >
                  <ProjectCard proj={p} isHovered={isHovered} isNeighbor={isNeighbor} hoveredIdx={hoveredIdx} myIdx={i} />
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   AI SHOWCASE
═══════════════════════════════════════════════════════════ */
const AI_SHOWCASE = [
  {
    title: "Mental Health AI Chatbot",
    icon: "🧠",
    color: "#8b5cf6",
    desc: "RAG-based chatbot with NLP emotional intelligence — retrieves contextual mental health knowledge and responds empathetically.",
    features: ["RAG Architecture", "Vector Search (FAISS)", "Context Memory", "LangChain Integration"],
    arch: [
      { label: "User Input", x: 10, y: 90, w: 90, color: "#06b6d4" },
      { label: "NLP Parser", x: 140, y: 90, w: 90, color: "#8b5cf6" },
      { label: "Embedder", x: 270, y: 60, w: 90, color: "#8b5cf6" },
      { label: "FAISS DB", x: 270, y: 130, w: 90, color: "#f59e0b" },
      { label: "LangChain", x: 400, y: 90, w: 90, color: "#10b981" },
      { label: "LLM Reply", x: 535, y: 90, w: 90, color: "#06b6d4" },
    ],
    arrows: [[100, 110, 140, 110], [230, 105, 270, 75], [230, 115, 270, 145], [360, 75, 400, 100], [360, 145, 400, 120], [490, 110, 535, 110]],
  },
  {
    title: "Pneumonia Detection AI",
    icon: "🫁",
    color: "#f59e0b",
    desc: "CNN pipeline trained on chest X-ray datasets. Grad-CAM highlights infected regions for explainable, medical-grade diagnosis.",
    features: ["CNN (TensorFlow)", "Data Augmentation", "Grad-CAM XAI", "Medical Imaging"],
    arch: [
      { label: "X-Ray Input", x: 10, y: 90, w: 90, color: "#06b6d4" },
      { label: "Augment", x: 140, y: 90, w: 80, color: "#8b5cf6" },
      { label: "Conv Layers", x: 260, y: 90, w: 95, color: "#f59e0b" },
      { label: "Pooling", x: 260, y: 165, w: 95, color: "#f59e0b" },
      { label: "Dense", x: 400, y: 90, w: 80, color: "#10b981" },
      { label: "Grad-CAM", x: 400, y: 165, w: 80, color: "#f43f5e" },
      { label: "Diagnosis", x: 530, y: 90, w: 90, color: "#06b6d4" },
    ],
    arrows: [[100, 110, 140, 110], [220, 110, 260, 110], [307, 140, 307, 165], [355, 110, 400, 110], [355, 180, 400, 180], [480, 110, 530, 110], [440, 165, 530, 120]],
  },
  {
    title: "AI Road Accident Detection",
    icon: "🚨",
    color: "#f43f5e",
    desc: "YOLOv8 real-time detection pipeline that processes live camera frames, classifies accident severity, and fires emergency alerts.",
    features: ["YOLOv8", "Real-time CV", "Severity Classifier", "Alert API"],
    arch: [
      { label: "Camera Feed", x: 10, y: 90, w: 95, color: "#06b6d4" },
      { label: "Frame Capture", x: 150, y: 90, w: 95, color: "#8b5cf6" },
      { label: "YOLOv8", x: 290, y: 90, w: 80, color: "#f43f5e" },
      { label: "Severity AI", x: 415, y: 90, w: 90, color: "#f59e0b" },
      { label: "Alert API", x: 550, y: 90, w: 85, color: "#10b981" },
    ],
    arrows: [[105, 110, 150, 110], [245, 110, 290, 110], [370, 110, 415, 110], [505, 110, 550, 110]],
  },
  {
    title: "Collaborative Code Editor",
    icon: "⌨️",
    color: "#10b981",
    desc: "Real-time multi-user editor powered by Yjs CRDTs for conflict-free sync, Monaco editor, Socket.io presence, and AI error explanation.",
    features: ["Yjs CRDTs", "Monaco Editor", "Socket.io", "AI Error Assist"],
    arch: [
      { label: "User A", x: 10, y: 60, w: 70, color: "#06b6d4" },
      { label: "User B", x: 10, y: 140, w: 70, color: "#8b5cf6" },
      { label: "Yjs CRDT", x: 130, y: 100, w: 90, color: "#10b981" },
      { label: "Socket.io", x: 270, y: 100, w: 90, color: "#f59e0b" },
      { label: "Monaco", x: 410, y: 60, w: 80, color: "#06b6d4" },
      { label: "AI Assist", x: 410, y: 140, w: 80, color: "#f43f5e" },
      { label: "Output", x: 545, y: 100, w: 75, color: "#10b981" },
    ],
    arrows: [[80, 70, 130, 105], [80, 150, 130, 115], [220, 115, 270, 115], [360, 110, 410, 75], [360, 115, 410, 155], [490, 75, 545, 110], [490, 155, 545, 120]],
  },
];

function ArchDiagram({ data, color }) {
  return (
    <svg viewBox="0 0 680 220" style={{ width: "100%", height: 110 }}>
      {data.arrows.map(([x1, y1, x2, y2], i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={`${color}60`} strokeWidth="1.5" markerEnd="url(#arr-small)" />
      ))}
      <defs>
        <marker id="arr-small" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
          <path d="M2 1L8 5L2 9" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        </marker>
      </defs>
      {data.arch.map((node, i) => (
        <g key={i}>
          <rect x={node.x} y={node.y - 16} width={node.w} height={32} rx="6" fill={`${node.color}18`} stroke={`${node.color}50`} strokeWidth="1" />
          <text x={node.x + node.w / 2} y={node.y + 5} textAnchor="middle" fontSize="9" fill={node.color} fontFamily="JetBrains Mono">{node.label}</text>
        </g>
      ))}
    </svg>
  );
}

function AIShowcase() {
  const [active, setActive] = useState(0);
  const proj = AI_SHOWCASE[active];
  return (
    <section style={{ padding: "80px 5vw", borderTop: "1px solid rgba(255,255,255,0.03)" }}>
      <div style={{ maxWidth: 1300, margin: "0 auto" }}>
        <SectionHeader tag="05 — AI Deep Dive" title="AI Project Showcase" sub="Interactive architecture breakdowns of key AI systems." />
        {/* Tab selector */}
        <div style={{ display: "flex", gap: 12, justifyContent: "center", marginBottom: 40, flexWrap: "wrap" }}>
          {AI_SHOWCASE.map((p, i) => (
            <button key={p.title} onClick={() => setActive(i)}
              style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, letterSpacing: 1, padding: "10px 20px", borderRadius: 10, border: `1px solid ${active === i ? p.color : "rgba(255,255,255,0.08)"}`, background: active === i ? `${p.color}15` : "transparent", color: active === i ? p.color : "#475569", cursor: "pointer", transition: "all 0.25s", display: "flex", alignItems: "center", gap: 8 }}>
              {p.icon} {p.title}
            </button>
          ))}
        </div>
        <Reveal>
          <div style={{ borderRadius: 20, background: "rgba(255,255,255,0.02)", border: `1px solid ${proj.color}25`, overflow: "hidden" }}>
            {/* Header */}
            <div style={{ padding: "28px 32px", borderBottom: "1px solid rgba(255,255,255,0.04)", display: "flex", alignItems: "center", gap: 20 }}>
              <div style={{ width: 52, height: 52, borderRadius: 14, background: `${proj.color}18`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, border: `1px solid ${proj.color}30` }}>{proj.icon}</div>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 20, color: "#e2e8f0", marginBottom: 6 }}>{proj.title}</h3>
                <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: 14, color: "#64748b" }}>{proj.desc}</p>
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", maxWidth: 280 }}>
                {proj.features.map(f => <span key={f} style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: 1.5, padding: "4px 10px", borderRadius: 4, border: `1px solid ${proj.color}30`, color: proj.color, background: proj.color + "0d" }}>{f}</span>)}
              </div>
            </div>
            {/* Architecture diagram */}
            <div style={{ padding: "28px 32px" }}>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, letterSpacing: 3, color: "#334155", marginBottom: 16, textTransform: "uppercase" }}>Architecture Diagram</div>
              <div style={{ background: "rgba(0,0,0,0.3)", borderRadius: 12, padding: "20px 16px", border: "1px solid rgba(255,255,255,0.04)" }}>
                <ArchDiagram data={proj} color={proj.color} />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   CERTIFICATIONS
═══════════════════════════════════════════════════════════ */
/* ═══════════════════════════════════════════════════════════
   CREDLY BADGES — ANIMATED FLIP GRID
═══════════════════════════════════════════════════════════ */

// Your 13 Credly badge IDs extracted from the URLs you provided
/* ═══════════════════════════════════════════════════════════
   CERTIFICATIONS SECTION
═══════════════════════════════════════════════════════════ */

const CERTIFICATIONS = [
  {
    title: "Microsoft AI & ML Engineering Professional Certificate",
    issuer: "Microsoft / Coursera",
    date: "June 2026",
    color: "#06b6d4",
    icon: courseraIcon,
    link: "https://www.credly.com/badges/9b47f3ae-face-44fb-a6f2-d6c0d5baef95/public_url",
  },
  {
    title: "AI Skills Fest 2026",
    issuer: "Microsoft",
    date: "June 2026",
    color: "#8b5cf6",
    icon: skillfestIcon,
    link: "https://www.credly.com/badges/4fe9b376-fdd6-472f-8ba0-8bc7b9bb6118/public_url",
  },
  {
    title: "Artificial Intelligence Fundamentals",
    issuer: "IBM SkillsBuild",
    date: "February 2026",
    color: "#10b981",
    icon: aiFunIcon,
    link: "https://www.credly.com/badges/1de169fa-f48d-43ef-ac38-6d581af6943c/public_url",
  },
  {
    title: "Machine Learning Methods & Tools",
    issuer: "IBM SkillsBuild",
    date: "June 2026",
    color: "#f59e0b",
    icon: mlMethIcon,
    link: "https://www.credly.com/badges/9e52b7b1-314a-4d4a-b4a8-a589c3271d9c/public_url",
  },
  {
    title: "Python for Data Science",
    issuer: "IBM",
    date: "December 2025",
    color: "#f43f5e",
    icon: dataScIcon,
    link: "https://www.credly.com/badges/17c972ba-af82-4f6e-81aa-2f8b7821aec7/public_url",
  },
  {
    title: "AWS Cloud Quest",
    issuer: "Amazon Web Services",
    date: "January 2026",
    color: "#06b6d4",
    icon: awsIcon,
    link: "https://www.credly.com/badges/e58b7ca3-5d5b-4c0d-a9ae-d8296564ab53/public_url",
  },
  {
    title: "Google AI Fundamentals",
    issuer: "Google",
    date: "April 2026",
    color: "#8b5cf6",
    icon: googAiIcon,
    link: "https://www.credly.com/badges/034e18c4-029a-4d3b-a900-244945ce971b/public_url",
  },
  {
    title: "Web Development Fundamentals",
    issuer: "IBM SkillsBuild",
    date: "December 2025",
    color: "#10b981",
    icon: webDeIcon,
    link: "https://www.credly.com/badges/98c6db41-39a5-4046-b5a6-875e3bda66c6/public_url",
  },
  {
    title: "Data Analytics for Machine Learning",
    issuer: "IBM SkillsBuild",
    date: "February 2026",
    color: "#f59e0b",
    icon: dataAnaIcon,
    link: "https://www.credly.com/badges/c81e90fd-707d-47e8-afd6-aaba9041e887/public_url",
  },
];

const PDF_CERTIFICATES = [
  { title: "Microsoft AI & ML Engineering Professional", issuer: "Microsoft", file: "/pdfs/Microsoft_AI_ML_cert.pdf", color: "#06b6d4", icon: "🧠", img: certImg1 },
  { title: "Google AI Fundamentals", issuer: "Google", file: "/pdfs/Google_AI_fund.pdf", color: "#8b5cf6", icon: "🌐", img: certImg2 },
  { title: "Artificial Intelligence Fundamentals", issuer: "IBM", file: "/pdfs/IBMDesign20260719-8-kndgqc.pdf", color: "#10b981", icon: "⚙️", img: certImg3 },
  { title: "Machine Learning Methods & Tools", issuer: "IBM", file: "/pdfs/IBMDesign20260719-8-mrbuto.pdf", color: "#f59e0b", icon: "🤖", img: certImg4 },
  { title: "Flutter Capstone Project", issuer: "Coursera", file: "/pdfs/Flutter_Capstone_cert.pdf", color: "#f43f5e", icon: "📱", img: certImg5 },
  { title: "IBM Edunet AICTE Certificate", issuer: "AICTE", file: "/pdfs/AICTE B7 PD Certificate-632.pdf", color: "#06b6d4", icon: "🎓", img: certImg6 },
  { title: "Venura Internship Certificate", issuer: "Venura", file: "/pdfs/Internship Certificate.pdf", color: "#10b981", icon: "💼", img: certImg7 },
  { title: "Elevate Labs Internship Certificate", issuer: "Elevate Labs", file: "/pdfs/AIML 1 (1)_compressed-74.pdf", color: "#0ea5e9", icon: "🔖", img: certImg8 },
];

function Certifications() {
  return (
    <section
      id="certifications"
      style={{ padding: "100px 5vw", borderTop: "1px solid rgba(255,255,255,.04)" }}
    >
      <div style={{ maxWidth: 1300, margin: "0 auto" }}>
        <SectionHeader
          tag="06 - Certifications"
          title="Verified Credentials"
          sub="Industry-recognized certifications from Microsoft, IBM, AWS and Google."
        />

        {/* PDF Certificates Horizontal Deck */}
        <PDFStack />
      </div>
    </section>
  );
}

function PDFStack() {
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const centerIdx = Math.floor(PDF_CERTIFICATES.length / 2);

  return (
    <div style={{ marginTop: 40, overflow: "visible", paddingBottom: 40, position: "relative" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          height: 450,
        }}
        onMouseLeave={() => setHoveredIdx(null)}
      >
        {PDF_CERTIFICATES.map((pdf, i) => {
          const isHovered = hoveredIdx === i;
          const baseOffset = i - centerIdx;

          let translateX = baseOffset * 55;
          let translateY = Math.abs(baseOffset) * 6;
          let rotate = baseOffset * 4;
          let scale = 1;
          let zIndex = i;
          let opacity = 1;

          if (hoveredIdx !== null) {
            if (isHovered) {
              scale = 1.15;
              translateY = -50;
              rotate = 0;
              zIndex = 100;
            } else {
              const pushDir = i < hoveredIdx ? -1 : 1;
              translateX = (baseOffset * 55) + (pushDir * 100);
              rotate = baseOffset * 2;
              opacity = 0.6;
              if (Math.abs(i - hoveredIdx) > 2) {
                translateX += pushDir * 40;
                opacity = 0.3;
              }
            }
          }

          return (
            <a
              key={pdf.title}
              href={pdf.file}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setHoveredIdx(i)}
              style={{
                position: "absolute",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: 300,
                height: 380,
                padding: "24px 16px",
                borderRadius: 16,
                background: "rgba(10, 15, 30, 0.8)",
                border: `1px solid ${isHovered ? pdf.color : 'rgba(255,255,255,0.1)'}`,
                boxShadow: isHovered ? `0 20px 40px ${pdf.color}40, inset 0 0 20px ${pdf.color}10` : "0 10px 30px rgba(0,0,0,0.5)",
                textDecoration: "none",
                transition: "all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)",
                transform: `translateX(${translateX}px) translateY(${translateY}px) scale(${scale}) rotate(${rotate}deg)`,
                zIndex: zIndex,
                opacity: opacity,
                backdropFilter: "blur(12px)",
                cursor: "pointer",
              }}
            >
              <div style={{ width: "100%", height: 220, marginBottom: 16, borderRadius: 8, overflow: "hidden", border: `1px solid rgba(255,255,255,0.1)`, position: "relative", background: "rgba(0,0,0,0.3)" }}>
                {pdf.img ? (
                  <img src={pdf.img} alt={pdf.title} style={{ width: "100%", height: "100%", objectFit: "cover", opacity: isHovered ? 1 : 0.7, transition: "all 0.3s", transform: isHovered ? "scale(1.05)" : "scale(1)" }} />
                ) : (
                  <div style={{ fontSize: 54, display: "flex", alignItems: "center", justifyContent: "center", height: "100%", filter: isHovered ? `drop-shadow(0 0 15px ${pdf.color}80)` : "none", transition: "all 0.3s" }}>{pdf.icon}</div>
                )}
              </div>
              <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 14, color: "#f1f5f9", textAlign: "center", marginBottom: 6, lineHeight: 1.3 }}>
                {pdf.title}
              </div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: pdf.color, textAlign: "center", marginTop: "auto", textTransform: "uppercase", letterSpacing: 1 }}>
                {pdf.issuer}
              </div>
              <div style={{
                marginTop: 16, fontSize: 11, color: "#fff",
                background: isHovered ? `${pdf.color}40` : `${pdf.color}30`,
                padding: "6px 16px", borderRadius: 20, opacity: isHovered ? 1 : 0,
                transition: "all 0.3s",
                fontFamily: "'JetBrains Mono',monospace",
                boxShadow: isHovered ? `0 0 15px ${pdf.color}80, inset 0 0 8px ${pdf.color}40` : "none",
                textShadow: isHovered ? `0 0 5px ${pdf.color}` : "none",
                border: `1px solid ${isHovered ? pdf.color : 'transparent'}`,
              }}>
                View PDF ↗
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}

function CertificationCard({ cert }) {
  const [hov, setHov] = useState(false);
  const [ripple, setRipple] = useState(null);

  const triggerRipple = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    setRipple({ x: e.clientX - r.left, y: e.clientY - r.top });
    setTimeout(() => setRipple(null), 600);
  };

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position: "relative",
        background: hov ? "rgba(255,255,255,0.045)" : "rgba(255,255,255,0.025)",
        border: `1px solid ${hov ? cert.color + "55" : cert.color + "28"}`,
        borderRadius: 18,
        padding: 24,
        backdropFilter: "blur(18px)",
        transition: "all 0.35s cubic-bezier(.22,1,.36,1)",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        transform: hov ? "translateY(-3px)" : "translateY(0)",
        boxShadow: hov ? `0 12px 40px ${cert.color}18, 0 0 0 1px ${cert.color}18` : "none",
      }}
    >
      {/* Animated gradient top bar */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 2,
        background: `linear-gradient(90deg, transparent, ${cert.color}, transparent)`,
        opacity: hov ? 1 : 0.35,
        transition: "opacity 0.3s",
      }} />

      {/* Corner glow */}
      <div style={{
        position: "absolute", top: -30, right: -30, width: 110, height: 110,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${cert.color}18 0%, transparent 70%)`,
        opacity: hov ? 1 : 0,
        transition: "opacity 0.4s",
        pointerEvents: "none",
      }} />

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20, position: "relative", zIndex: 1 }}>
        {/* Icon box */}
        <div style={{
          width: 56, height: 56, borderRadius: 14,
          background: `${cert.color}18`,
          border: `1px solid ${cert.color}35`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 26, flexShrink: 0,
          transition: "transform 0.3s cubic-bezier(.22,1,.36,1)",
          transform: hov ? "scale(1.1) rotate(5deg)" : "scale(1) rotate(0deg)",
        }}>
          {typeof cert.icon === 'string' && cert.icon.length < 5 ? cert.icon : <img src={cert.icon} alt={cert.title} style={{ width: 40, height: 40, objectFit: "contain" }} />}
        </div>

        {/* Verified badge */}
        <div style={{
          display: "flex", alignItems: "center", gap: 5,
          padding: "4px 10px", borderRadius: 20,
          background: `${cert.color}12`,
          border: `1px solid ${cert.color}35`,
        }}>
          <span style={{ width: 5, height: 5, borderRadius: "50%", background: cert.color, display: "inline-block", boxShadow: `0 0 6px ${cert.color}` }} />
          <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 8, color: cert.color, letterSpacing: 2, textTransform: "uppercase" }}>Verified</span>
        </div>
      </div>

      {/* Title */}
      <h3 style={{
        fontFamily: "'Syne',sans-serif", fontWeight: 700,
        fontSize: "clamp(0.9rem,1.8vw,1.05rem)",
        color: "#f1f5f9", lineHeight: 1.35,
        marginBottom: 8, position: "relative", zIndex: 1,
      }}>
        {cert.title}
      </h3>

      {/* Issuer */}
      <p style={{
        fontFamily: "'JetBrains Mono',monospace", fontSize: 10,
        color: cert.color, letterSpacing: 1,
        marginBottom: 6, position: "relative", zIndex: 1,
      }}>
        {cert.issuer}
      </p>

      {/* Date */}
      <p style={{
        fontFamily: "'JetBrains Mono',monospace", fontSize: 9,
        color: "#475569", letterSpacing: 1.5,
        marginBottom: 20, position: "relative", zIndex: 1,
      }}>
        Issued {cert.date}
      </p>

      {/* Spacer */}
      <div style={{ flex: 1 }} />

      {/* CTA button */}
      <a
        href={cert.link}
        target="_blank"
        rel="noopener noreferrer"
        onClick={triggerRipple}
        aria-label={`Verify certificate: ${cert.title}`}
        style={{
          display: "inline-flex", alignItems: "center", justifyContent: "center",
          gap: 8, padding: "11px 20px", borderRadius: 10,
          textDecoration: "none",
          fontFamily: "'JetBrains Mono',monospace", fontSize: 10,
          fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase",
          background: hov ? cert.color : `${cert.color}18`,
          color: hov ? "#03040f" : cert.color,
          border: `1px solid ${cert.color}60`,
          transition: "all 0.28s cubic-bezier(.22,1,.36,1)",
          position: "relative", overflow: "hidden", zIndex: 1,
          boxShadow: hov ? `0 4px 20px ${cert.color}40` : "none",
        }}
      >
        {ripple && (
          <span style={{
            position: "absolute",
            left: ripple.x - 70, top: ripple.y - 70,
            width: 140, height: 140, borderRadius: "50%",
            background: "rgba(255,255,255,0.2)",
            animation: "certRipple 0.6s ease-out forwards",
            pointerEvents: "none",
          }} />
        )}
        Verify on Credly ↗
      </a>

      <style>{`
        @keyframes certRipple {
          from { transform: scale(0); opacity: 1; }
          to   { transform: scale(2.5); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   EXPERIENCE TIMELINE
═══════════════════════════════════════════════════════════ */
const TIMELINE = [
  {
    year: "2026",
    title: "RAG Systems & Real-time Collaboration",
    desc: "Built the Mental Health AI Chatbot (RAG + FAISS + LangChain) and Collaborative Code Editor (React + Monaco + Yjs + Socket.io) — two complex, production-architecture systems.",
    icon: "🗂️", color: "#06b6d4",
    tags: ["RAG", "LangChain", "FAISS", "Yjs", "Socket.io", "React"],
  },
  {
    year: "2026",
    title: "Computer Vision & Medical AI",
    desc: "Developed the AI Road Accident Detection system using YOLOv8 for real-time alerts, and the Pneumonia Detection AI with CNN + Grad-CAM explainability on chest X-ray datasets.",
    icon: "👁️", color: "#8b5cf6",
    tags: ["YOLOv8", "OpenCV", "CNN", "TensorFlow", "Medical AI"],
  },

  {
    year: "2025",
    title: "AI/ML & Python Foundations",
    desc: "Deep dive into machine learning — Python, TensorFlow, Scikit-Learn, data pipelines, and foundational model building. First steps into Computer Vision and NLP.",
    icon: "🧪", color: "#f59e0b",
    tags: ["Python", "TensorFlow", "Scikit-Learn", "NLP", "CV"],
  },
  {
    year: "2024",
    title: "Flutter & Full-Stack Development",
    desc: "Shipped the Flutter AI Chatbot (cross-platform iOS/Android + Node.js backend) and the Elevate Task Manager Python productivity tool.",
    icon: "📱", color: "#10b981",
    tags: ["Flutter", "Dart", "Node.js", "Express", "Python"],
  },
];
function Experience() {
  return (
    <section id="experience" style={{ padding: "100px 5vw", borderTop: "1px solid rgba(255,255,255,0.03)" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <SectionHeader tag="07 — Journey" title="Experience Timeline" />
        <div style={{ position: "relative", paddingLeft: 40 }}>
          <div style={{ position: "absolute", left: 12, top: 0, bottom: 0, width: 1, background: "linear-gradient(180deg,#06b6d4,#8b5cf6,#10b981,#f59e0b)" }} />
          {TIMELINE.map((t, i) => (
            <Reveal key={t.year} delay={i * 0.15}>
              <div style={{ marginBottom: 48, position: "relative" }}>
                <div style={{ position: "absolute", left: -34, top: 8, width: 14, height: 14, borderRadius: "50%", background: t.color, boxShadow: `0 0 20px ${t.color}80`, border: "2px solid #03040f" }} />
                <div style={{ padding: "24px 28px", borderRadius: 16, background: "rgba(255,255,255,0.02)", border: `1px solid ${t.color}20`, transition: "all 0.3s" }}
                  onMouseEnter={e => { e.currentTarget.style.background = `${t.color}06`; e.currentTarget.style.borderColor = `${t.color}40`; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.02)"; e.currentTarget.style.borderColor = `${t.color}20`; }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                    <span style={{ fontSize: 20 }}>{t.icon}</span>
                    <div>
                      <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 16, color: "#e2e8f0" }}>{t.title}</div>
                      <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: t.color, letterSpacing: 2 }}>{t.year}</div>
                    </div>
                  </div>
                  <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: 14, color: "#64748b", lineHeight: 1.75, marginBottom: 16 }}>{t.desc}</p>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {t.tags.map(tag => <span key={tag} style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: 1.5, padding: "3px 8px", borderRadius: 4, border: `1px solid ${t.color}30`, color: t.color, background: t.color + "0d" }}>{tag}</span>)}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   GITHUB ANALYTICS
═══════════════════════════════════════════════════════════ */
function GithubDashboard() {
  const stats = [
    { label: "Repositories", val: 8, icon: "📁", color: "#06b6d4" },
    //{ label: "Total Commits", val: 340, icon: "📝", color: "#10b981" },
    { label: "Contributions", val: 150, suffix: "+", icon: "🔥", color: "#f43f5e" },
  ];
  const langs = [
    { l: "Python", p: 45, c: "#3b82f6" },
    { l: "Dart / Flutter", p: 25, c: "#06b6d4" },
    { l: "JavaScript / TS", p: 20, c: "#f59e0b" },
    { l: "Other", p: 10, c: "#475569" },
  ];
  return (
    <section style={{ padding: "80px 5vw", borderTop: "1px solid rgba(255,255,255,0.03)" }}>
      <div style={{ maxWidth: 1300, margin: "0 auto" }}>
        <SectionHeader tag="08 — Analytics" title="GitHub Dashboard" sub={<>Real stats from <a href="https://github.com/Dev-MrV" target="_blank" rel="noopener noreferrer" style={{ color: "#06b6d4" }}>Dev-MrV</a></>} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }} className="skills-grid">
          {/* Stats */}
          <Reveal>
            <div style={{ padding: "28px", borderRadius: 20, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, letterSpacing: 3, color: "#475569", marginBottom: 20, textTransform: "uppercase" }}>Repository Stats</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                {stats.map(s => (
                  <div key={s.label} style={{ padding: "16px", borderRadius: 12, background: `${s.color}0a`, border: `1px solid ${s.color}20`, textAlign: "center" }}>
                    <div style={{ fontSize: 24, marginBottom: 6 }}>{s.icon}</div>
                    <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "1.4rem", color: s.color }}><Counter to={s.val} suffix={s.suffix || ""} /></div>
                    <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, color: "#475569", marginTop: 4, letterSpacing: 1, textTransform: "uppercase" }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
          {/* Languages */}
          <Reveal delay={0.2}>
            <div style={{ padding: "28px", borderRadius: 20, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, letterSpacing: 3, color: "#475569", marginBottom: 20, textTransform: "uppercase" }}>Language Usage</div>
              {langs.map((l, i) => (
                <div key={l.l} style={{ marginBottom: 16 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                    <span style={{ fontFamily: "'Outfit',sans-serif", fontSize: 13, color: "#94a3b8", display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ width: 8, height: 8, borderRadius: "50%", background: l.c, display: "inline-block" }} />{l.l}
                    </span>
                    <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: l.c }}>{l.p}%</span>
                  </div>
                  <SkillBar name="" pct={l.p} color={l.c} delay={i} />
                </div>
              ))}
              <div style={{ marginTop: 20 }}>
                <a href="https://github.com/Dev-MrV" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "#06b6d4", textDecoration: "none", padding: "10px 18px", border: "1px solid rgba(6,182,212,0.3)", borderRadius: 8, transition: "all 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(6,182,212,0.08)"}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                  View GitHub Profile ↗
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   CONTACT
═══════════════════════════════════════════════════════════ */
// ── EmailJS config — paste your 3 keys here ──────────────────
const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";   // e.g. "service_abc123"
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";  // e.g. "template_xyz789"
const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY";   // e.g. "aBcDeFgHiJkLmNoP"
// ─────────────────────────────────────────────────────────────

// Lazy-load EmailJS from CDN (no npm needed)
function loadEmailJS() {
  return new Promise((resolve, reject) => {
    if (window.emailjs) { resolve(window.emailjs); return; }
    const s = document.createElement("script");
    s.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";
    s.onload = () => { window.emailjs.init(EMAILJS_PUBLIC_KEY); resolve(window.emailjs); };
    s.onerror = reject;
    document.head.appendChild(s);
  });
}

function Contact() {
  const formRef = useRef(null);
  const [submitting, setSubmitting] = useState(false);
  const [dissolved, setDissolved] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "bd7616ac-7f4b-4e01-83ed-07e9455072b0",
          name: e.target.user_name.value,
          email: e.target.user_email.value,
          message: e.target.message.value,
        }),
      });

      const result = await response.json();
      if (result.success) {
        setDissolved(true);
      } else {
        console.error("Submission failed:", result);
        alert("Failed to send transmission. Check the console for details.");
        setSubmitting(false);
      }
    } catch (error) {
      console.error("Transmission error:", error);
      alert("Transmission error. Please try again later.");
      setSubmitting(false);
    }
  };

  const inputStyle = { width: "100%", padding: "16px 20px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 12, color: "#f8fafc", fontFamily: "'Outfit',sans-serif", fontSize: 15, outline: "none", transition: "border-color 0.3s, box-shadow 0.3s" };

  return (
    <section id="contact" style={{ padding: "100px 5vw", borderTop: "1px solid rgba(255,255,255,0.03)", position: "relative", overflow: "hidden" }}>
      {/* Background EKG Line */}
      <svg style={{ position: "absolute", top: "50%", left: 0, width: "100%", height: "200px", transform: "translateY(-50%)", opacity: 0.05, pointerEvents: "none" }} preserveAspectRatio="none" viewBox="0 0 1000 200">
        <path d="M0,100 L400,100 L420,50 L440,150 L460,80 L480,120 L500,100 L1000,100" fill="none" stroke="#06b6d4" strokeWidth="4" strokeDasharray="1000" strokeDashoffset="1000">
          <animate attributeName="stroke-dashoffset" values="1000; -1000" dur="4s" repeatCount="indefinite" />
        </path>
      </svg>
      <div style={{ maxWidth: 800, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <SectionHeader tag="09 — Contact" title="Initialize Secure Channel" sub="Interested in collaborating on AI or real-time systems? Send a transmission." />
        <Reveal>
          <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 24, padding: "48px 5vw", backdropFilter: "blur(20px)" }}>
            <form ref={formRef} onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }} className="contact-grid">
                <input type="text" name="user_name" placeholder="Agent Name" style={inputStyle} onFocus={(e) => { e.target.style.borderColor = "#06b6d4"; e.target.style.boxShadow = "0 0 15px rgba(6,182,212,0.3)"; }} onBlur={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.05)"; e.target.style.boxShadow = "none"; }} required />
                <input type="email" name="user_email" placeholder="Comms Link (Email)" style={inputStyle} onFocus={(e) => { e.target.style.borderColor = "#8b5cf6"; e.target.style.boxShadow = "0 0 15px rgba(139,92,246,0.3)"; }} onBlur={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.05)"; e.target.style.boxShadow = "none"; }} required />
              </div>
              <textarea name="message" placeholder="Encrypted Payload (Message)" rows={6} style={{ ...inputStyle, resize: "none" }} onFocus={(e) => { e.target.style.borderColor = "#10b981"; e.target.style.boxShadow = "0 0 15px rgba(16,185,129,0.3)"; }} onBlur={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.05)"; e.target.style.boxShadow = "none"; }} required />
              <button
                type="submit" disabled={submitting}
                style={{
                  padding: "16px 32px", background: "linear-gradient(135deg,#06b6d4,#8b5cf6)",
                  border: "none", borderRadius: 12, color: "#fff", fontFamily: "'Syne',sans-serif", fontSize: 16, fontWeight: 700,
                  cursor: "none", transition: "transform 0.2s",
                  position: "relative", overflow: "hidden",
                  width: "100%", opacity: dissolved ? 0 : 1, transform: submitting && !dissolved ? "scale(0.95)" : "scale(1)"
                }}
              >
                {submitting ? "TRANSMITTING..." : "Transmit"}
                {submitting && (
                  <div style={{ position: "absolute", inset: 0, background: "rgba(255,255,255,0.2)", animation: "liquidShimmer 1s linear infinite" }} />
                )}
              </button>
              {dissolved && (
                <div style={{ textAlign: "center", color: "#10b981", fontFamily: "'JetBrains Mono',monospace", marginTop: 10, animation: "fadeUp 0.5s ease" }}>TRANSMISSION CONFIRMED ✓</div>
              )}
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   AI CHATBOT
═══════════════════════════════════════════════════════════ */
const BOT_KNOWLEDGE = {
  projects:
    "Mr V has built: AI Road Accident Detection (YOLOv8, real-time accident detection with alerts), Pneumonia Detection System (CNN-based medical imaging AI), Mental Health AI chatbot (RAG + NLP-based emotional support system), Collaborative Code Editor (React + Monaco + Yjs real-time multi-user editor), Flutter AI Chatbot (cross-platform mobile app with Node.js backend), and Elevate Task Manager (Python productivity tool).",
  skills:
    "Core skills include Python, TensorFlow, PyTorch, OpenCV, YOLOv8, LangChain, RAG systems, FAISS, NLP, React, Node.js, Express, MongoDB, JavaScript, TypeScript, Flutter, Dart, Firebase, Supabase, and real-time systems using Socket.io and Yjs.",
  experience:
    "Experience in AI/ML engineering, computer vision systems, medical imaging AI, real-time collaborative applications, full-stack development, and mobile app development using Flutter. Strong focus on production-ready AI systems and scalable architectures.",
  contact:
    "Contact via GitHub: Dev-MrV. Open to AI/ML, full-stack, and mobile development collaborations.",
  about:
    "Mr V is an AI Engineer and Full-Stack Developer specializing in Computer Vision, NLP, RAG systems, and real-time applications. Focused on building production-grade AI systems and scalable web/mobile applications.",
};

function Chatbot() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState([{ role: "bot", text: "Hey! I'm Mr V's AI assistant 🤖 Ask me anything about his projects, skills, or experience!" }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs]);

  const send = async () => {
    if (!input.trim() || loading) return;
    const q = input.trim();
    setMsgs(m => [...m, { role: "user", text: q }]);
    setInput("");
    setLoading(true);
    try {
      const qLower = q.toLowerCase();
      let reply = "I'm still learning! But you can ask me specifically about Mr V's projects, skills, experience, or how to contact him.";

      if (qLower.includes("project") || qLower.includes("work") || qLower.includes("build") || qLower.includes("portfolio")) {
        reply = BOT_KNOWLEDGE.projects;
      } else if (qLower.includes("skill") || qLower.includes("tech") || qLower.includes("stack") || qLower.includes("language") || qLower.includes("framework")) {
        reply = BOT_KNOWLEDGE.skills;
      } else if (qLower.includes("experience") || qLower.includes("background") || qLower.includes("history")) {
        reply = BOT_KNOWLEDGE.experience;
      } else if (qLower.includes("contact") || qLower.includes("hire") || qLower.includes("reach") || qLower.includes("github") || qLower.includes("email")) {
        reply = BOT_KNOWLEDGE.contact;
      } else if (qLower.includes("who is") || qLower.includes("about") || qLower.includes("mr v")) {
        reply = BOT_KNOWLEDGE.about;
      } else if (qLower.includes("hello") || qLower.includes("hi") || qLower.includes("hey")) {
        reply = "Hello! Ask me about Mr V's projects, skills, or experience!";
      }

      // Simulate processing delay
      setTimeout(() => {
        setMsgs(m => [...m, { role: "bot", text: reply }]);
        setLoading(false);
      }, 600);
    } catch {
      setMsgs(m => [...m, { role: "bot", text: "Ask me about Mr V's projects, skills, or experience!" }]);
      setLoading(false);
    }
  };

  const suggestions = ["What are his projects?", "What are his skills?", "How to contact?"];

  return (
    <>
      {/* FAB */}
      <button onClick={() => setOpen(!open)} style={{ position: "fixed", bottom: 32, right: 80, width: 52, height: 52, borderRadius: "50%", background: "linear-gradient(135deg,#06b6d4,#8b5cf6)", border: "none", cursor: "pointer", zIndex: 9000, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, boxShadow: "0 0 30px rgba(6,182,212,0.5)", transition: "transform 0.2s, box-shadow 0.2s", animation: "pulse-glow 3s ease-in-out infinite" }}
        onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.1)"; }} onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; }}>
        {open ? "✕" : "🤖"}
      </button>
      {/* Panel */}
      {open && (
        <div style={{ position: "fixed", bottom: 100, right: 20, width: 360, maxHeight: 500, borderRadius: 20, background: "rgba(3,4,15,0.97)", border: "1px solid rgba(6,182,212,0.2)", backdropFilter: "blur(20px)", boxShadow: "0 20px 60px rgba(0,0,0,0.6),0 0 40px rgba(6,182,212,0.1)", zIndex: 8999, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          <div style={{ padding: "16px 20px", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg,#06b6d4,#8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🤖</div>
            <div>
              <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 13, color: "#e2e8f0" }}>MrV AI Assistant</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, color: "#10b981", letterSpacing: 2 }}>● ONLINE</div>
            </div>
          </div>
          <div style={{ flex: 1, overflowY: "auto", padding: "16px", display: "flex", flexDirection: "column", gap: 12 }}>
            {msgs.map((m, i) => (
              <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
                <div style={{ maxWidth: "80%", padding: "10px 14px", borderRadius: m.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px", background: m.role === "user" ? "linear-gradient(135deg,#06b6d4,#8b5cf6)" : "rgba(255,255,255,0.05)", fontFamily: "'Outfit',sans-serif", fontSize: 13, color: m.role === "user" ? "#fff" : "#94a3b8", lineHeight: 1.6, textAlign: m.role === "user" ? "right" : "left" }}>{m.text}</div>
              </div>
            ))}
            {loading && <div style={{ display: "flex", justifyContent: "flex-start" }}><div style={{ padding: "10px 14px", borderRadius: "16px 16px 16px 4px", background: "rgba(255,255,255,0.05)", color: "#475569", fontFamily: "'JetBrains Mono',monospace", fontSize: 13 }}>thinking...</div></div>}
            <div ref={endRef} />
          </div>
          {/* Quick suggests */}
          <div style={{ padding: "8px 16px", display: "flex", gap: 6, flexWrap: "wrap" }}>
            {suggestions.map(s => <button key={s} onClick={() => { setInput(s); }} style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, color: "#06b6d4", padding: "4px 10px", borderRadius: 12, border: "1px solid rgba(6,182,212,0.25)", background: "rgba(6,182,212,0.05)", cursor: "pointer" }}>{s}</button>)}
          </div>
          <div style={{ padding: "12px 16px", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", gap: 8 }}>
            <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && send()} placeholder="Ask about Mr V..." style={{ flex: 1, fontFamily: "'Outfit',sans-serif", fontSize: 13, color: "#e2e8f0", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, padding: "10px 14px", outline: "none" }} />
            <button onClick={send} style={{ width: 38, height: 38, borderRadius: 10, background: "linear-gradient(135deg,#06b6d4,#8b5cf6)", border: "none", cursor: "pointer", color: "#fff", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>↑</button>
          </div>
        </div>
      )}
    </>
  );
}

/* ═══════════════════════════════════════════════════════════
   BACK TO TOP
═══════════════════════════════════════════════════════════ */
function BackToTop() {
  const [show, setShow] = useState(false);
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const fn = () => {
      const d = document.documentElement;
      const progress = d.scrollTop / (d.scrollHeight - d.clientHeight) * 100;
      setShow(d.scrollTop > 500);
      setPct(progress);
    };
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  if (!show) return null;
  const r = 18, circ = 2 * Math.PI * r;
  return (
    <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      style={{ position: "fixed", bottom: 32, right: 24, width: 48, height: 48, borderRadius: "50%", background: "rgba(3,4,15,0.9)", border: "none", cursor: "pointer", zIndex: 998, display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(12px)", transition: "transform 0.2s" }}
      onMouseEnter={e => e.currentTarget.style.transform = "scale(1.1)"}
      onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>
      <svg width="48" height="48" style={{ position: "absolute", top: 0, left: 0, transform: "rotate(-90deg)" }}>
        <circle cx="24" cy="24" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="2" />
        <circle cx="24" cy="24" r={r} fill="none" stroke="url(#btg)" strokeWidth="2" strokeDasharray={circ} strokeDashoffset={circ * (1 - pct / 100)} strokeLinecap="round" style={{ transition: "stroke-dashoffset 0.2s" }} />
        <defs>
          <linearGradient id="btg" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>
      </svg>
      <span style={{ color: "#06b6d4", fontSize: 14, position: "relative", zIndex: 1 }}>↑</span>
    </button>
  );
}

/* ═══════════════════════════════════════════════════════════
   FOOTER
═══════════════════════════════════════════════════════════ */
function Footer() {
  return (
    <footer style={{ borderTop: "1px solid rgba(255,255,255,0.04)", background: "rgba(0,0,0,0.3)" }}>
      {/* Gradient line */}
      <div style={{ height: 1, background: "linear-gradient(90deg,transparent,#06b6d4,#8b5cf6,#10b981,transparent)" }} />
      <div style={{ maxWidth: 1300, margin: "0 auto", padding: "40px 5vw 32px", display: "flex", flexWrap: "wrap", gap: 24, alignItems: "center", justifyContent: "space-between" }}>
        {/* Brand */}
        <div>
          <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 20, background: "linear-gradient(135deg,#06b6d4,#8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: 6 }}>MR V</div>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "#1e293b", letterSpacing: 2 }}>AI ENGINEER · FLUTTER DEVELOPER</div>
        </div>
        {/* Links */}
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
          {[
            { label: "GitHub", href: "https://github.com/Dev-MrV", icon: "⬡" },
            { label: "LinkedIn", href: "https://www.linkedin.com/in/mrinal-v/", icon: "in" },
            { label: "Projects", href: "#projects", icon: "🚀" },
            { label: "Contact", href: "#contact", icon: "✉" },
          ].map(l => (
            <a key={l.label} href={l.href} target={l.href.startsWith("http") ? "_blank" : "_self"} rel="noopener noreferrer"
              style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "#334155", letterSpacing: 2, textDecoration: "none", display: "flex", alignItems: "center", gap: 6, transition: "color 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.color = "#06b6d4"}
              onMouseLeave={e => e.currentTarget.style.color = "#334155"}>
              <span style={{ fontSize: 12 }}>{l.icon}</span>{l.label}
            </a>
          ))}
        </div>
        {/* Copyright */}
        <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "#1e293b", letterSpacing: 2 }}>
          © 2026 MR V · BUILT WITH PRECISION & AI
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════════
   AMBIENT GLOW LAYER (decorative bg blobs)
═══════════════════════════════════════════════════════════ */
function AmbientLayer() {
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
      {[
        { top: "20%", left: "-5%", color: "rgba(6,182,212,0.04)", size: 600 },
        { top: "55%", right: "-8%", color: "rgba(139,92,246,0.04)", size: 700 },
        { top: "80%", left: "30%", color: "rgba(16,185,129,0.03)", size: 500 },
      ].map((b, i) => (
        <div key={i} style={{
          position: "absolute", top: b.top, left: b.left, right: b.right,
          width: b.size, height: b.size, borderRadius: "50%",
          background: `radial-gradient(circle, ${b.color} 0%, transparent 70%)`,
          filter: "blur(80px)",
          animation: `float ${6 + i * 2}s ease-in-out infinite`,
          animationDelay: `${i * 1.5}s`,
        }} />
      ))}
    </div>
  );
}


/* ═══════════════════════════════════════════════════════════
   LIQUID METAL TRANSITION
═══════════════════════════════════════════════════════════ */
function LiquidTransition() {
  const canvasRef = useRef(null);
  const [active, setActive] = useState(true);
  const time = useRef(0);
  const progressRef = useRef(1);

  useEffect(() => {
    const onNav = () => {
      setActive(true);
      progressRef.current = 1;
      setTimeout(() => { setActive(false); time.current = 0; }, 1500);
    };
    window.addEventListener('liquid-transition', onNav);

    // Deactivate initial load
    setTimeout(() => { setActive(false); time.current = 0; }, 1500);
    return () => window.removeEventListener('liquid-transition', onNav);
  }, []);

  useAnimationFrame((delta) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Resize check inside RAF
    if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    if (!active && time.current > 1) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      return;
    }

    time.current += delta * 0.001;

    // Easing for wipe effect
    if (active) {
      progressRef.current = Math.min(progressRef.current + delta * 0.002, 1);
    } else {
      progressRef.current = Math.max(progressRef.current - delta * 0.0015, 0);
    }

    const p = progressRef.current;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (p <= 0) return;

    // Liquid Wipe
    ctx.fillStyle = '#03040f';
    ctx.fillRect(0, 0, canvas.width, canvas.height * p);

    // Metal edge
    const grad = ctx.createLinearGradient(0, canvas.height * p - 60, 0, canvas.height * p);
    grad.addColorStop(0, 'transparent');
    grad.addColorStop(0.3, 'rgba(6,182,212,0.4)');
    grad.addColorStop(0.8, 'rgba(139,92,246,0.6)');
    grad.addColorStop(1, 'rgba(255,255,255,0.9)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height * p);

    // Chromatic Aberration flash on reveal
    if (!active && p > 0.6) {
      const flash = (p - 0.6) / 0.4;
      ctx.fillStyle = `rgba(255,0,50,${flash * 0.1})`; ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = `rgba(0,255,255,${flash * 0.1})`; ctx.fillRect(-4, 0, canvas.width, canvas.height);
    }
  });

  return <canvas ref={canvasRef} style={{ position: 'fixed', inset: 0, zIndex: 999999, pointerEvents: active ? 'all' : 'none' }} />;
}

/* ═══════════════════════════════════════════════════════════
   APP
═══════════════════════════════════════════════════════════ */
/* ═══════════════════════════════════════════════════════════
   CANVAS BACKGROUND (Layered)
═══════════════════════════════════════════════════════════ */
function CanvasBackground() {
  const canvasRef = useRef(null);
  const time = useRef(0);
  const scrollY = useRef(0);
  const mouse = useRef({ x: 0, y: 0 });
  const particles = useRef(Array.from({ length: 40 }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    size: Math.random() * 2 + 0.5,
    vx: (Math.random() - 0.5) * 0.5,
    vy: (Math.random() - 0.5) * 0.5
  })));

  useEffect(() => {
    const onScroll = () => { scrollY.current = window.scrollY; };
    const onMove = e => { mouse.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('mousemove', onMove);
    const resize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };
    resize();
    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('resize', resize);
    };
  }, []);

  useAnimationFrame((delta) => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;
    const w = canvasRef.current.width;
    const h = canvasRef.current.height;
    time.current += delta * 0.001;

    // Parallax tilt logic based on mouse
    const tiltX = (mouse.current.x / w - 0.5) * 40;
    const tiltY = (mouse.current.y / h - 0.5) * 40;

    ctx.fillStyle = ANIM_CONFIG.colors.bg;
    ctx.fillRect(0, 0, w, h);

    // Auroras
    ctx.globalCompositeOperation = 'screen';
    for (let i = 0; i < 3; i++) {
      const cx = w / 2 + Math.sin(time.current * 0.2 + i) * 400 + tiltX * (i + 1);
      const cy = h / 2 + Math.cos(time.current * 0.3 - i) * 300 - (scrollY.current * (0.1 + i * 0.05)) + tiltY * (i + 1);

      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 800);
      const colors = ['rgba(6,182,212,0.12)', 'rgba(139,92,246,0.08)', 'rgba(16,185,129,0.06)'];
      grad.addColorStop(0, colors[i]);
      grad.addColorStop(1, 'transparent');

      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);
    }

    // Micro-organisms
    ctx.globalCompositeOperation = 'source-over';
    particles.current.forEach(p => {
      p.x += p.vx;
      p.y += p.vy - (scrollY.current * 0.05); // move up slightly on scroll

      // Wrap
      if (p.x < 0) p.x = w; if (p.x > w) p.x = 0;
      if (p.y < -100) p.y = h + 100; if (p.y > h + 100) p.y = -100;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,255,255,0.15)';
      ctx.fill();
    });
  });

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'fixed', inset: 0, zIndex: -1, pointerEvents: 'none' }}
    />
  );
}

export default function App() {
  const [ready, setReady] = useState(false);
  return (
    <>
      <style>{GLOBAL_CSS}</style>
      {!ready && <Loader onDone={() => setReady(true)} />}
      {ready && (
        <>
          <CanvasBackground />
          <LiquidTransition />
          <MagneticCursor />
          <ScrollProgress />
          <Navbar />
          <Hero />
          <About />
          <Skills />
          <Projects />
          <AIShowcase />
          <Certifications />
          <Experience />
          <GithubDashboard />
          <Contact />
          <Footer />
          <Chatbot />
          <BackToTop />
        </>
      )}
    </>
  );
}