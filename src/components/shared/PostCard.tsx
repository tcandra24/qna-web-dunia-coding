import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { MessageSquareMore } from "lucide-react";

type PostCardProps = {
  id: string;
  userImage: string;
  username: string | null;
  createdDate: Date;
  title: string;
  description: string;
  totalComments: number;
  status: "answered" | "unanswered";
};

export const PostCard = (props: PostCardProps) => {
  const postDetailUrl = "/post/" + props.id;
  return (
    <div className="space-y-4 rounded-xl border p-6 shadow">
      {/* Header */}
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
            <AvatarImage src={props.userImage} />
          </Avatar>
          <div className="space-y-0.5">
            <Link href={"/profile/" + props.username}>
              <p className="font-medium">{props.username}</p>
            </Link>
            <p className="text-muted-foreground text-sm">
              {props.createdDate.toLocaleDateString()}
            </p>
          </div>
        </div>
        {props.status === "answered" ? (
          <Badge variant={"secondary"} className="h-fit">
            Answered
          </Badge>
        ) : (
          <Badge variant={"default"} className="h-fit">
            Unanswered
          </Badge>
        )}
      </div>

      {/* Content */}
      <Link href={postDetailUrl} className="group">
        <div className="space-y-1">
          <h3 className="group-hover:text-destructive font-semibold">
            {props.title}
          </h3>
          <p>{props.description}</p>
        </div>
      </Link>

      {/* Footer */}
      <div className="mt-4 flex justify-between border-t pt-3">
        <div className="text-muted-foreground flex items-center gap-1 text-sm">
          <MessageSquareMore /> <span>{props.totalComments} Comment</span>
        </div>

        <Link href={postDetailUrl} className="text-primary text-sm">
          {" "}
          View Post{" "}
        </Link>
      </div>
    </div>
  );
};
