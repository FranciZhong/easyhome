import getCurrentUser from "@/app/actions/getCurrentUser";
import getPropertyById from "@/app/actions/getPropertyById";
import getReservationList from "@/app/actions/getReservationList";
import Container from "@/app/components/Container";
import PlaceClient from "./PlaceClient";

interface Props {
  params: {
    propertyId: string;
  };
}

const PropertyPage: React.FC<Props> = async ({ params }) => {
  const currentUser = await getCurrentUser();
  const property = await getPropertyById(params.propertyId);
  const reservations = await getReservationList({
    propertyId: params.propertyId,
  });

  if (!property) {
    // todo
    return <div className="p-20">Not Found</div>;
  }

  return (
    <div
      className="
        pt-20
      "
    >
      <Container>
        <PlaceClient
          property={property}
          currentUser={currentUser}
          reservations={reservations}
        />
      </Container>
    </div>
  );
};

export default PropertyPage;
