"use client";

import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Textarea } from "~/components/ui/textarea";
import z from "zod";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { api } from "~/trpc/react";
import { useSession } from "next-auth/react";

const answerFormSchema = z.object({
  body: z.string().min(1).max(500),
});

type AnswerFormSchema = z.infer<typeof answerFormSchema>;

type CreateAnswerCardProps = {
  postId: string;
};

export const CreateAnswerCard = (props: CreateAnswerCardProps) => {
  const { data: session } = useSession();

  const form = useForm<AnswerFormSchema>({
    resolver: zodResolver(answerFormSchema),
    defaultValues: {
      body: "",
    },
  });

  const apiUtils = api.useUtils();

  const createAnswerMutation = api.answer.createAnswer.useMutation({
    onSuccess: async () => {
      alert("Answer submitted successfully!");
      form.reset();

      await apiUtils.answer.getAnswerByPostId.invalidate({
        postId: props.postId,
      });
    },
  });

  const getAnswerQuery = api.answer.getAnswerByPostId.useQuery({
    postId: props.postId,
  });

  const handleSubmitAnswer = (values: AnswerFormSchema) => {
    createAnswerMutation.mutate({
      body: values.body,
      postId: props.postId,
    });
  };

  return (
    <div className="space-y-3">
      <h3 className="text-xl font-semibold">
        {getAnswerQuery.data?.length ?? 0} Answer
      </h3>

      {/* Answer Form */}
      <Form {...form}>
        <Card>
          <CardHeader>
            <CardTitle>Your Answer</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Avatar>
                <AvatarFallback>
                  {session?.user.name
                    ?.split(" ")
                    .slice(0, 2)
                    .map((data) => data.charAt(0).toUpperCase())
                    .join("")}
                </AvatarFallback>
                <AvatarImage src={session?.user.image ?? ""} />
              </Avatar>

              <FormField
                control={form.control}
                name="body"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Textarea
                        placeholder="Your Answer..."
                        className="min-h-16"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button
              disabled={createAnswerMutation.isPending}
              onClick={form.handleSubmit(handleSubmitAnswer)}
            >
              {createAnswerMutation.isPending
                ? "Submitting Answer...."
                : "Submit Answer"}
            </Button>
          </CardFooter>
        </Card>
      </Form>
    </div>
  );
};
