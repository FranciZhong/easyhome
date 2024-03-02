"use client";

import PropertyCard from "@/app/components/property/PropertyCard";
import useLoginModalStore from "@/app/stores/useLoginModalStore";
import { PropertyDetailCO } from "@/app/types/property";
import { UserCO } from "@/app/types/user";
import { useRouter } from "next/navigation";

interface Props {
  currentUser: UserCO | null;
  favoratedList: PropertyDetailCO[];
}

const FavoratesClient: React.FC<Props> = ({ currentUser, favoratedList }) => {
  const router = useRouter();
  const loginModalStore = useLoginModalStore();
  if (!currentUser) {
    router.push("/");
    loginModalStore.onOpen();
  }

  return (
    <div
      className="
        pb-4
        pt-20
        grid
        grid-cols-1
        md:grid-cols-2
        lg:grid-cols-3
        xl:grid-cols-4
        gap-3
        overflow-x-hidden
        overflow-y-auto
      "
    >
      {favoratedList.map((item) => (
        <PropertyCard key={item.id} property={item} currentUser={currentUser} />
      ))}
    </div>
  );
};

export default FavoratesClient;
