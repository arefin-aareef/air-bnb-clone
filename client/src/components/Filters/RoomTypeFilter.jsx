
const RoomTypeFilter = ({ selectedTypes, onTypeSelection }) => {
  const roomTypes = ["entire-place", "room", "shared-room"];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
      {roomTypes.map((type) => (
        <div
          key={type}
          className="checkbox-item flex items-center cursor-pointer"
          onClick={() => onTypeSelection(type)}
        >
          <input
            className="me-3 cursor-pointer"
            style={{ width: "25px", height: "25px" }}
            type="checkbox"
            id={type}
            checked={selectedTypes.includes(type)}
          />
          <div>
            <p>
              {type === "entire-place" ? "Entire Place" : type === "room" ? "Room" : "Shared Room"} <br /> 
              <small>{type === "entire-place" ? "A place all to yourself" : type === "room" ? "Your own room, plus access to shared spaces" : "A sleeping space and common areas that may be shared with others"}</small>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RoomTypeFilter;
