import { useEffect, useMemo, useState } from "react";
import { WorkspaceShell, PublicShell } from "./components/AppShell.jsx";
import { Button, Card, Field, SectionHeading, StatusBadge } from "./components/UI.jsx";
import { initialState, steps } from "./data/initialState.js";
import itcLogo from "./assets/brands/itc.png";
import nikeLogo from "./assets/brands/nike.png";
import pgLogo from "./assets/brands/pg.png";
import nestleLogo from "./assets/brands/nestle.png";
import unileverLogo from "./assets/brands/unilever.png";

const STORAGE_KEY = "supply-now-supplier-draft";

const partnerBrands = [
  { name: "ITC Limited", shortName: "ITC", logo: itcLogo },
  { name: "Nike", logo: nikeLogo },
  { name: "Procter & Gamble", shortName: "P&G", logo: pgLogo },
  { name: "Nestlé", logo: nestleLogo },
  { name: "Unilever", logo: unileverLogo },
];

function Welcome({ onStart }) {
  return (
    <PublicShell>
      <section className="welcome">
        <div className="welcome__copy">
          <p className="eyebrow">Supplier onboarding</p>
          <h1>Bring your business to Supply NOW</h1>
          <p>Create one supplier profile, apply across Supply NOW partner brands, and track your compliance status in one place.</p>
          <div className="welcome__actions welcome__choice-grid">
            <div><h2>New here?</h2><p>Begin your journey as a Supply NOW supplier.</p><Button onClick={onStart}>Start application</Button></div>
            <div><h2>Existing Suppliers</h2><p>Pick up where you left off or manage your profile.</p><Button variant="secondary" onClick={onStart}>Login</Button></div>
          </div>
          <div className="welcome__help"><p className="eyebrow">We&apos;ll help with:</p><div><span>⌁ Extracting business details</span><span>⊘ Finding expired documents</span><span>⌖ Checking address mismatches</span><span>✓ Compliance review summary</span></div></div>
        </div>
        <div className="welcome__panel">
          <h2>Brand Family</h2>
          <p>One supplier profile, five global companies. Use verified information across the Supply NOW partner ecosystem.</p>
          <div className="brand-ecosystem">
            <span className="ecosystem-core">Supply NOW</span>
            {partnerBrands.map((brand) => <span className="partner-brand" key={brand.name}><img src={brand.logo} alt={`${brand.name} logo`} /></span>)}
          </div>
        </div>
      </section>
    </PublicShell>
  );
}

function Documents({ data, setData, next }) {
  const issueCount = data.documents.filter((document) => !["Verified", "In review"].includes(document.status)).length;
  function markUploaded(id) {
    setData((current) => ({ ...current, documents: current.documents.map((doc) => doc.id === id ? { ...doc, file: `${doc.name.toLowerCase().replaceAll(" ", "-")}.pdf`, status: "In review" } : doc) }));
  }
  return (
    <>
      <SectionHeading title="Documents & Compliance" description="Upload the documents you already have. We’ll read them, pre-fill your profile, and show anything missing based on your brands, category, and region." />
      <div className="upload-workspace"><button className="upload-drop"><span>⇧</span><strong>Upload All Documents</strong><p>Drag and drop your business document stack here, or choose files. We will sort them for you.</p><small>Maximum 15 MB per file</small></button><div className="upload-or">OR</div><Card className="upload-slots"><div className="upload-slots__heading"><strong>Upload Individual Document</strong><span>{data.documents.filter((doc) => doc.file).length} of {data.documents.length} Required</span></div>{data.documents.map((doc) => <button key={doc.id} onClick={() => markUploaded(doc.id)}><span className="upload-slot__icon">▤</span><span><strong>{doc.name}</strong><small>{doc.file ? doc.file : "Required • PDF, PNG, JPG"}</small></span><b>{doc.file ? "✓" : "+"}</b></button>)}</Card></div>
      {issueCount > 0 && <Card className="notice notice--warning"><span>!</span><div><strong>{issueCount} {issueCount === 1 ? "document needs" : "documents need"} attention</strong><p>Applications cannot be submitted with missing or unreadable required documents.</p></div></Card>}
      <Card className="table-card">
        <div className="table-title"><div><h2>Required documents</h2><p>Requirements are based on your category and operating region.</p></div><span>{data.documents.length} documents</span></div>
        <div className="document-table" role="table">
          <div className="document-table__head" role="row"><span>Document</span><span>File</span><span>Expiry</span><span>Status</span><span>Action</span></div>
          {data.documents.map((doc) => <div className="document-table__row" role="row" key={doc.id}><span><strong>{doc.name}</strong><small>Required</small></span><span>{doc.file || "No file uploaded"}</span><span>{doc.expiry}</span><span><StatusBadge status={doc.status} /></span><span><Button variant="text" onClick={() => markUploaded(doc.id)}>{doc.file ? "Replace" : "Upload"}</Button></span></div>)}
        </div>
      </Card>
      <PageActions next={next} />
    </>
  );
}

