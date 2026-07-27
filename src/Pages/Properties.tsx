import React, { useState, type CSSProperties } from "react";

const styles: Record<string, CSSProperties> = {
  page: {
    backgroundColor: "#f9fafb",
    color: "var(--primary-text-color)",
    minHeight: "100vh",
  },

  // ---- Banner (matches the rest of the site) ----
  banner: {
    position: "relative",
    minHeight: "clamp(20rem, 30vw, 25rem)",
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
    maxWidth: 620,
    padding: "0 1.5rem",
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
    fontSize: "clamp(1.7rem, 4vw, 2.5rem)",
    fontWeight: 600,
    color: "var(--light-color)",
    margin: "0 0 0.75rem",
  },
  subtitle: {
    fontSize: "0.92rem",
    lineHeight: 1.7,
    color: "#c7ccd6",
    margin: 0,
  },

  // ---- Form card ----
  wrap: {
    maxWidth: 720,
    margin: "0 auto",
    padding:
      "clamp(2.5rem, 6vw, 4rem) clamp(1.5rem, 6vw, 3rem) clamp(4rem, 7vw, 5.5rem)",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: "clamp(1.75rem, 4vw, 2.75rem)",
    boxShadow: "0 10px 34px rgba(11, 17, 52, 0.10)",
    border: "1px solid rgba(43, 45, 45, 0.06)",
  },

  section: {
    marginBottom: "2.5rem",
  },
  sectionLast: {
    marginBottom: 0,
  },
  sectionHead: {
    display: "flex",
    alignItems: "baseline",
    gap: "0.6rem",
    marginBottom: "1.5rem",
    paddingBottom: "0.85rem",
    borderBottom: "1px solid #eee",
  },
  sectionStep: {
    fontFamily: "var(--font-headings)",
    fontSize: "0.85rem",
    fontWeight: 600,
    color: "var(--secondary-text-color)",
  },
  sectionTitle: {
    fontSize: "1.05rem",
    fontWeight: 600,
    margin: 0,
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
    marginBottom: "1.25rem",
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
  select: {
    padding: "0.8rem 1rem",
    fontSize: "0.9rem",
    fontFamily: "inherit",
    color: "var(--primary-text-color)",
    backgroundColor: "#fafafa",
    border: "1px solid #e2e2e2",
    borderRadius: 8,
    outline: "none",
    cursor: "pointer",
    transition: "border-color 0.2s ease, background-color 0.2s ease",
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
    minHeight: 90,
    transition: "border-color 0.2s ease, background-color 0.2s ease",
  },
  inputFocus: {
    borderColor: "var(--secondary-text-color)",
    backgroundColor: "#fff",
  },

  submitBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.6rem",
    width: "100%",
    justifyContent: "center",
    padding: "0.95rem 2rem",
    fontSize: "0.9rem",
    fontWeight: 600,
    letterSpacing: "0.03em",
    color: "#fff",
    backgroundColor: "var(--dark-background-color)",
    border: "none",
    borderRadius: 100,
    cursor: "pointer",
    marginTop: "0.5rem",
    transition: "background-color 0.25s ease",
  },
  submitBtnHover: {
    backgroundColor: "var(--secondary-text-color)",
  },
};

