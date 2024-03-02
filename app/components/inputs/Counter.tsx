import { FaMinus, FaPlus } from "react-icons/fa";
import IconBox from "../IconBox";

interface Props {
  id: string;
  label: string;
  value: number;
  onAdd: () => void;
  onMinus: () => void;
}

const Counter: React.FC<Props> = ({ label, value, onAdd, onMinus }) => {
  return (
    <div
      className="
        flex
        flex-row
        items-center
        justify-between
        p-4
        w-full
      "
    >
      <div
        className="
          text-lg
          font-semibold
        "
      >
        {label}
      </div>
      <div
        className="
          flex
          flex-row
          items-center
          justify-center
          gap-4
        "
      >
        <IconBox useDark={false} isSmall={true} onClick={onMinus}>
          <FaMinus />
        </IconBox>
        <div
          className="
            text-lg
            font-semibold
          "
        >
          {value}
        </div>
        <IconBox useDark={true} isSmall={true} onClick={onAdd}>
          <FaPlus />
        </IconBox>
      </div>
    </div>
  );
};

export default Counter;
