import emailjs from "@emailjs/browser";
import {
  FormEvent,
  useEffect,
  useReducer,
  useState,
  type CSSProperties,
} from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
import AlertBox from "../Utilities/AlertBox";

interface StateProps {
  name: string;
  clientEmail: string;
  message: string;
  alertMessage: string;
  isMessageSending: boolean;
  messageSent: boolean;
}

interface ActionProps {
  type: string;
  payload?: string | boolean;
}

const initialState = {
  name: "",
  clientEmail: "",
  message: "",
  isMessageSending: false,
  alertMessage: "",
  messageSent: false,
};

function reducer(state: StateProps, action: ActionProps) {
  switch (action.type) {
    case "name":
      return { ...state, name: action.payload as string };
    case "email":
      return { ...state, clientEmail: action.payload as string };
    case "message":
      return { ...state, message: action.payload as string };
    case "alert":
      return { ...state, alertMessage: action.payload as string };
    case "sent":
      return { ...state, messageSent: action.payload as boolean };
    case "sending":
      return { ...state, isMessageSending: action.payload as boolean };
    case "reset":
      return initialState;
    default:
      throw new Error("unknown action");
  }
}

// ---------------------------------------------------------------------
// Contact info — single source of truth, used for both the facts strip
// and the office panel so numbers never drift out of sync
// ---------------------------------------------------------------------
const CONTACT = {
  phoneDisplay: "+234 809 606 8042",
  phoneTel: "+2348096068042",
  altPhoneDisplay: "+234 704 994 3393",
  email: "info@1502properties.com",
  address: "No 1a Hughes Avenue, Alagomeji Yaba, Lagos",
};

const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONTACT.address)}`;
const whatsappUrl = `https://wa.me/${CONTACT.phoneTel.replace("+", "")}`;

