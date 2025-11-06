import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Card, CardContent } from "~/components/ui/card";

export default function ProfilePage() {
  return (
    <main className="container mx-auto max-w-4xl py-8">
      <Card>
        <CardContent>
          <div className="flex flex-col justify-center gap-4 items-center">
            <Avatar className="size-16">
              <AvatarFallback>JD</AvatarFallback>
              <AvatarImage src="" />
            </Avatar>

            <div className="flex flex-col gap-0.5 text-center">
              <p className="font-bold">John Doe</p>
              <p>@johndoe</p>
              <p className="text-muted-foreground text-sm">johndoe@mail</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
