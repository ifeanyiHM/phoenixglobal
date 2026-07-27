import { type CSSProperties } from "react";
import useBlog from "../context/useBlog";
import BlogCard from "../ui/BlogCard";
import { Spinner } from "../Utilities/Spinner";

const styles: Record<string, CSSProperties> = {
  page: {
    backgroundColor: "#f9fafb",
    minHeight: "100vh",
  },

  // ---- Banner (matches Contact / ServicePage / About / Careers) ----
  banner: {
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
    margin: "0 0 0.9rem",
    lineHeight: 1.3,
  },
  subtitle: {
    fontSize: "0.95rem",
    lineHeight: 1.75,
    color: "#c7ccd6",
    margin: 0,
  },

  // ---- Grid section ----
  container: {
    maxWidth: 1300,
    margin: "0 auto",
    padding:
      "clamp(3rem, 6vw, 4.5rem) clamp(1.5rem, 6vw, 3rem) clamp(4rem, 7vw, 5.5rem)",
  },
  blogGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "2rem",
  },

  // ---- Empty state ----
  empty: {
    maxWidth: 480,
    margin: "0 auto",
    padding: "3.5rem 2rem",
    borderRadius: 12,
    textAlign: "center",
    backgroundColor: "#ffffff",
    boxShadow: "0 10px 30px rgba(11, 17, 52, 0.08)",
    border: "1px solid rgba(43, 45, 45, 0.06)",
  },
  emptyTitle: {
    fontFamily: "var(--font-headings)",
    fontSize: "1.25rem",
    fontWeight: 600,
    marginBottom: "0.6rem",
    color: "var(--primary-text-color)",
  },
  emptyText: {
    fontSize: "0.9rem",
    lineHeight: 1.7,
    color: "#6b6f6f",
    margin: 0,
  },
};

const Blogs = () => {
  const { allBlogs, loadingBlogs } = useBlog();

  if (loadingBlogs) return <Spinner />;

  return (
    <div style={styles.page}>
      {/* BANNER */}
      <div style={styles.banner}>
        <div style={styles.bannerContent}>
          <span style={styles.eyebrow}>1502 Journal</span>
          <h1 style={styles.title}>Insights & Stories</h1>
          <p style={styles.subtitle}>
            Stay updated with our latest news, tips, and trends in real estate
            and design.
          </p>
        </div>
      </div>

      {/* GRID */}
      <section style={styles.container}>
        {allBlogs.length > 0 ? (
          <div style={styles.blogGrid}>
            {allBlogs.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div style={styles.empty}>
            <h2 style={styles.emptyTitle}>Nothing here yet</h2>
            <p style={styles.emptyText}>
              We're working on new stories and insights. Check back soon.
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Blogs;

// import useBlog from "../context/useBlog";
// import BlogCard from "../ui/BlogCard";
// import { Spinner } from "../Utilities/Spinner";

// const Blogs = () => {
//   const { allBlogs, loadingBlogs } = useBlog();

//   if (loadingBlogs) return <Spinner />;

//   return (
//     <section className="blogs-section">
//       <div className="container">
//         <div className="blogs-header">
//           <h1>Insights & Stories</h1>
//           <p>
//             Stay updated with our latest news, tips, and trends in real estate
//             and design.
//           </p>
//         </div>

//         <div className="blog-grid">
//           {allBlogs.map((post) => (
//             <BlogCard key={post.id} post={post} />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Blogs;