// ---------------------------------------------------------------------
// Styles — clamp() and flex-wrap handle responsiveness without media queries
// ---------------------------------------------------------------------
const styles: Record<string, CSSProperties> = {
  page: {
    color: "var(--primary-text-color)",
    backgroundColor: "#f6f6f6",
  },

  // ---- Banner ----
  banner: {
    position: "relative",
    minHeight: "clamp(16rem, 32vw, 22rem)",
    paddingTop: "5rem",
    display: "flex",
    alignItems: "flex-end",
    backgroundImage:
      "linear-gradient(180deg, rgba(15,17,20,0.35) 0%, rgba(15,17,20,0.78) 100%), url('/hero-image.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  bannerContent: {
    width: "100%",
    padding: "clamp(2.5rem, 6vw, 4rem) clamp(1.5rem, 6vw, 4rem) 3.25rem",
    maxWidth: 1100,
    margin: "0 auto",
  },
  eyebrow: {
    display: "inline-block",
    fontSize: "0.72rem",
    fontWeight: 600,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    color: "var(--secondary-text-color)",
    marginBottom: "0.85rem",
  },
  title: {
    fontFamily: "var(--font-headings)",
    fontSize: "clamp(2rem, 5vw, 3rem)",
    fontWeight: 600,
    color: "var(--light-color)",
    margin: "0 0 0.75rem",
    maxWidth: 560,
  },
  subtitle: {
    maxWidth: 460,
    fontSize: "0.95rem",
    lineHeight: 1.75,
    color: "#c7ccd6",
  },

  // ---- Facts strip: same vocabulary as a listing's bed/bath row ----
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
    textDecoration: "none",
    borderTop: "1px solid rgba(255,255,255,0.08)",
    borderRight: "1px solid rgba(255,255,255,0.08)",
    transition: "background-color 0.2s ease",
  },
  factItemHover: {
    backgroundColor: "rgba(255,255,255,0.04)",
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

  // ---- Layout ----
  layout: {
    display: "flex",
    flexWrap: "wrap",
    gap: "2rem",
    maxWidth: 1100,
    margin: "0 auto",
    padding:
      "clamp(3rem, 6vw, 4.5rem) clamp(1.5rem, 6vw, 3rem) clamp(4rem, 8vw, 6rem)",
    alignItems: "flex-start",
  },

  // Form card
  formCard: {
    flex: "999 1 420px",
    minWidth: 0,
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: "clamp(1.75rem, 4vw, 2.75rem)",
    boxShadow: "0 10px 34px rgba(11, 17, 52, 0.10)",
    border: "1px solid rgba(43, 45, 45, 0.06)",
  },
  formHeading: {
    fontFamily: "var(--font-headings)",
    fontSize: "1.5rem",
    fontWeight: 600,
    marginBottom: "0.6rem",
  },
  formDesc: {
    fontSize: "0.9rem",
    lineHeight: 1.7,
    color: "#6b6f6f",
    marginBottom: "2rem",
  },
  fieldRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "1.25rem",
    marginBottom: "1.25rem",
  },
  field: {
    flex: "1 1 200px",
    display: "flex",
    flexDirection: "column",
    gap: "0.4rem",
  },
  fieldFull: {
    display: "flex",
    flexDirection: "column",
    gap: "0.4rem",
    marginBottom: "1.75rem",
  },
  label: {
    fontSize: "0.78rem",
    fontWeight: 600,
    color: "var(--primary-text-color)",
  },
  input: {
    padding: "0.8rem 1rem",
    fontSize: "0.9rem",
    fontFamily: "inherit",
    color: "var(--primary-text-color)",
    backgroundColor: "#fafafa",
    border: "1px solid #e2e2e2",
    borderRadius: 8,
    outline: "none",
    transition: "border-color 0.2s ease, background-color 0.2s ease",
  },
  inputFocus: {
    borderColor: "var(--secondary-text-color)",
    backgroundColor: "#fff",
  },
  textarea: {
    padding: "0.8rem 1rem",
    fontSize: "0.9rem",
    fontFamily: "inherit",
    color: "var(--primary-text-color)",
    backgroundColor: "#fafafa",
    border: "1px solid #e2e2e2",
    borderRadius: 8,
    outline: "none",
    resize: "vertical",
    minHeight: 140,
    transition: "border-color 0.2s ease, background-color 0.2s ease",
  },
  submitBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.6rem",
    padding: "0.9rem 2rem",
    fontSize: "0.9rem",
    fontWeight: 600,
    letterSpacing: "0.03em",
    color: "#fff",
    backgroundColor: "var(--dark-background-color)",
    border: "none",
    borderRadius: 100,
    cursor: "pointer",
    transition: "background-color 0.25s ease, opacity 0.25s ease",
  },
  submitBtnHover: {
    backgroundColor: "var(--secondary-text-color)",
  },
  submitBtnDisabled: {
    opacity: 0.65,
    cursor: "not-allowed",
  },

  // Side panel — office visit
  sideCard: {
    flex: "1 1 300px",
    minWidth: 260,
    display: "flex",
    flexDirection: "column",
    gap: "1.25rem",
  },
  sidePanel: {
    backgroundColor: "var(--dark-background-color)",
    borderRadius: 16,
    padding: "clamp(1.75rem, 4vw, 2.25rem)",
    color: "var(--light-color)",
  },
  sideHeading: {
    fontFamily: "var(--font-headings)",
    fontSize: "1.15rem",
    fontWeight: 600,
    marginBottom: "1.5rem",
    paddingBottom: "0.75rem",
    borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
  },
  addressText: {
    fontSize: "0.88rem",
    lineHeight: 1.7,
    color: "#d7dbe0",
    margin: "0 0 1.5rem",
  },
  hoursRow: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "0.82rem",
    color: "#aeb3bd",
    padding: "0.5rem 0",
    borderTop: "1px solid rgba(255,255,255,0.06)",
  },
  hoursValue: {
    color: "#d7dbe0",
    fontWeight: 500,
  },
  directionsBtn: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
    width: "100%",
    marginTop: "1.75rem",
    padding: "0.8rem 1rem",
    fontSize: "0.82rem",
    fontWeight: 600,
    letterSpacing: "0.03em",
    textTransform: "uppercase",
    color: "var(--dark-background-color)",
    backgroundColor: "var(--secondary-text-color)",
    borderRadius: 8,
    textDecoration: "none",
    transition: "background-color 0.2s ease",
  },
  directionsBtnHover: {
    backgroundColor: "#c2b65a",
  },
  socialPanel: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: "1.5rem clamp(1.75rem, 4vw, 2.25rem)",
    boxShadow: "0 10px 34px rgba(11, 17, 52, 0.08)",
    border: "1px solid rgba(43, 45, 45, 0.06)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "1rem",
  },
  socialPanelText: {
    fontSize: "0.85rem",
    lineHeight: 1.6,
  },
  socialPanelLabel: {
    fontSize: "0.68rem",
    fontWeight: 600,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: "var(--secondary-text-color)",
    marginBottom: "0.3rem",
  },
  socialRow: {
    display: "flex",
    gap: "0.6rem",
    flexShrink: 0,
  },
  socialLink: {
    width: 40,
    height: 40,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "var(--secondary-background-color)",
    color: "var(--primary-text-color)",
    fontSize: "0.95rem",
    textDecoration: "none",
    transition: "background-color 0.2s ease, color 0.2s ease",
  },
  socialLinkHover: {
    backgroundColor: "var(--secondary-text-color)",
    color: "#fff",
  },
};

const MapPinIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    aria-hidden="true"
  >
    <path d="M21 10c0 6-9 13-9 13s-9-7-9-13a9 9 0 0 1 18 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const PhoneIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    aria-hidden="true"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z" />
  </svg>
);

const MailIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    aria-hidden="true"
  >
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

function Contact() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    name,
    clientEmail,
    message,
    alertMessage,
    isMessageSending,
    messageSent,
  } = state;

  const [nameFocused, setNameFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [messageFocused, setMessageFocused] = useState(false);
  const [submitHovered, setSubmitHovered] = useState(false);
  const [facebookHovered, setFacebookHovered] = useState(false);
  const [instagramHovered, setInstagramHovered] = useState(false);
  const [hoveredFact, setHoveredFact] = useState<string | null>(null);
  const [directionsHovered, setDirectionsHovered] = useState(false);

  useEffect(
    function () {
      if (messageSent) {
        const timeOut = setTimeout(() => {
          dispatch({ type: "sent", payload: false });
        }, 5000);

        return () => clearTimeout(timeOut);
      }
    },
    [messageSent],
  );

  const handleSubmit = async function (e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const serviceId = "service_7uvbyms";
    const templateId = "template_lei4j7a";
    const publicKey = "NUCZEfqoTrlkgELZ4";

    const templateParams = {
      from_name: name,
      from_email: clientEmail,
      message,
      to_name: "Ifeanyi",
    };

    try {
      dispatch({ type: "sending", payload: true });
      if (!clientEmail && !message) return;
      const response = await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        publicKey,
      );
      if (response.status !== 200) throw new Error("Email not sent!");
      dispatch({ type: "sent", payload: true });
      dispatch({ type: "alert", payload: "Message sent successfully!" });
      dispatch({ type: "name", payload: "" });
      dispatch({ type: "email", payload: "" });
      dispatch({ type: "message", payload: "" });
    } catch (error) {
      dispatch({ type: "alert", payload: (error as Error).message });
    } finally {
      dispatch({ type: "sending", payload: false });
    }
  };

  const facts = [
    {
      key: "call",
      icon: <PhoneIcon />,
      label: "Call",
      value: CONTACT.phoneDisplay,
      href: `tel:${CONTACT.phoneTel}`,
    },
    {
      key: "email",
      icon: <MailIcon />,
      label: "Email",
      value: CONTACT.email,
      href: `mailto:${CONTACT.email}`,
    },
    {
      key: "whatsapp",
      icon: <FaWhatsapp />,
      label: "WhatsApp",
      value: "Chat with an agent",
      href: whatsappUrl,
    },
  ];

  return (
    <div style={styles.page}>
      {messageSent && <AlertBox>{alertMessage}</AlertBox>}

      {/* BANNER */}
      <div style={styles.banner}>
        <div style={styles.bannerContent}>
          <span style={styles.eyebrow}>Contact 1502 Properties</span>
          <h1 style={styles.title}>Let's find your next address</h1>
          <p style={styles.subtitle}>
            Buying, selling, or leasing — send us a note and our team responds
            within one business day.
          </p>
        </div>
      </div>

      {/* FACTS STRIP */}
      <div style={styles.factsStrip}>
        <div style={styles.factsInner}>
          {facts.map((fact) => (
            <a
              key={fact.key}
              href={fact.href}
              target={fact.key === "whatsapp" ? "_blank" : undefined}
              rel={fact.key === "whatsapp" ? "noreferrer" : undefined}
              onMouseEnter={() => setHoveredFact(fact.key)}
              onMouseLeave={() => setHoveredFact(null)}
              style={{
                ...styles.factItem,
                ...(hoveredFact === fact.key ? styles.factItemHover : {}),
              }}
            >
              <span style={styles.factIconWrap}>{fact.icon}</span>
              <span>
                <span style={styles.factLabel}>{fact.label}</span>
                <span style={styles.factValue}>{fact.value}</span>
              </span>
            </a>
          ))}
        </div>
      </div>

      <div style={styles.layout}>
        {/* FORM */}
        <div style={styles.formCard}>
          <h2 style={styles.formHeading}>Send a Message</h2>
          <p style={styles.formDesc}>
            Tell us what you're looking for — a property, a valuation, or just a
            question — and we'll get back to you shortly.
          </p>

          <form onSubmit={handleSubmit}>
            <div style={styles.fieldRow}>
              <div style={styles.field}>
                <label htmlFor="name" style={styles.label}>
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) =>
                    dispatch({ type: "name", payload: e.target.value })
                  }
                  onFocus={() => setNameFocused(true)}
                  onBlur={() => setNameFocused(false)}
                  style={{
                    ...styles.input,
                    ...(nameFocused ? styles.inputFocus : {}),
                  }}
                />
              </div>
              <div style={styles.field}>
                <label htmlFor="email" style={styles.label}>
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  value={clientEmail}
                  onChange={(e) =>
                    dispatch({ type: "email", payload: e.target.value })
                  }
                  onFocus={() => setEmailFocused(true)}
                  onBlur={() => setEmailFocused(false)}
                  style={{
                    ...styles.input,
                    ...(emailFocused ? styles.inputFocus : {}),
                  }}
                />
              </div>
            </div>

            <div style={styles.fieldFull}>
              <label htmlFor="message" style={styles.label}>
                Message
              </label>
              <textarea
                name="message"
                id="message"
                value={message}
                onChange={(e) =>
                  dispatch({ type: "message", payload: e.target.value })
                }
                onFocus={() => setMessageFocused(true)}
                onBlur={() => setMessageFocused(false)}
                style={{
                  ...styles.textarea,
                  ...(messageFocused ? styles.inputFocus : {}),
                }}
              />
            </div>

            <button
              type="submit"
              disabled={isMessageSending}
              onMouseEnter={() => setSubmitHovered(true)}
              onMouseLeave={() => setSubmitHovered(false)}
              style={{
                ...styles.submitBtn,
                ...(submitHovered && !isMessageSending
                  ? styles.submitBtnHover
                  : {}),
                ...(isMessageSending ? styles.submitBtnDisabled : {}),
              }}
            >
              {isMessageSending ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>

        {/* SIDE COLUMN */}
        <div style={styles.sideCard}>
          <div style={styles.sidePanel}>
            <h4 style={styles.sideHeading}>Visit The Office</h4>

            <div
              style={{
                display: "flex",
                gap: "0.6rem",
                marginBottom: "0.25rem",
              }}
            >
              <span
                style={{
                  color: "var(--secondary-text-color)",
                  flexShrink: 0,
                  marginTop: "0.15rem",
                }}
              >
                <MapPinIcon />
              </span>
              <p style={styles.addressText}>{CONTACT.address}</p>
            </div>

            <div style={styles.hoursRow}>
              <span>Mon – Fri</span>
              <span style={styles.hoursValue}>9:00 AM – 5:00 PM</span>
            </div>
            <div style={styles.hoursRow}>
              <span>Saturday</span>
              <span style={styles.hoursValue}>10:00 AM – 2:00 PM</span>
            </div>
            <div style={styles.hoursRow}>
              <span>Sunday</span>
              <span style={styles.hoursValue}>Closed</span>
            </div>

            <a
              href={directionsUrl}
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => setDirectionsHovered(true)}
              onMouseLeave={() => setDirectionsHovered(false)}
              style={{
                ...styles.directionsBtn,
                ...(directionsHovered ? styles.directionsBtnHover : {}),
              }}
            >
              Get Directions
            </a>
          </div>

          <div style={styles.socialPanel}>
            <div style={styles.socialPanelText}>
              <p style={styles.socialPanelLabel}>Follow Along</p>
              <p>New listings, first look.</p>
            </div>
            <div style={styles.socialRow}>
              <Link
                to="#"
                aria-label="Facebook"
                onMouseEnter={() => setFacebookHovered(true)}
                onMouseLeave={() => setFacebookHovered(false)}
                style={{
                  ...styles.socialLink,
                  ...(facebookHovered ? styles.socialLinkHover : {}),
                }}
              >
                <FaFacebookF />
              </Link>
              <Link
                to="#"
                aria-label="Instagram"
                onMouseEnter={() => setInstagramHovered(true)}
                onMouseLeave={() => setInstagramHovered(false)}
                style={{
                  ...styles.socialLink,
                  ...(instagramHovered ? styles.socialLinkHover : {}),
                }}
              >
                <FaInstagram />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;

