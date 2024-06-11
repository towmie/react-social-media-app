import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { create } from "domain";
import {
  createPost,
  createUserAccount,
  getPosts,
  signInAccount,
  signOutAccount,
} from "../appwrite/api";
import { INewPost, INewUser } from "@/types";
import { QUERY_KEYS } from "./queryKeys";

export function useCreateUserAccount() {
  return useMutation({
    mutationFn: (user: INewUser) => createUserAccount(user),
  });
}

export function useSignInAccount() {
  return useMutation({
    mutationFn: (user: { email: string; password: string }) =>
      signInAccount(user),
  });
}
export function useSignOutAccount() {
  return useMutation({
    mutationFn: signOutAccount,
  });
}

export function useCreatePost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (post: INewPost) => createPost(post),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      });
    },
  });
}

export function useGetRecentPosts() {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_POSTS],
    queryFn: () => getPosts(),
  });
}
