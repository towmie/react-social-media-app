import {
  getCurrentUser,
  login as loginApi,
  logout as logOutApi,
  signUp as signUpApi,
} from "@/_auth/apiAuth";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

type SignUpProps = {
  full_name: string;
  email: string;
  password: string;
};

export function useSignUp() {
  const { mutate: signUp, isPending } = useMutation({
    mutationFn: (credentials: SignUpProps) => signUpApi(credentials),
  });
  return { signUp, isPending };
}

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: login, isPending } = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      loginApi({ email, password }),
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user.user);
      navigate("/", { replace: true });
    },
    onError: (err) => {
      console.log(err);
    },
  });

  return { login, isPending };
}

export function useUser() {
  const { data: user, isLoading } = useQuery({
    queryFn: () => getCurrentUser(),
    queryKey: ["user"],
  });

  return { user, isLoading, isAuthenticated: user?.role === "authenticated" };
}

export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: logout } = useMutation({
    mutationFn: () => logOutApi(),
    onSuccess: () => {
      queryClient.setQueryData(["user"], null);
      navigate("/sign-in", { replace: true });
    },
  });

  return { logout };
}