// import { Link } from "react-router-dom";

// import emailjs from "@emailjs/browser";
// import { FormEvent, useEffect, useReducer } from "react";
// import AlertBox from "../Utilities/AlertBox";
// // import PageHeader from "./PageHeader";

// interface StateProps {
//   name: string;
//   clientEmail: string;
//   message: string;
//   alertMessage: string;
//   isMessageSending: boolean;
//   messageSent: boolean;
// }

// interface ActionProps {
//   type: string;
//   payload?: string | boolean;
// }

// const initialState = {
//   name: "",
//   clientEmail: "",
//   message: "",
//   isMessageSending: false,
//   alertMessage: "",
//   messageSent: false,
// };

// function reducer(state: StateProps, action: ActionProps) {
//   switch (action.type) {
//     case "name":
//       return { ...state, name: action.payload as string };
//     case "email":
//       return { ...state, clientEmail: action.payload as string };
//     case "message":
//       return { ...state, message: action.payload as string };
//     case "alert":
//       return { ...state, alertMessage: action.payload as string };
//     case "sent":
//       return { ...state, messageSent: action.payload as boolean };
//     case "sending":
//       return { ...state, isMessageSending: action.payload as boolean };
//     case "reset":
//       return initialState;
//     default:
//       throw new Error("unknown action");
//   }
// }

