import { useNavigate } from "react-router-dom";
import SearchNotFound from "../Utilities/SearchNotFound";

import React, { useEffect, useState, type CSSProperties } from "react";
import useProperty from "../context/useProperty";
import CustomDropdown from "../Utilities/CustomDropdwon";
import { Spinner } from "../Utilities/Spinner";
import NewPropertyCard from "../ui/NewPropertyCard";
import { FaSearch } from "react-icons/fa";

// ---------------------------------------------------------------------
// Banner styles — same tokens/pattern as the Contact page banner
// ---------------------------------------------------------------------
const styles: Record<string, CSSProperties> = {
  banner: {
    position: "relative",
    minHeight: "clamp(14rem, 26vw, 18rem)",
    display: "flex",
    alignItems: "center",
    backgroundImage:
      "linear-gradient(180deg, rgba(15,17,20,0.35) 0%, rgba(15,17,20,0.78) 100%), url('/hero-image.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  bannerContent: {
    width: "100%",
    maxWidth: 1100,
    margin: "0 auto",
    padding:
      "clamp(2rem, 6vw, 3.5rem) clamp(1.5rem, 6vw, 3rem) clamp(3.5rem, 8vw, 5rem)",
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
    fontSize: "clamp(1.6rem, 4vw, 2.5rem)",
    fontWeight: 600,
    color: "var(--light-color)",
    margin: "0 0 0.6rem",
  },
  subtitle: {
    fontSize: "0.9rem",
    color: "#c7ccd6",
    margin: 0,
  },

  // Floating search card, overlaps banner bottom
  searchCard: {
    maxWidth: 1100,
    margin: "-2.75rem auto 2.5rem",
    padding: "0 clamp(1.5rem, 6vw, 3rem)",
  },
  searchCardInner: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    backgroundColor: "#ffffff",
    borderRadius: 100,
    padding: "0.5rem 0.5rem 0.5rem 1.5rem",
    boxShadow: "0 12px 34px rgba(11, 17, 52, 0.16)",
  },
  searchIcon: {
    color: "var(--secondary-text-color)",
    flexShrink: 0,
    fontSize: "0.9rem",
  },
  searchInput: {
    flex: 1,
    border: "none",
    outline: "none",
    fontFamily: "inherit",
    fontSize: "0.9rem",
    color: "var(--primary-text-color)",
    backgroundColor: "transparent",
  },
};

