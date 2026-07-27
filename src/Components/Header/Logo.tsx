import { Link } from "react-router-dom";
import { type CSSProperties } from "react";

import useAuth from "../../context/useAuth";
import useProperty from "../../context/useProperty";
import Avatar from "../../ui/Avatar";
import useIsDesktop from "../../Hooks/Useisdesktop";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";

function Logo() {
  const {
    menu,
    dispatch,
    propertyType,
    isPageHeaderShown,
    setIsPageHeaderShown,
  } = useProperty();

  const { isAuthenticated } = useAuth();
  const isDesktop = useIsDesktop(992);

  function toggleMenu() {
    dispatch({ type: "toggleMobileView" });
  }

  function capitalizeTitle(title: string): string {
    return title.replace(/\b\w/g, (char) => char.toUpperCase());
  }

  const styles: Record<string, CSSProperties> = {
    wrapper: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      width: isDesktop ? "auto" : "100%",
      gap: "1rem",
    },
    logoLink: {
      display: "inline-flex",
      alignItems: "center",
    },
    logoImg: {
      width: isDesktop ? "7rem" : "5.25rem",
      // Matches the original invert filter so the logo reads white on the dark nav
      filter:
        "invert(100%) sepia(0%) saturate(2%) hue-rotate(331deg) brightness(108%) contrast(101%)",
    },
    right: {
      display: "flex",
      alignItems: "center",
      gap: "0.75rem",
    },
    hamburger: {
      display: isDesktop ? "none" : "flex",
      alignItems: "center",
      justifyContent: "center",
      width: 34,
      height: 34,
      background: "none",
      border: "none",
      padding: 0,
      color: "var(--light-color)",
      fontSize: "1.4rem",
      cursor: "pointer",
    },
    mobileTitle: {
      fontFamily: "var(--font-headings)",
      fontSize: "1rem",
      fontWeight: 500,
      color: "var(--light-color)",
      margin: 0,
    },
  };

  return (
    <div style={styles.wrapper}>
      <Link
        to="/"
        onClick={() => setIsPageHeaderShown(false)}
        style={styles.logoLink}
      >
        <img
          src="/website_logo.svg"
          alt="company's logo"
          title="1502 Property Logo"
          loading="lazy"
          style={styles.logoImg}
        />
      </Link>

      <div style={styles.right}>
        {isAuthenticated && <Avatar />}

        <button
          type="button"
          style={styles.hamburger}
          aria-label={menu ? "close menu" : "open menu"}
          onClick={toggleMenu}
        >
          {menu ? <IoMdClose /> : <RxHamburgerMenu />}
        </button>

        {isPageHeaderShown && !isDesktop && (
          <h1 style={styles.mobileTitle}>
            {capitalizeTitle(propertyType).split("-").join(" ")}
          </h1>
        )}
      </div>
    </div>
  );
}

export default Logo;

// import { Link } from "react-router-dom";

// import useAuth from "../../context/useAuth";
// import useProperty from "../../context/useProperty";
// import Avatar from "../../ui/Avatar";

// function Logo() {
//   const {
//     menu,
//     dispatch,
//     propertyType,
//     isPageHeaderShown,
//     setIsPageHeaderShown,
//   } = useProperty();

//   const { isAuthenticated } = useAuth();

//   function toggleMenu() {
//     dispatch({ type: "toggleMobileView" });
//   }

//   function capitalizeTitle(title: string): string {
//     return title.replace(/\b\w/g, (char) => char.toUpperCase());
//   }

//   return (
//     <div className="logo">
//       <Link to="/" onClick={() => setIsPageHeaderShown(false)}>
//         <img
//           src="/website_logo.svg"
//           alt="company's logo"
//           title="1502 Property Logo"
//           loading="lazy"
//           // width="112"
//           // height="45.28"
//         />
//       </Link>
//       <div className="propertyType">
//         {isAuthenticated && (
//           <span className="avatar">
//             <Avatar />
//           </span>
//         )}
//         <div className="mt" tabIndex={0}>
//           <div
//             className={menu ? "menu-collapse" : "menu"}
//             aria-label="toggle menu icon"
//             onClick={toggleMenu}
//           >
//             <span></span>
//             <span></span>
//             <span></span>
//           </div>
//         </div>

//         {isPageHeaderShown && window.innerWidth < 992 && (
//           <h1>
//             {capitalizeTitle(propertyType).split("-").join(" ")}{" "}
//             {/* {propertyType !== "buy" && propertyType !== "rent"
//               ? ""
//               : "Properties"} */}
//           </h1>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Logo;
