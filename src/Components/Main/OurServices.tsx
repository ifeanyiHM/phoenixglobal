import { useNavigate } from "react-router-dom";
import useProperty from "../../context/useProperty";
import { servicePageDet, ServicePageDetProps } from "../../Data/propertyData";

function OurServices() {
  const { setPropertyType, setIsPageHeaderShown, dispatch } = useProperty();

  const navigate = useNavigate();

  function handleServicePage(link: string) {
    setPropertyType(link);
    navigate(`service/${link}`);
    setIsPageHeaderShown(true);
    dispatch({ type: "activeProperty", payload: link });
  }

  const slideSytles = {
    width: "100%",
    height: "100%",
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <div className="services" id="service">
      <h2>Our Services</h2>
      <div className="grid-container">
        {servicePageDet.map(
          ({ src, title, link, count }: ServicePageDetProps, index: number) => (
            <div
              key={index}
              style={{ ...slideSytles, backgroundImage: `url(${src})` }}
              onClick={() => handleServicePage(link)}
            >
              <div className="service-item">
                <h3>{title}</h3>
                <p>{count} Properties</p>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default OurServices;
