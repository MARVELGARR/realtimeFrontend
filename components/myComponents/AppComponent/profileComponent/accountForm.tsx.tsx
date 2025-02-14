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

const FormSchema = z.object({
  lastSeen: z.enum(["everyone", "my-contacts", "nobody"]).optional(),
  online: z.enum(["everyone", "nobody"]).optional(),
  readreceipt: z.boolean().default(false).optional(),
  disappearing: z.enum(["OFF", "DAYS90", "DAYS7", "H24"]).optional(),
});

export type AccountFormType = z.infer<typeof FormSchema>;

export function AccountForm() {
  const form = useForm<AccountFormType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {},
  });

  function onSubmit(data: AccountFormType) {}

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <div>
          <div className="space-y-4">
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
                          <RadioGroupItem value="everyone" />
                        </FormControl>
                        <FormLabel className="font-normal">Everyone</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="my-contacts" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          My contacts
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="nobody" />
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
                          <RadioGroupItem value="everyone" />
                        </FormControl>
                        <FormLabel className="font-normal">Everyone</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="nobody" />
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
          </div>
        </div>
      </form>
    </Form>
  );
}