function Business({ data, updateSection, next, back }) {
  const business = data.business;
  const update = (key) => (event) => updateSection("business", key, event.target.value);
  return (
    <>
      <SectionHeading title="Business Information" description="Review and confirm your business details extracted from your documents." />
      <Card className="form-card"><h2>Company profile</h2><div className="form-grid"><Field label="Legal business name" value={business.legalName} onChange={update("legalName")} /><Field label="Trade name / DBA" value={business.tradeName} onChange={update("tradeName")} /><Field label="Registration number" value={business.registrationNumber} onChange={update("registrationNumber")} /><Field label="Tax ID / GST / VAT" value={business.taxId} onChange={update("taxId")} /><Field label="Year established" value={business.yearEstablished} onChange={update("yearEstablished")} /><Field label="Business type" as="select" options={["Manufacturer", "Distributor", "Trader", "Service provider"]} value={business.businessType} onChange={update("businessType")} /><Field label="Website" value={business.website} onChange={update("website")} /><Field label="Country of incorporation" as="select" options={["India", "United States", "United Kingdom", "Singapore"]} value={business.country} onChange={update("country")} /></div></Card>
      <Card className="form-card"><h2>Location & contact</h2><div className="form-grid"><Field className="field--wide" label="Registered office address" as="textarea" value={business.address} onChange={update("address")} /><Field label="Primary contact" value={business.contactName} onChange={update("contactName")} /><Field label="Business email" type="email" value={business.contactEmail} onChange={update("contactEmail")} /></div></Card>
      <PageActions back={back} next={next} />
    </>
  );
}

function Supply({ data, updateSection, next, back }) {
  const supply = data.supply;
  const update = (key) => (event) => updateSection("supply", key, event.target.value);
  return (
    <>
      <SectionHeading title="Supply Details" description="Describe the material, quality profile, and operating capacity for this application." action={<Button variant="secondary">+ Add new item</Button>} />
      <div className="item-chip"><span>CL</span><div><strong>{supply.botanicalName}</strong><small>{supply.itemName} · {supply.casNumber}</small></div><StatusBadge status="Draft" /></div>
      <Card className="form-card"><h2>Item identification</h2><div className="form-grid"><Field label="Supplied item name" value={supply.itemName} onChange={update("itemName")} /><Field label="Botanical / chemical name" value={supply.botanicalName} onChange={update("botanicalName")} /><Field label="CAS number" value={supply.casNumber} onChange={update("casNumber")} /><Field label="Country of origin" value={supply.countryOfOrigin} onChange={update("countryOfOrigin")} /><Field className="field--wide" label="Intended use" as="textarea" value={supply.intendedUse} onChange={update("intendedUse")} /><Field label="Product grade" as="select" options={["Food / cosmetic grade", "Pharmaceutical grade", "Industrial grade"]} value={supply.grade} onChange={update("grade")} /><Field label="Form / state" value={supply.form} onChange={update("form")} /></div></Card>
      <Card className="form-card"><h2>Quality & operations</h2><div className="form-grid"><Field label="Purity / active concentration" value={supply.purity} onChange={update("purity")} /><Field label="Shelf life" value={supply.shelfLife} onChange={update("shelfLife")} /><Field label="Lead time" value={supply.leadTime} onChange={update("leadTime")} /><Field label="Monthly capacity" value={supply.monthlyCapacity} onChange={update("monthlyCapacity")} /><Field className="field--wide" label="Traceability system" as="textarea" value={supply.traceability} onChange={update("traceability")} /></div></Card>
      <PageActions back={back} next={next} />
    </>
  );
}

