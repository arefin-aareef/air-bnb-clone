import { useLocation } from "react-router-dom";
import Categories from "../../components/Categories/Categories";
import Card from "../../components/Rooms/Card";
import Container from "../../components/Shared/Container";

const SearchedRooms = () => {
  const location = useLocation();
  const searchedData = location.state.searchedData[0] || [];
  return (
    <div>
      <Categories></Categories>
      <Container>
        <div>
          {searchedData && searchedData.length > 0 ? (
            <div className="pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
              {searchedData.map((room, index) => (
                <Card key={index} room={room}></Card>
              ))}
            </div>
          ) : (
            <></>
          )}
        </div>
      </Container>
    </div>
  );
};

export default SearchedRooms;
