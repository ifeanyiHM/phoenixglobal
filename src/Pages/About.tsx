import { useState, type CSSProperties } from "react";
import { Link } from "react-router-dom";
import {
  FaHandshake,
  FaKey,
  FaFileContract,
  FaUsers,
  FaChartLine,
  FaMoneyBillWave,
  FaComments,
  FaGlobeAfrica,
  FaCheckCircle,
  FaHeadset,
  FaLightbulb,
  FaCompass,
  FaHeart,
} from "react-icons/fa";

// ---------------------------------------------------------------------
// Content — kept from the original copy, just organized
// ---------------------------------------------------------------------
const FACTS = [
  { icon: <FaGlobeAfrica />, label: "Reach", value: "Nigeria & Beyond" },
  {
    icon: <FaCheckCircle />,
    label: "Listings",
    value: "Verified & Transparent",
  },
  { icon: <FaHeadset />, label: "Service", value: "Human-First, Always" },
];

const SERVICES = [
  {
    icon: <FaHandshake />,
    title: "Property Sale & Acquisition",
    description:
      "We facilitate seamless transactions, helping clients find the perfect property or successfully sell their assets.",
  },
  {
    icon: <FaKey />,
    title: "Property Rental Services",
    description:
      "We connect landlords with suitable tenants, aiming for lasting relationships rather than one-off transactions.",
  },
  {
    icon: <FaFileContract />,
    title: "Long Lease Development",
    description:
      "Extended occupancy solutions for clients seeking stable, long-lasting arrangements.",
  },
  {
    icon: <FaUsers />,
    title: "Joint Venture Services",
    description:
      "Partnerships that maximize potential and facilitate mutually beneficial real estate projects.",
  },
  {
    icon: <FaChartLine />,
    title: "Property Valuation",
    description:
      "Industry-leading methods for precise, comprehensive valuations that support well-informed decisions.",
  },
  {
    icon: <FaMoneyBillWave />,
    title: "Property Finance",
    description:
      "Tailored finance solutions so your investments align with your long-term goals.",
  },
  {
    icon: <FaComments />,
    title: "Real Estate Consultation",
    description:
      "Expert guidance on market trends, investment strategies, and property optimization.",
  },
];

const PILLARS = [
  {
    icon: <FaLightbulb />,
    title: "Expertise",
    description:
      "Deep industry expertise paired with a client-centric approach, guiding you with precision, integrity, and insight — whether you're buying, renting, investing, or partnering.",
  },
  {
    icon: <FaCompass />,
    title: "Innovation",
    description:
      "We don't just respond to market trends — we anticipate them, through ongoing research and strategic analysis, so your decisions are rooted in real-time knowledge.",
  },
  {
    icon: <FaHeart />,
    title: "Service",
    description:
      "More than a service provider — a trusted partner. Built on professionalism, transparency, and genuine care for your success.",
  },
];

