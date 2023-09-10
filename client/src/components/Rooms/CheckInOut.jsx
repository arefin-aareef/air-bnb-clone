
import { useState } from "react";
import { DateRangePicker } from "react-date-range";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const CheckInOut = () => {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  return (
    <div>
      <DateRangePicker
        onChange={(item) => {
          setState([item.selection])
          console.log(item.selection.startDate);
        }}
        showSelectionPreview={true}
        moveRangeOnFirstSelection={false}
        months={2}
        ranges={state}
        direction="horizontal"
        preventSnapRefocus={true}
        calendarFocus="backwards"
      />
    </div>
  );
};

export default CheckInOut;
