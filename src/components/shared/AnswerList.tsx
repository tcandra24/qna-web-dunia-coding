"use client";

import { api } from "~/trpc/react";
import { AnswerCard } from "./AnswerCard";

type AnswerListProps = {
  postId: string;
};

export const AnswerList = (props: AnswerListProps) => {
  const answerPost = api.answer.getAnswerByPostId.useQuery({
    postId: props.postId,
  });

  return (
    <div className="space-y-2">
      {answerPost.data?.map((answer) => (
        <AnswerCard
          key={answer.id}
          id={answer.id}
          body={answer.body}
          createdDate={answer.createdAt}
          userImage={answer.author?.image ?? ""}
          username={answer.author?.username ?? ""}
        />
      ))}
    </div>
  );
};
