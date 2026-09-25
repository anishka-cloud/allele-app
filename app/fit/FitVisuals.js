const diagramMeta = {
  length: ["Inseam map", "Measure the inside leg of a pair that already lands well."],
  torso: ["Torso balance", "Use waistband placement as the useful clue—not a body label."],
  waist_hip: ["Waist-to-hip line", "Compare how the waistband and seat need to relate."],
  fit_issue: ["Pressure map", "The location of pulling or gaping tells you which pattern area is off."],
  rise: ["Rise positions", "Brand names vary. The waistband position you like is the real reference."],
  silhouette: ["Leg architecture", "Read the line from upper thigh to hem."],
  goal: ["Visual direction", "Choose the line you want the garment to create."],
  shoes: ["Hem relationship", "The same inseam behaves differently over each shoe."],
  fabric: ["Denim structure", "Fiber and weave change how much the jean holds or moves."],
};

function LengthDiagram() {
  return <svg viewBox="0 0 240 210"><path d="M72 24v144M120 24v162M168 24v176"/><path className="dash" d="M42 24h18m-10 16h10m-18 16h18m-10 16h10m-18 16h18m-10 16h10m-18 16h18m-10 16h10m-18 16h18m-10 16h10"/><path className="gold" d="M62 168h20M110 186h20M158 200h20"/><text x="68" y="194">S</text><text x="116" y="205">R</text><text x="164" y="205">L</text></svg>;
}

function TorsoDiagram({ rise = false }) {
  return <svg viewBox="0 0 240 210"><path d="M83 25c15 10 17 22 17 37 0 13-10 23-13 39-3 18 8 36 12 76h42c4-40 15-58 12-76-3-16-13-26-13-39 0-15 2-27 17-37"/><path className={rise ? "" : "dash"} d="M88 79h64"/><path className={rise ? "gold" : ""} d="M91 101h58"/><path className={rise ? "" : "dash"} d="M94 124h52"/><text x="168" y="82">HIGH</text><text x="168" y="104">MID</text><text x="168" y="127">LOW</text>{!rise && <path className="measure" d="M66 31v94m-7-94h14m-14 94h14"/>}</svg>;
}

function WaistHipDiagram() {
  return <svg viewBox="0 0 240 210"><path d="M25 31c18 23 17 42 5 63-11 20-9 49 1 87M71 31c-18 23-17 42-5 63 11 20 9 49-1 87"/><path d="M91 31c11 27 10 45 3 64-8 24-8 51 0 86M137 31c-11 27-10 45-3 64 8 24 8 51 0 86"/><path d="M161 31c5 28 5 49 2 67-4 25-4 50 1 83M207 31c-5 28-5 49-2 67 4 25 4 50-1 83"/><path className="gold" d="M28 82h40M94 82h40M164 82h40"/><text x="33" y="200">DEFINED</text><text x="98" y="200">EVEN</text><text x="169" y="200">STRAIGHT</text></svg>;
}

function IssueDiagram() {
  return <svg viewBox="0 0 240 210"><path d="M67 34h106l-8 144h-38l-7-83-7 83H75z"/><path className="dash" d="M71 54h98M120 35v60M82 74c12 8 24 9 38 2M158 74c-12 8-24 9-38 2"/><circle className="gold-fill" cx="120" cy="47" r="6"/><circle className="gold-fill" cx="78" cy="85" r="6"/><circle className="gold-fill" cx="120" cy="96" r="6"/><circle className="gold-fill" cx="162" cy="85" r="6"/><circle className="gold-fill" cx="145" cy="178" r="6"/><text x="30" y="202">WHERE DOES THE FIT BREAK?</text></svg>;
}

function SilhouetteDiagram() {
  return <svg viewBox="0 0 240 210"><path d="M18 30h42l-8 156H39L35 88l-4 98H18z"/><path d="M73 30h42l-2 156H98L94 88l-4 98H75z"/><path d="M128 30h42l12 156h-24l-9-98-8 98h-24z"/><path d="M183 30h42l13 156h-23l-11-98-10 98h-23z"/><path className="gold" d="M18 45h42M73 45h42M128 45h42M183 45h42"/><text x="18" y="202">SLIM</text><text x="74" y="202">STRAIGHT</text><text x="132" y="202">WIDE</text><text x="188" y="202">BOOT</text></svg>;
}

function GoalDiagram() {
  return <svg viewBox="0 0 240 210"><path d="M55 25v160M120 25v160M185 25v160"/><path className="gold" d="m55 25-7 12m7-12 7 12m58 148-7-12m7 12 7-12M168 72l17-18 17 18M168 138l17 18 17-18"/><path className="dash" d="M34 80h42M34 130h42M99 55h42M99 155h42"/><text x="28" y="202">DEFINE</text><text x="102" y="202">LINE</text><text x="169" y="202">BALANCE</text></svg>;
}

