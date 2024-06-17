import { signUp as signUpApi } from "@/_auth/apiAuth";
import { useMutation } from "@tanstack/react-query";

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
