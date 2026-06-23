export function Button({ children, variant = "primary", className = "", ...props }) {
  return <button className={`button button--${variant} ${className}`} {...props}>{children}</button>;
}

export function Field({ label, hint, as = "input", options = [], className = "", ...props }) {
  const Element = as;
  return (
    <label className={`field ${className}`}>
      <span className="field__label">{label}</span>
      {Element === "select" ? (
        <select className="field__control" {...props}>
          {options.map((option) => <option key={option}>{option}</option>)}
        </select>
      ) : Element === "textarea" ? (
        <textarea className="field__control field__control--textarea" {...props} />
      ) : (
        <input className="field__control" {...props} />
      )}
      {hint && <span className="field__hint">{hint}</span>}
    </label>
  );
}

export function StatusBadge({ status }) {
  const tone = status.toLowerCase().replaceAll(" ", "-");
  return <span className={`status status--${tone}`}>{status}</span>;
}

export function SectionHeading({ eyebrow, title, description, action }) {
  return (
    <div className="section-heading">
      <div>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1>{title}</h1>
        {description && <p className="section-heading__description">{description}</p>}
      </div>
      {action}
    </div>
  );
}

export function Card({ children, className = "" }) {
  return <section className={`card ${className}`}>{children}</section>;
}
