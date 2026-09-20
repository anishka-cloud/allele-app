"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { evaluatePurchase } from "@/lib/purchaseEvaluation.mjs";
import { parseProductEntry } from "@/lib/productInput.mjs";

const STORAGE_KEY = "allele_my_profile_v1";

const EMPTY_PROFILE = {
  version: 1,
  items: [],
  evaluations: [],
};

const EMPTY_OWNED = {
  category: "makeup",
  entry: "",
  brand: "",
  name: "",
  sourceUrl: "",
  sourceHost: "",
  outcome: "",
  variant: "",
  finishOrFit: "",
  size: "",
  frequency: "",
  works: "",
  doesNotWork: "",
};

const EMPTY_CANDIDATE = {
  category: "makeup",
  entry: "",
  brand: "",
  name: "",
  variant: "",
  finishOrFit: "",
  size: "",
  price: "",
  sourceUrl: "",
  sourceHost: "",
  facts: "",
  motivation: "",
  hesitations: "",
};

const OUTCOME_LABELS = {
  love: "Love it",
  mixed: "Mixed",
  miss: "Miss",
};

const CATEGORY_COPY = {
  makeup: {
    variant: "Shade or color",
    detail: "Finish or texture",
    detailPlaceholder: "Natural, satin, matte, creamy…",
    size: null,
    factPlaceholder: "Formula, coverage, ingredients, wear claims…",
  },
  clothing: {
    variant: "Color",
    detail: "Fit or cut",
    detailPlaceholder: "Relaxed, high-rise, cropped, tailored…",
    size: "Size that works",
    factPlaceholder: "Fabric, measurements, care, return terms…",
  },
  other: {
    variant: "Variant or model",
    detail: "How it feels or performs",
    detailPlaceholder: "Lightweight, quiet, easy to clean…",
    size: null,
    factPlaceholder: "Materials, dimensions, warranty, features…",
  },
};

const STEP_LABELS = {
  owned: "Add what you know",
  candidate: "Consider a purchase",
  verdict: "Read the evidence",
};

function uid(prefix) {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return `${prefix}-${crypto.randomUUID()}`;
  }
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function safeProfile(raw) {
  if (!raw || typeof raw !== "object") return EMPTY_PROFILE;
  return {
    ...raw,
    version: 1,
    items: Array.isArray(raw.items) ? raw.items : [],
    evaluations: Array.isArray(raw.evaluations) ? raw.evaluations : [],
  };
}

function Field({ label, hint, children, className = "" }) {
  return (
    <label className={`ma-field ${className}`.trim()}>
      <span className="ma-field-label">{label}</span>
      {hint && <span className="ma-field-hint">{hint}</span>}
      {children}
    </label>
  );
}

