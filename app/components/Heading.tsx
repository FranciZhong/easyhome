import { title } from "process";

interface Props {
  title: string;
  subtitle?: string;
  center?: boolean;
}

const Heading: React.FC<Props> = ({ title, subtitle, center }) => {
  return (
    <div className={center ? "text-center" : "text-start"}>
      <div className="text-2xl font-bold">{title}</div>
      {subtitle && (
        <div className="mt-2 font-light text-neutral-500">{subtitle}</div>
      )}
    </div>
  );
};

export default Heading;
