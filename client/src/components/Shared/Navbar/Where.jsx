const Where = ({ selectedRegion, setSelectedRegion }) => {
  const regionOptions = [
    "any",
    "asia",
    "america",
    "australia",
    "canada",
    "europe",
  ];
  return (
    <div>
      <div
        onClick={() => window.my_modal_2.showModal()}
        className="py-1 pl-5 hover:bg-neutral-200 rounded-full"
      >
        <p className="font-semibold ">Where</p>
        {selectedRegion && selectedRegion ? (
          <p className="uppercase hidden sm:block">{selectedRegion}</p>
        ) : (
          <p className="hidden sm:block">Search Destination</p>
        )}
        <dialog id="my_modal_2" className="modal">
          <div className="modal-box absolute top-[160px] left-[230px]">
            <p className="text-lg my-6">Search by region</p>
            <div className="grid grid-cols-3 gap-4">
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
                  }}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </div>
    </div>
  );
};

export default Where;
