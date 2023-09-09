import { DateRange } from "react-date-range";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const DatePicker = () => {
  return (

    <div  >
    
      <DateRange
      rangeColors={["#262626"]}
      date={new Date()}
      direction="vertical"
      showDateDisplay={false}
      minDate={new Date()}
    />
    </div>

  );
};

export default DatePicker;
