"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { evaluatePurchase } from "@/lib/purchaseEvaluation.mjs";
import { parseProductEntry } from "@/lib/productInput.mjs";

const STORAGE_KEY = "allele_my_profile_v1";
const EMPTY_PROFILE = { version: 1, items: [], evaluations: [] };

const EMPTY_OWNED = {
  category: "makeup", entry: "", brand: "", name: "", sourceUrl: "", sourceHost: "",
  outcome: "", reasons: [], photoDataUrl: "", variant: "", finishOrFit: "", size: "",
  frequency: "", works: "", doesNotWork: "",
};

const EMPTY_CANDIDATE = {
  category: "makeup", entry: "", brand: "", name: "", sourceUrl: "", sourceHost: "",
  photoDataUrl: "", variant: "", finishOrFit: "", size: "", price: "", facts: "",
  motivation: "", hesitations: "",
};

const OUTCOMES = [
  { id: "love", label: "Love it", note: "I keep reaching for it" },
  { id: "mixed", label: "It’s okay", note: "Some things work" },
  { id: "miss", label: "Not for me", note: "I would not buy it again" },
];
const OUTCOME_LABELS = Object.fromEntries(OUTCOMES.map(({ id, label }) => [id, label]));

const REASON_OPTIONS = {
  makeup: {
    love: ["The color suits me", "The finish looks right", "Comfortable all day", "Easy to use", "Wears well"],
    mixed: ["Color is almost right", "Finish is inconsistent", "Doesn’t last", "Fussy to apply", "Only works sometimes"],
    miss: ["Wrong color on me", "Wrong undertone", "Too dry or oily", "Uncomfortable", "Didn’t wear well"],
  },
  clothing: {
    love: ["The fit feels right", "I love the color", "Comfortable fabric", "Easy to style", "I wear it often"],
    mixed: ["Fit is almost right", "Hard to style", "Fabric is just okay", "Needs adjusting", "Only works sometimes"],
    miss: ["The fit is wrong", "The color feels off", "Uncomfortable fabric", "Sizing was misleading", "I never reach for it"],
  },
  other: {
    love: ["Works reliably", "Easy to use", "Feels well made", "Solves a real problem", "I use it often"],
    mixed: ["Works sometimes", "More effort than expected", "Quality is uneven", "Not quite the right fit", "I rarely use it"],
    miss: ["Didn’t solve the problem", "Hard to use", "Uncomfortable", "Poor quality", "Not worth it"],
  },
};

const PURCHASE_GOALS = ["Replace something I use up", "Solve a problem", "Fill a real gap", "Try something different", "I’m just tempted"];

const HESITATIONS = {
  makeup: ["I may own a similar shade", "Shade is uncertain", "Finish is uncertain", "Price", "I can’t try it first"],
  clothing: ["I may own something similar", "Fit is uncertain", "Sizing is uncertain", "Fabric", "Price"],
  other: ["I may own something similar", "Quality is uncertain", "I may not use it", "Returns", "Price"],
};

const CATEGORY_COPY = {
  makeup: { singular: "makeup product", variant: "Shade or color", detail: "Finish or texture", detailPlaceholder: "Natural, satin, matte, creamy…", size: null, facts: "Formula, coverage, ingredients, or wear claims…" },
  clothing: { singular: "clothing item", variant: "Color", detail: "Fit or cut", detailPlaceholder: "Relaxed, high-rise, cropped, tailored…", size: "Size", facts: "Fabric, measurements, care, or return terms…" },
  other: { singular: "product", variant: "Variant or model", detail: "How it feels or performs", detailPlaceholder: "Lightweight, quiet, easy to clean…", size: null, facts: "Materials, dimensions, warranty, or features…" },
};

function uid(prefix) {
  if (typeof crypto !== "undefined" && crypto.randomUUID) return `${prefix}-${crypto.randomUUID()}`;
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function safeProfile(raw) {
  if (!raw || typeof raw !== "object") return EMPTY_PROFILE;
  return { ...raw, version: 1, items: Array.isArray(raw.items) ? raw.items : [], evaluations: Array.isArray(raw.evaluations) ? raw.evaluations : [] };
}

function readFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });
}

