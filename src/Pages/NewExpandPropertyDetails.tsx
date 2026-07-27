import { useEffect, useState } from "react";
import { BsStars } from "react-icons/bs";
import { FaCircleUser, FaLocationDot, FaRegCircleUser } from "react-icons/fa6";
import { IoCall, IoCheckmarkDone } from "react-icons/io5";
import { Link, useNavigate, useParams } from "react-router-dom";

import { Helmet } from "react-helmet-async";

import slugify from "slugify";
import useProperty from "../context/useProperty";
import { propertySummaryProps } from "../Data/propertyData";
import { useBrowserStorageState } from "../Hooks/useBrowserStorageState";
import { useWindowWidth } from "../Hooks/useWindowSize";

function NewExpandPropertyDetails() {
  const [curIndex, setCurIndex] = useState<number>(0);
  const [summaryDetails, setSummaryDetails] =
    useBrowserStorageState<propertySummaryProps | null>(null, "summaryDetails");

  const { propertyType, propertyData } = useProperty();

  const { title } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    if (!propertyData || propertyData.length === 0) return;

    const match = propertyData.find((p) => slugify(p.title) === title);

    if (match) {
      setSummaryDetails(match);
    }
  }, [title, propertyData, setSummaryDetails]);

  //fallback
  useEffect(() => {
    if (!summaryDetails && (!propertyData || propertyData.length === 0)) {
      const saved = localStorage.getItem("summaryDetails");
      if (!saved) navigate("/");
    }
  }, [summaryDetails, propertyData, navigate]);

  function handlePrevious() {
    if (summaryDetails) {
      const isFirstSlide =
        curIndex === 0 ? summaryDetails.src.length - 1 : curIndex - 1;
      setCurIndex(isFirstSlide);
    }
  }

  function handleNext() {
    if (summaryDetails) {
      const isFirstSlide =
        curIndex === summaryDetails.src.length - 1 ? 0 : curIndex + 1;
      setCurIndex(isFirstSlide);
    }
  }

  function capitalizeTitle(title: string): string {
    return title.replace(/\b\w/g, (char, index) =>
      title[index - 1] === "'" ? char.toLowerCase() : char.toUpperCase(),
    );
  }

  useEffect(
    function () {
      if (summaryDetails) {
        document.title = capitalizeTitle(summaryDetails.title);
      }

      return function () {
        document.title = "1502 Properties";
      };
    },
    [summaryDetails],
  );

  const width = useWindowWidth();
  const isXlarge = width >= 1280;
  const isLarge = width >= 1024;
  const isXxlarge = width >= 1320;

  let maxHeight = "15.2rem";

  if (isXxlarge && summaryDetails?.location?.length) {
    if (summaryDetails.location.length > 51) maxHeight = "14rem";
    else if (summaryDetails.location.length > 56) maxHeight = "13rem";
  } else if (isXlarge && summaryDetails?.location?.length) {
    if (summaryDetails.location.length > 51) maxHeight = "13rem";
    else if (summaryDetails.location.length > 21) maxHeight = "14rem";
  } else if (isLarge && summaryDetails?.location?.length) {
    if (summaryDetails.location.length > 39) maxHeight = "9.9rem";
    else if (summaryDetails.location.length > 13) maxHeight = "11rem";
    else maxHeight = "12.1rem";
  }

  if (!summaryDetails) {
    return (
      <div
        style={{
          minHeight: "70vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "2rem",
          gap: "1rem",
        }}
      >
        <h2
          style={{
            fontFamily: "var(--font-headings)",
            fontSize: "1.4rem",
            fontWeight: 600,
            margin: 0,
          }}
        >
          No property selected
        </h2>
        <p style={{ color: "#6b6f6f", fontSize: "0.9rem", maxWidth: 340 }}>
          Click a property from the listings page to see its full details here.
        </p>
        <Link
          to="/service/sale"
          style={{
            display: "inline-block",
            marginTop: "0.5rem",
            padding: "0.75rem 1.75rem",
            fontSize: "0.85rem",
            fontWeight: 600,
            color: "#fff",
            backgroundColor: "var(--dark-background-color)",
            borderRadius: 100,
            textDecoration: "none",
          }}
        >
          Browse Properties
        </Link>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <meta name="description" content={summaryDetails.title} />
        <meta property="og:description" content={summaryDetails.title} />
        <meta
          property="og:url"
          content="https://1502properties.com/expandPropertyDetails"
        />
        <meta property="og:image" content={summaryDetails.src[0]} />

        <meta
          name="twitter:site"
          content="https://1502properties.com/expandPropertyDetails"
        />
        <meta name="twitter:description" content={summaryDetails.title} />
        <meta name="twitter:image" content={summaryDetails.src[0]} />
      </Helmet>

      <div className="expand-property-details">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <span>&larr;</span> Back
        </button>
        <h1>{capitalizeTitle(summaryDetails.title)}</h1>
        <div className="container">
          <div className="grid-cont1">
            <div className="img-exp-cont">
              <div className="first">
                <div className="first-childd">
                  <h2>Investment Summary</h2>
                  <p className="price">
                    {summaryDetails.price.startsWith("₦") ||
                    summaryDetails.price.startsWith("Contact")
                      ? ""
                      : "₦ "}
                    {summaryDetails.price}{" "}
                    <span style={{ fontWeight: 400, fontSize: "0.875rem" }}>
                      {summaryDetails.type === "shortlet" ? "Per Night" : ""}
                    </span>
                  </p>
                  <p className="last">Location: {summaryDetails.location}</p>
                  <span className="last">
                    <span>
                      {summaryDetails.size
                        ? "Size"
                        : summaryDetails.room
                          ? "Bedroom"
                          : ""}
                    </span>
                    : {summaryDetails.size || summaryDetails.room}
                    <abbr
                      className="sq"
                      title={
                        summaryDetails.measurement === "sqm"
                          ? "Square Meters"
                          : summaryDetails.measurement === "m"
                            ? "Meters"
                            : summaryDetails.measurement === "L"
                              ? "Liters"
                              : "Metric Tons"
                      }
                    >
                      {summaryDetails.measurement}
                    </abbr>
                  </span>{" "}
                </div>
                <div className="last-childd" style={{ maxHeight }}>
                  {summaryDetails.src[curIndex].match(/\.(mp4|webm|ogg)$/i) ? (
                    <video
                      key={summaryDetails.src[curIndex]}
                      autoPlay
                      muted
                      loop
                      playsInline
                      title={summaryDetails.title}
                      width="100%"
                      height="100%"
                      style={{ objectFit: "cover" }}
                    >
                      <source
                        src={summaryDetails.src[curIndex]}
                        type="video/mp4"
                      />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <img
                      src={summaryDetails.src[curIndex]}
                      alt={summaryDetails.title}
                      title={summaryDetails.title}
                      loading={
                        curIndex < summaryDetails.src.length ? "eager" : "lazy"
                      }
                      width="100%"
                      height="100%"
                    />
                  )}
                </div>
              </div>

              <div className="img-exp">
                {summaryDetails.src[curIndex].match(/\.(mp4|webm|ogg)$/i) ? (
                  <video
                    key={summaryDetails.src[curIndex]}
                    autoPlay
                    muted
                    loop
                    playsInline
                    title={summaryDetails.title}
                    width="100%"
                    height="100%"
                    style={{ objectFit: "cover" }}
                  >
                    <source
                      src={summaryDetails.src[curIndex]}
                      type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <img
                    src={summaryDetails.src[curIndex]}
                    alt={summaryDetails.title}
                    title={summaryDetails.title}
                    loading={
                      curIndex < summaryDetails.src.length ? "eager" : "lazy"
                    }
                    width="auto"
                    height="auto"
                  />
                )}
                {summaryDetails.src.length > 1 && (
                  <button onClick={handlePrevious}>&#x2039;</button>
                )}
                {summaryDetails.src.length > 1 && (
                  <button onClick={handleNext}>&#x203A;</button>
                )}
              </div>
            </div>
            <div className="img-det">
              <h2>
                {summaryDetails.price.startsWith("₦") ||
                summaryDetails.price.startsWith("Contact")
                  ? ""
                  : "₦ "}
                {summaryDetails.price}{" "}
                <span style={{ fontWeight: 400, fontSize: "0.875rem" }}>
                  {summaryDetails.type === "shortlet" ? "Per Night" : ""}
                </span>
              </h2>
              <div className="bath">
                <div className="bt">
                  <span>
                    {summaryDetails.size
                      ? "SIZE"
                      : summaryDetails.room
                        ? "BEDROOM"
                        : ""}
                  </span>
                  <span>
                    {summaryDetails.size || summaryDetails.room}

                    <abbr
                      className="sq"
                      title={
                        summaryDetails.measurement === "sqm"
                          ? "Square Meters"
                          : summaryDetails.measurement === "m"
                            ? "Meters"
                            : summaryDetails.measurement === "L"
                              ? "Liters"
                              : "Metric Tons"
                      }
                    >
                      {summaryDetails.measurement}
                    </abbr>
                  </span>
                </div>
                <div className="bt">
                  <span>
                    {summaryDetails.bath && "BATHROOM"}
                    {summaryDetails.tank && "TANK"}
                  </span>
                  <span>
                    {summaryDetails.bath && summaryDetails.bath}
                    {summaryDetails.tank && summaryDetails.tank}
                  </span>
                </div>
              </div>
            </div>
            <div
              className="subtitle"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              {summaryDetails?.subtitle?.map((para, index) => (
                <p key={index}>{para}</p>
              ))}
              {summaryDetails?.subtitle && (
                <span style={{ fontSize: "14px" }}>
                  / Property FOR {capitalizeTitle(propertyType)}
                </span>
              )}
            </div>
            <div className="adr">
              <h3>Property Address</h3>
              <p>
                <span>
                  <FaLocationDot />
                </span>{" "}
                {capitalizeTitle(summaryDetails.location)}
              </p>
            </div>
            {summaryDetails.details && (
              <div className="suit">
                <p>Other details:</p>
                <ul>
                  {summaryDetails.details?.map((li: string, index: number) => (
                    <li key={index}>
                      <IoCheckmarkDone /> <span>{li}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="grid-cont">
            <div className="contact-agent">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                {" "}
                <h3>Dedicated Advisory</h3>{" "}
                <span>({summaryDetails?.code?.toUpperCase()})</span>
              </div>

              <div className="agent-profile">
                <FaRegCircleUser color="#2b2d2d" className="agent-pic mobile" />
                <FaCircleUser color="white" className="agent-pic desktop" />
                <div>
                  <h2>Ade Johnson</h2>
                  <p>Investment Advisor</p>
                </div>
              </div>

              <div className="contact">
                <Link to="tel:08096068042">
                  <IoCall /> <span>Call</span>
                </Link>
                <Link
                  to={`https://wa.me/2348096068042?text=${encodeURIComponent(
                    `Hello! I'm interested in the property titled "${
                      summaryDetails.title
                    }" with code (${summaryDetails?.code?.toUpperCase()}). Could you please provide more details?`,
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>
                    {" "}
                    {width < 768 ? "Whatsapp" : "Schedule a Consultation"}
                  </span>
                </Link>
              </div>
            </div>

            {summaryDetails?.suitability &&
              summaryDetails?.suitability?.length > 0 && (
                <div className="suit">
                  <p>High-Yield Development Potential:</p>
                  <ul>
                    {summaryDetails.suitability?.map(
                      (li: string, index: number) => (
                        <li key={index}>
                          <BsStars className="icon" /> <span>{li}</span>
                        </li>
                      ),
                    )}
                  </ul>
                </div>
              )}
          </div>
        </div>
      </div>
    </>
  );
}

export default NewExpandPropertyDetails;
