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
import { useState } from "react";
import usRegisterUser from "@/hooks/AuthHooks/useRegisterUser";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const formSchema = z
  .object({
    firstname: z.string().min(2, {
      message: "FirstName must be at least 2 characters.",
    }),
    lastname: z.string().min(2, {
      message: "LastName must be at least 2 characters.",
    }),
    phoneNumber: z
      .string()
      .regex(/^\+?[0-9]{7,15}$/, {
        message: "Enter a valid phone number (7–15 digits, optional +).",
      })
      .min(10, {
        message: "Must not be less than 10",
      }),
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
    gender: z.enum(["MALE", "FEMALE", "OTHERS"]),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords must match.",
  });

export type RegisterFormType = z.infer<typeof formSchema>;

export function RegisterForm() {
  const [show, setShow] = useState({
    password: false,
    confirmPassword: false,
  });

  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      gender: "OTHERS",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleToLogin = () =>{
    router.push('/login')
  }

  const toggleShow = (key: "password" | "confirmPassword") => {
    setShow((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const { registerUser, isRegisteringUser } = usRegisterUser();

  function onSubmit(values: z.infer<typeof formSchema>) {
    registerUser(values)
      .then((data) => {
        toast("User Account  has been Created", {
          dismissible: true,
          description: `${data.user.name} has been registered`,
          action: {
            label: "Login",
            onClick: () => handleToLogin()
          }
        });
      })
      .catch(() => {
        toast("User Account  has been Created", {
          dismissible: true,
          description: `Registration Failled`,
        });
      });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="firstname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="Marvellous" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input placeholder="Obatale" {...field} />
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
                <Input placeholder="marvellousjjsdsksdk@gamil.com" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center justify-between w-full gap-4">
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
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input placeholder="0906378472" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gender</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="cursor-pointer">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="MALE">MALE</SelectItem>
                  <SelectItem value="FEMALE">FEMALE</SelectItem>
                  <SelectItem value="OTHERS">OTHERS</SelectItem>
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />
        <div className="w-full h-fit flex flex-row justify-end">
          <Button
            disabled={isRegisteringUser}
            className="cursor-pointer ml-auto"
            type="submit"
          >
            {isRegisteringUser ? "Submitting" : " Submit"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
