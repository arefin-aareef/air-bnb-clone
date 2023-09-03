import { useLocation } from "react-router-dom";
import Categories from "../../components/Categories/Categories";
import Card from "../../components/Rooms/Card";
import Container from "../../components/Shared/Container";

const FilteredRooms = () => {
  const location = useLocation();
  const filteredData = location.state.filteredData || [];

  return (
    <div>
      <Categories></Categories>
        <Container>

      <div>
        {filteredData && filteredData.length > 0 ? (
          <div className="pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
            {filteredData.map((room, index) => (
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

export default FilteredRooms;
