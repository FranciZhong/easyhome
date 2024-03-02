import Image from "next/image";

interface Props {
  image: string;
  children: any;
}

const ImageBox: React.FC<Props> = ({ image, children }) => {
  return (
    <div
      className="
        relative
        flex
        flex-rol
        justify-center
      "
    >
      <div
        className="
          relative
          flex
          flex-col
          justify-center
          items-center
        "
      >
        {children}
        <Image key={image} src={image} alt="image" width={240} height={160} />
      </div>
    </div>
  );
};

export default ImageBox;
