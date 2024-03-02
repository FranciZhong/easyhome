"use client";

import { PropertyCO } from "@/app/types/property";
import { UserCO } from "@/app/types/user";
import { useRouter } from "next/navigation";
import {
  MdOutlineBathtub,
  MdOutlineBed,
  MdOutlinePeople,
} from "react-icons/md";
import Heading from "../Heading";
import IconCount from "../IconCount";
import PropertyImages from "./PropertyImages";

interface Props {
  property: PropertyCO;
  currentUser: UserCO | null;
}

const PropertyCard: React.FC<Props> = ({ property, currentUser }) => {
  const router = useRouter();

  return (
    <div
      onClick={() => {
        router.push(`/place/${property.id}`);
      }}
      className="
        col-span-1
        group
        rounded-xl
        cursor-pointer
        overflow-hidden
        shadow-md
        hover:shadow-xl
        flex
        flex-col
        justify-between
      "
    >
      <PropertyImages property={property} currentUser={currentUser} />
      <div
        className="
          flex
          flex-row
          justify-start
          p-3
        "
      >
        <Heading
          title={
            property.title.length > 24
              ? property.title.slice(0, 21) + "..."
              : property.title
          }
          subtitle={
            property.address.length > 64
              ? property.address.slice(0, 61) + "..."
              : property.address
          }
        />
      </div>
      <div
        className="
          flex
          flex-row
          justify-between
          items-center
          p-3
        "
      >
        <div>
          <span className="font-semibold underline">{property.price}</span>
          <span>$ / night</span>
        </div>
        <div
          className="
            flex
            flex-row
            gap-2
            font-light
            text-neutral-800
            justify-center
            items-center
          "
        >
          <IconCount icon={MdOutlineBed} count={property.bedroomCount} />
          <IconCount icon={MdOutlineBathtub} count={property.bathroomCount} />
          <IconCount icon={MdOutlinePeople} count={property.guestCount} />
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
