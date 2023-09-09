import { BiMinus, BiPlus } from "react-icons/bi";

const Who = ({count, setCount}) => {

  const handleIncrement = () => {
    if (count < 10) {
      setCount(count + 1);
    }
  };

  const handleDecrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  return (
    <div className="absolute top-[170px] right-[280px]  rounded-2xl shadow-2xl bg-white border flex justify-between w-[370px] p-4">
      <div>
        <p className="font-semibold text-lg">Adults</p>
        <p>Ages 13 or above</p>
      </div>

      <div className="flex items-center">
        <button
          className="btn btn-outline rounded-full"
          onClick={handleDecrement}
          disabled={count === 0}
        >
          <BiMinus></BiMinus>
        </button>
        <p className="mx-4 text-lg">{count}</p>
        <button
          className="btn btn-outline rounded-full"
          onClick={handleIncrement}
          disabled={count === 10}
        >
          <BiPlus></BiPlus>
        </button>
      </div>
    </div>
  );
};

export default Who;
