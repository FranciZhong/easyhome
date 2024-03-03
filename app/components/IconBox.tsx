import { useMemo } from "react";

interface Props {
  useDark: boolean;
  isSmall?: boolean;
  isOutline?: boolean;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  children: any;
}

const IconBox: React.FC<Props> = ({
  useDark,
  isSmall,
  isOutline,
  onClick,
  children,
}) => {
  // const styleColor = useDark ? "green-800" : "green-300";
  const styleColor = useMemo(() => {
    return useDark ? "green-800" : "green-300";
  }, [useDark]);

  // todo useDark bug

  return (
    <div
      onClick={onClick}
      className={`
        ${isSmall ? "p-1" : "p-2"}
        rounded-full
        
        text-${isOutline ? styleColor : "white"}
        bg-${isOutline ? "white" : styleColor}
        hover:${isOutline ? "text" : "bg"}-green-500
        transition
        cursor-pointer
      `}
    >
      {children}
    </div>
  );
};

export default IconBox;
