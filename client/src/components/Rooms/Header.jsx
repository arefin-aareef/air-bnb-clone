import Heading from "../Heading/Heading";

const Header = () => {
  return (
    <>
      <Heading
        title="No Rooms Available In This Category!"
        subtitle="Khao Lak, Thailand"
      ></Heading>
      <div className="w-full md:h-[60vh] overflow-hidden rounded-xl">
        <img className="object-cover w-full" src="https://a0.muscache.com/im/pictures/e25a9b25-fa98-4160-bfd1-039287bf38b6.jpg" alt="header image" />
      </div>
    </>
  );
};

export default Header;
