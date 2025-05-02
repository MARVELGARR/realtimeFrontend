"use client"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useLocalStorage } from "@/hooks/LocalHooks/useLocalStorage"
import { cn } from "@/lib/utils"
import { Gender, type UserWithProfile } from "@/types"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"
import { CalendarIcon, CheckCircle, Loader2, Phone, Save } from "lucide-react"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { toast } from "sonner"
import { format } from "date-fns"
import useUpdateProfile from "@/hooks/UserHooks/updateProfile"

// Define Gender enum to match the schema

// Create a schema for form validation where all fields are optional
const formSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  bio: z.string().optional(),
  nickname: z.string().optional(),
  phoneNumber: z.string().optional(),
  gender: z.nativeEnum(Gender).optional(),
  birthDay: z.date().optional().nullable(),
})

export type ProfileFormValues = z.infer<typeof formSchema>

const UserProfileContent = ({ className }: { className?: string }) => {
  const [storedValue] = useLocalStorage<UserWithProfile | null>("user-session", null)



  const {updateProfile, isUpdatingProfile} = useUpdateProfile()

  // Initialize form with default values from user data
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: storedValue?.profile?.firstName || "",
      lastName: storedValue?.profile?.lastName || "",
      email: storedValue?.email || "",
      bio: storedValue?.profile?.bio || "",
      nickname: storedValue?.profile?.nickname || "",
      phoneNumber: storedValue?.profile?.phoneNumber || "",
      gender: storedValue?.profile?.gender || Gender.MALE,
      birthDay: storedValue?.profile?.birthDay || null,
    },
  })

  // Handle form submission
  const onSubmit = async (values: ProfileFormValues) => {
    updateProfile(values).then(()=>{
      toast("Profile Updataed",{
        description:"Your Profile has been updated"
      })
    }).catch((error)=>{
      toast("Profile not updated", {
        description: " Profile failled to update"
      })
    })
  }

  return (
    <div className={cn("w-full   text-white", className)}>
      {/* No fixed height - let the Sheet component control the height */}
      <div className="overflow-y-auto h-[35rem] no-scrollbar ">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 p-1">
            {/* Header with name */}
            <div className=" top-0 z-10 pt-1 pb-3">
              <h1 className="text-xl font-bold">Edit Profile</h1>
              <p className="text-cyan-200 text-sm">
                {form.watch("firstName") || "—"} {form.watch("lastName") || "—"}
              </p>
            </div>

            {/* Form fields */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white text-xs">First Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="First name"
                          className="bg-cyan-800 border-cyan-700 text-white placeholder:text-cyan-400"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-300 text-xs" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white text-xs">Last Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Last name"
                          className="bg-cyan-800 border-cyan-700 text-white placeholder:text-cyan-400"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-300 text-xs" />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="nickname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white text-xs">Nickname</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nickname"
                        className="bg-cyan-800 border-cyan-700 text-white placeholder:text-cyan-400"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-300 text-xs" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white text-xs">Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Email address"
                        className="bg-cyan-800 border-cyan-700 text-white placeholder:text-cyan-400"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-300 text-xs" />
                    {storedValue?.emailVerified && (
                      <div className="flex items-center mt-1 text-cyan-300 text-xs">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        <span>VERIFIED</span>
                      </div>
                    )}
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white text-xs">Phone Number</FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input
                          placeholder="Phone number"
                          className="bg-cyan-800 border-cyan-700 text-white pl-10 placeholder:text-cyan-400"
                          {...field}
                        />
                      </FormControl>
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Phone className="h-4 w-4 text-cyan-400" />
                      </div>
                    </div>
                    <FormMessage className="text-red-300 text-xs" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white text-xs">Gender</FormLabel>
                    <Select
                      onValueChange={(value) => field.onChange(value as unknown as Gender)}
                      defaultValue={field.value as string | undefined}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-cyan-800 border-cyan-700 text-white">
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-cyan-800 border-cyan-700 text-white">
                        <SelectItem value="MALE">Male</SelectItem>
                        <SelectItem value="FEMALE">Female</SelectItem>
                        <SelectItem value="OTHER">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-300 text-xs" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="birthDay"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-white text-xs">Date of birth</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "pl-3 text-left font-normal bg-cyan-800 border-cyan-700 text-white hover:bg-cyan-700 hover:text-white",
                              !field.value && "text-cyan-400",
                            )}
                          >
                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value || undefined}
                          onSelect={field.onChange}
                          disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage className="text-red-300 text-xs" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white text-xs">Bio</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us about yourself"
                        className="bg-cyan-800 border-cyan-700 text-white min-h-[80px] placeholder:text-cyan-400"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-cyan-300 text-xs">
                      This will be displayed on your profile.
                    </FormDescription>
                    <FormMessage className="text-red-300 text-xs" />
                  </FormItem>
                )}
              />

              
            </div>

            {/* Submit button - sticky at bottom */}
            <div className="sticky top-[50%]  right-2 bg-inherit z-40 w-full  bottom-0 pt-2 pb-1  mt-6">
              <Button asChild type="submit" disabled={isUpdatingProfile} className="w-fit bg-cyan-600 hover:bg-cyan-500 text-white">
                <Save className="w-4 cursor-pointer h-4"/>
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default UserProfileContent 
