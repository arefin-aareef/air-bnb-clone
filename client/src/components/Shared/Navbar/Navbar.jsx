import Container from "../Container";
import Logo from "./Logo";
import MenuDropdown from "./MenuDropdown";
import Search from "./Search";
import { useEffect, useState } from "react";
import SecondSearch from "./SecondSearch";
import SecondNavbar from "./SecondNavbar";
import Who from "./Who";
import Where from "./Where";
import Loader from "../Loader";

import "react-date-range/dist/styles.css"; 
import "react-date-range/dist/theme/default.css";
import { Calendar } from "react-date-range";
import { format } from "date-fns";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [guestOpen, setGuestOpen] = useState(false);
  const [destinationOpen, setDestinationOpen] = useState(false);
  const [count, setCount] = useState(0);
  const [checkIn, setCheckIn] = useState(false);
  const [checkOut, setCheckOut] = useState(false);

  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchedData, setSearchedData] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState();

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const toggleDestination = () => {
    if (guestOpen) {
      setGuestOpen(false);
    } else if (checkIn) {
      setCheckIn(false);
    } else if (checkOut) {
      setCheckOut(false);
    }
    setDestinationOpen(!destinationOpen);
  };

  const toggleGuest = () => {
    if (destinationOpen) {
      setDestinationOpen(false);
    } else if (checkIn) {
      setCheckIn(false);
    } else if (checkOut) {
      setCheckOut(false);
    }
    setGuestOpen(!guestOpen);
  };

  const toggleCheckIn = () => {
    if (guestOpen) {
      setGuestOpen(false);
    } else if (destinationOpen) {
      setDestinationOpen(false);
    } else if (checkOut) {
      setCheckOut(false);
    }
    setCheckIn(!checkIn);
  };

  const toggleCheckOut = () => {
    if (guestOpen) {
      setGuestOpen(false);
    } else if (destinationOpen) {
      setDestinationOpen(false);
    } else if (checkIn) {
      setCheckIn(false);
    }
    setCheckOut(!checkOut);
  };

  const clearRegion = () => {
    setSelectedRegion(null);
  };
  const clearCheckIn = () => {
    setStartDate(null);
  };
  const clearCheckOut = () => {
    setEndDate(null);
  };
  const clearCount = () => {
    setCount(0);
  };

  const handleSelectStart = (date) => {
    setStartDate(date);
    setCheckIn(false);
    setCheckOut(true);
  };
  const handleSelectEnd = (date) => {
    setEndDate(date);
    setCheckOut(false);
    setGuestOpen(true);
  };

  const formattedStartDate = startDate
    ? format(startDate, "MMM, dd, yyyy")
    : null;
  const formattedEndDate = endDate ? format(endDate, "MMM, dd, yyyy") : null;

  useEffect(() => {
    if (!isOpen) {
      setGuestOpen(false);
      setDestinationOpen(false);
      setCheckIn(false);
      setCheckOut(false);
    }
  }, [isOpen]);

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
      const guestsMatch = room.guests >= count;

      const checkInDate = new Date(room["availableFrom"]);
      const checkOutDate = new Date(room["availableTo"]);
      const startSelected = startDate >= checkInDate;
      const endSelected = endDate <= checkOutDate;
      const rangeSelected = startSelected && endSelected;

      if (selectedRegion && count > 0 && startDate && endDate) {
        return regionSelected && guestsMatch && rangeSelected;
      } else if (selectedRegion && count > 0) {
        return regionSelected && guestsMatch;
      } else if (selectedRegion && startDate && endDate) {
        return regionSelected && rangeSelected;
      } else if (count > 0 && startDate && endDate) {
        return guestsMatch && rangeSelected;
      } else if (selectedRegion) {
        return regionSelected;
      } else if (count > 0) {
        return guestsMatch;
      } else if (startDate && endDate) {
        return rangeSelected;
      } else {
        return true;
      }
    });

    console.log(updatedData);

    setSearchedData([updatedData]);
  }, [rooms, selectedRegion, count, startDate, endDate]);

  if (loading) {
    return <Loader></Loader>;
  }

  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <Logo></Logo>
            {isOpen && isOpen ? (
              <>
                <SecondNavbar toggleOpen={toggleOpen}></SecondNavbar>
              </>
            ) : (
              <>
                <Search toggleOpen={toggleOpen}></Search>
              </>
            )}
            <MenuDropdown></MenuDropdown>
          </div>
          <div>
            {isOpen && (
              <div className="mt-6">
                <SecondSearch
                  toggleGuest={toggleGuest}
                  toggleDestination={toggleDestination}
                  toggleCheckIn={toggleCheckIn}
                  toggleCheckOut={toggleCheckOut}
                  searchedData={searchedData}
                  selectedRegion={selectedRegion}
                  count={count}
                  clearCount={clearCount}
                  clearRegion={clearRegion}
                  clearCheckIn={clearCheckIn}
                  clearCheckOut={clearCheckOut}
                  startDate={formattedStartDate}
                  endDate={formattedEndDate}
                  setGuestOpen={setGuestOpen}
                ></SecondSearch>
              </div>
            )}
          </div>
        </Container>
      </div>

      <div>
        {destinationOpen && (
          <Where
            selectedRegion={selectedRegion}
            setSelectedRegion={setSelectedRegion}
            setDestinationOpen={setDestinationOpen}
            setCheckIn={setCheckIn}
          ></Where>
        )}
      </div>

      <div>
        {checkIn && (
          <div className="absolute top-[170px] left-[400px]  rounded-2xl shadow-2xl bg-white w-[360px] flex justify-center">
            <Calendar onChange={handleSelectStart} date={startDate}></Calendar>
          </div>
        )}
      </div>

      <div>
        {checkOut && (
          <div className="absolute top-[170px] left-[580px]  rounded-2xl shadow-2xl bg-white w-[360px] flex justify-center">
            <Calendar onChange={handleSelectEnd} date={endDate}></Calendar>
          </div>
        )}
      </div>

      <div>{guestOpen && <Who count={count} setCount={setCount}></Who>}</div>
    </div>
  );
};

export default Navbar;
