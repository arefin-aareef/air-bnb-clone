import Container from "../Container";
import Logo from "./Logo";
import MenuDropdown from "./MenuDropdown";
import Search from "./Search";
import { useCallback, useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <Logo></Logo>
            <Search toggleOpen={toggleOpen}></Search>
            <MenuDropdown></MenuDropdown>
          </div>
          <div>
          {isOpen && <Search></Search>}
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
