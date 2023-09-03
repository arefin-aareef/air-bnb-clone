import { BsFillBuildingsFill, BsFillHousesFill } from "react-icons/bs";
import { PiHouseLine } from "react-icons/pi";
import { FaHotel } from "react-icons/fa";

const PropertyTypeFilter = ({ selectedPropertyTypes, onPropertyTypeSelection }) => {
  const propertyTypes = ["house", "apartment", "guesthouse", "hotel"];

  const propertyTypeIcons = {
    house: <BsFillHousesFill />,
    apartment: <BsFillBuildingsFill />,
    guesthouse: <PiHouseLine />,
    hotel: <FaHotel />,
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
      {propertyTypes.map((type) => (
        <div
          key={type}
          className={`p-4 border-2 border-neutral-300 rounded-xl ${
            selectedPropertyTypes.includes(type) ? "border-slate-900 rounded-xl box-border" : ""
          }`}
          onClick={() => onPropertyTypeSelection(type)}
        >
          <div style={{ fontSize: "36px", marginBottom: "8px" }}>
            {propertyTypeIcons[type]}
          </div>
          <p className="text-2xl mt-6">{type.charAt(0).toUpperCase() + type.slice(1)}</p>
        </div>
      ))}
    </div>
  );
};

export default PropertyTypeFilter;