async function preparePhoto(file) {
  if (!file?.type?.startsWith("image/")) throw new Error("Choose a photo file.");
  if (file.size > 12 * 1024 * 1024) throw new Error("Choose a photo smaller than 12 MB.");
  const original = await readFile(file);
  const image = await loadImage(original);
  const longest = Math.max(image.naturalWidth, image.naturalHeight);
  const scale = Math.min(1, 960 / longest);
  const width = Math.max(1, Math.round(image.naturalWidth * scale));
  const height = Math.max(1, Math.round(image.naturalHeight * scale));
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d");
  context.fillStyle = "#fffdf9";
  context.fillRect(0, 0, width, height);
  context.drawImage(image, 0, 0, width, height);
  return canvas.toDataURL("image/jpeg", 0.76);
}

function CameraMark() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <path d="M15 14.5 18.4 10h11.2l3.4 4.5h5.5a4 4 0 0 1 4 4v16a4 4 0 0 1-4 4h-29a4 4 0 0 1-4-4v-16a4 4 0 0 1 4-4H15Z" />
      <circle cx="24" cy="26" r="8" /><path d="M10.5 20h4" />
    </svg>
  );
}

function CategoryPicker({ value, onChange }) {
  return (
    <fieldset className="ma-category-picker">
      <legend>What is it?</legend>
      <div className="ma-segmented">
        {[["makeup", "Makeup"], ["clothing", "Clothing"], ["other", "Other"]].map(([id, label]) => (
          <button key={id} type="button" className={value === id ? "active" : ""} aria-pressed={value === id} onClick={() => onChange(id)}>{label}</button>
        ))}
      </div>
    </fieldset>
  );
}

function Field({ label, hint, children, className = "" }) {
  return <label className={`ma-field ${className}`.trim()}><span className="ma-field-label">{label}</span>{hint && <span className="ma-field-hint">{hint}</span>}{children}</label>;
}

