import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LoginSchema, LoginSchemaType } from "@/lib/validationForm";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { login } from "@/services/api";
import { HashLoader } from "react-spinners";
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
import { authContext } from "@/context/AuthContext";
import { timeStamp } from "console";

const Login = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(authContext);

  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginMutation = useMutation({
    mutationFn: async (data: LoginSchemaType) => {
      return login(data);
    },
    onSuccess: (data: any) => {
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: {
          user: data.data,
          token: data.token,
        },
      });
      toast.success("Login Successful");
      navigate("/dashboard");
    },
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
  });

  const onSubmit = async (values: LoginSchemaType) => {
    const { email, password } = values;
    loginMutation.mutate({ email, password });
  };

  return (
    <section className="flex items-center justify-center w-1/3 h-screen mx-auto ">
      <article className="flex flex-col items-center justify-center px-8 py-16 bg-white rounded-lg shadow-xl">
        <Link to="/" className="py-4">
          <h1 className="text-4xl font-bold">
            Fund<span className="text-red">Flow.</span>
          </h1>
        </Link>
        <h2 className="text-2xl font-semibold">Login to your acount</h2>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col w-full mt-4 space-y-3"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email Address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Password" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">
              {loginMutation.isPending ? (
                <HashLoader size={25} className="text-center" />
              ) : (
                "Login"
              )}
            </Button>
          </form>
        </Form>
        <p className="mt-10">
          Not Registered Yet?{" "}
          <Link to="/register" className="font-semibold text-primary">
            Create an account
          </Link>{" "}
        </p>
      </article>
    </section>
  );
};

export default Login;
