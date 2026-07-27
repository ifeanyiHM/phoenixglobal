import { useState, type CSSProperties } from "react";
import { isRecruitmentOpen, jobVacancies } from "../../Data/careers.data";
import JobCard from "../../Components/jobCard/JobCard";

const coreValues = [
  {
    title: "Integrity",
    description:
      "We do right by every client and colleague, even when no one is watching.",
  },
  {
    title: "Excellence",
    description:
      "We hold our work — and each other — to a standard clients can feel.",
  },
  {
    title: "Innovation",
    description:
      "We use technology and fresh thinking to make real estate simpler.",
  },
  {
    title: "Client-Centricity",
    description:
      "Every decision starts with what's best for the people we serve.",
  },
  {
    title: "Collaboration",
    description: "We grow faster together than any one of us could alone.",
  },
];

const whyJoinUs = [
  {
    title: "Real, hands-on experience",
    description:
      "Work directly on live deals, campaigns, and client relationships from day one — not busywork.",
  },
  {
    title: "Mentorship that matters",
    description:
      "Learn from a team that's building a modern real estate brand and wants to see you grow with it.",
  },
  {
    title: "A technology-first culture",
    description:
      "We use modern tools and AI to work smarter, and we want people who are curious to do the same.",
  },
  {
    title: "Room to grow",
    description:
      "As 1502 Properties scales, so do the opportunities for the people who help us get there.",
  },
];

const recruitmentProcess = [
  {
    step: "01",
    title: "Apply online",
    description:
      "Submit your application through our online form for the role you're interested in.",
  },
  {
    step: "02",
    title: "Application review",
    description:
      "Our recruitment team reviews every application against the role's requirements.",
  },
  {
    step: "03",
    title: "Interview",
    description:
      "Shortlisted candidates are invited for an interview with the hiring team.",
  },
  {
    step: "04",
    title: "Offer & onboarding",
    description:
      "Successful candidates receive an offer and are welcomed into the team.",
  },
];

