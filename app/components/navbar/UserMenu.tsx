"use client";

import useAddPropertyStore from "@/app/stores/useAddPropertyStore";
import useLoginModalStore from "@/app/stores/useLoginModalStore";
import useRegisterModalStore from "@/app/stores/useRegisterModalStore";
import { UserCO } from "@/app/types/user";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { HiOutlineMenu } from "react-icons/hi";
import { toast } from "react-toastify";
import Avatar from "../Avatar";
import IconBox from "../IconBox";
import MenuItem from "./MenuItem";

interface Props {
  currentUser: UserCO | null;
}

const UserMenu: React.FC<Props> = ({ currentUser }) => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const loginModalStore = useLoginModalStore();
  const registerModalStore = useRegisterModalStore();
  const addPropertyStore = useAddPropertyStore();

  const toggleMenuOpen = useCallback(() => {
    setIsMenuOpen((value) => !value);
  }, []);

  const handleClickLogin = useCallback(() => {
    setIsMenuOpen(false);
    loginModalStore.onOpen();
  }, []);

  const handleClickRegister = useCallback(() => {
    setIsMenuOpen(false);
    registerModalStore.onOpen();
  }, []);

  const handleClickSignOut = useCallback(() => {
    setIsMenuOpen(false);
    signOut();
  }, []);

  const handleClickFavorates = useCallback(() => {
    setIsMenuOpen(false);
    router.push("/my/favorates");
  }, []);

  const handleClickAdd = useCallback(() => {
    if (currentUser) {
      addPropertyStore.onOpen();
    } else {
      toast.info("Log in to add your place.");
      loginModalStore.onOpen();
    }
  }, [currentUser]);

  return (
    <div
      className="
        flex
        flex-row
        items-center
        justify-between
        gap-2
      "
    >
      <IconBox useDark={true} onClick={handleClickAdd}>
        <FaPlus />
      </IconBox>
      <div
        className="
        flex
        flex-row
        items-center
        p-2
        md:px-3
        border-[1px]
        border-neutral-200
        rounded-full
        cursor-pointer
        hover:shadow-md
        transition
      "
        onClick={toggleMenuOpen}
      >
        <div className="p-2">
          <HiOutlineMenu />
        </div>
        <div className="hidden md:block">
          <Avatar image={currentUser?.image} />
        </div>
      </div>

      {isMenuOpen && (
        <div
          className="
            absolute
            right-0
            top-16
            rounded-xl
            bg-white
            shadow-md
            w-[40vw]
            md:w-[20vw]
            text-sm
            cursor-pointer
          "
        >
          {currentUser ? (
            <>
              <MenuItem label="Favorates" onClick={handleClickFavorates} />
              <MenuItem label="Logout" onClick={handleClickSignOut} />
            </>
          ) : (
            <>
              <MenuItem label="Login" onClick={handleClickLogin} />
              <MenuItem label="Sign up" onClick={handleClickRegister} />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default UserMenu;
