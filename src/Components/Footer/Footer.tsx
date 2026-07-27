import emailjs from "@emailjs/browser";
import { FormEvent, useEffect, useState, type CSSProperties } from "react";
import { Link } from "react-router-dom";
import AlertBox from "../../Utilities/AlertBox";

import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";

const styles: Record<string, CSSProperties> = {
  footer: {
    backgroundColor: "var(--dark-background-color)",
    color: "var(--light-color)",
  },
  container: {
    maxWidth: 1300,
    margin: "0 auto",
    padding: "clamp(3rem, 6vw, 4.5rem) clamp(1.5rem, 5vw, 3rem) 0",
  },
  row: {
    display: "flex",
    flexWrap: "wrap",
    gap: "3rem",
    paddingBottom: "clamp(2.5rem, 5vw, 3.5rem)",
  },
  col: {
    flex: "1 1 200px",
    minWidth: 200,
  },
  colWide: {
    flex: "1.4 1 260px",
    minWidth: 260,
  },
  heading: {
    fontFamily: "var(--font-headings)",
    fontSize: "1rem",
    fontWeight: 600,
    color: "var(--light-color)",
    paddingBottom: "0.7rem",
    marginBottom: "1.2rem",
    borderBottom: "2px solid rgba(255, 255, 255, 0.1)",
    display: "inline-block",
  },

  // Information column
  linkList: {
    listStyle: "none",
    display: "flex",
    flexDirection: "column",
    gap: "0.7rem",
    padding: 0,
    margin: 0,
  },
  link: {
    fontSize: "0.85rem",
    color: "#c0c5cd",
    textDecoration: "none",
    transition: "color 0.2s ease",
  },
  linkHover: {
    color: "var(--secondary-text-color)",
  },

  // Newsletter column
  newsletterText: {
    fontSize: "0.85rem",
    lineHeight: 1.6,
    color: "#c0c5cd",
    marginBottom: "1.1rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
  },
  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: "0.75rem 1rem",
    fontSize: "0.85rem",
    fontFamily: "inherit",
    color: "var(--primary-text-color)",
    backgroundColor: "var(--light-color)",
    border: "1px solid transparent",
    borderRadius: 6,
    outline: "none",
    transition: "border-color 0.2s ease",
  },
  inputFocus: {
    borderColor: "var(--secondary-text-color)",
  },
  submitBtn: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0.75rem 1rem",
    fontSize: "0.85rem",
    fontWeight: 600,
    color: "#fff",
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
    transition: "background-color 0.2s ease, opacity 0.2s ease",
  },
  submitBtnHover: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  submitBtnDisabled: {
    opacity: 0.6,
    cursor: "not-allowed",
  },

  // Follow us column
  socialRow: {
    display: "flex",
    gap: "0.75rem",
  },
  socialLink: {
    width: 42,
    height: 42,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    color: "var(--light-color)",
    fontSize: "1.05rem",
    textDecoration: "none",
    transition: "background-color 0.2s ease, color 0.2s ease",
  },
  socialLinkHover: {
    backgroundColor: "var(--secondary-text-color)",
    color: "#fff",
  },

  // Contact column
  contactList: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    fontSize: "0.85rem",
    color: "#c0c5cd",
    lineHeight: 1.6,
  },
  contactLine: {
    display: "flex",
    alignItems: "flex-start",
    gap: "0.5rem",
  },
  contactIcon: {
    color: "var(--secondary-text-color)",
    flexShrink: 0,
    marginTop: "0.2rem",
  },

  // Base
  base: {
    display: "flex",
    flexWrap: "wrap",
    gap: "1rem",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1.5rem 0",
    borderTop: "1px solid rgba(255, 255, 255, 0.08)",
    fontSize: "0.82rem",
  },
  copyright: {
    color: "#8f95a3",
    margin: 0,
  },
  copyrightLink: {
    color: "#c0c5cd",
    textDecoration: "none",
  },
  baseLinks: {
    listStyle: "none",
    display: "flex",
    flexWrap: "wrap",
    gap: "1.5rem",
    padding: 0,
    margin: 0,
  },
  baseLink: {
    color: "#c0c5cd",
    textDecoration: "none",
    transition: "color 0.2s ease",
  },
};

interface HoverableLinkProps {
  to: string;
  children: React.ReactNode;
  style?: CSSProperties;
  hoverStyle?: CSSProperties;
}

const HoverableLink = ({
  to,
  children,
  style,
  hoverStyle,
}: HoverableLinkProps) => {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      to={to}
      style={{ ...style, ...(hovered ? hoverStyle : {}) }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </Link>
  );
};