// function Contact() {
//   const [state, dispatch] = useReducer(reducer, initialState);
//   const {
//     name,
//     clientEmail,
//     message,
//     alertMessage,
//     isMessageSending,
//     messageSent,
//   } = state;

//   useEffect(
//     function () {
//       if (messageSent) {
//         const timeOut = setTimeout(() => {
//           dispatch({ type: "sent", payload: false });
//         }, 5000);

//         return () => clearTimeout(timeOut);
//       }
//     },
//     [messageSent]
//   );

//   const handleSubmit = async function (e: FormEvent<HTMLFormElement>) {
//     e.preventDefault();

//     const serviceId = "service_7uvbyms";
//     const templateId = "template_lei4j7a";
//     const publicKey = "NUCZEfqoTrlkgELZ4";

//     const templateParams = {
//       from_name: name,
//       from_email: clientEmail,
//       message,
//       to_name: "Ifeanyi",
//     };

//     try {
//       dispatch({ type: "sending", payload: true });
//       if (!clientEmail && !message) return;
//       const response = await emailjs.send(
//         serviceId,
//         templateId,
//         templateParams,
//         publicKey
//       );
//       if (response.status !== 200) throw new Error("Email not sent!");
//       dispatch({ type: "sent", payload: true });
//       dispatch({ type: "alert", payload: "Message sent successfully!" });
//       dispatch({ type: "name", payload: "" });
//       dispatch({ type: "email", payload: "" });
//       dispatch({ type: "message", payload: "" });
//     } catch (error) {
//       dispatch({ type: "alert", payload: (error as Error).message });
//     } finally {
//       dispatch({ type: "sending", payload: false });
//     }
//   };

