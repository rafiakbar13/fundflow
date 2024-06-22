import React from "react";
import { Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { RegisterSchema, RegisterSchemaType } from "@/lib/validationForm";
import { useNavigate } from "react-router-dom";

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
import { useMutation } from "@tanstack/react-query";
import { register } from "@/services/api";
import { toast } from "sonner";

const Register = () => {
  const navigate = useNavigate();
  const form = useForm<RegisterSchemaType>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (data: RegisterSchemaType) => {
      return register(data);
    },
    onSuccess: () => {
      toast.success("Register Successful");
      navigate("/login");
    },
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
  });

  function onSubmit(values: RegisterSchemaType) {
    const { name, email, password } = values;
    registerMutation.mutate({ name, email, password });
  }

  return (
    <section className="flex items-center justify-center w-1/3 h-screen mx-auto ">
      <article className="flex flex-col items-center justify-center px-8 py-16 bg-white rounded-lg shadow-xl">
        <Link to="/" className="py-4">
          <h1 className="text-4xl font-bold">
            Fund<span className="text-red">Flow.</span>
          </h1>
        </Link>
        <h2 className="text-2xl font-semibold">Create your acount</h2>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col w-full mt-4 space-y-3"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
            <Button type="submit">Submit</Button>
          </form>
        </Form>
        <p className="mt-10">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-primary">
            Login
          </Link>{" "}
        </p>
      </article>
    </section>
  );
};

export default Register;
