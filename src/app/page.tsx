import { CreatePostCard } from "~/components/shared/CreatePostCard";
import { HomePostList } from "~/components/shared/HomePostList";

export default async function Home() {
  return (
    <main className="space-y-8">
      <div className="space-y-1">
        <h1 className="text-4xl font-bold">QnA Forum</h1>
        <p className="text-muted-foreground">
          Ask question, share knowledge, and help community grow.
        </p>
      </div>

      <CreatePostCard />
      <HomePostList />
    </main>
  );
}
