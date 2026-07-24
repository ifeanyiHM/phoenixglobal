import { useState, type CSSProperties } from "react";
import { Link, useParams } from "react-router-dom";
import { getJobBySlug, isJobEffectivelyOpen } from "../../Data/careers.data";

const styles: Record<string, CSSProperties> = {
  notFound: {
    minHeight: "60vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: "2rem",
  },
  notFoundTitle: {
    fontFamily: "var(--font-headings)",
    fontSize: "1.6rem",
    marginBottom: "0.75rem",
  },
  notFoundText: {
    color: "#55595a",
    marginBottom: "1.5rem",
  },
  notFoundLink: {
    color: "var(--secondary-text-color)",
    fontWeight: 600,
    textDecoration: "none",
  },

  page: {
    maxWidth: 1100,
    margin: "0 auto",
    padding:
      "clamp(2rem, 5vw, 3.5rem) clamp(1.5rem, 6vw, 3rem) clamp(5rem, 8vw, 7rem)",
    color: "var(--primary-text-color)",
  },
  back: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.4rem",
    fontSize: "0.85rem",
    fontWeight: 600,
    color: "var(--primary-text-color)",
    textDecoration: "none",
    marginBottom: "2rem",
  },
  header: {
    marginBottom: "2.5rem",
    paddingBottom: "2rem",
    borderBottom: "1px solid #e6e3e3",
  },
  type: {
    display: "inline-block",
    fontSize: "0.7rem",
    fontWeight: 600,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    // color: "var(--secondary-text-color)",
    background: "rgba(167, 156, 73, 0.12)",
    padding: "0.3rem 0.7rem",
    borderRadius: 100,
    marginBottom: "0.9rem",
    marginLeft: "0.5rem",
  },
  title: {
    fontFamily: "var(--font-headings)",
    fontSize: "clamp(1.9rem, 4vw, 2.3rem)",
    fontWeight: 600,
    lineHeight: 1.25,
    marginBottom: "1rem",
  },
  meta: {
    display: "flex",
    flexWrap: "wrap",
    gap: "1.5rem",
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  metaItem: {
    display: "flex",
    alignItems: "center",
    gap: "0.4rem",
    fontSize: "0.85rem",
    color: "#6b6f6f",
  },
  metaIcon: {
    // color: "var(--secondary-text-color)",
  },

  body: {
    display: "flex",
    flexWrap: "wrap",
    gap: "3rem",
  },
  main: {
    flex: "999 1 420px",
    minWidth: 0,
  },
  section: {
    marginBottom: "2.5rem",
  },
  h2: {
    fontFamily: "var(--font-headings)",
    fontSize: "1.25rem",
    fontWeight: 600,
    paddingBottom: "0.6rem",
    marginBottom: "1rem",
    borderBottom: "2px solid var(--secondary-text-color)",
    display: "inline-block",
  },
  p: {
    fontSize: "0.92rem",
    lineHeight: 1.8,
    color: "#4a4d4d",
    margin: 0,
  },
  ul: {
    listStyle: "none",
    display: "flex",
    flexDirection: "column",
    gap: "0.6rem",
    padding: 0,
    margin: 0,
  },
  li: {
    position: "relative",
    paddingLeft: "1.1rem",
    fontSize: "0.9rem",
    lineHeight: 1.65,
    color: "#4a4d4d",
  },
  liDot: {
    position: "absolute",
    left: 0,
    top: "0.6em",
    width: 6,
    height: 6,
    borderRadius: "50%",
    background: "var(--secondary-text-color)",
  },
  group: {
    marginBottom: "1.5rem",
  },
  groupTitle: {
    fontSize: "0.95rem",
    fontWeight: 600,
    color: "var(--primary-text-color)",
    marginBottom: "0.6rem",
  },

  sidebar: {
    flex: "1 1 260px",
    minWidth: 260,
  },
  card: {
    background: "var(--primary-background-color)",
    borderRadius: 12,
    padding: "1.75rem",
    boxShadow: "0 4px 16px rgba(11, 17, 52, 0.1)",
    position: "sticky",
    top: "6rem",
  },
  cardTitle: {
    fontFamily: "var(--font-headings)",
    fontSize: "1.05rem",
    fontWeight: 600,
    marginBottom: "1.25rem",
  },
  dl: {
    display: "flex",
    flexDirection: "column",
    gap: "0.9rem",
    marginBottom: "1.5rem",
  },
  dlRow: {
    display: "flex",
    flexDirection: "column",
    gap: "0.15rem",
    paddingBottom: "0.9rem",
    borderBottom: "1px solid #efefef",
  },
  dlRowLast: {
    borderBottom: "none",
    paddingBottom: 0,
  },
  dt: {
    fontSize: "0.7rem",
    fontWeight: 700,
    letterSpacing: "0.05em",
    textTransform: "uppercase",
    // color: "var(--secondary-text-color)",
  },
  dd: {
    fontSize: "0.88rem",
    color: "var(--primary-text-color)",
    margin: 0,
  },
  applyBtn: {
    display: "block",
    textAlign: "center",
    width: "100%",
    background: "var(--dark-background-color)",
    color: "#fff",
    textDecoration: "none",
    fontWeight: 600,
    fontSize: "0.9rem",
    padding: "0.9rem 1.5rem",
    borderRadius: 100,
    transition: "background 0.3s ease, transform 0.2s ease",
    boxSizing: "border-box",
  },
  applyBtnHover: {
    background: "var(--secondary-text-color)",
    transform: "translateY(-2px)",
  },
  closed: {
    textAlign: "center",
    fontSize: "0.85rem",
    background: "var(--dark-background-color)",
    color: "#fff",
    padding: "0.9rem",
    borderRadius: 8,
    margin: 0,
  },
};

const LocationIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    style={styles.metaIcon}
    aria-hidden="true"
  >
    <path d="M21 10c0 6-9 13-9 13s-9-7-9-13a9 9 0 0 1 18 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const CalendarIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    style={styles.metaIcon}
    aria-hidden="true"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <path d="M16 2v4M8 2v4M3 10h18" />
  </svg>
);

const JobDescriptionPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const job = slug ? getJobBySlug(slug) : undefined;
  const [applyHovered, setApplyHovered] = useState(false);

  if (!job) {
    return (
      <div style={styles.notFound}>
        <h1 style={styles.notFoundTitle}>Vacancy not found</h1>
        <p style={styles.notFoundText}>
          This role may have closed or the link may be incorrect.
        </p>
        <Link to="/careers" style={styles.notFoundLink}>
          &larr; Back to Careers
        </Link>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <Link to="/careers" style={styles.back}>
          <span aria-hidden="true">&larr;</span> Back to Careers
        </Link>

        <span style={styles.type}> {job.employmentType}</span>
        <h1 style={styles.title}>{job.title}</h1>

        <ul style={styles.meta}>
          <li style={styles.metaItem}>
            <LocationIcon />
            {job.location}
          </li>
          <li style={styles.metaItem}>
            <CalendarIcon />
            {job.applicationDeadline}
          </li>
        </ul>
      </header>

      <div style={styles.body}>
        <div style={styles.main}>
          <section style={styles.section}>
            <h2 style={styles.h2}>Job Summary</h2>
            <p style={styles.p}>{job.jobSummary}</p>
          </section>

          <section style={styles.section}>
            <h2 style={styles.h2}>Key Responsibilities</h2>
            {job.responsibilities.map((group) => (
              <div style={styles.group} key={group.heading}>
                <h3 style={styles.groupTitle}>{group.heading}</h3>
                <ul style={styles.ul}>
                  {group.items.map((item) => (
                    <li style={styles.li} key={item}>
                      <span style={styles.liDot} aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          <section style={styles.section}>
            <h2 style={styles.h2}>Qualifications</h2>
            <ul style={styles.ul}>
              {job.qualifications.map((item) => (
                <li style={styles.li} key={item}>
                  <span style={styles.liDot} aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section style={styles.section}>
            <h2 style={styles.h2}>Skills Required</h2>
            <ul style={styles.ul}>
              {job.skills.map((item) => (
                <li style={styles.li} key={item}>
                  <span style={styles.liDot} aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {job.addedAdvantage && job.addedAdvantage.length > 0 && (
            <section style={styles.section}>
              <h2 style={styles.h2}>Added Advantage</h2>
              <ul style={styles.ul}>
                {job.addedAdvantage.map((item) => (
                  <li style={styles.li} key={item}>
                    <span style={styles.liDot} aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section style={styles.section}>
            <h2 style={styles.h2}>Benefits</h2>
            <ul style={styles.ul}>
              {job.benefits.map((item) => (
                <li style={styles.li} key={item}>
                  <span style={styles.liDot} aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section style={{ ...styles.section, marginBottom: 0 }}>
            <h2 style={styles.h2}>Career Growth</h2>
            <p style={styles.p}>{job.careerGrowth}</p>
          </section>
        </div>

        <aside style={styles.sidebar}>
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Role Details</h3>

            <dl style={styles.dl}>
              <div style={styles.dlRow}>
                <dt style={styles.dt}>Employment Type</dt>
                <dd style={styles.dd}>{job.employmentType}</dd>
              </div>
              <div style={styles.dlRow}>
                <dt style={styles.dt}>Location</dt>
                <dd style={styles.dd}>{job.location}</dd>
              </div>
              {job.salaryRange && (
                <div style={styles.dlRow}>
                  <dt style={styles.dt}>Salary Range</dt>
                  <dd style={styles.dd}>{job.salaryRange}</dd>
                </div>
              )}
              {job.workingHours && (
                <div style={styles.dlRow}>
                  <dt style={styles.dt}>Working Hours</dt>
                  <dd style={styles.dd}>{job.workingHours}</dd>
                </div>
              )}
              {job.probationPeriod && (
                <div style={styles.dlRow}>
                  <dt style={styles.dt}>Probation Period</dt>
                  <dd style={styles.dd}>{job.probationPeriod}</dd>
                </div>
              )}
              <div style={{ ...styles.dlRow, ...styles.dlRowLast }}>
                <dt style={styles.dt}>Application Deadline</dt>
                <dd style={styles.dd}>{job.applicationDeadline}</dd>
              </div>
            </dl>

            {isJobEffectivelyOpen(job) ? (
              <a
                href={job.googleFormUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  ...styles.applyBtn,
                  ...(applyHovered ? styles.applyBtnHover : {}),
                }}
                onMouseEnter={() => setApplyHovered(true)}
                onMouseLeave={() => setApplyHovered(false)}
              >
                Apply Now
              </a>
            ) : (
              <p style={styles.closed}>
                This position is no longer accepting applications. Applications
                closed on 7th August 2026.
              </p>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default JobDescriptionPage;
