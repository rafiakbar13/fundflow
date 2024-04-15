import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FormAccount from "./FormAccount";
import FormSecurity from "./FormSecurity";
const Settings = () => {
  return (
    <div className="bg-white rounded-md shadow-2xl ">
      {/* Tabs */}
      <article className="p-4">
        <Tabs defaultValue="account" className="">
          <TabsList className="grid w-1/4 grid-cols-2 bg-transparent">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>
          <TabsContent value="account" className="">
            <FormAccount />
          </TabsContent>
          <TabsContent value="security">
            <FormSecurity />
          </TabsContent>
        </Tabs>
      </article>
    </div>
  );
};

export default Settings;
