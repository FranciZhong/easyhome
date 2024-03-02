"use client";

import useFilterModalStore from "@/app/stores/useFilterModalStore";
import { format } from "date-fns";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { IoSearch } from "react-icons/io5";
import IconBox from "../IconBox";

const Search = () => {
  const filterModalStore = useFilterModalStore();
  const searchParams = useSearchParams();

  const [country, setCountry] = useState("Any Place");

  const longitude = searchParams?.get("longitude");
  const latitude = searchParams?.get("latitude");
  const startDate = searchParams?.get("startDate");
  const endDate = searchParams?.get("endDate");
  const guestMin = searchParams?.get("guestMin");

  useEffect(() => {
    if (!longitude || !latitude) {
      setCountry("Any Place");
      return;
    }

    console.log(longitude, latitude);

    // todo get country api call
    setCountry("Some Country");
  }, [longitude, latitude]);

  const timeLabel = useMemo(() => {
    if (!startDate || !endDate) {
      return "Any Time";
    }

    const start = format(new Date(startDate), "d MMM");
    const end = format(new Date(endDate), "d MMM");
    return `${start} - ${end}`;
  }, [startDate, endDate]);

  const guestLabel = useMemo(() => {
    if (!guestMin) {
      return "Invite Friends";
    }

    return `${guestMin} Guests`;
  }, [guestMin]);

  return (
    <div
      onClick={filterModalStore.onOpen}
      className="
        border-[1px]
        w-full
        md:w-auto
        py-2
        rounded-full
        shadow-sm
        hover:shadow-md
        transition
        cursor-pointer
      "
    >
      <div
        className="
          flex
          flex-row
          items-center
          justify-between
        "
      >
        <div
          className="
            text-sm
            font-semibold
            px-6
            text-center
          "
        >
          {timeLabel}
        </div>
        <div
          className="
            hidden
            sm:block
            text-sm
            font-semibold
            px-6
            border-x-[1px]
            text-center
          "
        >
          {country}
        </div>
        <div
          className="
            text-sm
            text-gray-600
            pl-6
            pr-2
            flex
            flex-row
            items-center
            gap-3
          "
        >
          <div className="hidden sm:block">{guestLabel}</div>
          <IconBox useDark={false} isOutline={false}>
            <IoSearch />
          </IconBox>
        </div>
      </div>
    </div>
  );
};

export default Search;
