import { Button } from "./UI.jsx";

function Brand() {
  return (
    <div className="brand">
      <span><strong>Supply NOW Partners</strong><small>Supplier onboarding</small></span>
    </div>
  );
}

export function PublicShell({ children }) {
  return (
    <div className="public-shell">
      <header className="public-header">
        <Brand />
        <div className="public-header__actions"><Button variant="quiet">Help</Button><button className="icon-button" aria-label="Notifications">●</button><button className="icon-button" aria-label="Account">◉</button></div>
      </header>
      <main>{children}</main>
      <footer className="footer"><span>© 2026 Supply NOW</span><nav><a href="#privacy">Privacy</a><a href="#terms">Terms</a><a href="#support">Contact support</a></nav></footer>
    </div>
  );
}

export function WorkspaceShell({ children, steps, activeStep, onNavigate, completion }) {
  return (
    <div className="application-shell">
      <header className="application-header">
        <strong>Greenfield Ingredients Pvt. Ltd.</strong>
        <div><button className="icon-button" aria-label="Notifications">●</button><button className="icon-button" aria-label="Settings">⚙</button><button className="user-menu" aria-label="Account menu">AR</button></div>
      </header>
      <section className="material-bar">
        <strong>Raw Materials</strong>
        <button className="material-pill is-active"><span className="material-thumb">CL</span>Curcuma longa <small>2 actions needed</small></button>
        <button className="material-pill"><span className="material-thumb">PC</span>Pure Curcumin <small className="is-ready">✓ Ready to submit</small></button>
      </section>
      <div className="workspace-shell">
      <aside className="sidebar">
        <div className="sidebar__heading"><strong>Workspace</strong><button className="icon-button" aria-label="Collapse navigation">☰</button></div>
        <nav className="step-nav" aria-label="Application sections">
          {steps.map((step, index) => (
            <button key={step.id} className={`step-nav__item ${index === activeStep ? "is-active" : ""} ${index < activeStep ? "is-complete" : ""}`} onClick={() => onNavigate(index)}>
              <span className="step-nav__number">{index < activeStep ? "✓" : step.icon}</span>
              <span>{step.label}</span>
              {index === 0 && <small className="step-nav__alert">{activeStep > 0 ? "1" : "2"}</small>}
              {index === 2 && <small className="step-nav__alert">1</small>}
              {index === 3 && activeStep < 3 && <small className="step-nav__lock">⌑</small>}
            </button>
          ))}
        </nav>
        <div className="progress-card">
          <div><span>Application progress</span><strong>{completion}%</strong></div>
          <div className="progress-track"><span style={{ width: `${completion}%` }} /></div>
          <small>Your application saves automatically.</small>
        </div>
        <div className="support-card"><strong>Need assistance?</strong><p>Onboarding specialists are here to help.</p><Button variant="secondary">Chat Support</Button></div>
      </aside>
      <div className="workspace-main">
        <main className="workspace-content">{children}</main>
        <footer className="footer footer--workspace"><span>© 2026 Supply NOW</span><nav><a href="#privacy">Privacy</a><a href="#terms">Terms</a><a href="#support">Support</a></nav></footer>
      </div>
      </div>
    </div>
  );
}
