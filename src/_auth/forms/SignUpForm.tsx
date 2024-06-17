import Form from "@/components/shared/Form";
import { Link, useNavigate } from "react-router-dom";
import FormRowVertical from "@/components/shared/FormRowVertical";
import { useForm } from "react-hook-form";
import { FormEvent } from "react";
import Input from "@/components/shared/Input";
import FormRow from "@/components/shared/FormRow";
import Button from "@/components/shared/Button";
import { useSignUp } from "@/lib/react-query/mutations";

const SignupForm = () => {
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;
  const { signUp } = useSignUp();
  const navigate = useNavigate();

  function onHandleSubmit(data: FormEvent) {
    console.log(data);

    console.log(data);
    signUp(data, {
      onSuccess: () => {
        navigate("/");
        reset();
      },
    });

    // if (!email || !password) return;

    // login(
    //   { email, password },
    //   {
    //     onSettled: () => {
    //       setEmail("");
    //       setPassword("");
    //     },
    //   }
    // );

    reset();
  }

  return (
    <div className="sm:w-420 flex-center flex-col">
      <img src="/assets/images/logo.svg" alt="logo" />

      <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">Create a new account</h2>
      <p className="text-light-3 small-medium md:base-regular mt-2">
        To use snapgram, Please enter your details
      </p>

      <Form onSubmit={handleSubmit(onHandleSubmit)}>
        <FormRowVertical label="Full name" error={errors?.full_name?.message}>
          <Input
            type="text"
            id="full_name"
            // disabled={isLoading}
            {...register("full_name", { required: "This field is required" })}
          />
        </FormRowVertical>

        <FormRowVertical label="Email address" error={errors?.email?.message}>
          <Input
            type="email"
            id="email"
            // disabled={isLoading}
            {...register("email", {
              required: "This field is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Please provide a valid email address",
              },
            })}
          />
        </FormRowVertical>

        <FormRowVertical
          label="Password (min 8 characters)"
          error={errors?.password?.message}
        >
          <Input
            type="password"
            id="password"
            // disabled={isLoading}
            {...register("password", {
              required: "This field is required",
              minLength: {
                value: 8,
                message: "Password needs a min of 8 characters",
              },
            })}
          />
        </FormRowVertical>

        <FormRowVertical
          label="Repeat password"
          error={errors?.passwordConfirm?.message}
        >
          <Input
            type="password"
            id="passwordConfirm"
            // disabled={isLoading}
            {...register("passwordConfirm", {
              required: "This field is required",
              validate: (value: string) =>
                value === getValues().password || "Passwords need to match",
            })}
          />
        </FormRowVertical>

        <FormRow>
          {/* type is an HTML attribute! */}
          <Button variation="secondary" type="reset">
            Cancel
          </Button>
          <Button>Create new user</Button>
        </FormRow>
      </Form>

      <p className="text-small-regular text-light-2 text-center mt-2">
        Already have an account?
        <Link
          to="/sign-in"
          className="text-primary-500 text-small-semibold ml-1"
        >
          Log in
        </Link>
      </p>
    </div>
  );
};

export default SignupForm;
