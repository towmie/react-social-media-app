import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import FileUploader from "../shared/FileUploader";
import { PostValidationSchema } from "@/lib/validation";
import { Models } from "appwrite";
// import { useUserContext } from "@/context/AuthContext";
import { useToast } from "../ui/use-toast";
import { useNavigate } from "react-router-dom";
// import { useCreatePost, useUpdatePost } from "@/lib/react-query/mutations";

type PostFormProps = {
  action: "create" | "update";
  post?: Models.Document;
};

function PostForm({ post, action }: PostFormProps) {
  const { toast } = useToast();
  const navigate = useNavigate();

  // const { mutateAsync: updatePost, isPending: isUpdatingPost } =
  //   useUpdatePost();

  // const { mutateAsync: createPost, isPending: isCreatingPost } =
  //   useCreatePost();
  // const { user } = useUserContext();

  const form = useForm<z.infer<typeof PostValidationSchema>>({
    resolver: zodResolver(PostValidationSchema),
    defaultValues: {
      caption: post ? post?.caption : "",
      file: [],
      location: post ? post?.location : "",
      tags: post ? post?.tags.join(",") : "",
    },
  });

  async function onSubmit(data: z.infer<typeof PostValidationSchema>) {
    if (post && action === "update") {
      const updatedPost = await updatePost({
        ...data,
        postId: post?.$id,
        imageId: post?.imageId,
        imageURL: post?.imageURL,
      });

      if (!updatedPost) return toast({ title: "Failed to update post" });

      return navigate(`/posts/${post.$id}`);
    }

    const newPost = await createPost({
      ...data,
      userId: user?.id,
    });

    if (!newPost) return toast({ title: "Failed to create post" });

    navigate("/");
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-9 max-w-5xl"
      >
        <FormField
          control={form.control}
          name="caption"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Caption</FormLabel>
              <FormControl>
                <Textarea
                  className="shad-textarea custom-scrollbar"
                  {...field}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add photos</FormLabel>
              <FormControl>
                <FileUploader
                  fieldChange={field.onChange}
                  mediaUrl={post?.imageURL}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Location</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">
                Add tags (separated by comma - " , ")
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  className="shad-input"
                  placeholder="react, js, frontend"
                  {...field}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <div className="flex gap-4 justify-end items-center">
          <Button type="button" className="shad-button_dark_4">
            Cancel
          </Button>
          <Button
            disabled={isCreatingPost || isUpdatingPost}
            type="submit"
            className="shad-button_primary whitespace-nowrap"
          >
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default PostForm;
