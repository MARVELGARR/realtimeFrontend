import type { Control } from "react-hook-form"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

interface AccountSetupStepProps {
  control: Control<any>
}

export function AccountSetupStep({ control }: AccountSetupStepProps) {
  return (
    <>
      <h2 className="text-lg font-semibold">Account Setup</h2>
      <FormField
        control={control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input type="password" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  )
}

