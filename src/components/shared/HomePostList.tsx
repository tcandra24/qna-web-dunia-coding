"use client";

import { api } from "~/trpc/react";
import { PostCard } from "./PostCard";

export const HomePostList = () => {
  const postsQuery = api.post.getAllPosts.useQuery();

  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-bold">Recent Questions</h2>

      <div className="space-y-3">
        {postsQuery.data?.map((post) => (
          <PostCard
            key={post.id}
            createdDate={post.createdAt}
            description={post.description}
            title={post.title}
            id={post.id}
            status="unanswered"
            totalComments={0}
            userImage={post.author.image ?? ""}
            username={post.author.username}
          />
        ))}
      </div>
    </div>
  );
};
