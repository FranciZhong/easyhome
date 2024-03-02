"use client";

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { FaDollarSign } from "react-icons/fa";

interface Props {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  formatPrice?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

const Input: React.FC<Props> = ({
  id,
  label,
  type = "text",
  disabled,
  required,
  formatPrice,
  register,
  errors,
}) => {
  return (
    <div className="w-full relative">
      {/* todo formatPrice */}
      {formatPrice && (
        <FaDollarSign
          size={18}
          className="
            absolute
            top-7
            left-4
            text-neutral-700
          "
        />
      )}
      {type !== "textarea" ? (
        <>
          <input
            id={id}
            disabled={disabled}
            {...register(id, { required })}
            type={type}
            placeholder=" "
            className={`
              peer
              w-full
              p-4
              pt-6
              font-light
              bg-white
              border-2
              rounded-md
              outline-green-800
              transition
              disabled:opacity-70
              disabled:cursor-not-allowed
              ${formatPrice ? "pl-9" : "pl-4"}
            `}
          />
          <label
            className={`
              absolute 
              text-sm
              duration-150 
              transform 
              -translate-y-3
              top-5 
              z-10
              origin-[0]
              ${formatPrice ? "left-9" : "left-4"}
              peer-placeholder-shown:scale-125
              peer-placeholder-shown:translate-y-0
              peer-focus:scale-75
              peer-focus:-translate-y-4
              ${errors[id] ? "text-rose-500" : "text-zinc-400"}
            `}
          >
            {label}
          </label>
        </>
      ) : (
        <textarea
          id={id}
          disabled={disabled}
          {...register(id, { required })}
          placeholder=" "
          className={`
          peer
          w-full
          p-4
          pt-6
          font-light
          bg-white
          border-2
          rounded-md
          outline-green-800
          transition
          disabled:opacity-70
          disabled:cursor-not-allowed
          ${formatPrice ? "pl-9" : "pl-4"}
        `}
        />
      )}
    </div>
  );
};

export default Input;