function Footer() {
  const [clientEmail, setClientEmail] = useState<string>("");
  const [isSending, setIsSending] = useState<boolean>(false);
  const [emailSent, setEmailSent] = useState<boolean>(false);
  const [inputFocused, setInputFocused] = useState(false);
  const [submitHovered, setSubmitHovered] = useState(false);
  const [facebookHovered, setFacebookHovered] = useState(false);
  const [instagramHovered, setInstagramHovered] = useState(false);
  const [tiktokHovered, setTiktokHovered] = useState(false);

  useEffect(
    function () {
      if (emailSent) {
        const timeOut = setTimeout(() => {
          setEmailSent(false);
        }, 5000);

        return () => clearTimeout(timeOut);
      }
    },
    [emailSent],
  );

  const handleSubmit = async function (e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const serviceId = "service_7uvbyms";
    const templateId = "template_n9yywq9";
    const publicKey = "NUCZEfqoTrlkgELZ4";

    const templateParams = {
      from_email: clientEmail,
      to_name: "ifeanyi",
    };

    try {
      setIsSending(true);
      if (!clientEmail) return;
      const response = await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        publicKey,
      );
      if (response.status !== 200) throw new Error("Email not sent.");
      console.log("SUCCESS!", response.status, response.text);
      setClientEmail("");
      setEmailSent(true);
    } catch (error) {
      console.log(error as Error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <footer style={styles.footer}>
      {emailSent && <AlertBox>Email sent successfully!</AlertBox>}
      <div style={styles.container}>
        <div style={styles.row}>
          {/* INFORMATION */}
          <div style={styles.col}>
            <span style={styles.heading}>Information</span>
            <ul style={styles.linkList}>
              <li>
                <HoverableLink
                  to="/"
                  style={styles.link}
                  hoverStyle={styles.linkHover}
                >
                  Home
                </HoverableLink>
              </li>
              <li>
                <HoverableLink
                  to="service/sale"
                  style={styles.link}
                  hoverStyle={styles.linkHover}
                >
                  View Properties
                </HoverableLink>
              </li>
              <li>
                <HoverableLink
                  to="ukproperties"
                  style={styles.link}
                  hoverStyle={styles.linkHover}
                >
                  Request Property
                </HoverableLink>
              </li>
              <li>
                <HoverableLink
                  to="blogs"
                  style={styles.link}
                  hoverStyle={styles.linkHover}
                >
                  Blogs
                </HoverableLink>
              </li>
              <li>
                <HoverableLink
                  to="ourservices"
                  style={styles.link}
                  hoverStyle={styles.linkHover}
                >
                  About Us
                </HoverableLink>
              </li>
              <li>
                <HoverableLink
                  to="careers"
                  style={styles.link}
                  hoverStyle={styles.linkHover}
                >
                  Careers
                </HoverableLink>
              </li>
              <li>
                <HoverableLink
                  to="contact"
                  style={styles.link}
                  hoverStyle={styles.linkHover}
                >
                  Contact
                </HoverableLink>
              </li>
              <li>
                <HoverableLink
                  to="login"
                  style={styles.link}
                  hoverStyle={styles.linkHover}
                >
                  Login
                </HoverableLink>
              </li>
              <li>
                <HoverableLink
                  to="signup"
                  style={styles.link}
                  hoverStyle={styles.linkHover}
                >
                  Sign Up
                </HoverableLink>
              </li>
            </ul>
          </div>

          {/* NEWSLETTER */}
          <div style={styles.colWide}>
            <span style={styles.heading}>Newsletter</span>
            <p style={styles.newsletterText}>
              Get notified about the latest properties in our marketplace.
            </p>
            <form style={styles.form} role="form" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Enter your email address"
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
                onFocus={() => setInputFocused(true)}
                onBlur={() => setInputFocused(false)}
                disabled={isSending}
                style={{
                  ...styles.input,
                  ...(inputFocused ? styles.inputFocus : {}),
                }}
              />
              <button
                type="submit"
                disabled={isSending}
                onMouseEnter={() => setSubmitHovered(true)}
                onMouseLeave={() => setSubmitHovered(false)}
                style={{
                  ...styles.submitBtn,
                  ...(submitHovered && !isSending ? styles.submitBtnHover : {}),
                  ...(isSending ? styles.submitBtnDisabled : {}),
                }}
              >
                {isSending ? "Sending..." : "Notify Me!"}
              </button>
            </form>
          </div>

          {/* FOLLOW US */}
          <div style={styles.col}>
            <span style={styles.heading}>Follow Us</span>
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
              <Link
                to="#"
                aria-label="TikTok"
                onMouseEnter={() => setTiktokHovered(true)}
                onMouseLeave={() => setTiktokHovered(false)}
                style={{
                  ...styles.socialLink,
                  ...(tiktokHovered ? styles.socialLinkHover : {}),
                }}
              >
                <FaTiktok />
              </Link>
            </div>
          </div>

          {/* OFFICE ADDRESS */}
          <div style={styles.col}>
            <span style={styles.heading}>Office Address</span>
            <div style={styles.contactList}>
              <span>1502 Properties.</span>
              <span>No 1a Hughes Avenue,</span>
              <span>Alagomeji Yaba, Lagos</span>
              <span style={styles.contactLine}>info@1502properties.com</span>
              <span style={styles.contactLine}>+234 809 606 8042</span>
              <span style={styles.contactLine}>+234 704 994 3393</span>
            </div>
          </div>
        </div>

        {/* FOOTER BASE */}
        <div style={styles.base}>
          <p style={styles.copyright}>
            © 1502 Properties — {new Date().getFullYear()}. Developed by{" "}
            <a
              href="https://ihemestudio.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.copyrightLink}
            >
              Iheme Studio
            </a>
          </p>
          <ul style={styles.baseLinks}>
            <li>
              <HoverableLink
                to="privacy-policy"
                style={styles.baseLink}
                hoverStyle={styles.linkHover}
              >
                Privacy Policy
              </HoverableLink>
            </li>
            <li>
              <HoverableLink
                to="termsandconditions"
                style={styles.baseLink}
                hoverStyle={styles.linkHover}
              >
                Terms of Service
              </HoverableLink>
            </li>
            <li>
              <HoverableLink
                to="contact"
                style={styles.baseLink}
                hoverStyle={styles.linkHover}
              >
                Contact Support
              </HoverableLink>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
