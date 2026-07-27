import { ReactNode, useEffect, useState, type CSSProperties } from "react";
import useProperty from "../../context/useProperty";
import useIsDesktop from "../../Hooks/Useisdesktop";
import { useLocation } from "react-router-dom";

interface NavProps {
  children: ReactNode;
}

function PageNav({ children }: NavProps) {
  const [scrolled, setScrolled] = useState(false);
  const { menu } = useProperty();
  const isDesktop = useIsDesktop(992);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const overlayPages = [
    "/",
    "/about",
    "/contact",
    "/ourservices",
    "/careers",
    "/blogs",
    "/ukproperties",
  ];

  const isOverlayNav =
    overlayPages.includes(location.pathname) ||
    location.pathname.startsWith("/service/");

  // Original logic keeps its (slightly counter-intuitive) meaning:
  // isHeader === false is what puts the nav in "transparent overlay" mode
  // — used on pages with a hero image sitting behind the nav.
  // const isOverlayNav = !isHeader;
  const isTransparent = isOverlayNav && !scrolled && (isDesktop || !menu);

  const navStyle: CSSProperties = {
    position: isOverlayNav ? "fixed" : "sticky",
    top: 0,
    left: 0,
    width: "100%",
    zIndex: 100,
    display: isDesktop ? "flex" : "block",
    justifyContent: isDesktop ? "space-between" : undefined,
    alignItems: isDesktop ? "center" : undefined,
    padding: isDesktop ? "0.75rem 3rem" : "0.75rem 1.25rem",
    backgroundColor: isTransparent
      ? "transparent"
      : "var(--dark-background-color)",
    boxShadow: scrolled ? "0 8px 20px rgba(0, 0, 0, 0.25)" : "none",
    backdropFilter: scrolled ? "blur(10px)" : "none",
    transition:
      "background-color 0.4s ease, box-shadow 0.4s ease, backdrop-filter 0.4s ease",
  };

  return (
    <>
      <nav style={navStyle} aria-label="Navigation List">
        {children}
      </nav>
    </>
  );
}

export default PageNav;

// import { ReactNode, useEffect, useState } from "react";
// import useProperty from "../../context/useProperty";

// interface NavProps {
//   children: ReactNode;
// }

// function PageNav({ children }: NavProps) {
//   const [scrolled, setScrolled] = useState(false);

//   const { isHeader } = useProperty();

//   useEffect(() => {
//     const handleScroll = () => {
//       // Change background when user scrolls more than 50px
//       setScrolled(window.scrollY > 100);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <nav
//       className={`nav ${scrolled ? "scrolled" : ""}  ${isHeader ? "" : "is-header"}`}
//       aria-label="Navigation List"
//     >
//       {children}
//     </nav>
//   );
// }

// export default PageNav;
