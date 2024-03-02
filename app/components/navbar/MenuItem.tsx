interface Props {
  label: string;
  onClick: () => void;
}

const MenuItem: React.FC<Props> = ({ label, onClick }) => {
  return (
    <div
      className="
        z-20
        px-4
        py-2
        bg-white
        hover:bg-neutral-200
        transition
        font-semibold
      "
      onClick={onClick}
    >
      {label}
    </div>
  );
};

export default MenuItem;