// ---------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------
const styles: Record<string, CSSProperties> = {
  page: {
    color: "var(--primary-text-color)",
  },

  // ---- Banner ----
  banner: {
    position: "relative",
    minHeight: "clamp(24rem, 34vw, 29rem)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    backgroundImage:
      "linear-gradient(180deg, rgba(15,17,20,0.4) 0%, rgba(15,17,20,0.8) 100%), url('/hero-image.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  bannerContent: {
    maxWidth: 640,
    padding: "0 1.5rem",
  },
  eyebrow: {
    display: "inline-block",
    fontSize: "0.72rem",
    fontWeight: 600,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    color: "var(--secondary-text-color)",
    marginBottom: "0.9rem",
  },
  title: {
    fontFamily: "var(--font-headings)",
    fontSize: "clamp(1.8rem, 4.5vw, 2.75rem)",
    fontWeight: 600,
    color: "var(--light-color)",
    margin: 0,
    lineHeight: 1.3,
  },
  titleAccent: {
    color: "var(--secondary-text-color)",
  },

  // ---- Facts strip ----
  factsStrip: {
    backgroundColor: "var(--dark-background-color)",
    display: "flex",
    flexWrap: "wrap",
  },
  factsInner: {
    display: "flex",
    flexWrap: "wrap",
    maxWidth: 1100,
    margin: "0 auto",
    width: "100%",
  },
  factItem: {
    flex: "1 1 220px",
    display: "flex",
    alignItems: "center",
    gap: "0.9rem",
    padding: "1.15rem clamp(1.5rem, 5vw, 2.5rem)",
    borderTop: "1px solid rgba(255,255,255,0.08)",
    borderRight: "1px solid rgba(255,255,255,0.08)",
  },
  factIconWrap: {
    width: 38,
    height: 38,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(167, 156, 73, 0.14)",
    color: "var(--secondary-text-color)",
    flexShrink: 0,
    fontSize: "0.95rem",
  },
  factLabel: {
    display: "block",
    fontSize: "0.68rem",
    fontWeight: 600,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: "#9aa0ab",
    marginBottom: "0.2rem",
  },
  factValue: {
    display: "block",
    fontSize: "0.92rem",
    fontWeight: 500,
    color: "var(--light-color)",
  },

  // ---- About / Who We Are ----
  aboutSection: {
    maxWidth: 1100,
    margin: "0 auto",
    padding: "clamp(3.5rem, 8vw, 5.5rem) clamp(1.5rem, 6vw, 3rem)",
    display: "flex",
    flexWrap: "wrap-reverse",
    gap: "3rem",
    alignItems: "center",
  },
  aboutText: {
    flex: "1 1 380px",
    minWidth: 0,
  },
  sectionEyebrow: {
    display: "block",
    fontSize: "0.72rem",
    fontWeight: 600,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: "var(--secondary-text-color)",
    marginBottom: "0.75rem",
  },
  sectionHeading: {
    fontFamily: "var(--font-headings)",
    fontSize: "clamp(1.6rem, 3.5vw, 2.1rem)",
    fontWeight: 600,
    margin: "0 0 1.25rem",
  },
  bodyText: {
    fontSize: "0.95rem",
    lineHeight: 1.85,
    color: "#4a4d4d",
    marginBottom: "1.25rem",
  },
  aboutImageWrap: {
    flex: "1 1 320px",
    minWidth: 260,
  },
  aboutImage: {
    width: "100%",
    height: "clamp(16rem, 30vw, 22rem)",
    objectFit: "cover",
    borderRadius: 16,
    boxShadow: "0 16px 40px rgba(11, 17, 52, 0.16)",
  },

  // ---- Services ----
  servicesSection: {
    backgroundColor: "var(--dark-background-color)",
    padding: "clamp(3.5rem, 8vw, 5.5rem) clamp(1.5rem, 6vw, 3rem)",
  },
  servicesHeader: {
    maxWidth: 1100,
    margin: "0 auto",
    textAlign: "center",
    marginBottom: "3rem",
  },
  servicesHeading: {
    fontFamily: "var(--font-headings)",
    fontSize: "clamp(1.8rem, 4vw, 2.4rem)",
    fontWeight: 500,
    color: "var(--light-color)",
    margin: "0 0 0.75rem",
  },
  servicesSubtitle: {
    fontSize: "0.92rem",
    color: "#aeb3bd",
    maxWidth: 480,
    margin: "0 auto",
    lineHeight: 1.7,
  },
  servicesGrid: {
    maxWidth: 1100,
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "1.5rem",
  },
  serviceCard: {
    padding: "2rem 1.5rem",
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.08)",
    transition: "border-color 0.25s ease, background-color 0.25s ease",
  },
  serviceCardHover: {
    borderColor: "var(--secondary-text-color)",
    backgroundColor: "rgba(255,255,255,0.03)",
  },
  serviceIconWrap: {
    width: 46,
    height: 46,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(167, 156, 73, 0.14)",
    color: "var(--secondary-text-color)",
    fontSize: "1.1rem",
    marginBottom: "1.25rem",
  },
  serviceTitle: {
    fontSize: "1rem",
    fontWeight: 600,
    color: "var(--light-color)",
    marginBottom: "0.6rem",
  },
  serviceDescription: {
    fontSize: "0.85rem",
    lineHeight: 1.65,
    color: "#c0c5cd",
    margin: 0,
  },

  // ---- Why Choose Us ----
  pillarsSection: {
    maxWidth: 1100,
    margin: "0 auto",
    padding: "clamp(3.5rem, 8vw, 5.5rem) clamp(1.5rem, 6vw, 3rem)",
  },
  pillarsHeader: {
    textAlign: "center",
    marginBottom: "3rem",
  },
  pillarsGrid: {
    display: "flex",
    flexWrap: "wrap",
    gap: "1.75rem",
  },
  pillarCard: {
    flex: "1 1 280px",
    minWidth: 0,
    padding: "2rem",
    borderRadius: 12,
    backgroundColor: "#ffffff",
    boxShadow: "0 10px 30px rgba(11, 17, 52, 0.08)",
    border: "1px solid rgba(43, 45, 45, 0.06)",
  },
  pillarIconWrap: {
    width: 44,
    height: 44,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "var(--secondary-background-color)",
    color: "var(--secondary-text-color)",
    fontSize: "1.05rem",
    marginBottom: "1.25rem",
  },
  pillarTitle: {
    fontFamily: "var(--font-headings)",
    fontSize: "1.15rem",
    fontWeight: 600,
    marginBottom: "0.6rem",
  },
  pillarDescription: {
    fontSize: "0.88rem",
    lineHeight: 1.75,
    color: "#5a5d5d",
    margin: 0,
  },

  // ---- CTA ----
  ctaSection: {
    backgroundColor: "#f6f6f6",
    padding: "clamp(3rem, 7vw, 4.5rem) 1.5rem",
    textAlign: "center",
  },
  ctaHeading: {
    fontFamily: "var(--font-headings)",
    fontSize: "clamp(1.4rem, 3vw, 1.9rem)",
    fontWeight: 600,
    marginBottom: "0.6rem",
  },
  ctaSubtitle: {
    fontSize: "0.9rem",
    color: "#6b6f6f",
    marginBottom: "1.75rem",
  },
  ctaBtn: {
    display: "inline-flex",
    alignItems: "center",
    padding: "0.9rem 2.25rem",
    fontSize: "0.9rem",
    fontWeight: 600,
    letterSpacing: "0.03em",
    color: "#fff",
    backgroundColor: "var(--dark-background-color)",
    borderRadius: 100,
    textDecoration: "none",
    transition: "background-color 0.25s ease",
  },
  ctaBtnHover: {
    backgroundColor: "var(--secondary-text-color)",
  },
};

