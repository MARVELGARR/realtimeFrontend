import {
    Alert,
    AlertDescription,
    AlertTitle,
  } from "@/components/ui/alert"
import { Terminal } from "lucide-react";




  const CommingSoon = () => {
    return ( 
        <Alert>
        <Terminal className="h-4 w-4" />
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
         This feature is in the works
        </AlertDescription>
      </Alert>
    );
  }
   
  export default CommingSoon;