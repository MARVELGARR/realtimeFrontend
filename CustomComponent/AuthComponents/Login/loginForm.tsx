"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import useLogin from "@/hooks/AuthHooks/useLogin";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


const formSchema = z
  .object({
    email: z.string().email({
      message: "Please input a valid email",
    }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long." })
      .regex(/[A-Z]/, {
        message: "Password must include at least one uppercase letter.",
      })
      .regex(/[a-z]/, {
        message: "Password must include at least one lowercase letter.",
      })
      .regex(/[0-9]/, { message: "Password must include at least one number." })
      .regex(/[^A-Za-z0-9]/, {
        message: "Password must include at least one special character.",
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords must match.",

  });


  export type LoginFormType = z.infer<typeof formSchema>

const LoginForm = () => {
  const [show, setShow] = useState({
    password: false,
    confirmPassword: false,
  });

  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const {Login, isLoggingIn} = useLogin()

  const toggleShow = (key: "password" | "confirmPassword") => {
    setShow((prev) => ({ ...prev, [key]: !prev[key] }));
  };
  
  const handleToHome = () =>{
    router.push("/")
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    Login(values).then(()=>{
        toast("User has been logged in", {
            dismissible: true,
            description: `You are logged in`,
            action: {
                label: "Home",
                onClick: ()=> handleToHome()
            }
        })
        
    }).catch((error)=>{

    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="marvellousjjsdsksdk@gamil.com" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />{" "}
        <div className="flex flex-col items-center justify-between w-full gap-4">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={show.password ? "text" : "password"}
                      placeholder="********"
                      {...field}
                    />
                    <button
                      type="button"
                      onClick={() => toggleShow("password")}
                      className="absolute cursor-pointer right-2 top-1/2 transform -translate-y-1/2 text-sm"
                    >
                      {show.password ? "Hide" : "Show"}
                    </button>
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={show.confirmPassword ? "text" : "password"}
                      placeholder="********"
                      {...field}
                    />
                    <button
                      type="button"
                      onClick={() => toggleShow("confirmPassword")}
                      className="absolute right-2 cursor-pointer top-1/2 transform -translate-y-1/2 text-sm"
                    >
                      {show.confirmPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="w-full h-fit flex flex-row justify-end">
          <Button disabled={isLoggingIn} className="cursor-pointer ml-auto" type="submit">
            {isLoggingIn ? "Logding in" : "Login"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
