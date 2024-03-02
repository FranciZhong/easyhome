"use client";

import Heading from "@/app/components/Heading";
import MapBox, { ViewState } from "@/app/components/MapBox";
import { categories } from "@/app/components/navbar/Categories";
import PropertyDescription from "@/app/components/property/PropertyDescription";
import PropertyImages from "@/app/components/property/PropertyImages";
import PropertyReservation from "@/app/components/property/PropertyReservation";
import useLoginModalStore from "@/app/stores/useLoginModalStore";
import { PropertyDetailCO } from "@/app/types/property";
import { ReservationCO } from "@/app/types/reservation";
import { UserCO } from "@/app/types/user";
import { catchClientError } from "@/app/utils/httpHandler";
import axios from "axios";
import { differenceInDays, eachDayOfInterval } from "date-fns";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Range } from "react-date-range";
import { toast } from "react-toastify";

interface Props {
  property: PropertyDetailCO;
  currentUser: UserCO | null;
  reservations: ReservationCO[];
}

const initDateRange: Range = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

const PlaceClient: React.FC<Props> = ({
  property,
  currentUser,
  reservations,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const loginModelStore = useLoginModalStore();

  const category = useMemo(() => {
    return categories.find((item) => item.label === property.category);
  }, [property.category]);

  const [viewState, setViewState] = useState<ViewState>({
    longitude: property.location[0],
    latitude: property.location[1],
    zoom: 10,
  });

  const [totalDays, setTotalDays] = useState(0);
  const [dateRange, setDateRange] = useState(initDateRange);

  const disabledDates = useMemo(() => {
    let dates: Date[] = [];
    reservations.forEach((item) => {
      const range = eachDayOfInterval({
        start: new Date(item.startAt),
        end: new Date(item.endAt),
      });

      dates = [...dates, ...range];
    });

    return dates;
  }, [reservations]);

  const handleDateChange = (range: Range) => {
    if (range.startDate && range.endDate && range.startDate > range.endDate) {
      range = {
        ...range,
        startDate: range.endDate,
        endDate: range.startDate,
      };
    }

    setDateRange(range);
  };

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInDays(dateRange.startDate, dateRange.endDate);
      setTotalDays(Math.abs(dayCount));
    }
  }, [dateRange]);

  const handleReserve = async () => {
    if (!currentUser) {
      toast.error("Login to continue!");
      loginModelStore.onOpen();
      return;
    }

    if (currentUser.id === property.user.id) {
      toast.error("Cannot reserve your own property!");
      return;
    }

    if (totalDays < 1) {
      toast.error("Must select one night as least.");
      return;
    }

    setIsLoading(true);
    await catchClientError(
      async () => {
        return axios.post("/api/property/reserve", {
          propertyId: property.id,
          startAt: dateRange.startDate?.toISOString(),
          endAt: dateRange.endDate?.toISOString(),
        });
      },
      () => {
        setDateRange(initDateRange);
        toast.info("Successfully reserve this place!");
        // todo route to my reservation page
        router.refresh();
      },
      () => {
        router.refresh();
      },
      () => {
        setIsLoading(false);
      },
    );
  };

  return (
    <div
      className="
        relative
        flex
        flex-col
        gap-4
        md:gap-8
        lg:gap-12
        max-w-screen-lg 
        mx-auto
        py-6
        px-2
        md:px-4
        lg:px-8
        w-full
      "
    >
      <Heading title={property.title} subtitle={property.address} />

      <PropertyImages property={property} currentUser={currentUser} />

      <hr />

      <PropertyDescription {...property} category={category} />

      <hr />

      <div
        className="
          relative
          grid
          grid-cols-1
          md:grid-cols-7
          gap-10
          items-center
          w-full
        "
      >
        <div
          className="
            col-span-4
            flex
            flex-col
            gap-4
            w-full
          "
        >
          <MapBox
            defaultViewState={viewState}
            onMove={(e) => setViewState(e.viewState)}
            markers={[
              {
                longitude: property.location[0],
                latitude: property.location[1],
              },
            ]}
          />
        </div>
        <div
          className="
            relative
            col-span-3
            w-full
          "
        >
          <PropertyReservation
            totalDays={totalDays}
            totalPrice={totalDays * property.price}
            dateRange={dateRange}
            onDateChange={handleDateChange}
            onSubmit={handleReserve}
            disabled={isLoading}
            disabledDates={disabledDates}
          />
        </div>
      </div>

      <hr />
    </div>
  );
};

export default PlaceClient;
