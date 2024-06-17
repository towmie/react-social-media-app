import PostForm from "@/components/forms/PostForm";
import Loader from "@/components/shared/Loader";
// import { useGetPostById } from "@/lib/react-query/mutations";
import { useParams } from "react-router-dom";

export default function UpdatePost() {
  // const { postId } = useParams<{ postId: string }>();
  // const { data: post, isPending } = useGetPostById(postId || "");

  // if (isPending) return <Loader />;

  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="max-w-5xl flex-start justify-start w-full gap-3">
          <img
            src="/assets/icons/add-post.svg"
            alt="add post"
            width={36}
            height={36}
          />
          <h2 className="h3-bold md:h2-bold text-left w-full">Edit Post</h2>
        </div>
        {/* <PostForm action="update" post={post} /> */}
      </div>
    </div>
  );
}
