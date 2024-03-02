"use client";

import { IconType } from "react-icons";

interface Props {
  label: string;
  onClick: () => void;
  outline?: boolean;
  disabled?: boolean;
  small?: boolean;
  icon?: IconType;
}

const Button: React.FC<Props> = ({
  label,
  onClick,
  outline,
  disabled,
  small,
  icon: Icon,
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`
        relative
        disabled:opacity-50
        disabled:cursor-not-allowed
        rounded-lg
        hover:opacity-60
        transition
        w-full
        border-2
        border-green-800
        ${small ? "text-sm" : "text-md"}
        ${small ? "font-normal" : "font-semibold"}
        ${small ? "py-1" : "py-3"}
        ${outline ? "text-black" : "text-white"}
        ${outline ? "bg-white" : "bg-green-800"}
      `}
    >
      {Icon && (
        <Icon
          size={small ? 18 : 24}
          className={`
            absolute
            left-4
            ${small ? "top-1.5" : "top-3"}
          `}
        />
      )}
      {label}
    </button>
  );
};

export default Button;
