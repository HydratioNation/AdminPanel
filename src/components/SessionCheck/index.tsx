import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const CheckSession = () => {
  const router = useRouter();
  const data = useSession();
  if (data.status === "unauthenticated") {
    return router.push("/");
  }
  //console.log(data.status);
  return data.status;
};

export default CheckSession;
