"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import useGroupMessageHook from "@/hooks/messageHooks/useGroupMessageHook";
import { socket } from "@/socket/socket";
import { RefObject } from "react";

const formSchema = z.object({
  message: z.string(),
  conversationId: z.string().optional(),
});


export type MessageFormData = z.infer<typeof formSchema>;

interface MessageFormProps {
  reciepientId?: string;
  conversationId?: string;
  groupId?: string;
  
}

export function GroupMessageForm({
  conversationId,
  reciepientId,
  groupId,
  
}: MessageFormProps) {
  // 1. Define your form.
  const form = useForm<MessageFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    },
  });

  const ConversationId = conversationId ? conversationId : ""
  const getCurrentUser = JSON.parse(sessionStorage.getItem("currentUser")!);

  const {isSendingGroupMessage, sendingGroupMessage} = useGroupMessageHook(ConversationId!);

  // 2. Define a submit handler.
  function onSubmit(values: MessageFormData) {
    const responseData = {
      ...values,
      reciepientId: reciepientId,
    };



    sendingGroupMessage(responseData).then((res) => {
      form.setValue("message", "");
      socket.emit("send-group-message", res);
      
    }).catch((error)=>{
      
      
    })

  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem className="flex w-full items-center">
              <FormControl className="flex items-center">
                <Input
                  onKeyDown={(e) =>
                    e.key === "Enter" && form.handleSubmit(onSubmit)
                  }
                  className="flex-1 mr-2"
                  placeholder="Type a message..."
                  {...field}
                />
              </FormControl>
              <Button disabled={isSendingGroupMessage} type="submit">
                <Send className="h-4 w-4" />
              </Button>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
