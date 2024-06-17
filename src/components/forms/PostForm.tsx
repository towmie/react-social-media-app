import { useForm } from "react-hook-form";

import { PostValidationSchema } from "@/lib/validation";
import { Models } from "appwrite";
// import { useUserContext } from "@/context/AuthContext";
import { useToast } from "../ui/use-toast";
import { useNavigate } from "react-router-dom";
import Input from "../shared/Input";
import styled from "styled-components";
import Textarea from "../shared/Textarea";
import FileInput from "../shared/FileInput";
import Button from "../shared/Button";
import FormRowVertical from "../shared/FormRowVertical";
import FormRow from "../shared/FormRow";
import Form from "../shared/Form";
// import { useCreatePost, useUpdatePost } from "@/lib/react-query/mutations";

const Label = styled.label`
  font-weight: 500;
`;
type PostFormProps = {
  action: "create" | "update";
  post?: Models.Document;
};

function PostForm({ post, action }: PostFormProps) {
  // const { toast } = useToast();
  // const navigate = useNavigate();
  const isCreatingPost = false;
  const isUpdatingPost = false;
  const isEditSession = false;
  const isWorking = false;

  const { register, handleSubmit, reset, formState, getValues } = useForm();
  const { errors } = formState;

  function onError(err) {
    // console.log(err);
  }

  async function onHandleSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];
  }

  return (
    <div className="w-full flex flex-col gap-9 max-w-xl">
      <Form
        onSubmit={handleSubmit(onHandleSubmit)}
        // type={onCloseModal ? "modal" : "regular"}
      >
        <FormRowVertical error={errors?.caption?.message} label="Caption">
          <Input type="text" id="caption" {...register("caption")} />
        </FormRowVertical>

        <FormRowVertical>
          <Label htmlFor="image">Add photos</Label>
          <FileInput
            id="image"
            accept="image/*"
            {...register("image", {
              required: isEditSession ? false : "This field is required",
            })}
          />
        </FormRowVertical>

        <FormRowVertical error={errors?.location?.message} label="Location">
          <Input type="text" id="location" {...register("location")} />
        </FormRowVertical>

        <FormRowVertical
          label="Add tags (separated by comma)"
          error={errors?.tags?.message}
        >
          <Input
            type="text"
            id="tags"
            {...register("tags", {
              required: "This field is required",
              min: {
                value: 0,
                message: "The price should be at least 10",
              },
            })}
          />
        </FormRowVertical>

        <FormRow>
          <Button
            variation="secondary"
            type="reset"
            // onClick={() => onCloseModal?.()}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isWorking}>
            {isEditSession ? "Edit cabin" : "Create new Cabin"}
          </Button>
        </FormRow>
      </Form>
    </div>
  );
}

export default PostForm;
