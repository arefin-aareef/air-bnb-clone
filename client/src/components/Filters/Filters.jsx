import { useCallback, useEffect, useState } from "react";
import Heading from "../Heading/Heading";
import PriceRangeFilter from "./PriceRangeFilter";
import RoomTypeFilter from "./RoomTypeFilter";
import PropertyTypeFilter from "./PropertyTypeFilter";
import BedroomsFilter from "./BedroomsFilter";
import BedsFilter from "./BedsFilter";
import BathroomsFilter from "./BathroomsFilter";
import Loader from "../Shared/Loader";
import { useNavigate } from "react-router-dom";

const Filters = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 100, max: 1000 });
  const [filteredData, setFilteredData] = useState([]);

  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState([]);
  const [selectedBedrooms, setSelectedBedrooms] = useState("Any");
  const [selectedBeds, setSelectedBeds] = useState("Any");
  const [selectedBathrooms, setSelectedBathrooms] = useState("Any");

  const navigate = useNavigate();

  const handleFilteredRooms = () => {
    console.log(filteredData);
    navigate("/filtered-rooms", { state: { filteredData } });
  };

  useEffect(() => {
    setLoading(true);
    fetch("./rooms.json")
      .then((res) => res.json())
      .then((data) => {
        setRooms(data);
        setFilteredData(data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handlePriceRangeChange = useCallback(({ min, max }) => {
    setPriceRange({ min, max });
  }, []);

  const handleTypeSelection = (type) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(
        selectedTypes.filter((selectedType) => selectedType !== type)
      );
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  const handlePropertyTypeSelection = (type) => {
    if (selectedPropertyTypes.includes(type)) {
      setSelectedPropertyTypes(
        selectedPropertyTypes.filter(
          (selectedPropertyTypes) => selectedPropertyTypes !== type
        )
      );
    } else {
      setSelectedPropertyTypes([...selectedPropertyTypes, type]);
    }
  };

  useEffect(() => {
    const updatedData = rooms.filter((room) => {
      const price = room.price;
      const type = room["place-type"];
      const propertyType = room["property-type"];
      const bedrooms = room.bedrooms;
      const beds = room.beds;
      const bathrooms = room.bathrooms;

      const priceInRange = price >= priceRange.min && price <= priceRange.max;
      const typeSelected =
        selectedTypes.length === 0 || selectedTypes.includes(type);
      const propertyTypeSelected =
        selectedPropertyTypes.length === 0 ||
        selectedPropertyTypes.includes(propertyType);
      const bedroomsMatch =
        selectedBedrooms === "Any" || bedrooms.toString() === selectedBedrooms;
      const bedsMatch =
        selectedBeds === "Any" || beds.toString() === selectedBeds;
      const bathroomsMatch =
        selectedBathrooms === "Any" ||
        bathrooms.toString() === selectedBathrooms;

      return (
        priceInRange &&
        typeSelected &&
        propertyTypeSelected &&
        bedroomsMatch &&
        bedsMatch &&
        bathroomsMatch
      );
    });
    setFilteredData(updatedData);
  }, [
    rooms,
    priceRange,
    selectedTypes,
    selectedPropertyTypes,
    selectedBedrooms,
    selectedBeds,
    selectedBathrooms,
  ]);

  if (loading) {
    return <Loader></Loader>;
  }

  return (
    <div>
      <Heading title="Price range" />
      <PriceRangeFilter onChange={handlePriceRangeChange} />
      <hr className="my-4" />
      <Heading title="Type of place" />
      <RoomTypeFilter
        selectedTypes={selectedTypes}
        onTypeSelection={handleTypeSelection}
      />
      <hr className="my-4" />

      <Heading title="Rooms and beds" />
      <BedroomsFilter
        selectedBedrooms={selectedBedrooms}
        onBedroomsSelection={setSelectedBedrooms}
      />
      <BedsFilter
        selectedBeds={selectedBeds}
        onBedsSelection={setSelectedBeds}
      />
      <BathroomsFilter
        selectedBathrooms={selectedBathrooms}
        onBathroomsSelection={setSelectedBathrooms}
      />

      <hr className="my-4" />
      <Heading title="Property type" />
      <PropertyTypeFilter
        selectedPropertyTypes={selectedPropertyTypes}
        onPropertyTypeSelection={handlePropertyTypeSelection}
      />

      <hr className="my-4" />

      <div className="sticky bottom-0 mb-0 bg-white p-2 text-right">
        <button className="btn btn-neutral" onClick={handleFilteredRooms}>
          Show {filteredData.length} stays
        </button>
      </div>
    </div>
  );
};

export default Filters;
