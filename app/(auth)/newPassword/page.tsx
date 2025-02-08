import { NewPasswordForm } from "./_newPasswordComponent/newPasswordForm";



export default function SetNewPasswordPage({
  searchParams
}:{
  searchParams: { [key: string]: string | string[] | undefined }
}) {

  
  const token = searchParams.token as string
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <NewPasswordForm token={token} />
    </div>
  )
}

