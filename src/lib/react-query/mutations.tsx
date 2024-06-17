import { login as loginApi, signUp as signUpApi } from "@/_auth/apiAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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
