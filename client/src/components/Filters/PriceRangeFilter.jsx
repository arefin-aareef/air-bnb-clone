/* eslint-disable no-unused-vars */
import { useState, useCallback } from "react";
import MultiRangeSlider from "../multiRangeSlider/multiRangeSlider";

const PriceRangeFilter = ({ onChange }) => {
  const [priceRange, setPriceRange] = useState({ min: 100, max: 1000 });

  const handlePriceRangeChange = useCallback(({ min, max }) => {
    setPriceRange({ min, max });
    onChange({ min, max });
  }, [onChange]);

  return (
    <div>
      <MultiRangeSlider min={100} max={1000} onChange={handlePriceRangeChange} />
    </div>
  );
};

export default PriceRangeFilter;