//   return (
//     <div className="contact">
//       {messageSent && <AlertBox>{alertMessage}</AlertBox>}

//       {/* <PageHeader>
//         <h1>Contact Us</h1>
//         <span>
//           <Link to="/">Home</Link> / Contact Us
//         </span>
//       </PageHeader> */}

//       <div className="form-container">
//         <div className="background-container">
//           <div className="ct">
//             <div className="form">
//               <h1>Get In Touch</h1>
//               <p className="form-desc">
//                 Please fill out the form below to send us an email and we will
//                 get back to you as soon as possible.
//               </p>
//               <form onSubmit={handleSubmit}>
//                 <div>
//                   <label htmlFor="name">
//                     Name
//                     <input
//                       type="text"
//                       id="name"
//                       value={name}
//                       onChange={(e) =>
//                         dispatch({ type: "name", payload: e.target.value })
//                       }
//                     />
//                   </label>
//                   <label htmlFor="email">
//                     Email
//                     <input
//                       type="text"
//                       id="email"
//                       value={clientEmail}
//                       onChange={(e) =>
//                         dispatch({ type: "email", payload: e.target.value })
//                       }
//                     />
//                   </label>
//                 </div>
//                 <label htmlFor="message">Message</label>
//                 <textarea
//                   name="message"
//                   id="message"
//                   value={message}
//                   onChange={(e) =>
//                     dispatch({ type: "message", payload: e.target.value })
//                   }
//                 ></textarea>
//                 <button
//                   type="submit"
//                   disabled={isMessageSending}
//                   className={isMessageSending ? "isSending" : ""}
//                 >
//                   {isMessageSending ? "SENDING..." : "SEND MESSAGE"}
//                   <span></span>
//                 </button>
//               </form>
//             </div>

//             <div className="contact-info">
//               <h4>Contact Info</h4>
//               <div className="contact-item">
//                 <p>
//                   <span className="glyphicon glyphicon-map-marker">
//                     4th floor, Adeboyega Adeleke and co
//                   </span>
//                   <br />
//                   <span>8 Strchan str off Igbosere road,</span>
//                   <br />
//                   <span>Lagos-Island, Lagos</span>
//                 </p>
//               </div>
//               <div className="contact-item">
//                 <p>
//                   <span>Phone</span>
//                   <br /> +234 809 606 8042
//                   <br /> +234 704 994 3393
//                 </p>
//               </div>
//               <div className="contact-item">
//                 <p>
//                   <span>Email</span> <br />
//                   info@1502properties.com
//                 </p>
//               </div>
//             </div>
//           </div>
//           <ul>
//             <li>
//               <Link to="#">
//                 <img
//                   src="/socials/facebook.png"
//                   alt="facebook"
//                   title="facebook"
//                   loading="lazy"
//                   width="auto"
//                   height="auto"
//                 />
//               </Link>
//             </li>
//             <li>
//               <Link to="#">
//                 <img
//                   src="/socials/instagram.png"
//                   alt="instagram"
//                   title="instagram"
//                   loading="lazy"
//                   width="auto"
//                   height="auto"
//                 />
//               </Link>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Contact;