function ShoeDiagram() {
  return <svg viewBox="0 0 240 210"><path d="M26 36v112h48M96 36v112h50M168 36v112h50"/><path d="M26 148c12 0 18 21 48 21M96 148c21 0 16 21 50 21M168 148c8 0 9 8 24 8h26v13h-50z"/><path className="gold" d="M18 139h66M88 139h66M160 139h66"/><text x="28" y="195">FLAT</text><text x="97" y="195">SNEAKER</text><text x="173" y="195">HEEL</text></svg>;
}

function FabricDiagram() {
  return <svg viewBox="0 0 240 210"><g className="weave">{Array.from({ length: 8 }, (_, i) => <path key={`v${i}`} d={`M${34 + i * 24} 25v150`}/>)}{Array.from({ length: 7 }, (_, i) => <path key={`h${i}`} d={`M25 ${31 + i * 24}h190`}/>)}</g><path className="gold" d="M42 44l156 118M42 92l108 82M90 32l108 82"/><text x="55" y="199">RIGID</text><text x="142" y="199">GIVE</text></svg>;
}

export function FitQuestionDiagram({ questionId }) {
  const [title, note] = diagramMeta[questionId] || diagramMeta.fit_issue;
  let diagram = <IssueDiagram />;
  if (questionId === "length") diagram = <LengthDiagram />;
  if (questionId === "torso") diagram = <TorsoDiagram />;
  if (questionId === "waist_hip") diagram = <WaistHipDiagram />;
  if (questionId === "rise") diagram = <TorsoDiagram rise />;
  if (questionId === "silhouette") diagram = <SilhouetteDiagram />;
  if (questionId === "goal") diagram = <GoalDiagram />;
  if (questionId === "shoes") diagram = <ShoeDiagram />;
  if (questionId === "fabric") diagram = <FabricDiagram />;

  return <aside className="fit-question-diagram" aria-hidden="true"><p>{title}</p>{diagram}<span>{note}</span></aside>;
}

const legShapes = {
  slim_straight: "M66 89h128l-28 223h-42l6-160-14 160H74z",
  straight: "M66 89h128l-14 223h-49l-1-160-7 160H74z",
  wide: "M66 89h128l22 223h-72l-14-160-8 160H50z",
  bootcut: "M66 89h128l28 223h-72l-20-160-14 160H44z",
};

const hotspot = {
  waist_gap: [130, 99],
  hip_thigh_pull: [82, 151],
  front_tight: [130, 111],
  seat_rise: [130, 143],
  length: [176, 306],
};

export function DenimResultMap({ result }) {
  const riseY = { high: 62, mid: 75, low: 88 }[result.rise] || 75;
  const point = hotspot[result.fitIssue];
  return (
    <div className="fit-denim-map" aria-label={`Diagram of a ${result.labels.rise.toLowerCase()}-rise ${result.labels.leg.toLowerCase()} jean`}>
      <svg viewBox="0 0 260 350" role="img">
        <defs>
          <pattern id="fit-denim-weave" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(28)">
            <rect width="6" height="6" fill="#263b50" />
            <line x1="0" y1="0" x2="0" y2="6" stroke="#38546d" strokeWidth="1" />
          </pattern>
        </defs>
        <path className="fit-body-guide" d="M89 16c5 16 7 32 1 48-7 19-3 44 3 61M171 16c-5 16-7 32-1 48 7 19 3 44-3 61" />
        <path className="fit-jean-shape" d={legShapes[result.leg] || legShapes.straight} />
        <path className="fit-jean-waist" d={`M68 ${riseY} Q130 ${riseY + 13} 192 ${riseY}`} />
        <path className="fit-jean-seam" d={`M130 ${riseY + 7}v78m0 0-8 164m8-164 14 164`} />
        <path className="fit-jean-pocket" d={`M78 ${riseY + 32}q18 16 39 5M182 ${riseY + 32}q-18 16-39 5`} />
        {point && <><circle className="fit-hotspot-ring" cx={point[0]} cy={point[1]} r="17"/><circle className="fit-hotspot-core" cx={point[0]} cy={point[1]} r="5"/></>}
        <path className="fit-map-measure" d="M29 62v250m-7-250h14m-14 250h14" />
        <text x="15" y="190" transform="rotate(-90 15 190)">FIT MAP · NOT TO SCALE</text>
      </svg>
      <div><span>Pattern shown</span><strong>{result.labels.rise} rise · {result.labels.leg}</strong></div>
    </div>
  );
}
