import { IconType } from "react-icons";
import {
  MdOutlineBathtub,
  MdOutlineBed,
  MdOutlinePeople,
} from "react-icons/md";
import Avatar from "../Avatar";
import IconCount from "../IconCount";
import CategoryInfo from "../category/CategoryInfo";

interface Props {
  user: {
    name: string | null;
    image: string | null;
  };
  bedroomCount: number;
  bathroomCount: number;
  guestCount: number;
  description: string;
  category:
    | {
        label: string;
        icon: IconType;
        description: string;
      }
    | undefined;
}

const PropertyDescription: React.FC<Props> = ({
  user,
  bedroomCount,
  bathroomCount,
  guestCount,
  description,
  category,
}) => {
  return (
    <div
      className="
        relative
        flex
        flex-col
        gap-4
        md:gap-6
      "
    >
      <div
        className="
          flex
          flex-row
          gap-2
          items-center
          font-bold
          text-xl
          w-full
        "
      >
        <div>Hosted by {user.name || "Anonymous"}</div>
        <Avatar image={user.image || "/images/avatar-default.png"} />
      </div>

      <div className="font-semibold text-light text-neutral-800 pb-4">
        {description}
      </div>
      {category && <CategoryInfo {...category} />}

      <div
        className="
            flex
            flex-row
            gap-4
            font-light
            text-neutral-500
            justify-start
            items-center
          "
      >
        <IconCount icon={MdOutlineBed} count={bedroomCount} />
        <IconCount icon={MdOutlineBathtub} count={bathroomCount} />
        <IconCount icon={MdOutlinePeople} count={guestCount} />
      </div>
    </div>
  );
};

export default PropertyDescription;
