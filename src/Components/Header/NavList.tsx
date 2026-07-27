import { NavLink, useNavigate } from "react-router-dom";
import { useState, type CSSProperties, type ReactNode } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import useAuth from "../../context/useAuth";
import useProperty from "../../context/useProperty";
// import Avatar from "../../ui/Avatar";
import useIsDesktop from "../../Hooks/Useisdesktop";

const saleSubTypes = [
  { label: "Land for Sale", code: "lfs" },
  { label: "Apartment for Sale", code: "afs" },
  { label: "House for Sale", code: "hfs" },
  { label: "Commercial property for Sale", code: "cfs" },
];

const rentSubTypes = [
  { label: "Land for Lease", code: "lfl" },
  { label: "Long Lease", code: "ls" },
  { label: "Apartment for Lease", code: "afl" },
  { label: "House for Lease", code: "hfl" },
  { label: "Commercial property for Lease", code: "cfl" },
];

// Mirrors the original CSS's per-item nth-child transition-delay stagger
// (0.1s, 0.2s, then 0.3s for everything after) — since inline styles can't
// use :nth-child, each <li> below is given its position in this order
// explicitly.
const staggerDelays = [
  "0.1s",
  "0.2s",
  "0.3s",
  "0.3s",
  "0.3s",
  "0.3s",
  "0.3s",
  "0.3s",
];

// ---------------------------------------------------------------------
// Small reusable nav link with hover + active-state styling. NavLink's
// `style` prop accepts a function of { isActive }, so active state comes
// from the router; hover comes from local state since plain inline
// styles can't express :hover.
// ---------------------------------------------------------------------
interface NavItemLinkProps {
  to: string;
  onClick?: () => void;
  children: ReactNode;
  isDesktop: boolean;
}

const NavItemLink = ({
  to,
  onClick,
  children,
  isDesktop,
}: NavItemLinkProps) => {
  const [hovered, setHovered] = useState(false);

  return (
    <NavLink
      to={to}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={({ isActive }) => ({
        display: "inline-block",
        padding: isDesktop ? "0.5rem 0.2rem" : "0.4rem 0.7rem",
        fontSize: isDesktop ? "0.9rem" : "0.85rem",
        fontWeight: 500,
        color:
          isActive || hovered
            ? "var(--secondary-text-color)"
            : "var(--light-color)",
        textDecoration: "none",
        borderBottom: isActive
          ? "1px solid var(--secondary-text-color)"
          : "1px solid transparent",
        transition: "color 0.25s ease, border-color 0.25s ease",
      })}
    >
      {children}
    </NavLink>
  );
};

