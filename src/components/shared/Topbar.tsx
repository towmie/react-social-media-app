import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useSignOutAccount } from "@/lib/react-query/mutations";
import { useEffect } from "react";
import { useUserContext } from "@/context/AuthContext";

export default function Topbar() {
  const { mutate: signOut, isSuccess } = useSignOutAccount();
  const navifate = useNavigate();
  const { user } = useUserContext();

  useEffect(() => {
    if (isSuccess) navifate(0);
  }, [isSuccess]);

  return (
    <section className="topbar">
      <div className="flex-between py-4 px-5">
        <Link to="/" className="flex gap-3 items-center">
          <img
            src="/assets/images/logo.svg"
            alt="logo"
            width={325}
            height={130}
          />
        </Link>
        <div className="flex gap-4">
          <Button
            variant="ghost"
            className="shad-button_ghost"
            onClick={() => signOut}
          >
            <img src="/assets/icons/logout.svg" alt="logout" />
          </Button>
        </div>
        <Link to={`/profile/${user.id}`} className="flex-center gap-3">
          <img
            src={user.imageURL || "/assets/icons/profile-placeholder.svg"}
            alt="profile"
            className="rounded-full h-8 w-8"
          />
        </Link>
      </div>
    </section>
  );
}