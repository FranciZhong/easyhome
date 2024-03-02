"use client";

import { useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import Heading from "../Heading";
import IconBox from "../IconBox";

interface Props {
  initShown: boolean;
  title: string;
  subtitle?: string;
  children: any;
}

const FilterFolder: React.FC<Props> = ({
  initShown = false,
  title,
  subtitle,
  children,
}) => {
  const [isShown, setIsShown] = useState(initShown);

  return (
    <div
      className="
        relative w-full p-4
        flex flex-col gap-2
      "
    >
      <div
        onClick={() => setIsShown(!isShown)}
        className="
          relative w-full cursor-pointer
          flex flex-row gap-4 justify-between items-center
        "
      >
        <Heading title={title} subtitle={subtitle} />
        <IconBox
          useDark={true}
          isSmall={true}
          isOutline={true}
          onClick={() => {}}
        >
          <FaAngleDown size={24} />
        </IconBox>
      </div>
      {isShown && (
        <div
          className="
            relative flex flex-col gap-4
            justify-center items-center
          "
        >
          <hr />
          {children}
        </div>
      )}
    </div>
  );
};

export default FilterFolder;
