import React from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
const FormAccount = () => {
  const form = useForm();
  function onSubmit(values: any) {
    console.log(values);
  }
  return (
    <div className="">
      <article className="grid items-center grid-cols-2">
        {/* Input */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col w-full mt-4 space-y-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Name"
                      {...field}
                      className="border-none"
                    />
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
                    <Input
                      placeholder="Email Address"
                      {...field}
                      className="border-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="phone"
                      {...field}
                      className="border-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-1/3">
              Update Profile
            </Button>
          </form>
        </Form>
        {/* Image */}
        <div className="grid grid-cols-1 space-y-2 text-center">
          <label className="text-sm font-bold tracking-wide text-gray-500">
            Your Profile Picture
          </label>
          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col p-10 text-center border-2 border-dashed rounded-lg w-96 h-60 group">
              <div className="flex flex-col items-center justify-center w-full h-full text-center ">
                <div className="flex flex-auto w-2/5 mx-auto -mt-10 max-h-48">
                  <img
                    className="object-center has-mask h-36"
                    src="https://img.freepik.com/free-vector/image-upload-concept-landing-page_52683-27130.jpg?size=338&ext=jpg"
                    alt="freepik image"
                  />
                </div>
                <p className="text-gray-500 pointer-none ">
                  <span className="text-sm">Drag and drop</span> files here{" "}
                  <br /> or{" "}
                  <a href="" id="" className="text-blue-600 hover:underline">
                    select a file
                  </a>{" "}
                  from your computer
                </p>
              </div>
              <input type="file" className="hidden" />
            </label>
          </div>
        </div>
      </article>
    </div>
  );
};

export default FormAccount;
