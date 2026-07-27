import { useMemo, useState, type CSSProperties } from "react";
import { FaMapMarkerAlt, FaBed, FaWallet } from "react-icons/fa";

interface PropertyRequest {
  transactionType: string;
  propertyType: string;
  location: string;
  budgetMin: string;
  budgetMax: string;
  bedrooms: string;
  preferences: string;
  additionalInfo: string;
  clientType: string;
}

const mockData: PropertyRequest[] = [
  {
    transactionType: "Buy",
    propertyType: "House",
    location: "Lekki, Lagos",
    budgetMin: "50000000",
    budgetMax: "100000000",
    bedrooms: "4",
    preferences: "Furnished, swimming pool",
    additionalInfo: "Prefer a gated estate",
    clientType: "Client",
  },
  {
    transactionType: "Rent",
    propertyType: "Flat/Apartment",
    location: "Abuja",
    budgetMin: "2000000",
    budgetMax: "3500000",
    bedrooms: "2",
    preferences: "Serviced, with generator",
    additionalInfo: "",
    clientType: "Agent",
  },
  {
    transactionType: "Rent",
    propertyType: "Flat/Apartment",
    location: "Abuja",
    budgetMin: "2000000",
    budgetMax: "3500000",
    bedrooms: "2",
    preferences: "Serviced, with generator",
    additionalInfo: "",
    clientType: "Agent",
  },
  {
    transactionType: "Rent",
    propertyType: "Flat/Apartment",
    location: "Abuja",
    budgetMin: "2000000",
    budgetMax: "3500000",
    bedrooms: "2",
    preferences: "Serviced, with generator",
    additionalInfo: "",
    clientType: "Agent",
  },
  {
    transactionType: "Rent",
    propertyType: "Flat/Apartment",
    location: "Abuja",
    budgetMin: "2000000",
    budgetMax: "3500000",
    bedrooms: "2",
    preferences: "Serviced, with generator",
    additionalInfo: "",
    clientType: "Agent",
  },
];

const formatNaira = (value: string) => {
  const num = Number(value);
  if (Number.isNaN(num)) return value;
  return new Intl.NumberFormat("en-NG").format(num);
};

const styles: Record<string, CSSProperties> = {
  page: {
    backgroundColor: "#f9fafb",
    minHeight: "100vh",
    color: "var(--primary-text-color)",
  },

  // ---- Header ----
  header: {
    backgroundColor: "var(--dark-background-color)",
    padding: "clamp(2rem, 5vw, 3rem) clamp(1.5rem, 6vw, 3rem)",
  },
  headerInner: {
    maxWidth: 1200,
    margin: "0 auto",
    display: "flex",
    flexWrap: "wrap",
    gap: "2rem",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  eyebrow: {
    display: "inline-block",
    fontSize: "0.72rem",
    fontWeight: 600,
    letterSpacing: "0.16em",
    textTransform: "uppercase",
    color: "var(--secondary-text-color)",
    marginBottom: "0.6rem",
  },
  title: {
    fontFamily: "var(--font-headings)",
    fontSize: "clamp(1.5rem, 3vw, 2rem)",
    fontWeight: 600,
    color: "var(--light-color)",
    margin: 0,
  },
  statsRow: {
    display: "flex",
    gap: "2rem",
  },
  statBlock: {
    textAlign: "right",
  },
  statValue: {
    display: "block",
    fontFamily: "var(--font-headings)",
    fontSize: "1.5rem",
    fontWeight: 600,
    color: "var(--light-color)",
  },
  statLabel: {
    fontSize: "0.7rem",
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    color: "#9aa0ab",
  },

  // ---- Filter tabs ----
  filterBar: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "1.5rem clamp(1.5rem, 6vw, 3rem) 0",
    display: "flex",
    flexWrap: "wrap",
    gap: "0.6rem",
  },
  filterTab: {
    padding: "0.55rem 1.1rem",
    fontSize: "0.82rem",
    fontWeight: 600,
    borderRadius: 100,
    border: "1px solid rgba(43,45,45,0.14)",
    backgroundColor: "#fff",
    color: "var(--primary-text-color)",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  filterTabActive: {
    backgroundColor: "var(--dark-background-color)",
    borderColor: "var(--dark-background-color)",
    color: "var(--light-color)",
  },

  // ---- Grid ----
  container: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "1.75rem clamp(1.5rem, 6vw, 3rem) clamp(4rem, 7vw, 5.5rem)",
  },
  requestsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "1.25rem",
  },

  // ---- Card ----
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: "1.5rem",
    border: "1px solid rgba(43,45,45,0.06)",
    boxShadow: "0 4px 16px rgba(11, 17, 52, 0.05)",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  cardTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "0.75rem",
  },
  badge: {
    display: "inline-block",
    padding: "0.3rem 0.7rem",
    fontSize: "0.68rem",
    fontWeight: 700,
    letterSpacing: "0.04em",
    textTransform: "uppercase",
    borderRadius: 100,
    backgroundColor: "rgba(167, 156, 73, 0.14)",
    color: "#8a7f3d",
  },
  clientBadge: {
    display: "inline-block",
    padding: "0.3rem 0.7rem",
    fontSize: "0.68rem",
    fontWeight: 700,
    letterSpacing: "0.04em",
    textTransform: "uppercase",
    borderRadius: 100,
    border: "1px solid rgba(43,45,45,0.14)",
    color: "#6b6f6f",
  },
  cardTitle: {
    fontFamily: "var(--font-headings)",
    fontSize: "1.1rem",
    fontWeight: 600,
    margin: 0,
  },
  metaRow: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    fontSize: "0.85rem",
    color: "#5a5d5d",
  },
  metaIcon: {
    color: "var(--secondary-text-color)",
    flexShrink: 0,
    display: "flex",
  },
  budgetBlock: {
    padding: "0.9rem 1rem",
    borderRadius: 8,
    backgroundColor: "var(--secondary-background-color)",
  },
  budgetLabel: {
    fontSize: "0.68rem",
    fontWeight: 600,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    color: "#8a7f3d",
    marginBottom: "0.25rem",
    display: "block",
  },
  budgetValue: {
    fontSize: "1rem",
    fontWeight: 700,
    color: "var(--primary-text-color)",
  },
  detailRow: {
    fontSize: "0.83rem",
    lineHeight: 1.6,
    color: "#5a5d5d",
    margin: 0,
  },
  detailLabel: {
    fontWeight: 600,
    color: "var(--primary-text-color)",
  },

  // ---- Empty state ----
  empty: {
    minHeight: "70vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: "2rem",
  },
  emptyTitle: {
    fontFamily: "var(--font-headings)",
    fontSize: "1.4rem",
    fontWeight: 600,
    marginBottom: "0.6rem",
  },
  emptyText: {
    fontSize: "0.9rem",
    color: "#6b6f6f",
    maxWidth: 360,
  },
};

