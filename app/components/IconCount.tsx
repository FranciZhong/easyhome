import { IconType } from "react-icons";

interface Props {
  icon: IconType;
  count: number;
}

const IconCount: React.FC<Props> = ({ icon: Icon, count }) => {
  return (
    <div className="flex flex-row items-center gap-1">
      <Icon size={24} />
      {count}
    </div>
  );
};

export default IconCount;
