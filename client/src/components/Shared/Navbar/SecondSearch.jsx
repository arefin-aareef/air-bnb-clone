import { BiSearch } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { GrFormClose } from "react-icons/gr";

const SecondSearch = ({
  searchedData,
  selectedRegion,
  toggleGuest,
  toggleDestination,
  count,
  toggleCheckIn,
  toggleCheckOut,
  startDate,
  endDate,
  clearCount,
  clearRegion,
  clearCheckIn,
  clearCheckOut,
  setGuestOpen
}) => {
  const navigate = useNavigate();

  const handleSearchedRooms = () => {
    navigate("/searched-rooms", { state: { searchedData } });
    setGuestOpen(false)
  };

  return (
    <div className="w-3/4 mx-auto text-sm ">
      <div className="border-[1px] w-full md:w-auto  rounded-full shadow-sm hover:shadow-md transition cursor-pointer  p-2">
        <div className="grid grid-cols-5 gap-1">
          <div
            onClick={toggleDestination}
            className="py-1 pl-5 hover:bg-neutral-200 rounded-full  flex justify-between items-center"
          >
            <div>
              <p className="font-semibold ">Where</p>
              {selectedRegion && selectedRegion ? (
                <p className="uppercase hidden sm:block">{selectedRegion}</p>
              ) : (
                <p className="hidden sm:block">Search Destination</p>
              )}
            </div>

            <div className="me-2">
              {selectedRegion ? (
                <button
                  onClick={clearRegion}
                  className="btn btn-circle btn-ghost btn-sm"
                >
                  <GrFormClose></GrFormClose>
                </button>
              ) : (
                <></>
              )}
            </div>
          </div>

          <div
            onClick={toggleCheckIn}
            className="py-1 pl-5 hover:bg-neutral-200 rounded-full  flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">Check in</p>
              {startDate ? (
                <p className="hidden sm:block">{startDate}</p>
              ) : (
                <p className="hidden sm:block">Add dates</p>
              )}
            </div>

            <div className="me-2">
              {startDate ? (
                <button
                  onClick={clearCheckIn}
                  className="btn btn-circle btn-ghost btn-sm"
                >
                  <GrFormClose></GrFormClose>
                </button>
              ) : (
                <></>
              )}
            </div>

          </div>

          <div
            onClick={toggleCheckOut}
            className="py-1 pl-5 hover:bg-neutral-200 rounded-full  flex justify-between items-center"
          >
            <div>
            <p className="font-semibold">Check out</p>
            {endDate ? (
              <p className="hidden sm:block">{endDate}</p>
            ) : (
              <p className="hidden sm:block">Add dates</p>
            )}
            </div>

            <div className="me-2">
              {endDate ? (
                <button
                  onClick={clearCheckOut}
                  className="btn btn-circle btn-ghost btn-sm"
                >
                  <GrFormClose></GrFormClose>
                </button>
              ) : (
                <></>
              )}
            </div>

          </div>

          <div
            onClick={toggleGuest}
            className="py-1 pl-5 hover:bg-neutral-200 rounded-full flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">Who</p>
              {count ? (
                <p className="hidden sm:block">
                  {count === 1 ? `${count} guest` : `${count} guests`}
                </p>
              ) : (
                <p className="hidden sm:block">Add guests</p>
              )}
            </div>

            <div className="me-2">
              {count > 0 ? (
                <button
                  onClick={clearCount}
                  className="btn btn-circle btn-ghost btn-sm"
                >
                  <GrFormClose></GrFormClose>
                </button>
              ) : (
                <></>
              )}
            </div>
          </div>

          <div
            onClick={handleSearchedRooms}
            className="py-2 gap-2 justify-center items-center bg-rose-500 rounded-full  text-white flex"
          >
            <BiSearch size={18} />
            <p>Search</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecondSearch;