const ViewPropertyRequest = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const transactionTypes = useMemo(
    () => [
      "All",
      ...Array.from(new Set(mockData.map((item) => item.transactionType))),
    ],
    [],
  );

  const filteredData = useMemo(
    () =>
      activeFilter === "All"
        ? mockData
        : mockData.filter((item) => item.transactionType === activeFilter),
    [activeFilter],
  );

  const stats = useMemo(() => {
    const buy = mockData.filter(
      (item) => item.transactionType === "Buy",
    ).length;
    const rent = mockData.filter(
      (item) => item.transactionType === "Rent",
    ).length;
    return { total: mockData.length, buy, rent };
  }, []);

  if (mockData.length === 0) {
    return (
      <div style={styles.page}>
        <div style={styles.empty}>
          <h2 style={styles.emptyTitle}>No requests yet</h2>
          <p style={styles.emptyText}>
            Submitted property requests from clients and agents will show up
            here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      {/* HEADER */}
      <div style={styles.header}>
        <div style={styles.headerInner}>
          <div>
            <span style={styles.eyebrow}>Admin</span>
            <h2 style={styles.title}>Submitted Property Requests</h2>
          </div>

          <div style={styles.statsRow}>
            <div style={styles.statBlock}>
              <span style={styles.statValue}>{stats.total}</span>
              <span style={styles.statLabel}>Total</span>
            </div>
            <div style={styles.statBlock}>
              <span style={styles.statValue}>{stats.buy}</span>
              <span style={styles.statLabel}>Buy</span>
            </div>
            <div style={styles.statBlock}>
              <span style={styles.statValue}>{stats.rent}</span>
              <span style={styles.statLabel}>Rent</span>
            </div>
          </div>
        </div>
      </div>

      {/* FILTER TABS */}
      <div style={styles.filterBar}>
        {transactionTypes.map((type) => (
          <button
            key={type}
            onClick={() => setActiveFilter(type)}
            style={{
              ...styles.filterTab,
              ...(activeFilter === type ? styles.filterTabActive : {}),
            }}
          >
            {type}
          </button>
        ))}
      </div>

      {/* GRID */}
      <div style={styles.container}>
        {filteredData.length > 0 ? (
          <div style={styles.requestsGrid}>
            {filteredData.map((item, index) => (
              <div key={index} style={styles.card}>
                <div style={styles.cardTop}>
                  <span style={styles.badge}>{item.transactionType}</span>
                  <span style={styles.clientBadge}>{item.clientType}</span>
                </div>

                <h3 style={styles.cardTitle}>
                  {item.bedrooms ? `${item.bedrooms}-Bedroom ` : ""}
                  {item.propertyType}
                </h3>

                <div style={styles.metaRow}>
                  <span style={styles.metaIcon}>
                    <FaMapMarkerAlt />
                  </span>
                  {item.location}
                </div>

                {item.bedrooms && (
                  <div style={styles.metaRow}>
                    <span style={styles.metaIcon}>
                      <FaBed />
                    </span>
                    {item.bedrooms} bedroom
                    {Number(item.bedrooms) > 1 ? "s" : ""}
                  </div>
                )}

                <div style={styles.budgetBlock}>
                  <span style={styles.budgetLabel}>
                    <FaWallet style={{ marginRight: 6 }} />
                    Budget Range
                  </span>
                  <span style={styles.budgetValue}>
                    ₦{formatNaira(item.budgetMin)} – ₦
                    {formatNaira(item.budgetMax)}
                  </span>
                </div>

                {item.preferences && (
                  <p style={styles.detailRow}>
                    <span style={styles.detailLabel}>Preferences: </span>
                    {item.preferences}
                  </p>
                )}

                {item.additionalInfo && (
                  <p style={styles.detailRow}>
                    <span style={styles.detailLabel}>Extra Info: </span>
                    {item.additionalInfo}
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div style={styles.empty}>
            <h2 style={styles.emptyTitle}>
              No {activeFilter.toLowerCase()} requests
            </h2>
            <p style={styles.emptyText}>
              Try a different filter, or check back later.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewPropertyRequest;
