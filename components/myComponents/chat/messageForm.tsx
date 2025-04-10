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
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import useMessageHook from "@/hooks/messageHooks/useMessageHook";
import { toast } from "@/hooks/use-toast";
import { socket } from "@/socket/socket";

const formSchema = z.object({
  message: z.string(),
});


export type MessageFormData = z.infer<typeof formSchema>;

interface MessageFormProps {
  reciepientId?: string;
  conversationId?: string;
}

export function MessageForm({
  conversationId,
  reciepientId,
}: MessageFormProps) {
  // 1. Define your form.
  const form = useForm<MessageFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    },
  });

  const answer = conversationId ? conversationId : ""

  const {sendingMessage} = useMessageHook(answer!, reciepientId!);

  // 2. Define a submit handler.
  function onSubmit(values: MessageFormData) {
    const responseData = {
      ...values,
    };

    sendingMessage(responseData).then((res) => {
      form.setValue("message", "");
      socket.emit("send-message", {reciepientId, res});
    }).catch((error)=>{
      toast({
        title: "message not sent",
        description: `${error}`,
        variant: `destructive`
      })
      
    })

    console.log(responseData);
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
              <Button type="submit">
                <Send className="h-4 w-4" />
              </Button>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
