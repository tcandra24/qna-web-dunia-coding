"use client";

import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { api } from "~/trpc/react";
import { Skeleton } from "../ui/skeleton";

type PostDetailCard = {
  postId: string;
  userImage: string;
  username: string;
  createdAt: Date;
  isAnswered: boolean;
  title: string;
  description: string;
};

export const PostDetailCard = (props: PostDetailCard) => {
  const apiUtils = api.useUtils();
  const markAsAnsweredMutation = api.post.markAsAnswered.useMutation({
    onSuccess: async () => {
      alert("Mark as answered!");

      await apiUtils.post.getPostById.invalidate({
        postId: props.postId,
      });
    },
  });

  const getPostByIdQuery = api.post.getPostById.useQuery({
    postId: props.postId,
  });

  const handleMarkAsAnswered = () => {
    markAsAnsweredMutation.mutate({
      postId: props.postId,
    });
  };

  return (
    <div className="space-y-6 rounded-xl border p-6 shadow">
      <div className="flex justify-between">
        <div className="flex items-center gap-3">
          <Avatar className="size-14">
            <AvatarFallback>
              {props.username
                ?.split(" ")
                .slice(0, 2)
                .map((data) => data.charAt(0).toUpperCase())
                .join("")}
            </AvatarFallback>
            <AvatarImage src={props.userImage ?? ""} />
          </Avatar>
          <div className="space-y-0.5">
            <Link href={"/profile/" + props.username}>
              <p className="font-medium">{props.username}</p>
            </Link>
            <p className="text-muted-foreground text-sm">
              {props.createdAt.toLocaleDateString()}
            </p>
          </div>
        </div>
        {getPostByIdQuery.isLoading ? (
          <Skeleton className="h-6 w-20" />
        ) : !!getPostByIdQuery.data?.answeredAt ? (
          <Badge variant={"default"} className="h-fit">
            Answered
          </Badge>
        ) : (
          <Badge variant={"secondary"} className="h-fit">
            Unanswered
          </Badge>
        )}
      </div>

      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">{props.title}</h1>
        <p>{props.description}</p>
      </div>

      {!getPostByIdQuery.data?.answeredAt && (
        <div className="flex justify-end border-t pt-4">
          <Button
            variant={"secondary"}
            onClick={handleMarkAsAnswered}
            disabled={markAsAnsweredMutation.isPending}
          >
            Mark As Answered
          </Button>
        </div>
      )}
    </div>
  );
};
