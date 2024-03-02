import getCurrentUser from "@/app/actions/getCurrentUser";
import getPropertyByIds from "@/app/actions/getPropertyByIds";
import Container from "@/app/components/Container";
import EmptyState from "@/app/components/EmptyState";
import FavoratesClient from "./FavoratesClient";

const FavoratesPage = async () => {
  const currentUser = await getCurrentUser();

  const favorateIds = currentUser?.favoriteIds || [];
  const favoratedProperties = await getPropertyByIds(favorateIds);

  if (!favoratedProperties || favoratedProperties.length === 0) {
    return <EmptyState />;
  }

  return (
    <Container>
      <FavoratesClient
        currentUser={currentUser}
        favoratedList={favoratedProperties}
      />
    </Container>
  );
};

export default FavoratesPage;
