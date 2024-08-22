import UserHeader from "../components/UserHeader";
import UserPost from "../components/UserPost";

function UserPage() {
  return (
    <>
      <UserHeader />
      <UserPost
        likes={120}
        replies={920}
        postImg="/post2.png"
        postTitle="Lorem ipsum dolor sit amet.
"
      />
      <UserPost
        likes={200}
        replies={220}
        postImg="/post1.png"
        postTitle="Lorem ipsum dolor sit amet.
"
      />
      <UserPost
        likes={420}
        replies={690}
        postImg="/post3.png"
        postTitle="Lorem ipsum dolor sit amet.
"
      />
    </>
  );
}

export default UserPage;
