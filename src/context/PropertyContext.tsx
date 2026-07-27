import {
  createContext,
  ReactNode,
  useEffect,
  useReducer,
  useState,
} from "react";
import { propertySummaryProps } from "../Data/propertyData";
import {
  defaultPropertyProps,
  PropertyContextProps,
} from "../Data/PropertyProps";
import { useBrowserStorageState } from "../Hooks/useBrowserStorageState";
import { getProperties } from "../services/apiProperties";
import { useLocation } from "react-router-dom";

export interface PropertyDataProps {
  type: string;
  information: propertySummaryProps[];
}

interface AppStateProps {
  menu: boolean;
  query: string;
  activeCrumb: string;
  randomProperties: propertySummaryProps[];
}

export interface AppActionProps {
  type: string;
  payload?: boolean | string | propertySummaryProps[];
}

const initialState = {
  menu: false,
  activeCrumb: "",
  query: "",
  randomProperties: [],
};

function reducer(state: AppStateProps, action: AppActionProps): AppStateProps {
  switch (action.type) {
    case "mobileView":
      return { ...state, menu: action.payload as boolean };
    case "toggleMobileView":
      return { ...state, menu: !state.menu };
    case "activeProperty":
      return { ...state, activeCrumb: action.payload as string };
    case "searchProperties":
      return { ...state, query: action.payload as string };
    case "selectProperties":
      return { ...state, randomProperties: action.payload as [] };
    default:
      throw new Error("data not found");
  }
}

interface PropertyProviderProps {
  children: ReactNode;
}

const PropertyContext =
  createContext<PropertyContextProps>(defaultPropertyProps);

function PropertyProvider({ children }: PropertyProviderProps) {
  //USE REDUCER
  const [state, dispatch] = useReducer(reducer, initialState);
  const { menu, activeCrumb, query, randomProperties } = state;

  //STATE
  const [propertyData, setPropertyData] = useState<propertySummaryProps[]>([]);
  const [loadingProperties, setLoadingProperties] = useState<boolean>(false);
  const [selectedType, setSelectedType] = useBrowserStorageState<string>(
    "",
    "selectedType",
  );

  const [propertyType, setPropertyType] = useBrowserStorageState<string>(
    "sale",
    "propertyType",
  );
  const [isPageHeaderShown, setIsPageHeaderShown] =
    useBrowserStorageState<boolean>(false, "isPageHeaderShown");
  const [isHeader, setIsHeader] = useState(false);

  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      setIsHeader(false);
    } else {
      setIsHeader(true);
    }
  }, [location]);

  const fetchProperties = async () => {
    setLoadingProperties(true);
    try {
      const data = await getProperties();
      setPropertyData(data);
    } catch (error) {
      console.error("Error fetching properties:", error);
    } finally {
      setLoadingProperties(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const topProperty = propertyData.filter((property) =>
    [62, 10, 64].includes(+property.id),
  );

  const getRandomItem = (
    data: propertySummaryProps[],
  ): propertySummaryProps[] => {
    const isVideo = (src: string) => /\.(mp4|mov|webm|avi|mkv)$/i.test(src);

    const types = [...new Set(data.map((item) => item.type))]
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);

    const selected = types.map((type) => {
      const sameTypeItems = data.filter(
        (item) => item.type === type && !isVideo(item.src[0]),
      );

      if (sameTypeItems.length === 0) return null;
      return sameTypeItems[Math.floor(Math.random() * sameTypeItems.length)];
    });

    // ✅ Type guard to remove null values completely
    return selected.filter(
      (item): item is propertySummaryProps => item !== null,
    );
  };

  useEffect(() => {
    const selected = getRandomItem(propertyData);
    dispatch({ type: "selectProperties", payload: selected });
  }, [propertyData]);

  useEffect(function () {
    const mq = window.matchMedia("(min-width: 992px)");
    if (mq.matches) {
      dispatch({ type: "mobileView", payload: true });
    }
  }, []);

  const selectedProperty = propertyData.filter(
    (data) => data.type === propertyType,
  );
  if (!selectedProperty) return;

  const searchedLocations = selectedProperty.filter((item) =>
    `${item.title} ${item.location} ${item.code}`
      .toLowerCase()
      .includes(query.toLowerCase()),
  );
  return (
    <PropertyContext.Provider
      value={{
        dispatch,
        menu,
        query,
        randomProperties,
        activeCrumb,
        propertyData,
        propertyType,
        setPropertyType,
        isPageHeaderShown,
        setIsPageHeaderShown,
        searchedLocations,
        selectedType,
        setSelectedType,
        loadingProperties,
        fetchProperties,
        isHeader,
        setIsHeader,
        topProperty,
      }}
    >
      {children}
    </PropertyContext.Provider>
  );
}

export { PropertyContext, PropertyProvider };
