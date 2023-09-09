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
import { Calendar } from "react-date-range";

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

      if (selectedRegion && count > 0) {
        return regionSelected && guestsMatch;
      } else if (selectedRegion) {
        return regionSelected;
      } else if (count > 0) {
        return guestsMatch;
      } else {
        return true;
      }
    });

    console.log("check", count);

    setSearchedData([updatedData]);
  }, [rooms, selectedRegion, count]);

  useEffect(() => {
    if (!isOpen) {
      setGuestOpen(false);
      setDestinationOpen(false);
      setCheckIn(false);
      setCheckOut(false);
    }
  }, [isOpen]);

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
          ></Where>
        )}
      </div>

      <div>
        {checkIn && (
          <div className="absolute top-[170px] left-[450px]  rounded-2xl shadow-2xl bg-white w-[360px] flex justify-center">
            <Calendar></Calendar>
          </div>
        )}
      </div>

      <div>
        {checkOut && (
          <div className="absolute top-[170px] left-[650px]  rounded-2xl shadow-2xl bg-white w-[360px] flex justify-center">
            <Calendar></Calendar>
          </div>
        )}
      </div>

      <div>{guestOpen && <Who count={count} setCount={setCount}></Who>}</div>
    </div>
  );
};

export default Navbar;
