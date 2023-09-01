import { useState } from "react";
import Heading from "../Heading/Heading";
import MultiRangeSlider from "../multiRangeSlider/multiRangeSlider";

const Filters = () => {
  const [selectedTypes, setSelectedTypes] = useState([]);

  // Function to handle checkbox selection
  const handleTypeSelection = (type) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(
        selectedTypes.filter((selectedType) => selectedType !== type)
      );
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  return (
    <div>
      <Heading
        title="Price range"
        subtitle="The average nightly price is $39"
      ></Heading>
      <MultiRangeSlider
        min={100}
        max={1000}
        onChange={({ min, max }) => console.log(`min = ${min}, max = ${max}`)}
      />

      <hr className="my-4" />

      <Heading
        title="Type of place"
        subtitle="Select the type of place you are looking for"
      ></Heading>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
        <div
          className="checkbox-item flex items-center cursor-pointer"
          onClick={() => handleTypeSelection("Entire place")}
        >
          <input
            className="me-3 cursor-pointer"
            style={{ width: "25px", height: "25px" }}
            type="checkbox"
            id="entire-place"
            checked={selectedTypes.includes("Entire place")}
          />
          <div>
            <p>
              Entire Place <br /> <small>A place all to yourself</small>
            </p>
          </div>
        </div>
        <div
          className="checkbox-item flex items-center  cursor-pointer"
          onClick={() => handleTypeSelection("Room")}
        >
          <input
            className="me-3  cursor-pointer"
            style={{ width: "25px", height: "25px" }}
            type="checkbox"
            id="room"
            checked={selectedTypes.includes("Room")}
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
          onClick={() => handleTypeSelection("Shared Room")}
        >
          <input
            className="me-3  cursor-pointer"
            style={{ width: "25px", height: "25px" }}
            type="checkbox"
            id="shared-room"
            checked={selectedTypes.includes("Shared Room")}
          />
          <div>
            <p>
              Shared Room <br />
              <small>
                A sleeping space and common areas that may <br /> be shared with others
              </small>
            </p>
          </div>
        </div>
      </div>
      <hr className="my-4" />
    </div>
  );
};

export default Filters;
