import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { createUserAccount, signInAccount } from "./api";
import { INewUser } from "@/types";

export function useCreateUserAccount() {
  const { mutate: createNewUser, isLoading: isCreatingUser } = useMutation({
    mutationFn: (user: INewUser) => createUserAccount(user),
  });

  return { createNewUser, isCreatingUser };
}

export function useSignInAccount() {
  const { mutate: signIn, isLoading: isSigningIn } = useMutation({
    mutationFn: (user: { email: string; password: string }) =>
      signInAccount(user),
  });

  return { signIn, isSigningIn };
}
