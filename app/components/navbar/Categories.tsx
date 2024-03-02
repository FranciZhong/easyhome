"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { BsSnow } from "react-icons/bs";
import { FaSkiing, FaUmbrellaBeach } from "react-icons/fa";
import {
  GiBarn,
  GiBoatFishing,
  GiCactus,
  GiCastle,
  GiCaveEntrance,
  GiForestCamp,
  GiIsland,
} from "react-icons/gi";
import { IoDiamond } from "react-icons/io5";
import { MdVilla } from "react-icons/md";
import { TbMountain, TbPool } from "react-icons/tb";
import CategoryBox from "../category/CategoryBox";

export const categories = [
  {
    label: "Modern",
    icon: MdVilla,
    description: "This property is modern!",
  },
  {
    label: "Beach",
    icon: FaUmbrellaBeach,
    description: "This property is close to beach!",
  },
  {
    label: "Countryside",
    icon: TbMountain,
    description: "This property is in the countryside!",
  },
  {
    label: "Pools",
    icon: TbPool,
    description: "This is property has a beautiful pool!",
  },
  {
    label: "Islands",
    icon: GiIsland,
    description: "This property is on an island!",
  },
  {
    label: "Lake",
    icon: GiBoatFishing,
    description: "This property is near a lake!",
  },
  {
    label: "Skiing",
    icon: FaSkiing,
    description: "This property has skiing activies!",
  },
  {
    label: "Castles",
    icon: GiCastle,
    description: "This property is an ancient castle!",
  },
  {
    label: "Caves",
    icon: GiCaveEntrance,
    description: "This property is in a spooky cave!",
  },
  {
    label: "Camping",
    icon: GiForestCamp,
    description: "This property offers camping activities!",
  },
  {
    label: "Arctic",
    icon: BsSnow,
    description: "This property is in arctic environment!",
  },
  {
    label: "Desert",
    icon: GiCactus,
    description: "This property is in the desert!",
  },
  {
    label: "Barns",
    icon: GiBarn,
    description: "This property is in a barn!",
  },
  {
    label: "Lux",
    icon: IoDiamond,
    description: "This property is brand new and luxurious!",
  },
];

const Categories = () => {
  const params = useSearchParams();
  const categoty = params?.get("category");
  const pathname = usePathname();

  if (pathname !== "/") {
    return null;
  }

  return (
    <div
      className="
        py-1
        md:p-2
        lg:p-4
        flex
        flex-row
        items-center
        justify-between
        gap-2
        overflow-x-auto
      "
    >
      {categories.map((item) => (
        <CategoryBox
          key={item.label}
          {...item}
          selected={categoty === item.label}
        />
      ))}
    </div>
  );
};

export default Categories;
