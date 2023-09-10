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

import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

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

  const [selectedCheckIn, setSelectedCheckIn] = useState()
  const [selectedCheckOut, setSelectedCheckOut] = useState()



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

      const dateMatch = room["dateRange"]
      const checkInDate = dateMatch.split('-')[0]
      const checkOutDate = dateMatch.split('-')[1]

      

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

    setSearchedData([updatedData]);
  }, [rooms, selectedRegion, count, selectedCheckIn, selectedCheckOut]);


  

  



  const handleCheckIn = (date) => {
    const formattedDate = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
    });
    setSelectedCheckIn(formattedDate)
  }
  // console.log(selectedCheckIn);

  const handleCheckOut = (date) => {
    const formattedDate = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
    });
    setSelectedCheckOut(formattedDate)
  }
  // console.log(selectedCheckOut);




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
                  selectedCheckIn={selectedCheckIn}
                  selectedCheckOut={selectedCheckOut}
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
            {/* <CheckInOut></CheckInOut> */}
            <Calendar date={new Date()} onChange={handleCheckIn} />
          </div>
        )}
      </div>

      <div>
        {checkOut && (
          <div className="absolute top-[170px] left-[650px]  rounded-2xl shadow-2xl bg-white w-[360px] flex justify-center">
            {/* <CheckInOut></CheckInOut> */}
            <Calendar date={new Date()} onChange={handleCheckOut} />
          </div>
        )}
      </div>

      <div>{guestOpen && <Who count={count} setCount={setCount}></Who>}</div>
    </div>
  );
};

export default Navbar;
