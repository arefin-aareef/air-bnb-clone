import Container from "../Container";
import Logo from "./Logo";
import MenuDropdown from "./MenuDropdown";
import Search from "./Search";
import { useEffect, useState } from "react";
import SecondSearch from "./SecondSearch";
import SecondNavbar from "./SecondNavbar";
import Who  from './Who';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [guestOpen, setGuestOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen)
  };
  
  const toggleGuest = () => {
    setGuestOpen(!guestOpen);
  }

  useEffect(() => {
    if (!isOpen && guestOpen) {
      setGuestOpen(false);
    }
  }, [isOpen, guestOpen]);


  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <Logo></Logo>
            {isOpen && isOpen ? (
                <><SecondNavbar toggleOpen={toggleOpen}></SecondNavbar></>
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
                <SecondSearch toggleGuest={toggleGuest}></SecondSearch>
              </div>
            )}
          </div>


        </Container>
      </div>
      <div>
        {
          guestOpen && guestOpen ? <> <Who></Who> </> : <></>
        }
        </div>
    </div>
  );
};

export default Navbar;