const styles: Record<string, CSSProperties> = {
  page: {
    color: "var(--primary-text-color)",
  },
  eyebrow: {
    display: "inline-block",
    fontSize: "0.75rem",
    fontWeight: 600,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: "var(--secondary-text-color)",
    marginBottom: "0.75rem",
  },
  eyebrowLight: {
    color: "#d8cf8f",
  },

  // ---- Banner (matches Contact / ServicePage / About) ----
  hero: {
    position: "relative",
    minHeight: "clamp(18rem, 34vw, 24rem)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    backgroundImage:
      "linear-gradient(180deg, rgba(15,17,20,0.4) 0%, rgba(15,17,20,0.8) 100%), url('/hero-image.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  heroOverlay: {
    width: "100%",
    padding: "clamp(2.5rem, 6vw, 4rem) 1.5rem",
  },
  heroContent: {
    maxWidth: 640,
    margin: "0 auto",
    textAlign: "center",
    color: "var(--light-color)",
  },
  heroTitle: {
    fontFamily: "var(--font-headings)",
    fontSize: "clamp(1.8rem, 4.5vw, 2.75rem)",
    lineHeight: 1.3,
    fontWeight: 600,
    marginBottom: "1.1rem",
  },
  heroText: {
    fontSize: "0.95rem",
    lineHeight: 1.75,
    color: "#c7ccd6",
    marginBottom: "2rem",
  },
  heroCta: {
    display: "inline-block",
    background: "var(--secondary-text-color)",
    color: "#fff",
    textDecoration: "none",
    fontWeight: 600,
    fontSize: "0.9rem",
    padding: "0.85rem 2rem",
    borderRadius: 100,
    transition: "background 0.3s ease, transform 0.2s ease",
  },
  heroCtaHover: {
    background: "#b6b63c",
    transform: "translateY(-2px)",
  },

  // About
  about: {
    padding: "clamp(3rem, 6vw, 4rem) clamp(1.5rem, 6vw, 3rem)",
  },
  aboutInner: {
    maxWidth: 700,
    margin: "0 auto",
    textAlign: "center",
  },
  sectionHeading: {
    fontFamily: "var(--font-headings)",
    fontSize: "clamp(1.7rem, 3vw, 2.1rem)",
    fontWeight: 500,
    marginBottom: "1.25rem",
  },
  bodyText: {
    fontSize: "0.95rem",
    lineHeight: 1.8,
    color: "#4a4d4d",
  },

  // Core values (dark)
  values: {
    backgroundColor: "var(--dark-background-color)",
    padding: "clamp(3rem, 6vw, 4rem) clamp(1.5rem, 6vw, 3rem)",
    color: "#fff",
  },
  valuesInner: {
    maxWidth: 1100,
    margin: "0 auto",
    textAlign: "center",
  },
  valuesHeading: {
    fontFamily: "var(--font-headings)",
    fontSize: "clamp(1.7rem, 3vw, 2.1rem)",
    fontWeight: 500,
    marginBottom: "3rem",
  },
  valuesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
    gap: "2rem",
    textAlign: "left",
  },
  valueCard: {
    padding: "1.5rem 1.25rem",
    borderRadius: 12,
    background: "rgba(255, 255, 255, 0.03)",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    transition: "background 0.3s ease, transform 0.3s ease",
  },
  valueCardHover: {
    background: "rgba(255, 255, 255, 0.06)",
    transform: "translateY(-3px)",
  },
  valueMark: {
    display: "block",
    width: "2rem",
    height: 2,
    background: "var(--secondary-text-color)",
    marginBottom: "1.25rem",
  },
  valueTitle: {
    fontSize: "1rem",
    fontWeight: 600,
    marginBottom: "0.6rem",
  },
  valueText: {
    fontSize: "0.85rem",
    lineHeight: 1.6,
    color: "#c0c5cd",
  },

  // Why join us
  why: {
    padding: "clamp(3rem, 6vw, 4rem) clamp(1.5rem, 6vw, 3rem)",
    textAlign: "center",
  },
  whyGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "2rem",
    maxWidth: 1100,
    margin: "0 auto",
    textAlign: "left",
  },
  whyCard: {
    paddingLeft: "1.1rem",
    borderLeft: "2px solid var(--secondary-text-color)",
  },
  whyTitle: {
    fontSize: "1.05rem",
    fontWeight: 600,
    marginBottom: "0.5rem",
  },

  // Recruitment process
  process: {
    padding: "clamp(3rem, 6vw, 4rem) clamp(1.5rem, 6vw, 3rem)",
    background: "#f6f6f6",
    textAlign: "center",
  },
  processTimeline: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "2rem",
    maxWidth: 1100,
    margin: "0 auto",
    textAlign: "left",
  },
  processNumber: {
    display: "block",
    fontFamily: "var(--font-headings)",
    fontSize: "1.6rem",
    fontWeight: 600,
    color: "var(--secondary-text-color)",
    marginBottom: "0.75rem",
  },
  processTitle: {
    fontSize: "1rem",
    fontWeight: 600,
    marginBottom: "0.5rem",
  },

  // Vacancies
  vacancies: {
    padding:
      "clamp(3rem, 6vw, 4rem) clamp(1.5rem, 6vw, 3rem) clamp(4rem, 7vw, 5rem)",
    textAlign: "center",
  },
  vacanciesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "1.5rem",
    maxWidth: 1100,
    margin: "0 auto",
    textAlign: "left",
  },
  vacanciesEmpty: {
    maxWidth: 480,
    margin: "0 auto",
    padding: "3rem 1.5rem",
    borderRadius: 12,
    background: "var(--secondary-background-color)",
  },
};

