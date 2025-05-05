"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { useUserSession } from "@/providers/UserProvider/userSessionProvider";
import { Switch } from "@/components/ui/switch";
import useUpdatePrivacySettings from "@/hooks/UserHooks/updatePrivacySettings";
import { toast } from "sonner";

const formSchema = z.object({
  readReciept: z.boolean().optional(),
  lastSeen: z.enum(["EVERYONE", "MYCONTACTS", "NOBODY"]).optional(),
  precense: z.enum(["EVERYONE", "NOBODY"]).optional(),
  disappearingMessages: z.enum(["OFF", "DAYS90", "DAYS7", "H24"]).optional(),
});


export type UserProfileSettingFormType = z.infer<typeof formSchema>

const UserProfileSettingForm = () => {
  const { user } = useUserSession();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      readReciept: user?.profile.privacy?.readReciept! || false,
      disappearingMessages: user?.profile.privacy?.disappearingMessages!,
      lastSeen: user?.profile.privacy?.lastSeen!,
      precense: user?.profile.privacy?.precense!,
    },
  });


  const {isUpdatingPrivacySetting, updatePrivacySetting} = useUpdatePrivacySettings()

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    updatePrivacySetting(values).then(()=>{
        toast("Privacy updated", {
            description: "User Privacy Settings has been updated"
        })
    }).catch((error)=>{
        toast("Privacy not Updated",{
            description: "User Privacy settings was not updated"
        })
    })
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 text-white "
      >
        <FormField
          control={form.control}
          name="readReciept"
          render={({ field }) => (
            <FormItem className="flex flex-col  items-start w-full  p-3 shadow-sm">
              <div className="flex items-center w-full justify-between">

                <div className="space-y-0.5">
                  <FormLabel>Read Recepient</FormLabel>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </div>
              <FormDescription>
                Select if people can see if you have read their text
              </FormDescription>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="disappearingMessages"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Disapearing Message</FormLabel>
              <Select
                onValueChange={(value) => field.onChange(value)}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a verified time" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={"OFF"}>{"OFF"}</SelectItem>
                  <SelectItem value={"H24"}>{"H24"}</SelectItem>
                  <SelectItem value={"DAYS7"}>{"DAYS7"}</SelectItem>
                  <SelectItem value={"DAYS90"}>{"DAYS90"}</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Select how long your messges stays before its get removed
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastSeen"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last seen</FormLabel>
              <Select
                onValueChange={(value) => field.onChange(value)}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Who can see yor last seen" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={"EVERYONE"}>{"EVERYONE"}</SelectItem>
                  <SelectItem value={"MYCONTACTS"}>{"MYCONTACTS"}</SelectItem>
                  <SelectItem value={"NOBODY"}>{"NOBODY"}</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Select who can see when you were last online
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="precense"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Precense</FormLabel>
              <Select
                onValueChange={(value) => field.onChange(value)}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Who can see yor last seen" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={"EVERYONE"}>{"EVERYONE"}</SelectItem>
                  <SelectItem value={"NOBODY"}>{"NOBODY"}</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Select who can see if you are online or not
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="cursor-pointer mb-2" disabled={isUpdatingPrivacySetting} type="submit">{isUpdatingPrivacySetting ? "Submitting..":"Submit"}</Button>
      </form>
    </Form>
  );
};

export default UserProfileSettingForm;
