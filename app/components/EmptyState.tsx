"use client";

import { useRouter } from "next/navigation";
import Button from "./Button";
import Heading from "./Heading";

interface Props {
  title?: string;
  subtitle?: string;
  resetParam?: boolean;
}

const EmptyState = ({
  title = "No results found",
  subtitle = "Change or reset the filter to find other matching results.",
}) => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/");
  };

  return (
    <div
      className="
        flex
        flex-col
        gap-8
        justify-center
        items-center
        h-full
        max-w-sm
        mx-auto
      "
    >
      <Heading title={title} subtitle={subtitle} />
      <Button label="Reset" onClick={handleClick} />
    </div>
  );
};

export default EmptyState;
