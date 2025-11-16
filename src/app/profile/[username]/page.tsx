import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Card, CardContent } from "~/components/ui/card";
import { api } from "~/trpc/server";

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const profile = await api.user.getProfileByUsername({ username });

  return (
    <main className="container mx-auto max-w-4xl py-8">
      <Card>
        <CardContent>
          <div className="flex flex-col items-center justify-center gap-4">
            <Avatar className="size-16">
              <AvatarFallback>
                {profile.name
                  ?.split(" ")
                  .slice(0, 2)
                  .map((data) => data.charAt(0).toUpperCase())
                  .join("")}
              </AvatarFallback>
              <AvatarImage src={profile.image ?? ""} />
            </Avatar>

            <div className="flex flex-col gap-0.5 text-center">
              <p className="font-bold">{profile.name}</p>
              <p>@{profile.username}</p>
              <p className="text-muted-foreground text-sm">{profile.email}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
