import { UserCO } from "@/app/types/user";
import Container from "../Container";
import Categories from "./Categories";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";

interface Props {
  currentUser: UserCO | null;
}

const NavBar: React.FC<Props> = ({ currentUser }) => {
  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div
        className="
          py-2
          md:p-3
          lg:p-4
          border-b-[1px]
        "
      >
        <Container>
          <div
            className="
              flex
              flex-row
              items-center
              justify-between
              gap-2
              md:gap-3
            "
          >
            <Logo />
            <Search />
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>
      <div className="border-b-[1px]">
        <Container>
          <Categories />
        </Container>
      </div>
    </div>
  );
};

export default NavBar;
