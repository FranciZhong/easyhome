"use client";

import { useCallback, useEffect, useState } from "react";
import { FaWindowClose } from "react-icons/fa";
import Button from "../Button";

interface Props {
  isOpen?: boolean;
  disabled?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  onSecondaryAction?: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  secondaryActionLabel?: string;
}

const Modal: React.FC<Props> = ({
  isOpen,
  disabled,
  onClose,
  onSubmit,
  onSecondaryAction,
  title,
  body,
  footer,
  actionLabel,
  secondaryActionLabel,
}) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }

    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 500);
  }, [onClose, disabled]);

  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }

    onSubmit();
  }, [onSubmit, disabled]);

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !onSecondaryAction) {
      return;
    }

    onSecondaryAction();
  }, [onSecondaryAction, disabled]);

  if (!showModal) {
    return null;
  }

  return (
    <div
      className="
        justify-center
        items-center
        flex
        fixed
        inset-0
        outline-none
        z-50
        bg-neutral-800/70
      "
    >
      <div
        className="
          flex
          flex-col
          bg-white
          rounded-lg
          w-full
          md:w-2/3
          lg:w-1/2
          xl:w-2/5
          h-full
          md:h-3/4
        "
      >
        {/* heading */}
        <div
          className="
            relative
            flex
            justify-center
            p-6
            md:p-4
            lg:p-5
            xl:p-6
            border-b-[1px]
          "
        >
          <button
            className="
              p-1
              border-0
              hover:opacity-60
              absolute
              left-6
            "
            onClick={handleClose}
          >
            <FaWindowClose size={18} className="text-green-500" />
          </button>
          <div
            className="
              text-lg
              font-semibold
            "
          >
            {title}
          </div>
        </div>
        {/* body */}
        <div
          className="
            relative
            p-6
            flex-auto
            overflow-y-auto
          "
        >
          {body}
        </div>
        {/* footer */}
        <div
          className="
            flex
            flex-col
            gap-2
            p-6
          "
        >
          <div
            className="
              flex
              flex-row
              items-center
              gap-4
              w-full
            "
          >
            {secondaryActionLabel && onSecondaryAction && (
              <Button
                disabled={disabled}
                onClick={handleSecondaryAction}
                label={secondaryActionLabel}
                outline
              />
            )}
            <Button
              disabled={disabled}
              onClick={handleSubmit}
              label={actionLabel}
            />
          </div>
          {footer}
        </div>
      </div>
    </div>
  );
};

export default Modal;
