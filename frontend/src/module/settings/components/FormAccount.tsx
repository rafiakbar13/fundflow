import React, { ChangeEvent, useContext, useState } from "react";
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
import { uploadImageToCloudinary } from "@/lib/uploadCloudinary";
import {
  UpdateProfileSchemaType,
  UpdateProfileSchema,
} from "@/lib/validationForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { number } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile } from "@/api/api";
import { toast } from "sonner";
import { authContext } from "@/context/AuthContext";
import { parse } from "path";
const FormAccount = () => {
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [previewURL, setPreviewURL] = useState<any>(null);
  const { user } = useContext(authContext);
  const queryClient = useQueryClient();
  const form = useForm<UpdateProfileSchemaType>({
    resolver: zodResolver(UpdateProfileSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      photo: "",
    },
  });

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const data = await uploadImageToCloudinary(file);
      console.log(data);

      setSelectedFile(data.url);
      setPreviewURL(data.url);
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onloadend = () => {
        setPreviewURL(fileReader.result as null);
      };
    }
  };

  const updateProfileMutation = useMutation({
    mutationFn: async (data: UpdateProfileSchemaType) => {
      return updateProfile({ ...data, userId: user?.id });
    },
    onSuccess: () => {
      toast.success("Profile updated successfully");
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
  });

  function onSubmit(values: UpdateProfileSchemaType) {
    const { name, email, phone, photo } = values;

    updateProfileMutation.mutate({
      name,
      email,
      phone,
      photo: selectedFile,
    });
    console.log(updateProfileMutation.mutate);
  }
  return (
    <div className="">
      <article className="">
        {/* Input */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col w-full mt-4 space-y-4"
          >
            <div className="grid items-center w-full grid-cols-2 gap-x-4 ">
              <div className="">
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
                          type="number"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* Upload Image */}
              <FormField
                control={form.control}
                name="photo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Profile Picture</FormLabel>
                    <FormControl>
                      <div className="flex items-center justify-center w-full">
                        <label className="flex flex-col p-10 text-center border-2 border-dashed rounded-lg w-96 h-60 group">
                          <div className="flex flex-col items-center justify-center w-full h-full text-center ">
                            <div className="flex flex-auto w-2/5 mx-auto -mt-10 max-h-48">
                              {selectedFile && (
                                <img
                                  className="object-center has-mask h-36"
                                  src={previewURL}
                                  alt="freepik image"
                                />
                              )}
                            </div>
                            <p className="text-gray-500 pointer-none ">
                              <span className="text-sm">Drag and drop</span>{" "}
                              files here <br /> or{" "}
                              <a
                                href=""
                                id=""
                                className="text-blue-600 hover:underline"
                              >
                                select a file
                              </a>{" "}
                              from your computer
                            </p>
                          </div>
                          <Input
                            type="file"
                            {...field}
                            className="hidden border-none"
                            onChange={handleFileChange}
                            accept=".jpg, .png, .jpeg"
                          />
                        </label>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="w-1/3">
              Update Profile
            </Button>
          </form>
        </Form>
        {/* Image */}
      </article>
    </div>
  );
};

export default FormAccount;
