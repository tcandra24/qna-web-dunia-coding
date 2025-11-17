import { cache } from "react";
import { AnswerList } from "~/components/shared/AnswerList";
import { CreateAnswerCard } from "~/components/shared/CreateAnswerCard";
import { PostDetailCard } from "~/components/shared/PostDetailCard";

import { api } from "~/trpc/server";

type PostDetailProps = {
  params: Promise<{ postId: string }>;
};

const getPostDetail = cache(async (postId: string) => {
  const postDetail = await api.post.getPostById({ postId });

  return postDetail;
});

export const generateMetadata = async ({ params }: PostDetailProps) => {
  const { postId } = await params;

  const postDetail = await getPostDetail(postId);

  return {
    title: postDetail?.title,
    description: postDetail?.description,
  };
};

export default async function PostPage({ params }: PostDetailProps) {
  const { postId } = await params;

  const postDetail = await getPostDetail(postId);

  return (
    <div className="space-y-8">
      {/* Post Detail Card */}
      <PostDetailCard
        postId={postId}
        createdAt={postDetail?.createdAt ?? new Date()}
        description={postDetail?.description ?? ""}
        title={postDetail?.title ?? ""}
        userImage={postDetail?.author.image ?? ""}
        username={postDetail?.author.username ?? ""}
        isAnswered={!!postDetail?.answeredAt}
      />

      <CreateAnswerCard postId={postId} />

      <AnswerList postId={postId} />
    </div>
  );
}
