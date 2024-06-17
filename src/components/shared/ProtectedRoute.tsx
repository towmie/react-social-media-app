import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useUser } from "@/lib/react-query/mutations";
import Loader from "./Loader";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  align-items: center;
`;

function ProtectedRout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  // 1. load auth user
  const { isLoading, isAuthenticated } = useUser();

  // 2. if there is no auth user - redirect to login page

  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) navigate("/sign-in");
    },
    [isAuthenticated, isLoading, navigate]
  );

  if (isLoading)
    return (
      <FullPage>
        <Loader />
      </FullPage>
    );

  // 3. if there is a user - show dashboard
  if (isAuthenticated) return children;
}

export default ProtectedRout;