const CareersPage = () => {
  const [ctaHovered, setCtaHovered] = useState(false);
  const [hoveredValue, setHoveredValue] = useState<string | null>(null);

  return (
    <div style={styles.page}>
      {/* HERO */}
      <section style={styles.hero}>
        <div style={styles.heroOverlay}>
          <div style={styles.heroContent}>
            <span style={styles.eyebrow}>Careers at 1502 Properties</span>
            <h1 style={styles.heroTitle}>
              Build the future of real estate with us
            </h1>
            <p style={styles.heroText}>
              We're a fast-growing real estate brokerage connecting clients with
              quality investment opportunities. Come do work that matters,
              alongside people who care about getting it right.
            </p>
            <a
              href="#current-vacancies"
              style={{
                ...styles.heroCta,
                ...(ctaHovered ? styles.heroCtaHover : {}),
              }}
              onMouseEnter={() => setCtaHovered(true)}
              onMouseLeave={() => setCtaHovered(false)}
            >
              View Open Roles
            </a>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section style={styles.about}>
        <div style={styles.aboutInner}>
          <span style={styles.eyebrow}>About Working Here</span>
          <h2 style={styles.sectionHeading}>
            A team built on trust and technology
          </h2>
          <p style={styles.bodyText}>
            1502 Properties Limited is a fast-growing real estate brokerage and
            property marketing company committed to connecting clients with
            quality investment opportunities, while delivering exceptional
            customer experiences through technology, innovation, and
            professional service. Every person on our team plays a direct role
            in that mission — from the first client enquiry to the final
            handshake.
          </p>
        </div>
      </section>

      {/* CORE VALUES */}
      <section style={styles.values}>
        <div style={styles.valuesInner}>
          <span style={{ ...styles.eyebrow, ...styles.eyebrowLight }}>
            Core Values
          </span>
          <h2 style={styles.valuesHeading}>What guides how we work</h2>

          <div style={styles.valuesGrid}>
            {coreValues.map((value) => (
              <div
                style={{
                  ...styles.valueCard,
                  ...(hoveredValue === value.title
                    ? styles.valueCardHover
                    : {}),
                }}
                key={value.title}
                onMouseEnter={() => setHoveredValue(value.title)}
                onMouseLeave={() => setHoveredValue(null)}
              >
                <span style={styles.valueMark} aria-hidden="true" />
                <h3 style={styles.valueTitle}>{value.title}</h3>
                <p style={styles.valueText}>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY JOIN US */}
      <section style={styles.why}>
        <span style={styles.eyebrow}>Why Join Us</span>
        <h2 style={styles.sectionHeading}>What you can expect from us</h2>

        <div style={styles.whyGrid}>
          {whyJoinUs.map((item) => (
            <div style={styles.whyCard} key={item.title}>
              <h3 style={styles.whyTitle}>{item.title}</h3>
              <p style={styles.bodyText}>{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* RECRUITMENT PROCESS */}
      <section style={styles.process}>
        <span style={styles.eyebrow}>Recruitment Process</span>
        <h2 style={styles.sectionHeading}>How hiring works, step by step</h2>

        <div style={styles.processTimeline}>
          {recruitmentProcess.map((item) => (
            <div key={item.step}>
              <span style={styles.processNumber}>{item.step}</span>
              <h3 style={styles.processTitle}>{item.title}</h3>
              <p style={styles.bodyText}>{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CURRENT VACANCIES */}
      <section style={styles.vacancies} id="current-vacancies">
        <span style={styles.eyebrow}>Current Vacancies</span>
        <h2 style={styles.sectionHeading}>Open positions</h2>

        {isRecruitmentOpen() && jobVacancies.length > 0 ? (
          <div style={styles.vacanciesGrid}>
            {jobVacancies.map((job) => (
              <JobCard job={job} key={job.slug} />
            ))}
          </div>
        ) : (
          <div style={styles.vacanciesEmpty}>
            <p style={styles.bodyText}>
              {isRecruitmentOpen()
                ? "There are currently no open positions. Please check back later for future opportunities."
                : "We are no longer hiring at this time. Applications closed on 7th August 2026. Please check back later for future opportunities."}
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default CareersPage;

// import { useState, type CSSProperties } from "react";
// import { isRecruitmentOpen, jobVacancies } from "../../Data/careers.data";
// import JobCard from "../../Components/jobCard/JobCard";

// const coreValues = [
//   {
//     title: "Integrity",
//     description:
//       "We do right by every client and colleague, even when no one is watching.",
//   },
//   {
//     title: "Excellence",
//     description:
//       "We hold our work — and each other — to a standard clients can feel.",
//   },
//   {
//     title: "Innovation",
//     description:
//       "We use technology and fresh thinking to make real estate simpler.",
//   },
//   {
//     title: "Client-Centricity",
//     description:
//       "Every decision starts with what's best for the people we serve.",
//   },
//   {
//     title: "Collaboration",
//     description: "We grow faster together than any one of us could alone.",
//   },
// ];

// const whyJoinUs = [
//   {
//     title: "Real, hands-on experience",
//     description:
//       "Work directly on live deals, campaigns, and client relationships from day one — not busywork.",
//   },
//   {
//     title: "Mentorship that matters",
//     description:
//       "Learn from a team that's building a modern real estate brand and wants to see you grow with it.",
//   },
//   {
//     title: "A technology-first culture",
//     description:
//       "We use modern tools and AI to work smarter, and we want people who are curious to do the same.",
//   },
//   {
//     title: "Room to grow",
//     description:
//       "As 1502 Properties scales, so do the opportunities for the people who help us get there.",
//   },
// ];

// const recruitmentProcess = [
//   {
//     step: "01",
//     title: "Apply online",
//     description:
//       "Submit your application through our online form for the role you're interested in.",
//   },
//   {
//     step: "02",
//     title: "Application review",
//     description:
//       "Our recruitment team reviews every application against the role's requirements.",
//   },
//   {
//     step: "03",
//     title: "Interview",
//     description:
//       "Shortlisted candidates are invited for an interview with the hiring team.",
//   },
//   {
//     step: "04",
//     title: "Offer & onboarding",
//     description:
//       "Successful candidates receive an offer and are welcomed into the team.",
//   },
// ];

// const styles: Record<string, CSSProperties> = {
//   page: {
//     color: "var(--primary-text-color)",
//   },
//   eyebrow: {
//     display: "inline-block",
//     fontSize: "0.75rem",
//     fontWeight: 600,
//     letterSpacing: "0.14em",
//     textTransform: "uppercase",
//     color: "var(--secondary-text-color)",
//     marginBottom: "0.75rem",
//   },
//   eyebrowLight: {
//     color: "#d8cf8f",
//   },

//   // Hero
//   // hero: {
//   //   position: "relative",
//   //   minHeight: "clamp(60vh, 65vh, 70vh)",
//   //   display: "flex",
//   //   alignItems: "center",
//   //   background:
//   //     "radial-gradient(circle at 30% 30%, #0e4a5f 0%, #062f3b 45%, #011b25 100%)",
//   // },
//   // heroOverlay: {
//   //   width: "100%",
//   //   padding: "clamp(3rem, 8vw, 5rem) 1.5rem",
//   // },
//   // heroContent: {
//   //   maxWidth: 620,
//   //   margin: "0 auto",
//   //   textAlign: "center",
//   //   color: "var(--light-color)",
//   // },
//   hero: {
//     position: "relative",
//     minHeight: "clamp(60vh, 65vh, 70vh)",
//     display: "flex",
//     alignItems: "center",
//     backgroundImage: "url('/careers-hero.jpg')",
//     backgroundSize: "cover",
//     backgroundPosition: "center",
//     backgroundRepeat: "no-repeat",
//   },
//   heroOverlay: {
//     width: "100%",
//     padding: "clamp(3rem, 8vw, 5rem) 1.5rem",
//     // background: "rgba(15, 23, 42, 0.55)",
//     background:
//       "radial-gradient(circle at 30% 30%, #0e4a5f 0%, #062f3b 45%, #011b25 100%)",
//   },
//   heroContent: {
//     maxWidth: 620,
//     margin: "0 auto",
//     textAlign: "center",
//     color: "var(--light-color)",
//   },
//   heroTitle: {
//     fontFamily: "var(--font-headings)",
//     fontSize: "clamp(2rem, 5vw, 3.25rem)",
//     lineHeight: 1.2,
//     fontWeight: 600,
//     marginBottom: "1.25rem",
//   },
//   heroText: {
//     fontSize: "clamp(1rem, 1.5vw, 1.1rem)",
//     lineHeight: 1.7,
//     color: "#d7dbe0",
//     marginBottom: "2rem",
//   },
//   heroCta: {
//     display: "inline-block",
//     background: "var(--secondary-text-color)",
//     color: "#fff",
//     textDecoration: "none",
//     fontWeight: 600,
//     fontSize: "0.9rem",
//     padding: "0.85rem 2rem",
//     borderRadius: 100,
//     transition: "background 0.3s ease, transform 0.2s ease",
//   },
//   heroCtaHover: {
//     background: "#b6b63c",
//     transform: "translateY(-2px)",
//   },

//   // About
//   about: {
//     padding: "clamp(3rem, 6vw, 4rem) clamp(1.5rem, 6vw, 3rem)",
//   },
//   aboutInner: {
//     maxWidth: 700,
//     margin: "0 auto",
//     textAlign: "center",
//   },
//   sectionHeading: {
//     fontFamily: "var(--font-headings)",
//     fontSize: "clamp(1.7rem, 3vw, 2.1rem)",
//     fontWeight: 500,
//     marginBottom: "1.25rem",
//   },
//   bodyText: {
//     fontSize: "0.95rem",
//     lineHeight: 1.8,
//     color: "#4a4d4d",
//   },

//   // Core values (dark)
//   values: {
//     backgroundColor: "var(--dark-background-color)",
//     padding: "clamp(3rem, 6vw, 4rem) clamp(1.5rem, 6vw, 3rem)",
//     color: "#fff",
//   },
//   valuesInner: {
//     maxWidth: 1100,
//     margin: "0 auto",
//     textAlign: "center",
//   },
//   valuesHeading: {
//     fontFamily: "var(--font-headings)",
//     fontSize: "clamp(1.7rem, 3vw, 2.1rem)",
//     fontWeight: 500,
//     marginBottom: "3rem",
//   },
//   valuesGrid: {
//     display: "grid",
//     gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
//     gap: "2rem",
//     textAlign: "left",
//   },
//   valueCard: {
//     padding: "1.5rem 1.25rem",
//     borderRadius: 12,
//     background: "rgba(255, 255, 255, 0.03)",
//     border: "1px solid rgba(255, 255, 255, 0.08)",
//     transition: "background 0.3s ease, transform 0.3s ease",
//   },
//   valueCardHover: {
//     background: "rgba(255, 255, 255, 0.06)",
//     transform: "translateY(-3px)",
//   },
//   valueMark: {
//     display: "block",
//     width: "2rem",
//     height: 2,
//     background: "var(--secondary-text-color)",
//     marginBottom: "1.25rem",
//   },
//   valueTitle: {
//     fontSize: "1rem",
//     fontWeight: 600,
//     marginBottom: "0.6rem",
//   },
//   valueText: {
//     fontSize: "0.85rem",
//     lineHeight: 1.6,
//     color: "#c0c5cd",
//   },

//   // Why join us
//   why: {
//     padding: "clamp(3rem, 6vw, 4rem) clamp(1.5rem, 6vw, 3rem)",
//     textAlign: "center",
//   },
//   whyGrid: {
//     display: "grid",
//     gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
//     gap: "2rem",
//     maxWidth: 1100,
//     margin: "0 auto",
//     textAlign: "left",
//   },
//   whyCard: {
//     paddingLeft: "1.1rem",
//     borderLeft: "2px solid var(--secondary-text-color)",
//   },
//   whyTitle: {
//     fontSize: "1.05rem",
//     fontWeight: 600,
//     marginBottom: "0.5rem",
//   },

//   // Recruitment process
//   process: {
//     padding: "clamp(3rem, 6vw, 4rem) clamp(1.5rem, 6vw, 3rem)",
//     background: "#f6f6f6",
//     textAlign: "center",
//   },
//   processTimeline: {
//     display: "grid",
//     gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
//     gap: "2rem",
//     maxWidth: 1100,
//     margin: "0 auto",
//     textAlign: "left",
//   },
//   processNumber: {
//     display: "block",
//     fontFamily: "var(--font-headings)",
//     fontSize: "1.6rem",
//     fontWeight: 600,
//     color: "var(--secondary-text-color)",
//     marginBottom: "0.75rem",
//   },
//   processTitle: {
//     fontSize: "1rem",
//     fontWeight: 600,
//     marginBottom: "0.5rem",
//   },

//   // Vacancies
//   vacancies: {
//     padding:
//       "clamp(3rem, 6vw, 4rem) clamp(1.5rem, 6vw, 3rem) clamp(4rem, 7vw, 5rem)",
//     textAlign: "center",
//   },
//   vacanciesGrid: {
//     display: "grid",
//     gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
//     gap: "1.5rem",
//     maxWidth: 1100,
//     margin: "0 auto",
//     textAlign: "left",
//   },
//   vacanciesEmpty: {
//     maxWidth: 480,
//     margin: "0 auto",
//     padding: "3rem 1.5rem",
//     borderRadius: 12,
//     background: "var(--secondary-background-color)",
//   },
// };

// const CareersPage = () => {
//   const [ctaHovered, setCtaHovered] = useState(false);
//   const [hoveredValue, setHoveredValue] = useState<string | null>(null);

//   return (
//     <div style={styles.page}>
//       {/*
//       <section style={styles.hero}>
//         <div style={styles.heroOverlay}>
//           <div style={styles.heroContent}>
//             <span style={styles.eyebrow}>Careers at 1502 Properties</span>
//             <h1 style={styles.heroTitle}>
//               Build the future of real estate with us
//             </h1>
//             <p style={styles.heroText}>
//               We're a fast-growing real estate brokerage connecting clients with
//               quality investment opportunities. Come do work that matters,
//               alongside people who care about getting it right.
//             </p>
//             <a
//               href="#current-vacancies"
//               style={{
//                 ...styles.heroCta,
//                 ...(ctaHovered ? styles.heroCtaHover : {}),
//               }}
//               onMouseEnter={() => setCtaHovered(true)}
//               onMouseLeave={() => setCtaHovered(false)}
//             >
//               View Open Roles
//             </a>
//           </div>
//         </div>
//       </section> */}
//       {/* HERO */}
//       <section style={styles.hero}>
//         <div style={styles.heroOverlay}>
//           <div style={styles.heroContent}>
//             <span style={styles.eyebrow}>Careers at 1502 Properties</span>
//             <h1 style={styles.heroTitle}>
//               Build the future of real estate with us
//             </h1>
//             <p style={styles.heroText}>
//               We're a fast-growing real estate brokerage connecting clients with
//               quality investment opportunities. Come do work that matters,
//               alongside people who care about getting it right.
//             </p>
//             <a
//               href="#current-vacancies"
//               style={{
//                 ...styles.heroCta,
//                 ...(ctaHovered ? styles.heroCtaHover : {}),
//               }}
//               onMouseEnter={() => setCtaHovered(true)}
//               onMouseLeave={() => setCtaHovered(false)}
//             >
//               View Open Roles
//             </a>
//           </div>
//         </div>
//       </section>

//       {/* ABOUT */}
//       <section style={styles.about}>
//         <div style={styles.aboutInner}>
//           <span style={styles.eyebrow}>About Working Here</span>
//           <h2 style={styles.sectionHeading}>
//             A team built on trust and technology
//           </h2>
//           <p style={styles.bodyText}>
//             1502 Properties Limited is a fast-growing real estate brokerage and
//             property marketing company committed to connecting clients with
//             quality investment opportunities, while delivering exceptional
//             customer experiences through technology, innovation, and
//             professional service. Every person on our team plays a direct role
//             in that mission — from the first client enquiry to the final
//             handshake.
//           </p>
//         </div>
//       </section>

//       {/* CORE VALUES */}
//       <section style={styles.values}>
//         <div style={styles.valuesInner}>
//           <span style={{ ...styles.eyebrow, ...styles.eyebrowLight }}>
//             Core Values
//           </span>
//           <h2 style={styles.valuesHeading}>What guides how we work</h2>

//           <div style={styles.valuesGrid}>
//             {coreValues.map((value) => (
//               <div
//                 style={{
//                   ...styles.valueCard,
//                   ...(hoveredValue === value.title
//                     ? styles.valueCardHover
//                     : {}),
//                 }}
//                 key={value.title}
//                 onMouseEnter={() => setHoveredValue(value.title)}
//                 onMouseLeave={() => setHoveredValue(null)}
//               >
//                 <span style={styles.valueMark} aria-hidden="true" />
//                 <h3 style={styles.valueTitle}>{value.title}</h3>
//                 <p style={styles.valueText}>{value.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* WHY JOIN US */}
//       <section style={styles.why}>
//         <span style={styles.eyebrow}>Why Join Us</span>
//         <h2 style={styles.sectionHeading}>What you can expect from us</h2>

//         <div style={styles.whyGrid}>
//           {whyJoinUs.map((item) => (
//             <div style={styles.whyCard} key={item.title}>
//               <h3 style={styles.whyTitle}>{item.title}</h3>
//               <p style={styles.bodyText}>{item.description}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* RECRUITMENT PROCESS */}
//       <section style={styles.process}>
//         <span style={styles.eyebrow}>Recruitment Process</span>
//         <h2 style={styles.sectionHeading}>How hiring works, step by step</h2>

//         <div style={styles.processTimeline}>
//           {recruitmentProcess.map((item) => (
//             <div key={item.step}>
//               <span style={styles.processNumber}>{item.step}</span>
//               <h3 style={styles.processTitle}>{item.title}</h3>
//               <p style={styles.bodyText}>{item.description}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* CURRENT VACANCIES */}
//       {/* CURRENT VACANCIES */}
//       <section style={styles.vacancies} id="current-vacancies">
//         <span style={styles.eyebrow}>Current Vacancies</span>
//         <h2 style={styles.sectionHeading}>Open positions</h2>

//         {isRecruitmentOpen() && jobVacancies.length > 0 ? (
//           <div style={styles.vacanciesGrid}>
//             {jobVacancies.map((job) => (
//               <JobCard job={job} key={job.slug} />
//             ))}
//           </div>
//         ) : (
//           <div style={styles.vacanciesEmpty}>
//             <p style={styles.bodyText}>
//               {isRecruitmentOpen()
//                 ? "There are currently no open positions. Please check back later for future opportunities."
//                 : "We are no longer hiring at this time. Applications closed on 7th August 2026. Please check back later for future opportunities."}
//             </p>
//           </div>
//         )}
//       </section>
//     </div>
//   );
// };

// export default CareersPage;
