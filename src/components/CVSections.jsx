// Small presentational building blocks shared by both CV pages, plus the two
// page bodies (PageOne / PageTwo). Kept in one file so the CV lives together.
import {
  summary,
  skills,
  education,
  experience,
  academicProjects,
  personalProjects,
  references,
} from "../cvData.js";

function Section({ title, children }) {
  return (
    <section className="section">
      <h2 className="section__title">{title}</h2>
      {children}
    </section>
  );
}

// A dated entry: timeline column on the left, content on the right.
function Entry({ period, location, org, role, detail, bullets }) {
  return (
    <div className="entry">
      <div className="entry__meta">
        <span className="entry__period">{period}</span>
        {location && <span className="entry__location">{location}</span>}
      </div>
      <div className="entry__body">
        <h3 className="entry__org">
          {org}
          {role && <span className="entry__role"> — {role}</span>}
        </h3>
        {detail && <p className="entry__detail">{detail}</p>}
        {bullets && (
          <ul className="entry__bullets">
            {bullets.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export function PageOne() {
  return (
    <>
      <Section title="Profile">
        <p className="profile-text">{summary}</p>
      </Section>

      <Section title="Skills">
        <div className="skills">
          {skills.map((s) => (
            <div className="skill" key={s.label}>
              <span className="skill__label">{s.label}</span>
              <span className="skill__items">{s.items}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Education">
        {education.map((e, i) => (
          <Entry key={i} {...e} />
        ))}
      </Section>

      <Section title="Professional Experience">
        {experience.map((e, i) => (
          <Entry key={i} {...e} />
        ))}
      </Section>
    </>
  );
}

export function PageTwo() {
  return (
    <>
      <Section title="Academic Projects">
        {academicProjects.map((e, i) => (
          <Entry key={i} {...e} />
        ))}
      </Section>

      <Section title="Personal Projects">
        {personalProjects.map((e, i) => (
          <Entry key={i} {...e} />
        ))}
      </Section>

      <Section title="References">
        <div className="references">
          {references.map((r, i) => (
            <div className="reference" key={i}>
              <span className="reference__name">{r.name}</span>
              <span className="reference__title">{r.title}</span>
              <span className="reference__contact">{r.contact}</span>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
