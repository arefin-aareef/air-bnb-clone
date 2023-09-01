/* eslint-disable react/jsx-key */
import Container from "../Shared/Container";
import { categories } from "./categoriesData";
import CategoryBox from "./CategoryBox";
import { BsFilterRight } from "react-icons/bs";
import Filters from "../Filters/Filters";


const Categories = () => {
  return (
    <Container>
      <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
        {categories.map((item) => (
          <CategoryBox
            label={item.label}
            icon={item.icon}
            key={item.label}
          ></CategoryBox>
        ))}
        <button
          onClick={() => window.my_modal_3.showModal()}
          className="flex items-center justify-center gap-2 p-5 border-2 rounded-md hover:text-neutral-800  text-neutral-500"
        >
          <BsFilterRight></BsFilterRight>
          <div className="text-sm font-medium">Filters</div>
        </button>

        <dialog id="my_modal_3" className="modal" >
          <form method="dialog" className="modal-box"  style={{ maxWidth: '800px' }}>
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
            <Filters></Filters>
          </form>
        </dialog>
      </div>
    </Container>
  );
};

export default Categories;
