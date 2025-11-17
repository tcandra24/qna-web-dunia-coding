"use client";

import { api } from "~/trpc/react";
import { PostCard } from "./PostCard";
import { Button } from "../ui/button";

export const HomePostList = () => {
  const paginatePostsQuery = api.post.getPostsPaginated.useInfiniteQuery(
    {
      limit: 2,
    },
    {
      getNextPageParam: ({ nextCursor }) => {
        return nextCursor;
      },
    },
  );

  const handleFetchNextPage = async () =>
    await paginatePostsQuery.fetchNextPage();

  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-bold">Recent Questions</h2>

      <div className="flex flex-col justify-center gap-3">
        {paginatePostsQuery.data?.pages
          .flatMap((page) => page.posts)
          .map((post) => (
            <PostCard
              key={post.id}
              createdDate={post.createdAt}
              description={post.description}
              title={post.title}
              id={post.id}
              isAnswered={!!post.answeredAt}
              totalComments={0}
              userImage={post.author.image ?? ""}
              username={post.author.username}
            />
          ))}
        {paginatePostsQuery.hasNextPage && (
          <Button
            className="self-center"
            disabled={paginatePostsQuery.isFetching}
            onClick={handleFetchNextPage}
          >
            {paginatePostsQuery.isFetching ? "Loading..." : "See More"}
          </Button>
        )}
      </div>
    </div>
  );
};