function NavList() {
  const {
    menu,
    setPropertyType,
    dispatch,
    setIsPageHeaderShown,
    propertyType,
    setSelectedType,
    propertyData,
  } = useProperty();

  const { isAuthenticated } = useAuth();
  const isDesktop = useIsDesktop(992);
  const isWideDesktop = useIsDesktop(1024);

  const [showSaleProp, setShowSaleProp] = useState(false);
  const [showRentProp, setShowRentProp] = useState(false);
  const [showPropertyMenu, setShowPropertyMenu] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState({
    title: "Request Properties",
    link: "ukproperties",
  });
  const [isActive, setIsActive] = useState(false);

  const toggleDropdown = () => {
    setIsActive((prev) => !prev);
  };

  const handleSelect = (title: string, link: string) => {
    setSelectedLabel({ title, link });
    closePageHeader();
  };

  const navigate = useNavigate();

  function closeMenu() {
    if (!isDesktop) {
      dispatch({ type: "mobileView", payload: false });
    }
  }

  function openPageHeader() {
    closeMenu();
    setIsPageHeaderShown(true);
    dispatch({ type: "activeProperty", payload: propertyType });
  }

  function closePageHeader() {
    closeMenu();
    setIsPageHeaderShown(false);
    setSelectedType("");
    setIsActive(false);
  }

  function handleServicePage(details: string) {
    setPropertyType(details);
    navigate(`service/${details}`);
    dispatch({ type: "activeProperty", payload: details });
  }

  const propertyDataTypes = [...new Set(propertyData.map((item) => item.type))];

  const expectedTypes = [
    "sale",
    "rent",
    "joint-ventures",
    "shortlet",
    "off-plan",
  ];

  const normalizedPropertyDataCount = expectedTypes.map((expectedType) => {
    const found = propertyDataTypes.find((item) => item === expectedType);
    return found || expectedType;
  });

  function capitalizeTitle(title: string): string {
    return title?.replace(/\b\w/g, (char) => char?.toUpperCase());
  }

  // Gives each visible mobile <li> its staggered reveal delay in order,
  // matching the original :nth-child(1), :nth-child(2)... pattern.
  let mobileDelayIndex = -1;
  const nextMobileDelay = () => {
    mobileDelayIndex += 1;
    return staggerDelays[Math.min(mobileDelayIndex, staggerDelays.length - 1)];
  };

  const listItemStyle = (): CSSProperties => {
    if (isDesktop) return {};
    const delay = nextMobileDelay();
    return {
      transform: menu ? "scaleY(1)" : "scaleY(0)",
      transformOrigin: "top",
      transition: "transform 0.3s ease-in-out",
      transitionDelay: menu ? delay : "0s",
    };
  };

  const styles: Record<string, CSSProperties> = {
    // Mobile: horizontal wrapped chip row that expands open/closed, same
    // shape as the original .nav-list / .nav-list-collapse toggle.
    // Desktop: simple horizontal row, always visible.
    list: isDesktop
      ? {
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: "1.75rem",
          listStyle: "none",
          margin: 0,
          padding: 0,
        }
      : {
          display: "flex",
          flexWrap: "wrap",
          columnGap: "0.75rem",
          rowGap: "0.5rem",
          justifyContent: "center",
          listStyle: "none",
          margin: 0,
          padding: menu ? "1rem 0.5rem" : 0,
          maxHeight: menu ? "500px" : 0,
          overflow: "hidden",
          transition: "max-height 0.5s ease, padding 0.4s ease",
        },
    hiddenSpacer: { visibility: "hidden" },

    // View Properties dropdown
    viewPropWrapper: { position: "relative" },
    propertyPanelWrapper: {
      position: "absolute",
      top: "calc(100% + 0rem)",
    },
    propertyPanel: {
      marginTop: "0.75rem",
      left: 0,
      minWidth: 240,
      backgroundColor: "var(--light-color)",
      borderRadius: 10,
      boxShadow: "0 12px 28px rgba(11, 17, 52, 0.2)",
      padding: "0.5rem",
      zIndex: 999,
    },
    subPanel: {
      display: "flex",
      flexDirection: "column",
      paddingLeft: "0.5rem",
      marginBottom: "0.3rem",
    },

    // Request Properties dropdown
    requestPropWrapper: { position: "relative" },
    requestPill: {
      display: "inline-block",
      borderRadius: 45,
      backgroundColor: "rgba(33, 53, 71, 0.5)",
      color: "var(--secondary-text-color)",
      fontWeight: 500,
      fontSize: isDesktop ? "0.875rem" : "0.85rem",
      padding: isDesktop ? "0.5rem 1.1rem" : "0.4rem 0.9rem",
      textDecoration: "none",
      cursor: "pointer",
    },
    requestPanelWrapper: {
      position: "absolute",
      top: "calc(100% + 0rem)",
    },
    requestPanel: {
      marginTop: "0.75rem",
      left: isDesktop ? "auto" : 0,
      right: isDesktop ? 0 : "auto",
      minWidth: 200,
      backgroundColor: "var(--light-color)",
      borderRadius: 10,
      boxShadow: "0 12px 28px rgba(11, 17, 52, 0.2)",
      padding: "0.5rem",
      zIndex: 999,
    },
  };

  return (
    <ul style={styles.list}>
      {isAuthenticated && isWideDesktop && (
        <li style={styles.hiddenSpacer}>Logout</li>
      )}

      <li style={listItemStyle()}>
        <NavItemLink to="/" onClick={closePageHeader} isDesktop={isDesktop}>
          Home
        </NavItemLink>
      </li>

      {/* VIEW PROPERTIES */}
      <li
        style={{ ...styles.viewPropWrapper, ...listItemStyle() }}
        onPointerEnter={() => isDesktop && setShowPropertyMenu(true)}
        onPointerLeave={() => {
          setShowSaleProp(false);
          setShowRentProp(false);
          setShowPropertyMenu(false);
        }}
      >
        <NavItemLink
          to={`service/${propertyType}`}
          onClick={openPageHeader}
          isDesktop={isDesktop}
        >
          View Properties
        </NavItemLink>

        {isDesktop && showPropertyMenu && (
          <div style={styles.propertyPanelWrapper}>
            <div style={styles.propertyPanel}>
              {normalizedPropertyDataCount.map((type, index) => (
                <div key={index}>
                  <PanelRow
                    onClick={() => {
                      if (index === 0) {
                        setShowSaleProp((prev) => !prev);
                        setShowRentProp(false);
                      } else if (index === 1) {
                        setShowRentProp((prev) => !prev);
                        setShowSaleProp(false);
                      } else {
                        handleServicePage(type || "");
                        setSelectedType("");
                        setShowSaleProp(false);
                        setShowRentProp(false);
                      }
                    }}
                  >
                    {type && capitalizeTitle(type)}
                    {index === 0 &&
                      (showSaleProp ? <FaAngleUp /> : <FaAngleDown />)}
                    {index === 1 &&
                      (showRentProp ? <FaAngleUp /> : <FaAngleDown />)}
                  </PanelRow>

                  {index === 0 && showSaleProp && (
                    <div style={styles.subPanel}>
                      {saleSubTypes.map((item) => (
                        <SubPanelRow
                          key={item.code}
                          onClick={() => {
                            handleServicePage("sale");
                            setSelectedType(item.code);
                          }}
                        >
                          {item.label}
                        </SubPanelRow>
                      ))}
                    </div>
                  )}

                  {index === 1 && showRentProp && (
                    <div style={styles.subPanel}>
                      {rentSubTypes.map((item) => (
                        <SubPanelRow
                          key={item.code}
                          onClick={() => {
                            handleServicePage("rent");
                            setSelectedType(item.code);
                          }}
                        >
                          {item.label}
                        </SubPanelRow>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </li>

      <li style={listItemStyle()}>
        <NavItemLink
          to="ourservices"
          onClick={closePageHeader}
          isDesktop={isDesktop}
        >
          About us
        </NavItemLink>
      </li>

      <li style={listItemStyle()}>
        <NavItemLink
          to="careers"
          onClick={closePageHeader}
          isDesktop={isDesktop}
        >
          Careers
        </NavItemLink>
      </li>

      <li style={listItemStyle()}>
        <NavItemLink to="blogs" onClick={closeMenu} isDesktop={isDesktop}>
          Blog
        </NavItemLink>
      </li>

      {/* REQUEST PROPERTIES */}
      <li
        style={{ ...styles.requestPropWrapper, ...listItemStyle() }}
        onPointerEnter={() => isDesktop && setIsActive(true)}
        onPointerLeave={() => isDesktop && setIsActive(false)}
      >
        {isDesktop ? (
          <NavLink
            to={selectedLabel.link}
            onClick={closePageHeader}
            style={styles.requestPill}
          >
            {selectedLabel.title}
          </NavLink>
        ) : (
          <span onClick={toggleDropdown} style={styles.requestPill}>
            {selectedLabel.title}
          </span>
        )}

        {isActive && (
          <div style={styles.requestPanelWrapper}>
            <div style={styles.requestPanel}>
              <RequestPanelLink
                to="ukproperties"
                onClick={() =>
                  handleSelect("Request Properties", "ukproperties")
                }
              >
                Request Properties
              </RequestPanelLink>
              <RequestPanelLink
                to="view-property-request"
                onClick={() =>
                  handleSelect("View Request", "view-property-request")
                }
              >
                View Request
              </RequestPanelLink>
            </div>
          </div>
        )}
      </li>

      {/* {!isAuthenticated && (
        <li style={listItemStyle()}>
          <NavItemLink to="contact" onClick={closeMenu} isDesktop={isDesktop}>
            Contact us
          </NavItemLink>
        </li>
      )} */}

      {/* Original CSS only shows the avatar inside the list on desktop —
          on mobile it's already shown next to the hamburger in Logo.tsx,
          so rendering it here too would duplicate it. */}
      {/* {isAuthenticated && isDesktop && (
        <li>
          <Avatar />
        </li>
      )} */}
    </ul>
  );
}

// ---------------------------------------------------------------------
// Small local helpers for hover-styled dropdown rows/links
// ---------------------------------------------------------------------
const panelRowBase: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0.6rem 0.75rem",
  borderRadius: 6,
  fontSize: "0.85rem",
  fontWeight: 500,
  color: "var(--primary-text-color)",
  cursor: "pointer",
  transition: "background-color 0.2s ease",
};

const PanelRow = ({
  onClick,
  children,
}: {
  onClick: () => void;
  children: ReactNode;
}) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      style={{
        ...panelRowBase,
        backgroundColor: hovered ? "rgba(167, 156, 73, 0.1)" : "transparent",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

const subPanelRowBase: CSSProperties = {
  padding: "0.5rem 0.75rem",
  fontSize: "0.8rem",
  color: "#5c6066",
  cursor: "pointer",
  borderRadius: 6,
  transition: "background-color 0.2s ease, color 0.2s ease",
};

const SubPanelRow = ({
  onClick,
  children,
}: {
  onClick: () => void;
  children: ReactNode;
}) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      style={{
        ...subPanelRowBase,
        backgroundColor: hovered ? "rgba(167, 156, 73, 0.1)" : "transparent",
        color: hovered ? "var(--secondary-text-color)" : "#5c6066",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

const RequestPanelLink = ({
  to,
  onClick,
  children,
}: {
  to: string;
  onClick: () => void;
  children: ReactNode;
}) => {
  const [hovered, setHovered] = useState(false);
  return (
    <NavLink
      to={to}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "block",
        padding: "0.6rem 0.75rem",
        borderRadius: 6,
        fontSize: "0.85rem",
        fontWeight: 500,
        color: hovered
          ? "var(--secondary-text-color)"
          : "var(--primary-text-color)",
        textDecoration: "none",
        backgroundColor: hovered ? "rgba(167, 156, 73, 0.1)" : "transparent",
        transition: "background-color 0.2s ease, color 0.2s ease",
      }}
    >
      {children}
    </NavLink>
  );
};

export default NavList;

// import { NavLink, useNavigate } from "react-router-dom";

// import { useState } from "react";
// import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
// import useAuth from "../../context/useAuth";
// import useProperty from "../../context/useProperty";
// import Avatar from "../../ui/Avatar";

// function NavList() {
//   const {
//     menu,
//     setPropertyType,
//     dispatch,
//     setIsPageHeaderShown,
//     propertyType,
//     setSelectedType,
//     propertyData,
//   } = useProperty();

//   const { isAuthenticated } = useAuth();

//   const [showSaleProp, setShowSaleProp] = useState(false);
//   const [showRentProp, setShowRentProp] = useState(false);
//   const [selectedLabel, setSelectedLabel] = useState({
//     title: "Request Properties",
//     link: "ukproperties",
//   });
//   const [isActive, setIsActive] = useState(false);

//   const toggleDropdown = () => {
//     setIsActive((prev) => !prev);
//   };

//   const handleSelect = (title: string, link: string) => {
//     setSelectedLabel({ title: title, link: link });
//     closePageHeader(); // Optional if needed
//   };

//   const navigate = useNavigate();

//   function closeMenu() {
//     if (window.innerWidth < 992) {
//       dispatch({ type: "mobileView", payload: false });
//     }
//   }

//   function openPageHeader() {
//     closeMenu();
//     setIsPageHeaderShown(true);
//     dispatch({ type: "activeProperty", payload: propertyType });
//   }

//   function closePageHeader() {
//     closeMenu();
//     setIsPageHeaderShown(false);
//     setSelectedType("");
//     setIsActive(false);
//   }

//   function handleServicePage(details: string) {
//     setPropertyType(details);
//     navigate(`service/${details}`);
//     dispatch({ type: "activeProperty", payload: details });
//   }

//   const propertyDataTypes = [...new Set(propertyData.map((item) => item.type))];

//   const expectedTypes = [
//     "sale",
//     "rent",
//     "joint-ventures",
//     "shortlet",
//     "off-plan",
//   ];

//   const normalizedPropertyDataCount = expectedTypes.map((expectedType) => {
//     const found = propertyDataTypes.find((item) => item === expectedType);
//     return found || expectedType;
//   });

//   function capitalizeTitle(title: string): string {
//     return title?.replace(/\b\w/g, (char) => char?.toUpperCase());
//   }

//   return (
//     <ul className={menu ? "nav-list" : "nav-list-collapse"}>
//       {isAuthenticated && window.innerWidth >= 1024 && (
//         <li style={{ visibility: "hidden" }}>Logout</li>
//       )}
//       <li>
//         <NavLink to="/" onClick={closePageHeader}>
//           Home
//         </NavLink>
//       </li>
//       <li
//         className="view-prop"
//         onPointerLeave={() => {
//           setShowSaleProp(false);
//           setShowRentProp(false);
//         }}
//       >
//         <NavLink to={`service/${propertyType}`} onClick={openPageHeader}>
//           View Properties
//         </NavLink>

//         <div className="property-details">
//           {normalizedPropertyDataCount?.map((type, index) => (
//             <span
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "space-between",
//                 width: "100%",
//               }}
//               key={index}
//               onClick={() => {
//                 if (index === 0) {
//                   setShowSaleProp((prev) => !prev);
//                   setShowRentProp(false);
//                 }
//                 if (index === 1) {
//                   setShowRentProp((prev) => !prev);
//                   setShowSaleProp(false);
//                 }
//                 if (index !== 0 && index !== 1) {
//                   handleServicePage(type ? type : "");
//                   setSelectedType("");
//                   setShowRentProp(false);
//                   setShowRentProp(false);
//                 }
//               }}
//             >
//               {type && <>{capitalizeTitle(type)}</>}
//               <>
//                 {(index === 0 || index === 1) &&
//                   ((index === 0 &&
//                     (showSaleProp ? <FaAngleUp /> : <FaAngleDown />)) ||
//                     (index === 1 &&
//                       (showRentProp ? <FaAngleUp /> : <FaAngleDown />)))}
//               </>
//             </span>
//           ))}

//           {showSaleProp && (
//             <div className="sale-prop">
//               <span
//                 onClick={() => {
//                   handleServicePage("sale");
//                   setSelectedType("lfs");
//                 }}
//               >
//                 Land for Sale
//               </span>
//               <span
//                 onClick={() => {
//                   handleServicePage("sale");
//                   setSelectedType("afs");
//                 }}
//               >
//                 Apartment for Sale
//               </span>
//               <span
//                 onClick={() => {
//                   handleServicePage("sale");
//                   setSelectedType("hfs");
//                 }}
//               >
//                 House for Sale
//               </span>
//               <span
//                 onClick={() => {
//                   handleServicePage("sale");
//                   setSelectedType("cfs");
//                 }}
//               >
//                 Commercial property for Sale
//               </span>
//             </div>
//           )}
//           {showRentProp && (
//             <div className="sale-prop">
//               <span
//                 onClick={() => {
//                   handleServicePage("rent");
//                   setSelectedType("lfl");
//                 }}
//               >
//                 Land for Lease
//               </span>
//               <span
//                 onClick={() => {
//                   handleServicePage("rent");
//                   setSelectedType("ls");
//                 }}
//               >
//                 Long Lease
//               </span>
//               <span
//                 onClick={() => {
//                   handleServicePage("rent");
//                   setSelectedType("afl");
//                 }}
//               >
//                 Apartment for Lease
//               </span>
//               <span
//                 onClick={() => {
//                   handleServicePage("rent");
//                   setSelectedType("hfl");
//                 }}
//               >
//                 House for Lease
//               </span>
//               <span
//                 onClick={() => {
//                   handleServicePage("rent");
//                   setSelectedType("cfl");
//                 }}
//               >
//                 Commercial property for Lease
//               </span>
//             </div>
//           )}
//         </div>
//       </li>

//       <li className="nav-item dropdown">
//         <NavLink to="ourservices" onClick={closePageHeader}>
//           About us
//         </NavLink>
//       </li>
//       <li className="nav-item dropdown">
//         <NavLink to="careers" onClick={closePageHeader}>
//           Careers
//         </NavLink>
//       </li>
//       <li
//         className={`nav-item dropdown request-prop ${isActive ? "active" : ""}`}
//       >
//         <span onClick={toggleDropdown} className="mobile">
//           {selectedLabel.title}
//         </span>
//         <NavLink
//           to={selectedLabel.link}
//           onClick={closePageHeader}
//           className="desktop"
//         >
//           {selectedLabel.title}
//         </NavLink>
//         <div className="request-property-details">
//           <NavLink to="ukproperties" onClick={() => setIsActive(false)}>
//             {" "}
//             <span
//               onClick={() => handleSelect("Request Properties", "ukproperties")}
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "space-between",
//                 width: "100%",
//               }}
//             >
//               Request Properties
//             </span>
//           </NavLink>
//           <NavLink
//             to="view-property-request"
//             onClick={() => setIsActive(false)}
//           >
//             {" "}
//             <span
//               onClick={() =>
//                 handleSelect("View Request", "view-property-request")
//               }
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "space-between",
//                 width: "100%",
//               }}
//             >
//               View Request
//             </span>
//           </NavLink>
//         </div>
//       </li>
//       <li>
//         <NavLink to="blogs" onClick={closeMenu}>
//           Blog
//         </NavLink>
//       </li>

//       {!isAuthenticated && (
//         <li>
//           <NavLink to="contact" onClick={closeMenu}>
//             Contact us
//           </NavLink>
//         </li>
//       )}

//       {/* {!isAuthenticated && (
//         <li>
//           <NavLink to="login" onClick={closeMenu}>
//             Log in
//           </NavLink>
//         </li>
//       )}
//       {!isAuthenticated && (
//         <li>
//           <NavLink to="signup" onClick={closeMenu}>
//             Sign up
//           </NavLink>
//         </li>
//       )} */}
//       {isAuthenticated && (
//         <li className="avatar">
//           <Avatar />
//         </li>
//       )}
//     </ul>
//   );
// }

// export default NavList;
