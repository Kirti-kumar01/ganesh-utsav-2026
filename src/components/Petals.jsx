import { useEffect, useRef } from 'react';

export default function Petals() {
  const ref = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const cv = ref.current;
    const ctx = cv.getContext('2d');
    let W, H, ps = [], raf;
    const cols = ['#ffb62e', '#ff8a1e', '#f4cd6a', '#e2b23a'];

    const size = () => { W = cv.width = window.innerWidth; H = cv.height = window.innerHeight; };
    size();
    window.addEventListener('resize', size);

    const mk = (init) => ({
      x: Math.random() * W, y: init ? Math.random() * H : -20,
      r: 5 + Math.random() * 7, s: 0.4 + Math.random() * 0.9,
      sway: Math.random() * Math.PI * 2, sw: 0.01 + Math.random() * 0.02,
      rot: Math.random() * Math.PI, rs: -0.02 + Math.random() * 0.04,
      c: cols[Math.floor(Math.random() * cols.length)], o: 0.4 + Math.random() * 0.4,
    });
    for (let i = 0; i < 26; i++) ps.push(mk(true));

    const petal = (p) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.globalAlpha = p.o;
      ctx.fillStyle = p.c;
      ctx.beginPath();
      ctx.ellipse(0, 0, p.r * 0.6, p.r, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    const loop = () => {
      ctx.clearRect(0, 0, W, H);
      ps.forEach((p, i) => {
        p.y += p.s; p.sway += p.sw; p.x += Math.sin(p.sway) * 0.6; p.rot += p.rs;
        petal(p);
        if (p.y > H + 20) ps[i] = mk(false);
      });
      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', size); };
  }, []);

  return <canvas id="petals" ref={ref} />;
}
