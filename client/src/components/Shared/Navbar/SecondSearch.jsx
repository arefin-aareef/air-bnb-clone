import { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader";
import Where from "./Where";

const SecondSearch = ({ toggleGuest }) => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchedData, setSearchedData] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState();

  const navigate = useNavigate();

  const handleSearchedRooms = () => {
    navigate("/searched-rooms", { state: { searchedData } });
  };

  useEffect(() => {
    setLoading(true);
    fetch("./rooms.json")
      .then((res) => res.json())
      .then((data) => {
        setRooms(data);
        setSearchedData(data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const updatedData = rooms.filter((room) => {
      const region = room["region"];
      const regionSelected =
        selectedRegion === "any" || region === selectedRegion;
      return regionSelected;
    });
    setSearchedData([updatedData]);
  }, [rooms, selectedRegion]);

  if (loading) {
    return <Loader></Loader>;
  }

  return (
    <div className="w-3/4 mx-auto text-sm">
      <div className="border-[1px] w-full md:w-auto py-2 px-4 rounded-full shadow-sm hover:shadow-md transition cursor-pointer">
        <div className="grid grid-cols-5 gap-1 ">
          <Where
            selectedRegion={selectedRegion}
            setSelectedRegion={setSelectedRegion}
          ></Where>

          <div className="py-1 pl-5 hover:bg-neutral-200 rounded-full">
            <p className="font-semibold">Check in</p>
            <p className="hidden sm:block">Add dates</p>
          </div>

          <div className="py-1 pl-5 hover:bg-neutral-200 rounded-full">
            <p className="font-semibold">Check out</p>
            <p className="hidden sm:block">Add dates</p>
          </div>

          <div className="py-1 pl-5 hover:bg-neutral-200 rounded-full">
            <div onClick={toggleGuest}>
              <p className="font-semibold">Who</p>
              <p className="hidden sm:block">Add guests</p>
            </div>
          </div>

          <div
            onClick={handleSearchedRooms}
            className="py-2 px-3 items-center bg-rose-500 rounded-full text-white flex"
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
