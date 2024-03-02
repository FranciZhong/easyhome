import getCurrentUser from "./actions/getCurrentUser";
import getPropertyList, {
  QueryPropertyOptions,
} from "./actions/getPropertyList";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import PropertyCard from "./components/property/PropertyCard";

interface Props {
  searchParams: QueryPropertyOptions;
}

const Home: React.FC<Props> = async ({ searchParams }) => {
  // console.log(JSON.stringify(searchParams));

  const currentUser = await getCurrentUser();
  const propertyList = await getPropertyList(searchParams);

  if (!propertyList || propertyList.length === 0) {
    return <EmptyState />;
  }

  return (
    <Container>
      <div
        className="
					pt-32
          pb-4
					md:pt-44
					lg:pt-52
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
        {propertyList.map((item) => (
          <PropertyCard
            key={item.id}
            property={item}
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default Home;
