"use client";

import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { IconType } from "react-icons";
import CategoryInput from "../inputs/CategoryInput";

interface Props {
  label: string;
  icon: IconType;
  selected: boolean;
}

const CategoryBox: React.FC<Props> = (props) => {
  const router = useRouter();
  const param = useSearchParams();

  const handleClick = (label: string) => {
    let query: any = {};
    if (param) {
      query = qs.parse(param.toString());
    }

    if (query?.category === label) {
      delete query.category;
    } else {
      query = {
        ...query,
        category: label,
      };
    }

    const url = qs.stringifyUrl(
      {
        url: "/",
        query,
      },
      { skipNull: true },
    );

    router.push(url);
  };

  return (
    <CategoryInput {...props} flexCol={true} size={24} onClick={handleClick} />
  );
};

export default CategoryBox;