function ServicePage() {
  const {
    query,
    dispatch,
    propertyType,
    propertyData,
    searchedLocations,
    // activeCrumb,
    setPropertyType,
    selectedType,
    setSelectedType,
    loadingProperties,
  } = useProperty();

  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  useEffect(() => {
    const updateItemsPerPage = () => {
      setItemsPerPage(window.innerWidth < 768 ? 10 : 20);
    };
    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  const uniqueTypes = [
    ...new Set(
      searchedLocations.map((prop) => (prop.subtype ? prop.subtype : "")),
    ),
  ];

  useEffect(() => {
    if (uniqueTypes.length <= 1) {
      setSelectedType("");
    }
  }, [uniqueTypes]);

  useEffect(() => {
    if (selectedType) {
      navigate(`/service/${propertyType}/${selectedType ? selectedType : ""}`);
    }
  }, [selectedType]);

  function handleServicePage(details: string) {
    setPropertyType(details);
    navigate(`/service/${details}`);
    dispatch({ type: "activeProperty", payload: details });
    setSelectedType("");
  }

  function capitalizeTitle(title: string): string {
    return title?.replace(/\b\w/g, (char) => char?.toUpperCase());
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

  if (loadingProperties) {
    return <Spinner />;
  }

  const filteredData = searchedLocations.filter(
    (sum) => !selectedType || sum.subtype === selectedType,
  );

  // ✅ Pagination logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  // ✅ Generate page numbers with ellipsis
  const getPageNumbers = () => {
    const pages = [];
    const maxButtons = 4;

    if (totalPages <= maxButtons) {
      // Show all pages if total is 4 or less
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage <= 2) {
        // Near the beginning: 1, 2, 3, ...
        pages.push(2, 3);
        pages.push("...");
      } else if (currentPage >= totalPages - 1) {
        // Near the end: 1, ..., n-2, n-1, n
        pages.push("...");
        pages.push(totalPages - 2, totalPages - 1);
      } else {
        // In the middle: 1, ..., current, ...
        pages.push("...");
        pages.push(currentPage);
        pages.push("...");
      }

      // Always show last page
      if (!pages.includes(totalPages)) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const titleTypeLabel = capitalizeTitle(propertyType).split("-").join(" ");
  const titleSuffix =
    propertyType !== "buy" && propertyType !== "rent" ? "" : " Properties";

  return (
    <div className="service-page">
      {/* BANNER */}
      <div style={styles.banner}>
        <div style={styles.bannerContent}>
          <span style={styles.eyebrow}>Exclusive Portfolio</span>
          <h1 style={styles.title}>
            {titleTypeLabel}
            {titleSuffix}
          </h1>
          <p style={styles.subtitle}>
            {filteredData.length}{" "}
            {filteredData.length === 1 ? "property" : "properties"} available
            right now
          </p>
        </div>
      </div>

      {/* FLOATING SEARCH */}
      <div style={styles.searchCard}>
        <div style={styles.searchCardInner}>
          <span style={styles.searchIcon}>
            <FaSearch />
          </span>
          <input
            type="text"
            placeholder="Search properties by location and title"
            value={query}
            onChange={(e) =>
              dispatch({ type: "searchProperties", payload: e.target.value })
            }
            style={styles.searchInput}
          />
        </div>
      </div>

      <div className="bread-drop">
        <div className="property-type-breadcrumb">
          <ul>
            {normalizedPropertyDataCount?.map((type, index) => (
              <React.Fragment key={index}>
                {type && (
                  <li
                    style={{
                      fontWeight: "500",
                      color: propertyType === type ? "#2b2d2d" : "",
                      borderColor: propertyType === type ? "#2b2d2d" : "",
                    }}
                    onClick={() => handleServicePage(type)}
                  >
                    {capitalizeTitle(type)}
                  </li>
                )}
              </React.Fragment>
            ))}
          </ul>
        </div>

        {uniqueTypes.length > 1 && <CustomDropdown uniqueTypes={uniqueTypes} />}
      </div>

      {filteredData.length > 0 ? (
        <>
          <div className="content">
            {currentData.map((sum, index) => (
              <NewPropertyCard
                key={index}
                sum={sum}
                index={index}
                capitalizeTitle={capitalizeTitle}
                propertyType={propertyType}
                // date={false}
              />
            ))}
          </div>

          {filteredData.length > itemsPerPage && (
            <div className="pagination">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
              >
                Prev
              </button>

              {getPageNumbers().map((page, index) =>
                page === "..." ? (
                  <span
                    key={`ellipsis-${index}`}
                    className="pagination-ellipsis"
                  >
                    ...
                  </span>
                ) : (
                  <button
                    key={page}
                    className={currentPage === page ? "active" : ""}
                    onClick={() => setCurrentPage(page as number)}
                  >
                    {page}
                  </button>
                ),
              )}

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
              >
                Next
              </button>
            </div>
          )}
        </>
      ) : (
        <SearchNotFound />
      )}
    </div>
  );
}

export default ServicePage;

// import { useNavigate } from "react-router-dom";
// import SearchNotFound from "../Utilities/SearchNotFound";

// import React, { useEffect, useState } from "react";
// import useProperty from "../context/useProperty";
// import CustomDropdown from "../Utilities/CustomDropdwon";
// import { Spinner } from "../Utilities/Spinner";
// import NewPropertyCard from "../ui/NewPropertyCard";

// function ServicePage() {
//   const {
//     query,
//     dispatch,
//     propertyType,
//     propertyData,
//     searchedLocations,
//     // activeCrumb,
//     setPropertyType,
//     selectedType,
//     setSelectedType,
//     loadingProperties,
//   } = useProperty();

//   const navigate = useNavigate();

//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(20);

//   useEffect(() => {
//     const updateItemsPerPage = () => {
//       setItemsPerPage(window.innerWidth < 768 ? 10 : 20);
//     };
//     updateItemsPerPage();
//     window.addEventListener("resize", updateItemsPerPage);
//     return () => window.removeEventListener("resize", updateItemsPerPage);
//   }, []);

//   const uniqueTypes = [
//     ...new Set(
//       searchedLocations.map((prop) => (prop.subtype ? prop.subtype : "")),
//     ),
//   ];

//   useEffect(() => {
//     if (uniqueTypes.length <= 1) {
//       setSelectedType("");
//     }
//   }, [uniqueTypes]);

//   useEffect(() => {
//     if (selectedType) {
//       navigate(`/service/${propertyType}/${selectedType ? selectedType : ""}`);
//     }
//   }, [selectedType]);

//   function handleServicePage(details: string) {
//     setPropertyType(details);
//     navigate(`/service/${details}`);
//     dispatch({ type: "activeProperty", payload: details });
//     setSelectedType("");
//   }

//   function capitalizeTitle(title: string): string {
//     return title?.replace(/\b\w/g, (char) => char?.toUpperCase());
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

//   if (loadingProperties) {
//     return <Spinner />;
//   }

//   const filteredData = searchedLocations.filter(
//     (sum) => !selectedType || sum.subtype === selectedType,
//   );

//   // ✅ Pagination logic
//   const totalPages = Math.ceil(filteredData.length / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const currentData = filteredData.slice(startIndex, startIndex + itemsPerPage);

//   // ✅ Generate page numbers with ellipsis
//   const getPageNumbers = () => {
//     const pages = [];
//     const maxButtons = 4;

//     if (totalPages <= maxButtons) {
//       // Show all pages if total is 4 or less
//       for (let i = 1; i <= totalPages; i++) {
//         pages.push(i);
//       }
//     } else {
//       // Always show first page
//       pages.push(1);

//       if (currentPage <= 2) {
//         // Near the beginning: 1, 2, 3, ...
//         pages.push(2, 3);
//         pages.push("...");
//       } else if (currentPage >= totalPages - 1) {
//         // Near the end: 1, ..., n-2, n-1, n
//         pages.push("...");
//         pages.push(totalPages - 2, totalPages - 1);
//       } else {
//         // In the middle: 1, ..., current, ...
//         pages.push("...");
//         pages.push(currentPage);
//         pages.push("...");
//       }

//       // Always show last page
//       if (!pages.includes(totalPages)) {
//         pages.push(totalPages);
//       }
//     }

//     return pages;
//   };

//   return (
//     <div className="service-page">
//       <div className="input">
//         <h1>
//           Exclusive Portfolio (
//           {capitalizeTitle(propertyType).split("-").join(" ")}
//           {propertyType !== "buy" && propertyType !== "rent"
//             ? ""
//             : "Properties"}
//           )
//         </h1>

//         <input
//           type="text"
//           placeholder="search properties by location and title"
//           value={query}
//           onChange={(e) =>
//             dispatch({ type: "searchProperties", payload: e.target.value })
//           }
//         />
//       </div>
//       <div className="bread-drop">
//         <div className="property-type-breadcrumb">
//           <ul>
//             {normalizedPropertyDataCount?.map((type, index) => (
//               <React.Fragment key={index}>
//                 {type && (
//                   <li
//                     style={{
//                       fontWeight: "500",
//                       color: propertyType === type ? "#2b2d2d" : "",
//                       borderColor: propertyType === type ? "#2b2d2d" : "",
//                     }}
//                     onClick={() => handleServicePage(type)}
//                   >
//                     {capitalizeTitle(type)}
//                   </li>
//                 )}
//               </React.Fragment>
//             ))}
//           </ul>
//         </div>
//         <input
//           type="text"
//           placeholder="search properties by location and title"
//           value={query}
//           onChange={(e) =>
//             dispatch({ type: "searchProperties", payload: e.target.value })
//           }
//         />

//         {uniqueTypes.length > 1 && <CustomDropdown uniqueTypes={uniqueTypes} />}
//       </div>

//       {filteredData.length > 0 ? (
//         <>
//           <div className="content">
//             {currentData.map((sum, index) => (
//               <NewPropertyCard
//                 key={index}
//                 sum={sum}
//                 index={index}
//                 capitalizeTitle={capitalizeTitle}
//                 propertyType={propertyType}
//                 // date={false}
//               />
//             ))}
//           </div>

//           {filteredData.length > itemsPerPage && (
//             <div className="pagination">
//               <button
//                 disabled={currentPage === 1}
//                 onClick={() => setCurrentPage((p) => p - 1)}
//               >
//                 Prev
//               </button>

//               {getPageNumbers().map((page, index) =>
//                 page === "..." ? (
//                   <span
//                     key={`ellipsis-${index}`}
//                     className="pagination-ellipsis"
//                   >
//                     ...
//                   </span>
//                 ) : (
//                   <button
//                     key={page}
//                     className={currentPage === page ? "active" : ""}
//                     onClick={() => setCurrentPage(page as number)}
//                   >
//                     {page}
//                   </button>
//                 ),
//               )}

//               <button
//                 disabled={currentPage === totalPages}
//                 onClick={() => setCurrentPage((p) => p + 1)}
//               >
//                 Next
//               </button>
//             </div>
//           )}
//         </>
//       ) : (
//         <SearchNotFound />
//       )}
//     </div>
//   );
// }

// export default ServicePage;
