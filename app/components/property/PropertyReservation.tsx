"use client";

import { Range } from "react-date-range";
import Button from "../Button";
import DatePicker from "../inputs/DatePicker";

interface Props {
  totalDays: number;
  totalPrice: number;
  dateRange: Range;
  onDateChange: (range: Range) => void;
  onSubmit: () => void;
  disabled?: boolean;
  disabledDates: Date[];
}

const PropertyReservation: React.FC<Props> = ({
  totalDays,
  totalPrice,
  dateRange,
  onDateChange,
  onSubmit,
  disabled,
  disabledDates,
}) => {
  return (
    <div
      className="
        relative
        flex
        flex-col
        items-center
        gap-4
      "
    >
      <DatePicker
        range={dateRange}
        onChange={(value) => {
          if (!disabled) {
            onDateChange(value.selection);
          }
        }}
        disabledDates={disabledDates}
      />
      <div
        className="
          flex
          flex-row
          justify-center
          items-center
          gap-2
          w-64
          py-3
          border-neutral-500
          border-2
          rounded-xl
        "
      >
        <div className="font-semibold text-lg">$ {totalPrice}</div>
        <div className="font-light text-sm text-neutral-500">
          {" "}
          / {totalDays} nights
        </div>
      </div>
      <div className="w-64">
        <Button label="Reserve" onClick={onSubmit} />
      </div>
    </div>
  );
};

export default PropertyReservation;
