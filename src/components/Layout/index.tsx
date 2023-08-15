import react from "react";
import CheckSession from "../SessionCheck";
import Nav from "../Nav";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";

type PropsType = {
  children: React.ReactElement;
};

const Layout = ({ children }: PropsType) => {
  CheckSession();
  const { data: session, status } = useSession();

  return (
    <div className="parent">
      {status === "authenticated" ? <Nav /> : ""}

      <main>{children}</main>
    </div>
  );
};

export default Layout;
