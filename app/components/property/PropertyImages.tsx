"use client";

import Image from "next/image";
import { useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { PropertyCO } from "../../types/property";
import { UserCO } from "../../types/user";
import HeartButton from "../HeartButton";
import IconBox from "../IconBox";

interface Props {
  property: PropertyCO;
  currentUser: UserCO | null;
}

const PropertyImages: React.FC<Props> = ({ property, currentUser }) => {
  const [imagesIdx, setImagesIdx] = useState(0);

  const nextImage = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setImagesIdx((prevIndex) => (prevIndex + 1) % property.images.length);
  };

  const prevImage = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setImagesIdx(
      (prevIndex) =>
        (prevIndex - 1 + property.images.length) % property.images.length,
    );
  };

  return (
    <div
      className="
          relative
          aspect-[1.25]
          max-w-4xl
          rounded-xl
          overflow-hidden
        "
    >
      <Image
        src={property.images[imagesIdx] || "/images/property-alt.png"}
        alt="Place Image"
        className="
            object-cover
            object-center
            h-full
            w-full
            group-hover:scale-110
            transition
          "
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      <div
        className="
            absolute
            top-3
            right-3
          "
      >
        <HeartButton propertyId={property.id} currentUser={currentUser} />
      </div>
      {property.images?.length > 1 && (
        <>
          <div
            className="
                absolute
                top-1/2
                left-2
                opacity-50
                hover:opacity-80
              "
          >
            <IconBox
              useDark={true}
              isSmall={true}
              isOutline={true}
              onClick={(e) => prevImage(e)}
            >
              <FaAngleLeft size={20} />
            </IconBox>
          </div>
          <div
            className="
                absolute
                top-1/2
                right-2
                opacity-50
                hover:opacity-80
              "
          >
            <IconBox
              useDark={true}
              isSmall={true}
              isOutline={true}
              onClick={(e) => nextImage(e)}
            >
              <FaAngleRight size={20} />
            </IconBox>
          </div>
        </>
      )}
    </div>
  );
};

export default PropertyImages;
