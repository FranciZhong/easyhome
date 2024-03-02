import Image from "next/image";

interface Props {
  image: string | null | undefined;
}

const Avatar: React.FC<Props> = ({ image }) => {
  return (
    <Image
      className="rounded-full"
      src={image || "/images/avatar-default.png"}
      alt="Avatar"
      height="30"
      width="30"
    />
  );
};

export default Avatar;
