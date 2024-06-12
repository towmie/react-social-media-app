import {
  useDeletePosts,
  useGetCurrnetUser,
  useLikedPosts,
  useSavedPosts,
} from "@/lib/react-query/mutations";
import { checkIsLiked } from "./../../../@/lib/utils";
import { Models } from "appwrite";
import { useEffect, useState } from "react";
import Loader from "./Loader";

type PostStatsProps = {
  post: Models.Document;
  userId: string;
};

function PostStats({ post, userId }: PostStatsProps) {
  const likesList = post.map((user: Models.Document) => user.$id);

  const [likes, setLikes] = useState(likesList);
  const [saved, setSaved] = useState(false);
  const { mutate: likePost } = useLikedPosts();
  const { mutate: savePost, isPending: isSaving } = useSavedPosts();
  const { mutate: deleteSavedPost, isPending: isDeletingSaved } =
    useDeletePosts();

  const { data: currentUser } = useGetCurrnetUser();

  const savedPostRecord = currentUser?.savedPosts.find(
    (record: Models.Document) => record.post.$id === post.$id
  );

  useEffect(() => {
    setSaved(!!savedPostRecord);
  }, [currentUser]);

  function handleLikePost(e: React.MouseEvent) {
    e.stopPropagation();

    let newLikes = [...likes];
    const hasLiked = newLikes.includes(userId);

    if (hasLiked) {
      newLikes = newLikes.filter((id) => id !== userId);
    } else {
      newLikes.push(userId);
    }

    setLikes(newLikes);
    likePost({ postId: post.$id, likedArray: newLikes });
  }

  function handleSavePost(e: React.MouseEvent) {
    e.stopPropagation();

    if (savedPostRecord) {
      setSaved(false);
      deleteSavedPost(savedPostRecord.$id);
    } else {
      savePost({ postId: post.$id, userId });
      setSaved(true);
    }
  }

  return (
    <div className="flex justify-between items-center z-20">
      <div className="flex gap-2 mr-5">
        <img
          src={
            checkIsLiked(likes, userId)
              ? "/assets/icons/liked.svg"
              : "/assets/icons/like.svg"
          }
          alt="likes"
          width={20}
          height={20}
          onClick={handleLikePost}
          className="cursor-pointer"
        />
        <p className="small-medium lg:base-medium text-light-3">
          {likes.length}
        </p>
      </div>
      <div className="flex gap-2 ">
        {isDeletingSaved || isSaving ? (
          <Loader />
        ) : (
          <img
            src={saved ? "/assets/icons/saved.svg" : "/assets/icons/save.svg"}
            alt="likes"
            width={20}
            height={20}
            onClick={handleSavePost}
            className="cursor-pointer"
          />
        )}
      </div>
    </div>
  );
}

export default PostStats;
