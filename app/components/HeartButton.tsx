import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import useFavorate from "../hooks/useFavorate";
import { UserCO } from "../types/user";

interface Props {
  propertyId: string;
  currentUser: UserCO | null;
}

const HeartButton: React.FC<Props> = ({ propertyId, currentUser }) => {
  const { isFavorated, onToggle } = useFavorate({
    propertyId,
    currentUser,
  });

  return (
    <div
      onClick={onToggle}
      className="
        relative
        w-max
        hover:opacity-50
        cursor-pointer
        transition
      "
    >
      <AiFillHeart
        size={28}
        className={`
          ${isFavorated ? "text-red-500" : "text-neutral-500/30"}
        `}
      />
      <AiOutlineHeart
        size={32}
        className="
          absolute
          text-white
          -top-[2px]
          -left-[2px]
        "
      />
    </div>
  );
};

export default HeartButton;
