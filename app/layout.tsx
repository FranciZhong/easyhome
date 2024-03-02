import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import getCurrentUser from "./actions/getCurrentUser";
import AddPropertyModal from "./components/modals/AddPropertyModal";
import LoginModal from "./components/modals/LoginModal";
import PlaceFilterModal from "./components/modals/PlaceFilterModal";
import RegisterModal from "./components/modals/RegisterModal";
import NavBar from "./components/navbar/NavBar";
import "./globals.css";
import ToastProvider from "./providers/ToastProvider";
import { convertUser2CO } from "./types/user";

const font = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Easy Home",
  description: "Find your next home easily all around the world.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser();
  const userInfo = currentUser == null ? null : convertUser2CO(currentUser);

  return (
    <html lang="en">
      <body className={font.className}>
        <ToastProvider />
        <RegisterModal />
        <LoginModal />
        <AddPropertyModal />
        <PlaceFilterModal />
        <NavBar currentUser={userInfo} />
        {children}
      </body>
    </html>
  );
}