function Review({ data, updateSection, back, onSubmit, submitted }) {
  const pending = data.documents.filter((doc) => !["Verified", "In review"].includes(doc.status));
  if (submitted) return <Card className="success"><span className="success__mark">✓</span><p className="eyebrow">Application submitted</p><h1>Your profile is ready for review</h1><p>Compliance can now review your business, material, and document information. Updates will appear in this workspace.</p><div className="success__meta"><span><small>Application</small><strong>APP-20491</strong></span><span><small>Status</small><StatusBadge status="Under review" /></span><span><small>Expected update</small><strong>3–5 business days</strong></span></div><Button onClick={() => window.location.reload()}>Return to dashboard</Button></Card>;
  return (
    <>
      <SectionHeading title="Review & Submit" description="Review and submit your application for the selected raw material." />
      <div className="readiness-grid"><Card><StatusBadge status="Ready" /><h2>Business information</h2><p>{data.business.legalName}<br />{data.business.country}</p></Card><Card><StatusBadge status="Ready" /><h2>Supply details</h2><p>{data.supply.botanicalName}<br />{data.supply.grade}</p></Card><Card className={pending.length ? "card--attention" : ""}><StatusBadge status={pending.length ? "Action needed" : "Ready"} /><h2>Documents</h2><p>{pending.length ? `${pending.length} unresolved requirements` : "All documents supplied"}</p></Card></div>
      {pending.length > 0 && <Card className="pending-list"><h2>Pending actions</h2>{pending.map((doc) => <div key={doc.id}><span>!</span><strong>{doc.name}</strong><small>{doc.status}</small></div>)}</Card>}
      <Card className="form-card"><h2>Supplier declaration</h2><p className="muted">I confirm that the information supplied is complete and accurate, and I am authorized to submit it for this business.</p><div className="form-grid"><Field label="Full name" value={data.declaration.fullName} onChange={(e) => updateSection("declaration", "fullName", e.target.value)} placeholder="Enter full name" /><Field label="Place" value={data.declaration.place} onChange={(e) => updateSection("declaration", "place", e.target.value)} placeholder="Enter city" /></div><label className="checkbox"><input type="checkbox" checked={data.declaration.accepted} onChange={(e) => updateSection("declaration", "accepted", e.target.checked)} /><span>I agree to the Supply NOW Terms of Service and Raw Material Quality Standards.</span></label></Card>
      <PageActions back={back} nextLabel="Submit application" next={onSubmit} disabled={pending.length > 0 || !data.declaration.accepted || !data.declaration.fullName} />
    </>
  );
}

function PageActions({ back, next, nextLabel = "Save and continue", disabled = false }) {
  return <div className="page-actions">{back ? <Button variant="secondary" onClick={back}>Back</Button> : <span />}<Button onClick={next} disabled={disabled}>{nextLabel} <span aria-hidden="true">→</span></Button></div>;
}

export default function App() {
  const [started, setStarted] = useState(() => sessionStorage.getItem("supply-now-started") === "true");
  const [activeStep, setActiveStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [data, setData] = useState(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || initialState; } catch { return initialState; }
  });
  useEffect(() => localStorage.setItem(STORAGE_KEY, JSON.stringify(data)), [data]);
  const completion = useMemo(() => [25, 50, 75, 100][activeStep], [activeStep]);
  const updateSection = (section, key, value) => setData((current) => ({ ...current, [section]: { ...current[section], [key]: value } }));
  const goNext = () => setActiveStep((step) => Math.min(step + 1, steps.length - 1));
  const goBack = () => setActiveStep((step) => Math.max(step - 1, 0));
  const start = () => { sessionStorage.setItem("supply-now-started", "true"); setStarted(true); };
  if (!started) return <Welcome onStart={start} />;
  const pages = [<Documents data={data} setData={setData} next={goNext} />, <Business data={data} updateSection={updateSection} next={goNext} back={goBack} />, <Supply data={data} updateSection={updateSection} next={goNext} back={goBack} />, <Review data={data} updateSection={updateSection} back={goBack} onSubmit={() => setSubmitted(true)} submitted={submitted} />];
  return <WorkspaceShell steps={steps} activeStep={activeStep} onNavigate={setActiveStep} completion={completion}>{pages[activeStep]}</WorkspaceShell>;
}