function CategoryPicker({ value, onChange }) {
  return (
    <fieldset className="ma-category-picker">
      <legend>What kind of item is it?</legend>
      <div className="ma-segmented">
        {[
          ["makeup", "Makeup"],
          ["clothing", "Clothing"],
          ["other", "Other"],
        ].map(([id, label]) => (
          <button
            key={id}
            type="button"
            className={value === id ? "active" : ""}
            aria-pressed={value === id}
            onClick={() => onChange(id)}
          >
            {label}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

function ProductEntry({ entry, name, sourceUrl, sourceHost, onEntryChange, onNameChange, noun = "item" }) {
  return (
    <div className="ma-product-entry">
      <Field
        label={`${noun === "item" ? "Item" : "Product"} name or link`}
        hint="Paste a retailer link to draft the name"
        className="ma-field-wide"
      >
        <input
          required
          value={entry}
          onChange={(event) => onEntryChange(event.target.value)}
          placeholder={noun === "item" ? "Type a name or paste a product link" : "What are you considering?"}
          autoComplete="off"
        />
      </Field>

      {sourceUrl && (
        <div className="ma-source-draft" role="status">
          <span>Link recognized · {sourceHost}</span>
          <p>
            Allele drafted a name from the URL. Confirm it below. No price, reviews, availability, or retailer claims were fetched.
          </p>
        </div>
      )}

      {sourceUrl && (
        <Field label="Confirm the product name" hint="Editable draft" className="ma-field-wide">
          <input
            required
            value={name}
            onChange={(event) => onNameChange(event.target.value)}
            placeholder="The link did not contain a readable name—type it here"
          />
        </Field>
      )}
    </div>
  );
}

function OutcomePicker({ value, onChange }) {
  return (
    <fieldset className="ma-outcome-picker">
      <legend>How did it work for you?</legend>
      <div>
        {Object.entries(OUTCOME_LABELS).map(([id, label]) => (
          <label key={id} className={value === id ? "active" : ""}>
            <input
              required
              type="radio"
              name="owned-outcome"
              value={id}
              checked={value === id}
              onChange={() => onChange(id)}
            />
            <span>{label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function EmptyLedger({ onExample }) {
  return (
    <div className="ma-empty-ledger">
      <p>No field notes yet.</p>
      <span>Start with one item you know well—even if it was a miss.</span>
      <button type="button" className="ma-text-button" onClick={onExample}>
        Fill an illustrative example
      </button>
    </div>
  );
}

function OwnedLedger({ items, onAdd, onDelete }) {
  return (
    <aside className="ma-ledger" aria-label="Items you own">
      <div className="ma-ledger-head">
        <div>
          <p>Your evidence</p>
          <span>{items.length} saved {items.length === 1 ? "item" : "items"}</span>
        </div>
        <button type="button" onClick={onAdd}>Add another</button>
      </div>
      <div className="ma-ledger-list">
        {items.map((item) => (
          <article className="ma-ledger-item" key={item.id}>
            <div className="ma-ledger-index" aria-hidden="true">
              {String(items.indexOf(item) + 1).padStart(2, "0")}
            </div>
            <div>
              <span className="ma-item-category">{item.category}</span>
              <h3>{[item.brand, item.name].filter(Boolean).join(" ")}</h3>
              {item.outcome && <span className={`ma-outcome-tag ${item.outcome}`}>{OUTCOME_LABELS[item.outcome]}</span>}
              <p>{item.works}</p>
              <div className="ma-item-traits">
                {[item.variant, item.finishOrFit, item.size].filter(Boolean).map((trait) => (
                  <span key={trait}>{trait}</span>
                ))}
              </div>
            </div>
            <button
              type="button"
              className="ma-remove"
              aria-label={`Remove ${item.name}`}
              onClick={() => onDelete(item.id)}
            >
              Remove
            </button>
          </article>
        ))}
      </div>
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
  const sheetRef = useRef(null);

  useEffect(() => {
    try {
      const saved = safeProfile(JSON.parse(localStorage.getItem(STORAGE_KEY)));
      setProfile(saved);
      const lastEvaluation = saved.evaluations.at(-1);
      if (lastEvaluation?.result) {
        setVerdict(lastEvaluation.result);
        setCandidate(lastEvaluation.candidate || EMPTY_CANDIDATE);
        setStage("verdict");
      } else if (saved.items.length) {
        setCandidate((current) => ({ ...current, category: saved.items.at(-1).category }));
        setStage("candidate");
      }
    } catch {
      setNotice("Saved notes could not be read. Nothing was deleted; this page is starting with a blank working copy.");
    } finally {
      setHydrated(true);
    }
  }, []);

  const persist = (next) => {
    setProfile(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      setNotice("This browser blocked local saving. Keep this tab open so your current work is not lost.");
    }
  };

  const categoryCopy = CATEGORY_COPY[owned.category];
  const candidateCopy = CATEGORY_COPY[candidate.category];
  const currentStep = stage === "owned" ? 1 : stage === "candidate" ? 2 : 3;
  const activeOwnedItems = useMemo(
    () => profile.items.filter((item) => item.category === candidate.category),
    [profile.items, candidate.category],
  );

  const scrollToSheet = () => {
    window.requestAnimationFrame(() => {
      sheetRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const updateOwned = (key, value) => setOwned((current) => ({ ...current, [key]: value }));
  const updateCandidate = (key, value) => setCandidate((current) => ({ ...current, [key]: value }));

  const updateProductEntry = (target, value) => {
    const parsed = parseProductEntry(value);
    const setter = target === "owned" ? setOwned : setCandidate;
    setter((current) => ({
      ...current,
      entry: value,
      name: parsed.name,
      sourceUrl: parsed.sourceUrl,
      sourceHost: parsed.sourceHost,
    }));
  };

  const loadOwnedExample = () => {
    setOwned({
      ...EMPTY_OWNED,
      category: "makeup",
      entry: "Everyday cream blush",
      name: "Everyday cream blush",
      outcome: "love",
      variant: "Muted rosewood",
      finishOrFit: "Creamy, natural finish",
      frequency: "often",
      works: "The muted color blends into my skin and the cream finish never looks dry.",
      doesNotWork: "It fades by late afternoon.",
    });
    setNotice("Illustrative example loaded. Edit anything before saving it as your own note.");
  };

  const loadCandidateExample = () => {
    setCandidate({
      ...EMPTY_CANDIDATE,
      category: "makeup",
      entry: "New cream blush",
      name: "New cream blush",
      variant: "Muted rosewood",
      finishOrFit: "Creamy, natural finish",
      motivation: "I like the color, but I am not sure it adds anything new.",
      hesitations: "It may be nearly identical to what I already own.",
    });
    setNotice("Illustrative candidate loaded. It contains no retailer facts or real price data.");
  };

  const saveOwned = (event) => {
    event.preventDefault();
    const item = {
      ...owned,
      id: uid("owned"),
      createdAt: new Date().toISOString(),
    };
    const next = { ...profile, items: [...profile.items, item] };
    persist(next);
    setCandidate({ ...EMPTY_CANDIDATE, category: item.category });
    setOwned(EMPTY_OWNED);
    setNotice("Saved on this device. Now compare something you are considering.");
    setStage("candidate");
    scrollToSheet();
  };

  const runEvaluation = (event) => {
    event.preventDefault();
    const result = evaluatePurchase(profile.items, candidate);
    const evaluation = {
      id: uid("evaluation"),
      createdAt: new Date().toISOString(),
      candidate,
      result,
    };
    persist({ ...profile, evaluations: [...profile.evaluations, evaluation] });
    setVerdict(result);
    setNotice("");
    setStage("verdict");
    scrollToSheet();
  };

  const removeItem = (itemId) => {
    const item = profile.items.find((entry) => entry.id === itemId);
    if (!item || !window.confirm(`Remove ${item.name} from your saved notes?`)) return;
    persist({ ...profile, items: profile.items.filter((entry) => entry.id !== itemId) });
    setNotice("Item removed. Past evaluations remain in this browser as a record of the earlier decision.");
  };

  const startAnotherOwned = () => {
    setOwned(EMPTY_OWNED);
    setStage("owned");
    setNotice("");
    scrollToSheet();
  };

  const startWithoutReference = () => {
    setCandidate(EMPTY_CANDIDATE);
    setStage("candidate");
    setNotice("No trusted reference item yet is completely fine. Allele will show what to learn before buying instead of pretending to know your match.");
    scrollToSheet();
  };

  const startAnotherEvaluation = () => {
    const defaultCategory = profile.items.at(-1)?.category || "makeup";
    setCandidate({ ...EMPTY_CANDIDATE, category: defaultCategory });
    setVerdict(null);
    setStage("candidate");
    setNotice("");
    scrollToSheet();
  };

  if (!hydrated) {
    return <main className="ma-shell ma-loading">Opening your notes…</main>;
  }

  return (
    <main className="ma-shell">
      <nav className="ma-nav">
        <Link href="/" className="ma-wordmark">all<em>e</em>le</Link>
        <div className="ma-nav-center">My Allele</div>
        <Link href="/quiz" className="ma-nav-link">Explore Shade DNA</Link>
      </nav>

      <header className="ma-intro">
        <div className="ma-intro-copy">
          <p className="ma-volume">A personal buying notebook</p>
          <h1>Buy from what already works.</h1>
          <p className="ma-intro-lede">
            Paste a link or type a name, then tell Allele what happened. Your experience becomes evidence for the next thing you consider.
          </p>
          <button type="button" className="ma-intro-action" onClick={scrollToSheet}>
            Start your first note <span aria-hidden="true">↓</span>
          </button>
        </div>
        <div className="ma-boundary">
          <span>Data boundary</span>
          <p>Your notes stay in this browser. Allele does not verify retailer facts in this version and will never turn missing information into a confident recommendation.</p>
        </div>
      </header>

      <ol className="ma-steps" aria-label="Buying decision steps">
        {Object.entries(STEP_LABELS).map(([id, label], index) => {
          const number = index + 1;
          const state = number === currentStep ? "active" : number < currentStep ? "complete" : "future";
          return (
            <li key={id} className={state}>
              <span>{number}</span>
              <p>{label}</p>
            </li>
          );
        })}
      </ol>

      {notice && <div className="ma-notice" role="status">{notice}</div>}

      <div className="ma-workspace">
        {profile.items.length ? (
          <OwnedLedger items={profile.items} onAdd={startAnotherOwned} onDelete={removeItem} />
        ) : (
          <aside className="ma-ledger" aria-label="Items you own">
            <div className="ma-ledger-head">
              <div><p>Your evidence</p><span>0 saved items</span></div>
            </div>
            <EmptyLedger onExample={loadOwnedExample} />
          </aside>
        )}

        <section className="ma-sheet" ref={sheetRef}>
          {stage === "owned" && (
            <form onSubmit={saveOwned}>
              <div className="ma-sheet-heading">
                <p>Field note 01</p>
                <h2>Add something you already own.</h2>
                <span>Three quick answers are enough. Add specifics only when they matter to you.</span>
              </div>

              <CategoryPicker
                value={owned.category}
                onChange={(category) => setOwned((current) => ({ ...current, category }))}
              />

              <ProductEntry
                entry={owned.entry}
                name={owned.name}
                sourceUrl={owned.sourceUrl}
                sourceHost={owned.sourceHost}
                onEntryChange={(value) => updateProductEntry("owned", value)}
                onNameChange={(value) => updateOwned("name", value)}
              />

              <OutcomePicker value={owned.outcome} onChange={(value) => updateOwned("outcome", value)} />

              <Field label="Why?" hint="One useful detail is enough" className="ma-field-wide ma-experience-note">
                <textarea
                  required
                  rows="3"
                  value={owned.works}
                  onChange={(event) => updateOwned("works", event.target.value)}
                  placeholder="The color feels right, the waist pinches, the fabric is comfortable, it fades too quickly…"
                />
              </Field>

              <details className="ma-refinement">
                <summary>
                  <span>Add details for a sharper comparison</span>
                  <small>Optional · shade, finish, fit, size, or frequency</small>
                </summary>
                <div className="ma-form-grid ma-refinement-body">
                  <Field label="Brand" hint="Optional">
                    <input value={owned.brand} onChange={(event) => updateOwned("brand", event.target.value)} placeholder="Brand or maker" />
                  </Field>
                  <Field label={categoryCopy.variant} hint="Optional">
                    <input value={owned.variant} onChange={(event) => updateOwned("variant", event.target.value)} placeholder="Be as specific as you can" />
                  </Field>
                  <Field label={categoryCopy.detail} hint="Optional">
                    <input value={owned.finishOrFit} onChange={(event) => updateOwned("finishOrFit", event.target.value)} placeholder={categoryCopy.detailPlaceholder} />
                  </Field>
                  {categoryCopy.size && (
                    <Field label={categoryCopy.size} hint="Optional">
                      <input value={owned.size} onChange={(event) => updateOwned("size", event.target.value)} placeholder="Include brand-specific sizing if useful" />
                    </Field>
                  )}
                  <Field label="How often do you reach for it?" hint="Optional">
                    <select value={owned.frequency} onChange={(event) => updateOwned("frequency", event.target.value)}>
                      <option value="">Not noted</option>
                      <option value="often">Often</option>
                      <option value="sometimes">Sometimes</option>
                      <option value="rarely">Rarely</option>
                    </select>
                  </Field>
                  <Field label="Anything else Allele should remember?" hint="Optional" className="ma-field-wide">
                    <textarea rows="3" value={owned.doesNotWork} onChange={(event) => updateOwned("doesNotWork", event.target.value)} placeholder="Fades, pills, pinches, runs small, duplicates another item…" />
                  </Field>
                </div>
              </details>

              <div className="ma-form-actions">
                <button type="button" className="ma-text-button" onClick={startWithoutReference}>
                  I don&apos;t have a reference item yet
                </button>
                <button type="submit" className="ma-primary">Save and compare a purchase</button>
              </div>
            </form>
          )}

          {stage === "candidate" && (
            <form onSubmit={runEvaluation}>
              <div className="ma-sheet-heading">
                <p>Decision note 02</p>
                <h2>What are you considering?</h2>
                <span>Start with the product and the job you want it to do. Everything else is optional.</span>
              </div>

              <CategoryPicker
                value={candidate.category}
                onChange={(category) => setCandidate((current) => ({ ...current, category }))}
              />

              <div className="ma-comparison-note">
                {activeOwnedItems.length
                  ? `Allele will compare this against ${activeOwnedItems.length} saved ${candidate.category} ${activeOwnedItems.length === 1 ? "item" : "items"}.`
                  : `You have no saved ${candidate.category} items yet. The result will focus on what to learn before buying.`}
              </div>

              <ProductEntry
                entry={candidate.entry}
                name={candidate.name}
                sourceUrl={candidate.sourceUrl}
                sourceHost={candidate.sourceHost}
                onEntryChange={(value) => updateProductEntry("candidate", value)}
                onNameChange={(value) => updateCandidate("name", value)}
                noun="product"
              />

              <Field label="What do you want it to do for you?" hint="Required" className="ma-field-wide ma-experience-note">
                <textarea
                  required
                  rows="3"
                  value={candidate.motivation}
                  onChange={(event) => updateCandidate("motivation", event.target.value)}
                  placeholder="Replace something that runs out, solve a fit problem, add a genuinely new color…"
                />
              </Field>

              <details className="ma-refinement">
                <summary>
                  <span>Add details for a sharper answer</span>
                  <small>Optional · facts, price, shade, fit, or concerns</small>
                </summary>
                <div className="ma-form-grid ma-refinement-body">
                  <Field label="Brand" hint="Optional">
                    <input value={candidate.brand} onChange={(event) => updateCandidate("brand", event.target.value)} placeholder="Brand or maker" />
                  </Field>
                  <Field label={candidateCopy.variant} hint="Optional">
                    <input value={candidate.variant} onChange={(event) => updateCandidate("variant", event.target.value)} placeholder="The exact option, if known" />
                  </Field>
                  <Field label={candidateCopy.detail} hint="Optional">
                    <input value={candidate.finishOrFit} onChange={(event) => updateCandidate("finishOrFit", event.target.value)} placeholder={candidateCopy.detailPlaceholder} />
                  </Field>
                  {candidateCopy.size && (
                    <Field label="Size you are considering" hint="Optional">
                      <input value={candidate.size} onChange={(event) => updateCandidate("size", event.target.value)} placeholder="Include the retailer&apos;s size" />
                    </Field>
                  )}
                  <Field label="Current price" hint="Optional · not verified">
                    <input value={candidate.price} onChange={(event) => updateCandidate("price", event.target.value)} placeholder="$0.00" inputMode="decimal" />
                  </Field>
                  {!candidate.sourceHost && (
                    <Field label="Product source" hint="Optional but useful" className="ma-field-wide">
                      <input type="url" value={candidate.sourceUrl} onChange={(event) => updateCandidate("sourceUrl", event.target.value)} placeholder="https://brand-or-retailer.example/product" />
                    </Field>
                  )}
                  <Field label="Known product facts" hint="From packaging, the brand, or a retailer" className="ma-field-wide">
                    <textarea rows="3" value={candidate.facts} onChange={(event) => updateCandidate("facts", event.target.value)} placeholder={candidateCopy.factPlaceholder} />
                  </Field>
                  <Field label="What makes you hesitate?" hint="Optional" className="ma-field-wide">
                    <textarea rows="3" value={candidate.hesitations} onChange={(event) => updateCandidate("hesitations", event.target.value)} placeholder="Duplication, fit, shade, comfort, price, returns…" />
                  </Field>
                </div>
              </details>

              <div className="ma-form-actions">
                <button type="button" className="ma-secondary" onClick={loadCandidateExample}>Use an illustrative candidate</button>
                <button type="submit" className="ma-primary">Evaluate this purchase</button>
              </div>
            </form>
          )}

          {stage === "verdict" && verdict && (
            <div className="ma-verdict" aria-live="polite">
              <div className={`ma-verdict-hero ${verdict.status}`}>
                <div>
                  <span className="ma-verdict-label">{verdict.label}</span>
                  <h2>{verdict.headline}</h2>
                  <p>{verdict.summary}</p>
                </div>
                <div className="ma-confidence">
                  <span>Confidence</span>
                  <strong>{verdict.confidence}</strong>
                  <small>Based only on information in this notebook.</small>
                </div>
              </div>

              <div className="ma-verdict-grid">
                <section>
                  <h3>From your experience</h3>
                  {verdict.ownedEvidence.length ? (
                    <ul>{verdict.ownedEvidence.map((line) => <li key={line}>{line}</li>)}</ul>
                  ) : (
                    <p>No comparable owned item is saved yet.</p>
                  )}
                </section>
                <section>
                  <h3>Product facts you supplied</h3>
                  {verdict.candidateEvidence.length ? (
                    <ul>{verdict.candidateEvidence.map((line) => <li key={line}>{line}</li>)}</ul>
                  ) : (
                    <p>No traceable product facts were supplied. Allele did not fill the gap.</p>
                  )}
                </section>
                <section>
                  <h3>What the comparison suggests</h3>
                  <ul>{verdict.signals.map((line) => <li key={line}>{line}</li>)}</ul>
                </section>
                <section>
                  <h3>Tradeoffs and unknowns</h3>
                  {verdict.tradeoffs.length > 0 && (
                    <ul>{verdict.tradeoffs.map((line) => <li key={line}>{line}</li>)}</ul>
                  )}
                  {verdict.missing.length ? (
                    <p className="ma-missing">Still missing: {verdict.missing.join(", ")}.</p>
                  ) : (
                    <p className="ma-missing">No core comparison field is blank, but retailer facts are still not independently verified.</p>
                  )}
                </section>
              </div>

              <div className="ma-next-step">
                <span>Best next move</span>
                <p>{verdict.nextStep}</p>
              </div>

              <div className="ma-form-actions ma-verdict-actions">
                <button type="button" className="ma-secondary" onClick={startAnotherOwned}>Add more personal evidence</button>
                <button type="button" className="ma-primary" onClick={startAnotherEvaluation}>Evaluate another purchase</button>
              </div>
            </div>
          )}
        </section>
      </div>

      <footer className="ma-footer">
        <p>My Allele is an early local prototype. It does not yet connect to retailer catalogs, accounts, reviews, or cross-device sync.</p>
        <Link href="/">Return to Allele</Link>
      </footer>
    </main>
  );
}
