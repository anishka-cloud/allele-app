// Fine-line double helix used as the quiz progress bar on every Allele DNA.
// One rung per question: answered rungs fill in, the current rung takes the accent,
// and the strand turns a little with each answer. Purely decorative for assistive
// tech; the surrounding header already announces "Question N of M".
const W = 1000;
const H = 24;
const PAD = 8;
const AMP = 8;

function strand(phase, sign) {
  const k = (Math.PI * 7) / (W - PAD * 2);
  let d = "";
  for (let x = PAD; x <= W - PAD; x += 10) {
    const y = H / 2 + sign * AMP * Math.sin(phase + (x - PAD) * k);
    d += `${x === PAD ? "M" : "L"}${x} ${y.toFixed(2)}`;
  }
  return d;
}

export default function HelixProgress({ total, done, active, accent = "var(--rust, #B5500B)", className = "" }) {
  const phase = done * 0.42;
  const k = (Math.PI * 7) / (W - PAD * 2);
  const rungs = Array.from({ length: total }, (_, i) => {
    const x = PAD + (i * (W - PAD * 2)) / Math.max(total - 1, 1);
    const off = AMP * Math.sin(phase + (x - PAD) * k);
    return { x, y1: H / 2 + off, y2: H / 2 - off, state: i < done ? "done" : i === active ? "active" : "todo" };
  });
  return (
    <svg className={`allele-helix ${className}`} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" aria-hidden="true" focusable="false" style={{ "--helix-accent": accent }}>
      <path className="allele-helix-strand a" d={strand(phase, 1)} />
      <path className="allele-helix-strand b" d={strand(phase, -1)} />
      {rungs.map((r, i) => (
        <line key={i} className={`allele-helix-rung ${r.state}`} x1={r.x} x2={r.x} y1={r.y1.toFixed(2)} y2={r.y2.toFixed(2)} />
      ))}
    </svg>
  );
}