function About() {
  const [hoveredService, setHoveredService] = useState<number | null>(null);
  const [ctaHovered, setCtaHovered] = useState(false);

  return (
    <div className="about" style={styles.page}>
      {/* BANNER / MISSION */}
      <div style={styles.banner}>
        <div style={styles.bannerContent}>
          <span style={styles.eyebrow}>Our Mission</span>
          <h1 style={styles.title}>
            1502 Properties —{" "}
            <span style={styles.titleAccent}>Redefining Excellence</span> in
            Real Estate
          </h1>
        </div>
      </div>

      {/* FACTS STRIP */}
      <div style={styles.factsStrip}>
        <div style={styles.factsInner}>
          {FACTS.map((fact) => (
            <div key={fact.label} style={styles.factItem}>
              <span style={styles.factIconWrap}>{fact.icon}</span>
              <span>
                <span style={styles.factLabel}>{fact.label}</span>
                <span style={styles.factValue}>{fact.value}</span>
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ABOUT US */}
      <div style={styles.aboutSection}>
        <div style={styles.aboutText}>
          <span style={styles.sectionEyebrow}>Who We Are</span>
          <h2 style={styles.sectionHeading}>About Us</h2>
          <p style={styles.bodyText}>
            1502 Properties Limited is a forward-thinking real estate company
            committed to simplifying property ownership, investment, and rentals
            across Nigeria and beyond. Born from a desire to bridge the gap
            between people and property, we provide smart, secure, and seamless
            real estate experiences powered by technology and driven by trust.
          </p>
          <p style={styles.bodyText}>
            Whether you're a first-time renter, a seasoned investor, or a
            developer seeking reliable exposure, we're here to guide you every
            step of the way — with integrity, insight, and innovation. Our
            platform connects you with verified listings, transparent processes,
            and human-first service. We don't just close deals — we build
            relationships, unlock value, and help you find the right space for
            your next chapter.
          </p>
        </div>
        <div style={styles.aboutImageWrap}>
          <img
            src="/carousel.jpg"
            alt="1502 Properties development"
            title="1502 Properties"
            loading="lazy"
            style={styles.aboutImage}
          />
        </div>
      </div>

      {/* SERVICES */}
      <div style={styles.servicesSection}>
        <div style={styles.servicesHeader}>
          <span
            style={{
              ...styles.sectionEyebrow,
              color: "var(--secondary-text-color)",
            }}
          >
            What We Do
          </span>
          <h2 style={styles.servicesHeading}>Our Services</h2>
          <p style={styles.servicesSubtitle}>
            A distinguished force in real estate, integrating expertise with
            innovative solutions across every stage of your property journey.
          </p>
        </div>

        <div style={styles.servicesGrid}>
          {SERVICES.map((service, index) => (
            <div
              key={service.title}
              onMouseEnter={() => setHoveredService(index)}
              onMouseLeave={() => setHoveredService(null)}
              style={{
                ...styles.serviceCard,
                ...(hoveredService === index ? styles.serviceCardHover : {}),
              }}
            >
              <div style={styles.serviceIconWrap}>{service.icon}</div>
              <h3 style={styles.serviceTitle}>{service.title}</h3>
              <p style={styles.serviceDescription}>{service.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* WHY CHOOSE US */}
      <div style={styles.pillarsSection}>
        <div style={styles.pillarsHeader}>
          <span style={styles.sectionEyebrow}>Why Choose Us</span>
          <h2 style={styles.sectionHeading}>The 1502 Difference</h2>
        </div>

        <div style={styles.pillarsGrid}>
          {PILLARS.map((pillar) => (
            <div key={pillar.title} style={styles.pillarCard}>
              <div style={styles.pillarIconWrap}>{pillar.icon}</div>
              <h3 style={styles.pillarTitle}>{pillar.title}</h3>
              <p style={styles.pillarDescription}>{pillar.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={styles.ctaSection}>
        <h2 style={styles.ctaHeading}>Ready to find your next address?</h2>
        <p style={styles.ctaSubtitle}>
          Let's build that relationship, starting today.
        </p>
        <Link
          to="/contact"
          onMouseEnter={() => setCtaHovered(true)}
          onMouseLeave={() => setCtaHovered(false)}
          style={{
            ...styles.ctaBtn,
            ...(ctaHovered ? styles.ctaBtnHover : {}),
          }}
        >
          Get In Touch
        </Link>
      </div>
    </div>
  );
}

export default About;

// function About() {
//   return (
//     <div className="about">
//       <div className="mission">
//         <div className="overlay">
//           <div className="content">
//             <p className="title">OUR MISSION</p>
//             <h1>
//               {" "}
//               1502 Properties <span>Redefining Excellence</span> in Real Estate
//             </h1>
//           </div>
//         </div>
//       </div>
//       <div className="body">
//         <h2 className="sub-heading">ABOUT US</h2>
//         <p className="body-head">
//           1502 Properties Limited is a forward-thinking real estate company
//           committed to simplifying property ownership, investment, and rentals
//           across Nigeria and beyond. Born from a desire to bridge the gap
//           between people and property, we provide smart, secure, and seamless
//           real estate experiences powered by technology and driven by trust.{" "}
//           <br />
//           <br /> Whether you're a first-time renter, a seasoned investor, or a
//           developer seeking reliable exposure, we’re here to guide you every
//           step of the way — with integrity, insight, and innovation. <br />
//           <br /> Our platform is built to connect you with verified listings,
//           transparent processes, and human-first service. At 1502 Properties, we
//           don’t just close deals — we build relationships, unlock value, and
//           help you find the right space for your next chapter.
//         </p>
//         <br />
//         <p className="body-head">
//           1502 Properties, a distinguished force in the real estate industry,
//           seamlessly integrates expertise with innovative solutions. As we
//           embark on rewriting our future, let's explore how we stand at the
//           forefront, offering unparalleled services that redefine the real
//           estate experience.
//         </p>

//         <div className="letlet">
//           <h2 className="sub-heading">OUR SERVICES</h2>
//           <div className="property-sale">
//             <img
//               src="/carousel.jpg"
//               alt="property"
//               title="property"
//               loading="lazy"
//               width="auto"
//               height="auto"
//             />
//             <div>
//               <h3>Property Sale and Acquisition</h3>
//               <p>
//                 Our adept team specializes in facilitating seamless property
//                 transactions, ensuring clients find the perfect property or
//                 successfully sell their assets. In this dynamic realm, we cater
//                 to diverse needs, making property acquisition a tailored and
//                 rewarding experience.
//               </p>
//             </div>
//           </div>
//         </div>

//         <div className="property-rental">
//           <h3>Property Rental Services</h3>
//           <p>
//             With a keen understanding of the rental market, we offer top-notch
//             property rental services, connecting landlords with suitable
//             tenants. Our focus goes beyond transactions; we aim to create
//             lasting relationships between property owners and tenants.
//           </p>
//         </div>

//         <div className="long-lease-developement">
//           <h3> Long Lease Development</h3>
//           <p>
//             1502 Properties extends its services to long-term leasing
//             arrangements, catering to clients seeking extended occupancy
//             solutions. Our commitment to providing stable, long-lasting
//             solutions echoes our dedication to meeting the evolving needs of our
//             clientele.
//           </p>
//         </div>
//         <div className="joint-venture-service">
//           <h3>Joint Venture Services</h3>
//           <p>
//             For those interested in collaborative ventures, our joint venture
//             services foster partnerships that maximize potential and facilitate
//             mutually beneficial real estate projects. We believe in creating
//             opportunities that go beyond traditional boundaries, ensuring
//             success for all parties involved.
//           </p>
//         </div>
//         <div className="property-valuation">
//           <h3>Property Valuation</h3>
//           <p>
//             {" "}
//             Accurate property valuation is a critical aspect of real estate. At
//             1502 Properties, we employ industry-leading methods to provide
//             precise and comprehensive property valuation services. Our
//             commitment to accuracy ensures that our clients make well-informed
//             decisions.
//           </p>
//         </div>
//         <div className="property-finance">
//           <h3>Property Finance</h3>
//           <p>
//             {" "}
//             Understanding the financial intricacies of real estate, 1502
//             Properties offers tailored property finance solutions. We empower
//             our clients to make strategic financial decisions, ensuring that
//             their investments align with their long-term goals.
//           </p>
//         </div>
//         <div className="real-estate-consultation">
//           <h3>Real Estate Consultation</h3>
//           <p>
//             Our experienced consultants provide valuable insights and guidance
//             through real estate consultations. We offer expert advice on market
//             trends, investment strategies, and property optimization, creating a
//             personalized roadmap for success.
//           </p>
//         </div>
//         <div className="letlet">
//           <h3 className="sub-heading">WHY CHOOSE US</h3>
//           <div className="three-fold-approach">
//             <p>
//               At 1502 Properties, we combine deep industry expertise with a
//               client-centric approach to deliver tailored real estate solutions.
//               From residential and commercial properties to strategic joint
//               ventures, we guide our clients with precision, integrity, and
//               insight. Our three-fold commitment—expertise, innovation, and
//               service—ensures every client feels empowered and supported
//               throughout their property journey. <br />
//               <br /> We are not just responsive to market trends—we anticipate
//               them. Through ongoing research and strategic analysis, we help you
//               make informed decisions in a fast-moving real estate landscape.
//               Whether you're buying, renting, investing, or partnering, our
//               solutions are rooted in real-time knowledge and forward-thinking
//               strategy. <br />
//               <br /> More than a service provider, we are your trusted partner.
//               Our brand is built on professionalism, transparency, and genuine
//               care for your success. At 1502 Properties, we don’t just close
//               deals—we build lasting relationships that grow with your goals.
//               Experience the difference where your aspirations meet our
//               unwavering dedication.
//             </p>
//           </div>
//         </div>
//         {/* <div className="three-fold-approach">
//           <h3>Three-fold Approach</h3>
//           <p>
//             At 1502 Properties, our three-fold approach defines our commitment
//             to clients: expertise, a client-centric approach, and an innovative
//             wealth of knowledge. We bring seasoned professionals to the table,
//             ensuring expert guidance for your real estate endeavors.
//           </p>
//         </div>
//         <div className="excellence-in-action">
//           <h3>Excellence in Action </h3>
//           <p>
//             Our commitment to excellence is evident in every facet of our
//             operations. From the initial consultation to the completion of a
//             real estate transaction, we prioritize quality, efficiency, and
//             client satisfaction. 1502 Properties sets new standards,
//             consistently exceeding expectations.
//           </p>
//         </div>
//         <div className="staying-ahead">
//           <h3>Staying Ahead of Market Trends</h3>
//           <p>
//             In an industry characterized by constant change, 1502 Properties
//             remains at the forefront by staying ahead of market trends. Our
//             proactive approach involves continuous research, analysis, and
//             adaptation to emerging patterns, ensuring our clients benefit from
//             the most up-to-date information.
//           </p>
//         </div>
//         <div className="trusted-partner">
//           <h3>1502 Properties as a Trusted Partner</h3>
//           <p>
//             We don't just provide real estate services; we become trusted
//             partners in your journey of property acquisition, management, and
//             investment. With a commitment to excellence, a client-centric
//             approach, and an innovative wealth of knowledge, we redefine the
//             real estate experience for our discerning clientele.
//           </p>
//         </div>
//         <div className="evolving-with-landscape">
//           <h3>Evolving with the Landscape</h3>
//           <p>
//             As we continue to evolve with the ever-changing landscape, our
//             dedication to delivering exceptional services remains unwavering.
//             Join us at 1502 Properties, where your real estate aspirations meet
//             unparalleled expertise and innovation. As a brand, we convey not
//             just professionalism but passion and dedication. We're not just a
//             real estate service provider; we're your partners in success.
//             Building trust through an emotional connection, we invite you to
//             experience the 1502 Properties difference. In summary, 1502
//             Properties transcends traditional real estate services. Our
//             commitment to excellence, a client-centric approach, and staying
//             ahead of market trends define us. Join us on this journey where your
//             aspirations meet expertise and innovation.
//           </p>
//         </div> */}
//       </div>
//     </div>
//   );
// }

// export default About;
