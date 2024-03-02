import { IconType } from "react-icons";

interface Props {
  label: string;
  icon: IconType;
  description: string;
}

const CategoryInfo: React.FC<Props> = ({ label, icon: Icon, description }) => {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex flex-row font-semibold underline text-lg gap-2">
        <Icon size={24} />
        {label}
      </div>
      <div className="font-light text-base text-neutral-500">{description}</div>
    </div>
  );
};

export default CategoryInfo;
