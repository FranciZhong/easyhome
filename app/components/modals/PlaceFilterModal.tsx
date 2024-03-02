"use client";

import useFilterModalStore from "@/app/stores/useFilterModalStore";
import { Coordinates, Location } from "@/app/types/location";
import { differenceInDays } from "date-fns";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { useCallback, useState } from "react";
import { Range, RangeKeyDict } from "react-date-range";
import MapBox from "../MapBox";
import FilterFolder from "../filter/FilterFolder";
import AddressInput from "../inputs/AddressInput";
import Counter from "../inputs/Counter";
import DatePicker from "../inputs/DatePicker";
import Modal from "./Modal";

interface Props {}

const initDateRange: Range = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

const initViewState = {
  longitude: 144.9631,
  latitude: -37.8136,
  zoom: 10,
};

const PlaceFilterModal: React.FC<Props> = ({}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const filterModalStore = useFilterModalStore();
  const [isLoading, setIsLoading] = useState(false);
  const [dateRange, setDateRange] = useState(initDateRange);
  const [address, setAddress] = useState("");
  const [viewState, setViewState] = useState(initViewState);
  const [coordinates, setCoordinates] = useState<Coordinates | undefined>(
    undefined,
  );
  const [bedroomMin, setBedroomMin] = useState(0);
  const [bathroomMin, setBathroomMin] = useState(0);
  const [guestMin, setGuestMin] = useState(0);

  const initOptions = () => {
    setDateRange(initDateRange);
    setAddress("");
    setViewState(initViewState);
    setCoordinates(undefined);
    setBedroomMin(0);
    setBathroomMin(0);
    setGuestMin(0);
  };

  const handleRangeChange = (value: RangeKeyDict) => {
    if (!isLoading) {
      let range = value.selection;
      if (range.startDate && range.endDate && range.startDate > range.endDate) {
        range = {
          ...range,
          startDate: range.endDate,
          endDate: range.startDate,
        };
      }
      setDateRange(range);
    }
  };

  const onSelectLocation = useCallback((location: Location) => {
    setAddress(location.address);
    setCoordinates(location.coordinates);
    setViewState({
      ...viewState,
      ...location.coordinates,
    });
  }, []);

  const handleSubmit = () => {
    setIsLoading(true);

    let query: any = {};
    if (searchParams) {
      query = qs.parse(searchParams.toString());
    }

    if (
      dateRange.startDate &&
      dateRange.endDate &&
      differenceInDays(dateRange.endDate, dateRange.startDate) > 0
    ) {
      query = {
        ...query,
        startDate: dateRange.startDate.toISOString(),
        endDate: dateRange.endDate.toISOString(),
      };
    }

    query = {
      ...query,
      longitude: coordinates?.longitude,
      latitude: coordinates?.latitude,
      bedroomMin: bedroomMin > 0 ? bedroomMin : null,
      bathroomMin: bathroomMin > 0 ? bathroomMin : null,
      guestMin: guestMin > 0 ? guestMin : null,
    };

    const url = qs.stringifyUrl(
      {
        url: "/",
        query,
      },
      {
        skipNull: true,
        skipEmptyString: true,
      },
    );

    router.push(url);

    filterModalStore.onClose();
    // initOptions();
    setIsLoading(false);
  };

  const bodyContent = (
    <div
      className="
        relative flex flex-col gap-4
      "
    >
      <FilterFolder
        initShown={true}
        title="When"
        subtitle="Choose the range you plan to stay"
      >
        <div
          className="
            relative flex flex-col gap-2 justify-center items-center
          "
        >
          <DatePicker
            range={dateRange}
            onChange={handleRangeChange}
            disabledDates={[]}
          />
          <div
            className="
              p-4 border-neutral-500 border-2 rounded-xl
              text-neutral-500 font-semibold
            "
          >
            {dateRange.startDate?.toDateString()} -{" "}
            {dateRange.endDate?.toDateString()}
          </div>
        </div>
      </FilterFolder>

      <FilterFolder
        initShown={false}
        title="Where"
        subtitle="Select the place you plan to stay"
      >
        <AddressInput
          id="address"
          label="address"
          address={address}
          onChange={setAddress}
          onSelect={onSelectLocation}
        />
        <MapBox
          defaultViewState={viewState}
          onMove={(e) => setViewState(e.viewState)}
          markers={coordinates && [coordinates]}
        />
      </FilterFolder>

      <FilterFolder
        initShown={false}
        title="Home Options"
        subtitle="Tell us more about your plan"
      >
        <Counter
          id="bedroomMin"
          label="Bedrooms more than"
          value={bedroomMin}
          onAdd={() => setBedroomMin(bedroomMin + 1)}
          onMinus={() => setBedroomMin(bedroomMin > 1 ? bedroomMin - 1 : 0)}
        />

        <Counter
          id="bathroomMin"
          label="Bathrooms more than"
          value={bathroomMin}
          onAdd={() => setBathroomMin(bathroomMin + 1)}
          onMinus={() => setBathroomMin(bathroomMin > 1 ? bathroomMin - 1 : 0)}
        />

        <Counter
          id="guestMin"
          label="Guest available more than"
          value={guestMin}
          onAdd={() => setGuestMin(guestMin + 1)}
          onMinus={() => setGuestMin(guestMin > 1 ? guestMin - 1 : 0)}
        />
      </FilterFolder>
    </div>
  );

  return (
    <Modal
      isOpen={filterModalStore.isOpen}
      disabled={isLoading}
      title="Filter Options"
      body={bodyContent}
      onClose={filterModalStore.onClose}
      onSubmit={handleSubmit}
      onSecondaryAction={initOptions}
      actionLabel="Search Places"
      secondaryActionLabel="Reset Options"
    />
  );
};

export default PlaceFilterModal;
