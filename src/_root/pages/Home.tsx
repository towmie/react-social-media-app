import Loader from "@/components/shared/Loader";
import PostCard from "@/components/shared/PostCard";
// import { useGetRecentPosts } from "@/lib/react-query/mutations";

export default function Home() {
  // const isPostLoading = true;
  // const posts = null;
  // const { data: posts, isPending: isPostLoading } = useGetRecentPosts();
  return (
    <div className="flex flex-1">
      <div className="home-container">
        <div className="home-posts">
          <h2 className="h3-bold md:h2-bold w-full text-left">Home Feed</h2>
          {/* {isPostLoading && !posts ? (
            <Loader />
          ) : (
            <ul className="flex flex-1 flex-col gap-9 w-full">
              {posts?.documents.map((post: Models.Document) => (
                <PostCard key={post.caption} post={post} />
              ))}
            </ul>
          )} */}
        </div>
      </div>
    </div>
  );
}
