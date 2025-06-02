"use client"

import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Edit2Icon, UploadCloud } from "lucide-react"

import { toast } from "sonner"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { useDrawer } from "@/store/useDrawer"
import { useFileUploader } from "@/store/useFileUploader"
import useUpdateGroupSetting from "@/hooks/GroupHooks/useUpdateGroupSetting"
import { useModal } from "@/store/useModalStore"

const GroupSettingForm = z.object({
  groupImage: z.string().optional(),
  name: z.string().max(20, { message: "must not be more than 20" }).optional(),
  disappearingMessages: z.string().optional(),
  groupDescription: z.string(),
})
export enum DisappearingMessages {
  OFF = "OFF",
  H24 = "H24",
  DAYS7 = "DAYS7",
  DAYS90 = "DAYS90",
}

export type GroupData = {
  groupId: string
  groupName: string
  participants: any[]
  groupImage: string
  groupDescriptions: string
  groupDisappearingMessages: string
  groupCreatedAt: Date
  groupUpdatedAt: Date
}

export type GroupSettingFormProp = z.infer<typeof GroupSettingForm>

const GroupSettingsComponent = () => {
  const { data } = useDrawer()
  const groupData = data as GroupData

  const form = useForm<GroupSettingFormProp>({
    resolver: zodResolver(GroupSettingForm),
    defaultValues: {
      name: groupData?.groupName || "",
      groupImage: groupData?.groupImage || "",
      disappearingMessages: groupData?.groupDisappearingMessages || "OFF",
      groupDescription: groupData?.groupDescriptions || "",
    },
  })

  const { url, setUrl, fileFor } = useFileUploader()
  const { onOpen } = useModal()

  const { isUpdatingGroupSetting, updateGroupSetting } = useUpdateGroupSetting(groupData?.groupId || "")

  function onSubmit(values: GroupSettingFormProp) {
    updateGroupSetting(values)
      .then(() => {
        toast.success("Group settings updated successfully!")
      })
      .catch(() => {
        toast.error("Failed to update group settings")
      })
  }

  // Mock data for demonstration
  const mockGroupData: GroupData = {
    groupId: "group-123",
    groupName: "My Awesome Group",
    participants: [],
    groupImage: "/placeholder.svg?height=96&width=96",
    groupDescriptions: "This is a sample group description",
    groupDisappearingMessages: "H24",
    groupCreatedAt: new Date(),
    groupUpdatedAt: new Date(),
  }

  const displayData = groupData || mockGroupData

  return (
    <div className="h-full max-w-md mx-auto">
      <Form {...form}>
        <form className="h-full w-full flex flex-col" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex-1">
            <ScrollArea className="h-[22rem] px-4 py-6">
              <div className="space-y-6">
                {/* Avatar Section */}
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <Avatar className="w-24 h-24 border-4 border-cyan-800">
                      {displayData.groupImage ? (
                        <AvatarImage src={displayData.groupImage || "/placeholder.svg"} alt="Group avatar" />
                      ) : (
                        <AvatarFallback className="text-lg">
                          {displayData.groupName?.substring(0, 2).toUpperCase() || "GR"}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    {url && fileFor === "group-profile-pic" ? (
                      <div className="absolute -right-2 -bottom-2 bg-white p-2 rounded-full shadow-md">
                        <UploadCloud
                          className={`w-4 h-4 text-green-600 ${isUpdatingGroupSetting ? "animate-bounce" : ""}`}
                        />
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => onOpen("singleFileUploader", null, "group-profile-pic")}
                        className="absolute -right-2 -bottom-2 bg-white p-2 rounded-full shadow-md hover:bg-gray-50 transition-colors"
                      >
                        <Edit2Icon className="w-4 h-4 text-cyan-600" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Group Name */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Group Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter group name" {...field} />
                      </FormControl>
                      <FormDescription>This is your group public display name.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Disappearing Messages */}
                <FormField
                  control={form.control}
                  name="disappearingMessages"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Disappearing Messages</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a time" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="OFF">OFF</SelectItem>
                          <SelectItem value="H24">24 Hours</SelectItem>
                          <SelectItem value="DAYS7">7 Days</SelectItem>
                          <SelectItem value="DAYS90">90 Days</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>Select how long your messages stay before they are removed.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Group Description */}
                <FormField
                  control={form.control}
                  name="groupDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Group Description</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter description" {...field} />
                      </FormControl>
                      <FormDescription>This is your group description.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </ScrollArea>
          </div>

          {/* Submit Button */}
          <div className="p-4 border-t">
            <Button type="submit" className="w-full" disabled={isUpdatingGroupSetting}>
              {isUpdatingGroupSetting ? "Updating..." : "Update Settings"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default GroupSettingsComponent
