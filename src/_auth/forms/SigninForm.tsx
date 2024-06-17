import { Link, useNavigate } from "react-router-dom";
import Button from "@/components/shared/Button";

import Loader from "@/components/shared/Loader";
import { useToast } from "@/components/ui/use-toast";
import { FormEvent, useState } from "react";
import FormRowVertical from "@/components/shared/FormRowVertical";
import { useLogin } from "@/lib/react-query/mutations";
import Form from "@/components/shared/Form";
import Input from "@/components/shared/Input";

const SignInForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [email, setEmail] = useState("andrei-test@example.com");
  const [password, setPassword] = useState("12345678");

  const { login, isPending } = useLogin();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email || !password) return;

    login(
      { email, password },
      {
        onSuccess: () => {
          navigate("/");
        },
        onSettled: () => {
          setEmail("");
          setPassword("");
        },
        onError: (err) => {
          toast({
            title: "Error",
            description: err.message,
          });
        },
      }
    );
  }

  return (
    <div className="sm:w-420 flex-center flex-col">
      <img src="/assets/images/logo.svg" alt="logo" />
      <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">Welcome back</h2>
      <p className="text-light-3 small-medium md:base-regular mt-2">
        To use snapgram, Please enter your details
      </p>
      <Form onSubmit={handleSubmit}>
        <FormRowVertical label="Email address">
          <Input
            type="email"
            id="email"
            // This makes this form better for password managers
            autoComplete="username"
            value={email}
            disabled={isPending}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormRowVertical>
        <FormRowVertical label="Password">
          <Input
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            disabled={isPending}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormRowVertical>
        <FormRowVertical>
          <Button disabled={isPending} size="large">
            {!isPending ? "Login" : <Loader />}
          </Button>
        </FormRowVertical>
      </Form>
      <p className="text-small-regular text-light-2 text-center mt-2">
        Don't have an account?
        <Link
          to="/sign-up"
          className="text-primary-500 text-small-semibold ml-1"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default SignInForm;
