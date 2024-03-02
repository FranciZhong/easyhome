"use client";

import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file

import { DateRange, Range, RangeKeyDict } from "react-date-range";

interface Props {
  range: Range;
  onChange: (value: RangeKeyDict) => void;
  disabledDates: Date[];
}

const DatePicker: React.FC<Props> = ({ range, onChange, disabledDates }) => {
  return (
    <DateRange
      ranges={[range]}
      onChange={onChange}
      disabledDates={disabledDates}
      direction="vertical"
      showDateDisplay={false}
      minDate={new Date()}
    />
  );
};

export default DatePicker;
