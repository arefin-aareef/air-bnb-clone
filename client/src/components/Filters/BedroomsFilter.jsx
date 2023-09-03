const BedroomsFilter = ({ selectedBedrooms, onBedroomsSelection }) => {
  const bedroomOptions = ["Any", "1", "2", "3", "4", "5", "6+"];
  return (
    <div>
      <p className="text-lg my-6">Bedrooms</p>
      <div className="flex gap-4">
        {bedroomOptions.map((option) => (
          <button
            key={option}
            className={`btn hover:btn-neutral btn-outline rounded-full ${
              selectedBedrooms === option ? "btn-active" : ""
            } w-16`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onBedroomsSelection(option);
            }}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BedroomsFilter;
