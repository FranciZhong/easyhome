"use client";

import { IconType } from "react-icons";

interface Props {
  label: string;
  icon: IconType;
  size: number;
  flexCol?: boolean;
  selected: boolean;
  onClick: (label: string) => void;
}

const CategoryInput: React.FC<Props> = ({
  label,
  icon: Icon,
  size,
  flexCol,
  selected,
  onClick,
}) => {
  return (
    <div
      onClick={() => onClick(label)}
      className={`
        items-center
        rounded-xl
        border-2
        p-1
        md:p-2
        lg:p-3
        xl:p-4
        flex
        md: min-w-24
        ${flexCol ? "flex-row md:flex-col" : "flex-row"}
        gap-1
        hover:border-green-800
        cursor-pointer
        transition
        ${selected ? "text-green-800" : "text-neutral-500"}
        ${selected ? "border-neutral-500" : "border-neutral-300"}
      `}
    >
      <Icon size={size} />
      <div className="font-medium text-sm">{label}</div>
    </div>
  );
};

export default CategoryInput;
