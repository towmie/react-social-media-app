import GridPostsList from "@/components/shared/GridPostsList";
import Loader from "@/components/shared/Loader";
import SearchResults from "@/components/shared/SearchResults";
import { Input } from "@/components/ui/input";
import useDebounce from "@/hooks/useDebounce";
import { useGetPosts, useSearchPost } from "@/lib/react-query/mutations";
import { useState } from "react";

export default function Explore() {
  const { data: posts, fetchNextPage, hasNextPage } = useGetPosts();
  const [searchValue, setSearchValue] = useState("");
  const { data: searchdPosts, isPending: isSearchLoading } =
    useSearchPost(searchValue);
  const debounceValue = useDebounce(searchValue, 500);

  if (!posts) {
    return (
      <div className="fex-center w-full h-full">
        <Loader />
      </div>
    );
  }

  const showSearchResults = searchValue !== "";
  const showPosts =
    !showSearchResults &&
    posts.pages.every((item) => item?.documents.length === 0);

  return (
    <div className="explore-container">
      <div className="explore-inner_container">
        <h2 className="h3-bold md:h2-bold w-full">Search Posts</h2>
        <div className="flex gap-1 px-4 w-full rounded-lg bg-dark-4">
          <img
            src="/assets/icons/search.svg"
            width={24}
            height={24}
            alt="search"
          />
          <Input
            type="text"
            placeholder="Search"
            className="explore-search"
            value={searchValue}
            onChange={(e) => {
              const { value } = e.target;
              setSearchValue(value);
            }}
          />
        </div>
      </div>

      <div className="flex-between w-full max-w-5xl mt-16 mb-7">
        <h2 className="body-bold md:h2-bold w-full">Popular Today</h2>
        <div className="flex-center bg-dark-3 gap-3 py-2 cursor-pointer rounded-xl">
          <p className="small-medium md:base-medium text-light-2">All</p>
          <img
            src="/assets/icons/filter.svg"
            width={20}
            height={20}
            alt="filter"
          />
        </div>
      </div>

      <div className="flex flew-wrap gap-9 w-full max-w-5xl">
        {showSearchResults ? (
          <SearchResults />
        ) : showPosts ? (
          <div className="text-light-4 mt-10 text-center w-full">
            End of Posts
          </div>
        ) : (
          posts.pages.map((page, index) => (
            <GridPostsList key={`page-${index}`} posts={page.documents} />
          ))
        )}
      </div>
    </div>
  );
}
