const Where = ({ selectedRegion, setSelectedRegion, setDestinationOpen }) => {
  const regionOptions = [
    "any",
    "asia",
    "america",
    "australia",
    "canada",
    "europe",
  ];
  return (
    <div className="flex flex-col  rounded-2xl shadow-2xl w-[450px] bg-white absolute top-[170px] left-[250px]">
      <p className="px-6 pt-5 text-lg">Search by region</p>
      <div className="grid grid-cols-3 gap-2 mx-auto py-6">
        {regionOptions.map((option) => (
          <button
            key={option}
            className={`btn p-16 hover:btn-neutral btn-outline  ${
              selectedRegion === option ? "btn-active" : ""
            } w-16`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setSelectedRegion(option);
              setDestinationOpen(false)
            }}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Where;
