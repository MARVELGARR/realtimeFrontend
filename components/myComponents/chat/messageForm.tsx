"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Send } from "lucide-react"

const formSchema = z.object({
  message: z.string(),
  reciepientId: z.string().optional()
})

export type MessageFormData = z.infer<typeof formSchema>

interface MessageFormProps{
    reciepientId?: string;
    conversationId?: string

}

export function MessageForm({conversationId, reciepientId}:MessageFormProps) {
  // 1. Define your form.
  const form = useForm<MessageFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: MessageFormData) {

    const responseData = {
        ...values,
        reciepientId: ""
    }

    console.log(responseData)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>message</FormLabel>
              <FormControl className="flex items-center">
                <Input onKeyDown={(e) => e.key === "Enter" && form.handleSubmit(onSubmit)} className="flex-1 mr-2" placeholder="Type a message..." {...field} />
                <Button type="submit">
                    <Send className="h-4 w-4" />
                </Button>
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}

