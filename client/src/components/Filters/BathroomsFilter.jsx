const BathroomsFilter = ({ selectedBathrooms, onBathroomsSelection }) => {
    const bathroomOptions = ["Any", "1", "2", "3", "4", "5", "6+"];
    return (
      <div>
        <p className="text-lg my-6">Bathrooms</p>
        <div className="flex gap-4">
          {bathroomOptions.map((option) => (
            <button
              key={option}
              className={`btn hover:btn-neutral btn-outline rounded-full ${
                selectedBathrooms === option ? "btn-active" : ""
              } w-16`}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onBathroomsSelection(option);
              }}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    );
  };
  
  export default BathroomsFilter;
  