/* eslint-disable no-unused-vars */
import { useCallback, useEffect, useState } from "react";
import Heading from "../Heading/Heading";
import MultiRangeSlider from "../multiRangeSlider/multiRangeSlider";

const Filters = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 100, max: 1000 });
  const [filteredData, setFilteredData] = useState([]);

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

  useEffect(() => {
    const updatedData = rooms.filter((room) => {
      const price = room.price; 
      const type = room["place-type"];
      const priceInRange = price >= priceRange.min && price <= priceRange.max;
      const typeSelected = selectedTypes.length === 0 || selectedTypes.includes(type);
      return priceInRange && typeSelected;
    });
    setFilteredData(updatedData);
  }, [priceRange, selectedTypes, rooms]);

  return (
    <div>
      <Heading
        title="Price range"
        subtitle="The average nightly price is $39"
      ></Heading>
      <MultiRangeSlider
        min={100}
        max={1000}
        onChange={handlePriceRangeChange}
      />

      <hr className="my-4" />

      <Heading title="Type of place"></Heading>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
        <div
          className="checkbox-item flex items-center cursor-pointer"
          onClick={() => handleTypeSelection("entire-place")}
        >
          <input
            className="me-3 cursor-pointer"
            style={{ width: "25px", height: "25px" }}
            type="checkbox"
            id="entire-place"
            checked={selectedTypes.includes("entire-place")}
          />
          <div>
            <p>
              Entire Place <br /> <small>A place all to yourself</small>
            </p>
          </div>
        </div>
        <div
          className="checkbox-item flex items-center  cursor-pointer"
          onClick={() => handleTypeSelection("room")}
        >
          <input
            className="me-3  cursor-pointer"
            style={{ width: "25px", height: "25px" }}
            type="checkbox"
            id="room"
            checked={selectedTypes.includes("room")}
          />
          <div>
            <p>
              Room <br />
              <small>Your own room, plus access to shared spaces</small>
            </p>
          </div>
        </div>
        <div
          className="checkbox-item flex items-center  cursor-pointer"
          onClick={() => handleTypeSelection("shared-room")}
        >
          <input
            className="me-3  cursor-pointer"
            style={{ width: "25px", height: "25px" }}
            type="checkbox"
            id="shared-room"
            checked={selectedTypes.includes("shared-room")}
          />
          <div>
            <p>
              Shared Room <br />
              <small>
                A sleeping space and common areas that may <br /> be shared with
                others
              </small>
            </p>
          </div>
        </div>
      </div>
      <hr className="my-4" />
      <button className="btn btn-neutral">
        Show {filteredData.length} stays
      </button>
    </div>
  );
};

export default Filters;
