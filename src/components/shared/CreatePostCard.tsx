"use client";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
} from "~/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "~/trpc/react";
import { signIn, useSession } from "next-auth/react";

const createPostFormSchema = z.object({
  title: z.string(),
  description: z.string(),
});

type CreatePostFormSchema = z.infer<typeof createPostFormSchema>;

export const CreatePostCard = () => {
  const { data: session } = useSession();

  const form = useForm<CreatePostFormSchema>({
    resolver: zodResolver(createPostFormSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const apiUtils = api.useUtils();

  const createPostMutation = api.post.createPost.useMutation({
    onSuccess: async () => {
      alert("Post created successfully!");
      form.reset();

      await apiUtils.post.getAllPosts.invalidate();
    },
  });

  const onSubmit = async (values: CreatePostFormSchema) => {
    createPostMutation.mutate({
      title: values.title,
      description: values.description,
    });
  };

  const handleLogin = async () => {
    await signIn("google");
  };

  return (
    <Form {...form}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Ask a question</CardTitle>
        </CardHeader>

        {!!session ? (
          <CardContent>
            <div className="flex gap-4">
              <Avatar className="size-14">
                <AvatarFallback>
                  {session.user.name
                    ?.split(" ")
                    .slice(0, 2)
                    .map((data) => data.charAt(0).toUpperCase())
                    .join("")}
                </AvatarFallback>
                <AvatarImage src={session.user.image ?? ""} />
              </Avatar>

              <div className="w-full space-y-1.5">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Title of your question"
                          {...field}
                        ></Input>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder="Detail of your question..."
                          className="min-h-24"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </CardContent>
        ) : (
          <CardContent>
            <div className="space-y-4 text-center">
              <p className="text-2xl">Please sign in to ask a question.</p>
              <Button size={"lg"} onClick={handleLogin}>
                Sign In
              </Button>
            </div>
          </CardContent>
        )}

        {!!session && (
          <CardFooter className="flex justify-end">
            <Button
              disabled={createPostMutation.isPending}
              onClick={form.handleSubmit(onSubmit)}
            >
              {createPostMutation.isPending
                ? "Submitting Post...."
                : "Submit Question"}
            </Button>
          </CardFooter>
        )}
      </Card>
    </Form>
  );
};
