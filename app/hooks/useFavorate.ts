import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import useLoginModalStore from "../stores/useLoginModalStore";
import { UserCO } from "../types/user";
import { catchClientError } from "../utils/httpHandler";

interface Props {
  currentUser: UserCO | null;
  propertyId: string;
}

const useFavorate = ({ currentUser, propertyId }: Props) => {
  const router = useRouter();
  const loginModalStore = useLoginModalStore();
  const isFavorated = useMemo(
    () =>
      currentUser?.favoriteIds != null &&
      currentUser.favoriteIds.includes(propertyId),
    [currentUser, propertyId],
  );

  const onToggle = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      if (!currentUser) {
        loginModalStore.onOpen();
        return;
      }

      const apiMethod = isFavorated ? axios.delete : axios.post;
      await catchClientError(
        () => apiMethod(`/api/favorate/${propertyId}`),
        () => {
          router.refresh();
        },
        () => {},
        () => {},
      );
    },
    [currentUser, propertyId, loginModalStore, router],
  );

  return {
    isFavorated,
    onToggle,
  };
};

export default useFavorate;