function CapturePanel({ value, mode, onModeChange, onPhoto, onEntryChange, onNameChange, busy, noun }) {
  const hasPhoto = Boolean(value.photoDataUrl);
  const isCandidate = noun === "candidate";
  return (
    <section className="ma-capture-panel" aria-label={`Add ${isCandidate ? "a product you are considering" : "a product you own"}`}>
      <label className={`ma-camera ${hasPhoto ? "has-photo" : ""}`}>
        <input type="file" accept="image/*" capture="environment" aria-label={isCandidate ? "Take a photo of the product you are considering" : "Take a photo of a product you own"} onChange={(event) => { const file = event.target.files?.[0]; if (file) onPhoto(file); event.target.value = ""; }} />
        {hasPhoto ? (
          <>
            {/* A local data URL is intentional here; these private user photos are never sent to an image host. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={value.photoDataUrl} alt={value.name ? `${value.name} product` : "Your photographed product"} />
            <span className="ma-photo-change">Retake or choose another</span>
          </>
        ) : (
          <div className="ma-camera-empty"><span className="ma-camera-mark"><CameraMark /></span><strong>{busy ? "Preparing photo…" : "Take a product photo"}</strong><span>Front label works best</span></div>
        )}
      </label>
      <div className="ma-capture-divider"><span>or</span></div>
      <div className="ma-capture-options">
        <button type="button" className={mode === "link" ? "active" : ""} onClick={() => onModeChange(mode === "link" ? "photo" : "link")}>Paste a link</button>
        <button type="button" className={mode === "manual" ? "active" : ""} onClick={() => onModeChange(mode === "manual" ? "photo" : "manual")}>Type the name</button>
      </div>
      {mode === "link" && (
        <div className="ma-capture-entry">
          <Field label="Product link" hint="Allele drafts only what the URL reveals"><input type="url" value={value.entry} onChange={(event) => onEntryChange(event.target.value)} placeholder="Paste a retailer link" autoComplete="off" /></Field>
          {value.sourceUrl && <div className="ma-source-draft" role="status"><strong>Link recognized from {value.sourceHost}</strong><span>No price, reviews, availability, or retailer claims were fetched.</span></div>}
        </div>
      )}
      {(hasPhoto || mode === "manual" || value.sourceUrl) && (
        <div className="ma-name-confirm">
          <Field label={hasPhoto ? "Product name" : "Name"} hint={hasPhoto ? "Optional for this prototype" : "Confirm or edit"}><input value={value.name} onChange={(event) => onNameChange(event.target.value)} placeholder={hasPhoto ? "Add it now, or leave it for later" : "Brand and product name"} autoComplete="off" /></Field>
          {hasPhoto && <p className="ma-recognition-note"><span aria-hidden="true">◎</span>Photo saved locally. Automatic product recognition is not connected yet.</p>}
        </div>
      )}
    </section>
  );
}

function OutcomePicker({ value, onChange }) {
  return (
    <fieldset className="ma-choice-block"><legend>How did it work for you?</legend><div className="ma-outcome-grid">
      {OUTCOMES.map((outcome) => <label key={outcome.id} className={value === outcome.id ? "active" : ""}><input type="radio" name="owned-outcome" value={outcome.id} checked={value === outcome.id} onChange={() => onChange(outcome.id)} /><strong>{outcome.label}</strong><span>{outcome.note}</span></label>)}
    </div></fieldset>
  );
}

function ChipPicker({ legend, options, selected, onToggle }) {
  const values = Array.isArray(selected) ? selected : selected ? [selected] : [];
  return (
    <fieldset className="ma-chip-block"><legend>{legend}</legend><div className="ma-chip-list">
      {options.map((option) => { const active = values.includes(option); return <button key={option} type="button" className={active ? "active" : ""} aria-pressed={active} onClick={() => onToggle(option)}>{active && <span aria-hidden="true">✓</span>}{option}</button>; })}
    </div></fieldset>
  );
}

function ProductShelf({ items, onAdd, onDelete }) {
  return (
    <aside className="ma-shelf" aria-label="Products you own">
      <div className="ma-shelf-heading"><div><span>Your products</span><strong>{items.length}</strong></div>{items.length > 0 && <button type="button" onClick={onAdd}>Add another</button>}</div>
      {items.length ? <div className="ma-shelf-list">{items.map((item) => (
        <article className="ma-shelf-item" key={item.id}>
          <div className="ma-shelf-photo">{item.photoDataUrl ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.photoDataUrl} alt="" />
            </>
          ) : <span>{item.category?.slice(0, 1)?.toUpperCase() || "P"}</span>}</div>
          <div><small>{item.category}</small><h3>{[item.brand, item.name].filter(Boolean).join(" ") || `Saved ${item.category} item`}</h3><p>{OUTCOME_LABELS[item.outcome] || "Saved"}</p></div>
          <button type="button" className="ma-remove" aria-label={`Remove ${item.name || "saved item"}`} onClick={() => onDelete(item.id)}>Remove</button>
        </article>
      ))}</div> : <div className="ma-shelf-empty"><span aria-hidden="true">◌</span><p>Your first product will appear here.</p></div>}
    </aside>
  );
}

export default function MyAllele() {
  const [profile, setProfile] = useState(EMPTY_PROFILE);
  const [stage, setStage] = useState("owned");
  const [owned, setOwned] = useState(EMPTY_OWNED);
  const [candidate, setCandidate] = useState(EMPTY_CANDIDATE);
  const [verdict, setVerdict] = useState(null);
  const [hydrated, setHydrated] = useState(false);
  const [notice, setNotice] = useState("");
  const [ownedCaptureMode, setOwnedCaptureMode] = useState("photo");
  const [candidateCaptureMode, setCandidateCaptureMode] = useState("photo");
  const [photoBusy, setPhotoBusy] = useState(false);
  const sheetRef = useRef(null);

  useEffect(() => {
    try {
      const saved = safeProfile(JSON.parse(localStorage.getItem(STORAGE_KEY)));
      setProfile(saved);
      const lastEvaluation = saved.evaluations.at(-1);
      if (lastEvaluation?.result) { setVerdict(lastEvaluation.result); setCandidate(lastEvaluation.candidate || EMPTY_CANDIDATE); setStage("verdict"); }
      else if (saved.items.length) { setCandidate((current) => ({ ...current, category: saved.items.at(-1).category })); setStage("candidate"); }
    } catch { setNotice("Your saved products could not be opened. Nothing was deleted; this page is using a blank working copy."); }
    finally { setHydrated(true); }
  }, []);

  const persist = (next) => {
    setProfile(next);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); }
    catch { setNotice("This browser could not save the photo. Try a smaller image, or keep this tab open while you continue."); }
  };

  const currentStep = stage === "owned" ? 1 : stage === "candidate" ? 2 : 3;
  const activeOwnedItems = useMemo(() => profile.items.filter((item) => item.category === candidate.category), [profile.items, candidate.category]);
  const ownedCopy = CATEGORY_COPY[owned.category];
  const candidateCopy = CATEGORY_COPY[candidate.category];
  const scrollToSheet = () => window.requestAnimationFrame(() => sheetRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
  const updateOwned = (key, value) => setOwned((current) => ({ ...current, [key]: value }));
  const updateCandidate = (key, value) => setCandidate((current) => ({ ...current, [key]: value }));

  const updateProductEntry = (target, value) => {
    const parsed = parseProductEntry(value);
    const setter = target === "owned" ? setOwned : setCandidate;
    setter((current) => ({ ...current, entry: value, name: parsed.name, sourceUrl: parsed.sourceUrl, sourceHost: parsed.sourceHost }));
  };

  const addPhoto = async (target, file) => {
    setPhotoBusy(true); setNotice("");
    try { const photoDataUrl = await preparePhoto(file); const setter = target === "owned" ? setOwned : setCandidate; setter((current) => ({ ...current, photoDataUrl })); }
    catch (error) { setNotice(error?.message || "That photo could not be opened. Try another image."); }
    finally { setPhotoBusy(false); }
  };

  const toggleReason = (reason) => setOwned((current) => { const reasons = current.reasons || []; return { ...current, reasons: reasons.includes(reason) ? reasons.filter((item) => item !== reason) : [...reasons, reason] }; });
  const chooseOutcome = (outcome) => setOwned((current) => ({ ...current, outcome, reasons: [] }));

  const saveOwned = (event) => {
    event.preventDefault();
    const reasons = owned.reasons || [];
    if (!owned.photoDataUrl && !owned.name.trim() && !owned.sourceUrl) { setNotice("Take a photo, paste a link, or add the product name first."); return; }
    if (!owned.outcome) { setNotice("Choose how this product worked for you."); return; }
    if (!reasons.length) { setNotice("Tap at least one reason. No written review is needed."); return; }
    const item = { ...owned, name: owned.name.trim() || `Photographed ${CATEGORY_COPY[owned.category].singular}`, works: reasons.join("; "), id: uid("owned"), createdAt: new Date().toISOString() };
    const next = { ...profile, items: [...profile.items, item] };
    persist(next); setCandidate({ ...EMPTY_CANDIDATE, category: item.category }); setOwned(EMPTY_OWNED); setCandidateCaptureMode("photo");
    setNotice("Saved. Now show Allele something you are thinking about buying."); setStage("candidate"); scrollToSheet();
  };

  const runEvaluation = (event) => {
    event.preventDefault();
    if (!candidate.photoDataUrl && !candidate.name.trim() && !candidate.sourceUrl) { setNotice("Take a photo, paste a link, or add the product name first."); return; }
    if (!candidate.motivation) { setNotice("Choose what is pulling you toward this purchase."); return; }
    const completedCandidate = { ...candidate, name: candidate.name.trim() || `Photographed ${CATEGORY_COPY[candidate.category].singular}` };
    const result = evaluatePurchase(profile.items, completedCandidate);
    const evaluation = { id: uid("evaluation"), createdAt: new Date().toISOString(), candidate: completedCandidate, result };
    persist({ ...profile, evaluations: [...profile.evaluations, evaluation] }); setCandidate(completedCandidate); setVerdict(result); setNotice(""); setStage("verdict"); scrollToSheet();
  };

  const removeItem = (itemId) => {
    const item = profile.items.find((entry) => entry.id === itemId);
    if (!item || !window.confirm(`Remove ${item.name} from your products?`)) return;
    persist({ ...profile, items: profile.items.filter((entry) => entry.id !== itemId) });
    setNotice("Product removed. Earlier purchase checks remain saved in this browser.");
  };

  const startAnotherOwned = () => { setOwned(EMPTY_OWNED); setOwnedCaptureMode("photo"); setStage("owned"); setNotice(""); scrollToSheet(); };
  const startWithoutReference = () => { setCandidate(EMPTY_CANDIDATE); setCandidateCaptureMode("photo"); setStage("candidate"); setNotice("That’s okay. Allele will show what is missing instead of guessing what suits you."); scrollToSheet(); };
  const startAnotherEvaluation = () => { const defaultCategory = profile.items.at(-1)?.category || "makeup"; setCandidate({ ...EMPTY_CANDIDATE, category: defaultCategory }); setCandidateCaptureMode("photo"); setVerdict(null); setStage("candidate"); setNotice(""); scrollToSheet(); };

  if (!hydrated) return <main className="ma-shell ma-loading">Opening My Allele…</main>;

  const hero = stage === "owned"
    ? { title: "Show Allele what already works.", text: "Start with one product. A photo and a few taps are enough." }
    : stage === "candidate"
      ? { title: "Now show us what caught your eye.", text: "Allele will compare the temptation with what you actually use." }
      : { title: "An answer, with the uncertainty left in.", text: "Your experience is evidence. Missing product facts stay missing." };

  return (
    <main className="ma-shell">
      <nav className="ma-nav"><Link href="/" className="ma-wordmark">all<em>e</em>le</Link><div className="ma-nav-center">My Allele</div><Link href="/quiz" className="ma-nav-link">Shade DNA</Link></nav>
      <header className="ma-intro"><div><p>Shop from your own evidence</p><h1>{hero.title}</h1><span>{hero.text}</span></div><aside><strong>Private by default</strong><p>Your products and compressed photos stay in this browser in this prototype.</p></aside></header>
      <ol className="ma-steps" aria-label="Buying decision steps">
        {["Add a product", "Check a purchase", "See the evidence"].map((label, index) => { const number = index + 1; const state = number === currentStep ? "active" : number < currentStep ? "complete" : "future"; return <li key={label} className={state}><span>{number < currentStep ? "✓" : number}</span><p>{label}</p></li>; })}
      </ol>
      {notice && <div className="ma-notice" role="status">{notice}</div>}

      <div className="ma-workspace">
        <ProductShelf items={profile.items} onAdd={startAnotherOwned} onDelete={removeItem} />
        <section className="ma-sheet" ref={sheetRef}>
          {stage === "owned" && (
            <form onSubmit={saveOwned}>
              <div className="ma-sheet-heading"><span>Start here</span><h2>Add one thing you own.</h2><p>You won’t need to write a review.</p></div>
              <CategoryPicker value={owned.category} onChange={(category) => setOwned((current) => ({ ...current, category, outcome: "", reasons: [] }))} />
              <CapturePanel value={owned} mode={ownedCaptureMode} onModeChange={setOwnedCaptureMode} onPhoto={(file) => addPhoto("owned", file)} onEntryChange={(value) => updateProductEntry("owned", value)} onNameChange={(value) => updateOwned("name", value)} busy={photoBusy} noun="owned" />
              <OutcomePicker value={owned.outcome} onChange={chooseOutcome} />
              {owned.outcome && <ChipPicker legend="What made you say that?" options={REASON_OPTIONS[owned.category][owned.outcome]} selected={owned.reasons || []} onToggle={toggleReason} />}
              <details className="ma-refinement">
                <summary><span>Add a detail</span><small>Optional · shade, fit, size, or a note</small></summary>
                <div className="ma-form-grid ma-refinement-body">
                  <Field label="Brand" hint="Optional"><input value={owned.brand} onChange={(event) => updateOwned("brand", event.target.value)} placeholder="Brand or maker" /></Field>
                  <Field label={ownedCopy.variant} hint="Optional"><input value={owned.variant} onChange={(event) => updateOwned("variant", event.target.value)} placeholder="Be as specific as you want" /></Field>
                  <Field label={ownedCopy.detail} hint="Optional"><input value={owned.finishOrFit} onChange={(event) => updateOwned("finishOrFit", event.target.value)} placeholder={ownedCopy.detailPlaceholder} /></Field>
                  {ownedCopy.size && <Field label={ownedCopy.size} hint="Optional"><input value={owned.size} onChange={(event) => updateOwned("size", event.target.value)} placeholder="Include brand-specific sizing if useful" /></Field>}
                  <Field label="Anything else?" hint="Optional" className="ma-field-wide"><textarea rows="2" value={owned.doesNotWork} onChange={(event) => updateOwned("doesNotWork", event.target.value)} placeholder="Only if there is something Allele should remember" /></Field>
                </div>
              </details>
              <div className="ma-form-actions"><button type="button" className="ma-text-button" onClick={startWithoutReference}>I haven’t found anything that works yet</button><button type="submit" className="ma-primary">Save and check a purchase</button></div>
            </form>
          )}

          {stage === "candidate" && (
            <form onSubmit={runEvaluation}>
              <div className="ma-sheet-heading"><span>Purchase check</span><h2>What are you considering?</h2><p>{activeOwnedItems.length ? `Comparing against ${activeOwnedItems.length} saved ${candidate.category} ${activeOwnedItems.length === 1 ? "product" : "products"}.` : "No comparable product is saved yet. Allele will stay cautious."}</p></div>
              <CategoryPicker value={candidate.category} onChange={(category) => setCandidate((current) => ({ ...current, category, hesitations: "" }))} />
              <CapturePanel value={candidate} mode={candidateCaptureMode} onModeChange={setCandidateCaptureMode} onPhoto={(file) => addPhoto("candidate", file)} onEntryChange={(value) => updateProductEntry("candidate", value)} onNameChange={(value) => updateCandidate("name", value)} busy={photoBusy} noun="candidate" />
              <ChipPicker legend="What is pulling you toward it?" options={PURCHASE_GOALS} selected={candidate.motivation} onToggle={(option) => updateCandidate("motivation", candidate.motivation === option ? "" : option)} />
              <ChipPicker legend="What gives you pause?" options={HESITATIONS[candidate.category]} selected={candidate.hesitations} onToggle={(option) => updateCandidate("hesitations", candidate.hesitations === option ? "" : option)} />
              <details className="ma-refinement">
                <summary><span>Add what you know</span><small>Optional · facts make the answer sharper</small></summary>
                <div className="ma-form-grid ma-refinement-body">
                  <Field label="Brand" hint="Optional"><input value={candidate.brand} onChange={(event) => updateCandidate("brand", event.target.value)} placeholder="Brand or maker" /></Field>
                  <Field label={candidateCopy.variant} hint="Optional"><input value={candidate.variant} onChange={(event) => updateCandidate("variant", event.target.value)} placeholder="The exact option, if known" /></Field>
                  <Field label={candidateCopy.detail} hint="Optional"><input value={candidate.finishOrFit} onChange={(event) => updateCandidate("finishOrFit", event.target.value)} placeholder={candidateCopy.detailPlaceholder} /></Field>
                  {candidateCopy.size && <Field label="Size you are considering" hint="Optional"><input value={candidate.size} onChange={(event) => updateCandidate("size", event.target.value)} placeholder="Include the retailer’s size" /></Field>}
                  <Field label="Current price" hint="Optional · not verified"><input value={candidate.price} onChange={(event) => updateCandidate("price", event.target.value)} placeholder="$0.00" inputMode="decimal" /></Field>
                  <Field label="Known product facts" hint="From packaging, the brand, or a retailer" className="ma-field-wide"><textarea rows="2" value={candidate.facts} onChange={(event) => updateCandidate("facts", event.target.value)} placeholder={candidateCopy.facts} /></Field>
                </div>
              </details>
              <div className="ma-form-actions"><button type="button" className="ma-text-button" onClick={startAnotherOwned}>Add another product I own</button><button type="submit" className="ma-primary">Check whether it makes sense</button></div>
            </form>
          )}

          {stage === "verdict" && verdict && (
            <div className="ma-verdict" aria-live="polite">
              <div className={`ma-verdict-hero ${verdict.status}`}><div><span className="ma-verdict-label">{verdict.label}</span><h2>{verdict.headline}</h2><p>{verdict.summary}</p></div><div className="ma-confidence"><span>Confidence</span><strong>{verdict.confidence}</strong><small>Based only on information saved here.</small></div></div>
              <div className="ma-verdict-grid">
                <section><h3>From your experience</h3>{verdict.ownedEvidence.length ? <ul>{verdict.ownedEvidence.map((line) => <li key={line}>{line}</li>)}</ul> : <p>No comparable owned product is saved yet.</p>}</section>
                <section><h3>Product facts supplied</h3>{verdict.candidateEvidence.length ? <ul>{verdict.candidateEvidence.map((line) => <li key={line}>{line}</li>)}</ul> : <p>No traceable product facts were supplied. Allele did not fill the gap.</p>}</section>
                <section><h3>What the comparison suggests</h3><ul>{verdict.signals.map((line) => <li key={line}>{line}</li>)}</ul></section>
                <section><h3>Tradeoffs and unknowns</h3>{verdict.tradeoffs.length > 0 && <ul>{verdict.tradeoffs.map((line) => <li key={line}>{line}</li>)}</ul>}{verdict.missing.length ? <p className="ma-missing">Still missing: {verdict.missing.join(", ")}.</p> : <p className="ma-missing">No core comparison field is blank, but retailer facts are still not independently verified.</p>}</section>
              </div>
              <div className="ma-next-step"><span>Best next move</span><p>{verdict.nextStep}</p></div>
              <div className="ma-form-actions ma-verdict-actions"><button type="button" className="ma-secondary" onClick={startAnotherOwned}>Add another product</button><button type="button" className="ma-primary" onClick={startAnotherEvaluation}>Check another purchase</button></div>
            </div>
          )}
        </section>
      </div>

      <footer className="ma-footer"><p>Local prototype · Product recognition, retailer catalogs, reviews, and cross-device sync are not connected yet.</p><Link href="/">Return to Allele</Link></footer>
    </main>
  );
}
