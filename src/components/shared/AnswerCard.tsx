import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

type AnswerCardProps = {
  id: string;
  username: string;
  createdDate: Date;
  userImage: string;
  body: string;
};

export const AnswerCard = (props: AnswerCardProps) => {
  return (
    <div className="roundex-xl space-y-4 border p-6 shadow">
      <div className="flex items-center gap-2">
        <Avatar className="size-12">
          <AvatarFallback>
            {props.username
              ?.split(" ")
              .slice(0, 2)
              .map((data) => data.charAt(0).toUpperCase())
              .join("")}
          </AvatarFallback>
          <AvatarImage src={props.userImage} />
        </Avatar>
      </div>
      <div className="space-y-0.5">
        <p className="font-medium">{props.username}</p>
        <p className="text-muted-foreground text-sm">
          {props.createdDate.toLocaleDateString()}
        </p>
      </div>

      <div>
        <p>{props.body}</p>
      </div>
    </div>
  );
};
