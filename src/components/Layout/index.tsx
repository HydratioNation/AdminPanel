import react from "react";
import CheckSession from "../SessionCheck";
import Nav from "../Nav";
import { getServerSession } from "next-auth";

type PropsType = {
  children: React.ReactElement;
};

const Layout = ({ children }: PropsType) => {
  let info: react.JSXElementConstructor<string> = children.type;
  CheckSession();

  return (
    <div className="parent">
      {info.name !== "Home" ? <Nav /> : ""}

      <main>{children}</main>
    </div>
  );
};

export default Layout;
