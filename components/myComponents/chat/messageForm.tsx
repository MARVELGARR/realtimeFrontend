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
import useMessageHook from "@/hooks/messageHooks/useMessageHook";
import { toast } from "@/hooks/use-toast";
import { socket } from "@/socket/socket";
import { useSearchParams } from "next/navigation";
import { getRoomId } from "@/lib/utils";
import useSessionStorage from "@/hooks/utilityHooks/useSessionStroage";
import { CurrentUserType } from "../utilityComponent/types";

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

  const urlSearchParams = useSearchParams()
  const receiverId = urlSearchParams.get("reciepientId")
  const ReciepientId = receiverId ? receiverId : reciepientId

  const currentUser = useSessionStorage<CurrentUserType>("currentUser").getItem();
  const currentUserId = currentUser?.id;

  const {sendingMessage} = useMessageHook( ReciepientId!);

  // 2. Define a submit handler.
  function getRoomId(a: string, b: string) {
    return [a, b].sort().join(":"); // Ensure consistent room naming
  }
  
  async function onSubmit(values: MessageFormData) {
    if (!currentUserId || !ReciepientId) {
      console.warn("❌ Missing user or receiver ID");
      return;
    }
  
    const responseData = {
      ...values,
    };
  
  
    sendingMessage(responseData)
      .then((res) => {
        const roomId = getRoomId(currentUserId, ReciepientId);
        const newMessage = res;
        console.log(res)
        socket.emit("send-message", {
          roomId,
          newMessage,
        });
  
        form.setValue("message", "");
      })
      .catch((error) => {
        toast({
          title: "Message not sent",
          description: `${error}`,
          variant: "destructive",
        });
      });
  
    console.log("📝 Message payload:", responseData);
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