const ContactForm = () => {
  const [form, setForm] = useState({
    transactionType: "",
    propertyType: "",
    location: "",
    budgetMin: "",
    budgetMax: "",
    bedrooms: "",
    preferences: "",
    additionalInfo: "",
    contactMethod: "",
    fullName: "",
    email: "",
    phone: "",
    clientType: "",
  });

  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [submitHovered, setSubmitHovered] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const focusHandlers = (name: string) => ({
    onFocus: () => setFocusedField(name),
    onBlur: () => setFocusedField(null),
  });

  const fieldStyle = (name: string, base: CSSProperties) => ({
    ...base,
    ...(focusedField === name ? styles.inputFocus : {}),
  });

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   console.log(form);
  //   // You can add form validation or submit to an API here
  // };

  return (
    <div style={styles.page}>
      {/* BANNER */}
      <div style={styles.banner}>
        <div style={styles.bannerContent}>
          <span style={styles.eyebrow}>Property Request</span>
          <h1 style={styles.title}>Tell us what you're looking for</h1>
          <p style={styles.subtitle}>
            Share your requirements and we'll match you with suitable options.
          </p>
        </div>
      </div>

      <div style={styles.wrap}>
        <div style={styles.card}>
          <form
            // onSubmit={handleSubmit}
            action="https://formspree.io/f/xanordow"
            method="POST"
          >
            {/* SECTION 1 — PROPERTY REQUIREMENTS */}
            <div style={styles.section}>
              <div style={styles.sectionHead}>
                <span style={styles.sectionStep}>01</span>
                <h3 style={styles.sectionTitle}>Property Requirements</h3>
              </div>

              <div style={styles.fieldRow}>
                <div style={styles.field}>
                  <label style={styles.label}>Transaction Type</label>
                  <select
                    name="transactionType"
                    value={form.transactionType}
                    onChange={handleChange}
                    {...focusHandlers("transactionType")}
                    style={fieldStyle("transactionType", styles.select)}
                  >
                    <option value="">Select</option>
                    <option value="Buy">Buy</option>
                    <option value="Rent">Rent</option>
                    <option value="Short Let">Short Let</option>
                    <option value="Joint venture">Joint venture</option>
                  </select>
                </div>
                <div style={styles.field}>
                  <label style={styles.label}>Property Type</label>
                  <select
                    name="propertyType"
                    value={form.propertyType}
                    onChange={handleChange}
                    {...focusHandlers("propertyType")}
                    style={fieldStyle("propertyType", styles.select)}
                  >
                    <option value="">Select</option>
                    <option value="Flat/Apartment">Flat/Apartment</option>
                    <option value="House">House</option>
                    <option value="Land">Land</option>
                    <option value="Commercial Property">
                      Commercial Property
                    </option>
                  </select>
                </div>
              </div>

              <div style={styles.fieldRow}>
                <div style={styles.field}>
                  <label style={styles.label}>Location</label>
                  <input
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    placeholder="Preferred areas or neighborhoods"
                    {...focusHandlers("location")}
                    style={fieldStyle("location", styles.input)}
                  />
                </div>
                <div style={styles.field}>
                  <label style={styles.label}>Bedrooms</label>
                  <select
                    name="bedrooms"
                    value={form.bedrooms}
                    onChange={handleChange}
                    {...focusHandlers("bedrooms")}
                    style={fieldStyle("bedrooms", styles.select)}
                  >
                    <option value="">Select</option>
                    {[1, 2, 3, 4, 5].map((num) => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={styles.fieldRow}>
                <div style={styles.field}>
                  <label style={styles.label}>Budget Min</label>
                  <input
                    name="budgetMin"
                    type="number"
                    value={form.budgetMin}
                    onChange={handleChange}
                    placeholder="Min"
                    {...focusHandlers("budgetMin")}
                    style={fieldStyle("budgetMin", styles.input)}
                  />
                </div>
                <div style={styles.field}>
                  <label style={styles.label}>Budget Max</label>
                  <input
                    name="budgetMax"
                    type="number"
                    value={form.budgetMax}
                    onChange={handleChange}
                    placeholder="Max"
                    {...focusHandlers("budgetMax")}
                    style={fieldStyle("budgetMax", styles.input)}
                  />
                </div>
              </div>

              <div style={styles.fieldFull}>
                <label style={styles.label}>Additional Preferences</label>
                <textarea
                  name="preferences"
                  value={form.preferences}
                  onChange={handleChange}
                  placeholder="e.g. furnished, serviced, amenities"
                  {...focusHandlers("preferences")}
                  style={fieldStyle("preferences", styles.textarea)}
                />
              </div>

              <div style={styles.fieldFull}>
                <label style={styles.label}>Additional Information</label>
                <textarea
                  name="additionalInfo"
                  value={form.additionalInfo}
                  onChange={handleChange}
                  {...focusHandlers("additionalInfo")}
                  style={fieldStyle("additionalInfo", styles.textarea)}
                />
              </div>
            </div>

            {/* SECTION 2 — CONTACT PREFERENCE */}
            <div style={styles.section}>
              <div style={styles.sectionHead}>
                <span style={styles.sectionStep}>02</span>
                <h3 style={styles.sectionTitle}>Preferred Contact Method</h3>
              </div>

              <div style={styles.fieldFull}>
                <label style={styles.label}>How should we reach you?</label>
                <select
                  name="contactMethod"
                  value={form.contactMethod}
                  onChange={handleChange}
                  {...focusHandlers("contactMethod")}
                  style={fieldStyle("contactMethod", styles.select)}
                >
                  <option value="">Select</option>
                  <option value="Email">Email</option>
                  <option value="Phone">Phone</option>
                  <option value="WhatsApp">WhatsApp</option>
                  <option value="Either">Either</option>
                </select>
              </div>
            </div>

            {/* SECTION 3 — CONTACT INFORMATION */}
            <div style={{ ...styles.section, ...styles.sectionLast }}>
              <div style={styles.sectionHead}>
                <span style={styles.sectionStep}>03</span>
                <h3 style={styles.sectionTitle}>Your Details</h3>
              </div>

              <div style={styles.fieldFull}>
                <label style={styles.label}>Full Name</label>
                <input
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  {...focusHandlers("fullName")}
                  style={fieldStyle("fullName", styles.input)}
                />
              </div>

              <div style={styles.fieldRow}>
                <div style={styles.field}>
                  <label style={styles.label}>Email Address</label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    {...focusHandlers("email")}
                    style={fieldStyle("email", styles.input)}
                  />
                </div>
                <div style={styles.field}>
                  <label style={styles.label}>Phone Number</label>
                  <input
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    {...focusHandlers("phone")}
                    style={fieldStyle("phone", styles.input)}
                  />
                </div>
              </div>

              <div style={styles.fieldFull}>
                <label style={styles.label}>I am a/an</label>
                <select
                  name="clientType"
                  value={form.clientType}
                  onChange={handleChange}
                  {...focusHandlers("clientType")}
                  style={fieldStyle("clientType", styles.select)}
                >
                  <option value="">Select</option>
                  <option value="Client">Client</option>
                  <option value="Agent">Agent</option>
                </select>
              </div>

              <button
                type="submit"
                onMouseEnter={() => setSubmitHovered(true)}
                onMouseLeave={() => setSubmitHovered(false)}
                style={{
                  ...styles.submitBtn,
                  ...(submitHovered ? styles.submitBtnHover : {}),
                }}
              >
                Submit Request
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;

// import React, { useState } from "react";

// const ContactForm = () => {
//   const [form, setForm] = useState({
//     transactionType: "",
//     propertyType: "",
//     location: "",
//     budgetMin: "",
//     budgetMax: "",
//     bedrooms: "",
//     preferences: "",
//     additionalInfo: "",
//     contactMethod: "",
//     fullName: "",
//     email: "",
//     phone: "",
//     clientType: "",
//   });

//   const handleChange = (
//     e: React.ChangeEvent<
//       HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
//     >
//   ) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   // const handleSubmit = (e: React.FormEvent) => {
//   //   e.preventDefault();
//   //   console.log(form);
//   //   // You can add form validation or submit to an API here
//   // };

//   return (
//     <div className="contact-container">
//       <h2>Request a Property</h2>
//       <p>
//         Let us know your property requirements, and we will contact you with
//         suitable options.
//       </p>

//       <form
//         // onSubmit={handleSubmit}
//         action="https://formspree.io/f/xanordow"
//         method="POST"
//         className="contact-form"
//       >
//         <h3>Property Requirements</h3>

//         <label>Transaction Type</label>
//         <select
//           name="transactionType"
//           value={form.transactionType}
//           onChange={handleChange}
//         >
//           <option value="">Select</option>
//           <option value="Buy">Buy</option>
//           <option value="Rent">Rent</option>
//           <option value="Short Let">Short Let</option>
//           <option value="Joint venture">Joint venture</option>
//         </select>

//         <label>Property Type</label>
//         <select
//           name="propertyType"
//           value={form.propertyType}
//           onChange={handleChange}
//         >
//           <option value="">Select</option>
//           <option value="Flat/Apartment">Flat/Apartment</option>
//           <option value="House">House</option>
//           <option value="Land">Land</option>
//           <option value="Commercial Property">Commercial Property</option>
//         </select>

//         <label>Location</label>
//         <input
//           name="location"
//           value={form.location}
//           onChange={handleChange}
//           placeholder="Preferred areas or neighborhoods"
//         />

//         <label>Bedrooms</label>
//         <select name="bedrooms" value={form.bedrooms} onChange={handleChange}>
//           <option value="">Select</option>
//           {[1, 2, 3, 4, 5].map((num) => (
//             <option key={num} value={num}>
//               {num}
//             </option>
//           ))}
//         </select>

//         <label>Additional Preferences</label>
//         <textarea
//           name="preferences"
//           value={form.preferences}
//           onChange={handleChange}
//           placeholder="e.g. furnished, serviced, amenities"
//         />

//         <label>Additional Information</label>
//         <textarea
//           name="additionalInfo"
//           value={form.additionalInfo}
//           onChange={handleChange}
//         />

//         <div className="budget-group">
//           <div>
//             <label>Budget Min</label>
//             <input
//               name="budgetMin"
//               type="number"
//               value={form.budgetMin}
//               onChange={handleChange}
//               placeholder="Min"
//             />
//           </div>
//           <div>
//             <label>Budget Max</label>
//             <input
//               name="budgetMax"
//               type="number"
//               value={form.budgetMax}
//               onChange={handleChange}
//               placeholder="Max"
//             />
//           </div>
//         </div>

//         <h3>Preferred Contact Method</h3>
//         <select
//           name="contactMethod"
//           value={form.contactMethod}
//           onChange={handleChange}
//         >
//           <option value="">Select</option>
//           <option value="Email">Email</option>
//           <option value="Phone">Phone</option>
//           <option value="WhatsApp">WhatsApp</option>
//           <option value="Either">Either</option>
//         </select>

//         <h3>Contact Information</h3>
//         <label>Full Name</label>
//         <input name="fullName" value={form.fullName} onChange={handleChange} />

//         <label>Email Address</label>
//         <input
//           name="email"
//           type="email"
//           value={form.email}
//           onChange={handleChange}
//         />

//         <label>Phone Number</label>
//         <input
//           name="phone"
//           type="tel"
//           value={form.phone}
//           onChange={handleChange}
//         />

//         <label>I am a/an</label>
//         <select
//           name="clientType"
//           value={form.clientType}
//           onChange={handleChange}
//         >
//           <option value="">Select</option>
//           <option value="Client">Client</option>
//           <option value="Agent">Agent</option>
//         </select>

//         <button type="submit">Submit Request</button>
//       </form>
//     </div>
//   );
// };

// export default ContactForm;
