"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import useUpdateUserPrivacy from "@/hooks/userHooks/useUpdateUserPrivacy";
import { QueryClient } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import {
  SelectContent,
  SelectItem,
  Select,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useDebounce from "@/hooks/utilityHooks/useDebounce";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useSession } from "@/providers/sessionProvider";
import useSessionStorage from "@/hooks/utilityHooks/useSessionStroage";
import { CurrentUserType } from "../../utilityComponent/types";

const FormSchema = z.object({
  lastSeen: z.enum(["EVERYONE", "MYCONTACTS", "NOBODY"]).optional(),
  online: z.enum(["EVERYONE", "NOBODY"]).optional(),
  readreceipt: z.boolean().default(false).optional(),
  disappearing: z.enum(["OFF", "DAYS90", "DAYS7", "H24"]).optional(),
});

export type AccountFormType = z.infer<typeof FormSchema>;

const queryClient = new QueryClient();

export function AccountForm({
  currentProfileId,
}: {
  currentProfileId: string;
}) {


  const currentUser = useSessionStorage<CurrentUserType>("currentUser").getItem()
  
  const currentUserProfile =currentUser?.profile
  const currentProfilePrivacy = currentUser?.profile.privacy

  const form = useForm<AccountFormType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      disappearing: ["OFF", "DAYS90", "DAYS7", "H24"].includes(currentProfilePrivacy?.disappearingMessages ?? "")
        ? (currentProfilePrivacy?.disappearingMessages as "OFF" | "DAYS90" | "DAYS7" | "H24")
        : undefined,
      lastSeen: ["EVERYONE", "MYCONTACTS", "NOBODY"].includes(currentProfilePrivacy?.lastSeen ?? "")
        ? (currentProfilePrivacy?.lastSeen as "EVERYONE" | "MYCONTACTS" | "NOBODY")
        : undefined,
      online: ["EVERYONE", "NOBODY"].includes(currentProfilePrivacy?.precense ?? "")
        ? (currentProfilePrivacy?.precense as "EVERYONE" | "NOBODY")
        : undefined,
      readreceipt: currentProfilePrivacy?.readReciept

    },
  });

  const debouncedData = useDebounce(form.watch, 500)

  const { updatingUserPrivacy, isUpdatingUserPrivacy } = useUpdateUserPrivacy(
    currentProfileId as string
  );

  async function onSubmit(data: AccountFormType) {
    console.log(data)
    updatingUserPrivacy(data)
    .then((data) => {
        queryClient.invalidateQueries({ queryKey: ["currentUser"] });
        toast({
          title: "Privacy update",
          variant: "success",
          description: `${data.message}`,
        });
      })
      .catch((error) => {
        toast({
          title: "Privacy update",
          variant: "destructive",
          description: `${error.error}`,
        });
      });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <div>
          <div className="space-y-4">
          <ScrollArea className="h-[25rem] ">

            <FormField
              control={form.control}
              name="lastSeen"
              render={({ field }) => (
                <FormItem className="flex flex-col justify-start  items-start  rounded-lg  p-3 ">
                  <div className="space-y-0.5">
                    <FormLabel>Last Seen</FormLabel>
                    <FormDescription>Who can see my last seen</FormDescription>
                  </div>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="EVERYONE" />
                        </FormControl>
                        <FormLabel className="font-normal">Everyone</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="MYCONTACTS" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          My contacts
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="NOBODY" />
                        </FormControl>
                        <FormLabel className="font-normal">Nobody</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="online"
              render={({ field }) => (
                <FormItem className="flex flex-col justify-start  items-start  rounded-lg  p-3 ">
                  <div className="space-y-0.5">
                    <FormLabel>presence Status</FormLabel>
                    <FormDescription>
                      Who can seen when i am online
                    </FormDescription>
                  </div>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="EVERYONE" />
                        </FormControl>
                        <FormLabel className="font-normal">Everyone</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="NOBODY" />
                        </FormControl>
                        <FormLabel className="font-normal">Nobody</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="readreceipt"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel>Read receipts</FormLabel>
                    <FormDescription>
                      if turned off, you wount send or recieve Reed receipts .
                      Read reciept are always sent for group chat.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="disappearing"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a verified time " />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="OFF">OFF</SelectItem>
                      <SelectItem value="DAYS90">90 Days</SelectItem>
                      <SelectItem value="DAYS7">7 Days</SelectItem>
                      <SelectItem value="H24">24 Hr</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    You can Select how long you conversations last
                  </FormDescription>
                </FormItem>
              )}
            />
            <Button disabled={isUpdatingUserPrivacy} type='submit' variant={"ghost"} className='bg-blue-300'>Update</Button>
              </ScrollArea>
          </div>
        </div>
      </form>
    </Form>
  );
}
