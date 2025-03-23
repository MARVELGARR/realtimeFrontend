"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import useSingleFileUploadHook from "@/hooks/utilityHooks/fsingleFileUploadHook";
import { cn } from "@/lib/utils";
import { useStoreUploadedUrls } from "@/store/useStoreUploadedImage";
import { Upload, FileIcon, X, Check, User } from "lucide-react";
import { useState, type DragEvent, type ChangeEvent, useRef } from "react";

type DragAction = "enter" | "leave" | "drop" | "exit" | "over" | "none";

type DragState = {
  name: string;
  action: DragAction;
  state: boolean;
};

export function SingleFileUploader() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadedFileUrl, setUploadedFileUrl] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const { setUrls} = useStoreUploadedUrls()

  const [dragState, setDragState] = useState<DragState>({
    name: "drag-box",
    action: "none",
    state: false,
  });
  const inputRef = useRef<HTMLInputElement | null>(null);
  const handleButtonClick = () => {
    inputRef.current?.click(); // Safe way to access `click()`
  };

  const { UploadFile, isUploadingFile } = useSingleFileUploadHook();

  const updateDragState = (action: DragAction, state: boolean) => {
    setDragState((prev) => ({
      ...prev,
      action,
      state,
    }));
  };

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    updateDragState("enter", true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    updateDragState("leave", false);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    updateDragState("over", true);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    updateDragState("drop", false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      setSelectedFile(file);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
   
    if (!selectedFile) return 
    const formData = new FormData();
    formData.append("singleFile", selectedFile);
    UploadFile(formData).then((data)=>{
        setUrls({ url: data.url, name: "groupImage" })
        setUploadedFileUrl(data.url)
        toast({
            title: "File uploaded",
            variant: "success",
            description: `${data.message}`
        })
    }).catch((error)=>{
        toast({
            title: "File upload failed",
            variant: "destructive",
            description: `${error.error}`
        })
    })
  };

  const resetUpload = () => {
    setSelectedFile(null);
    setUploadedFileUrl(null);
  };

  const getDragAreaClasses = () => {
    const baseClasses =
      "border-2 border-dashed rounded-lg p-12 transition-colors flex flex-col items-center justify-center gap-4 cursor-pointer";

    if (dragState.action === "enter" || dragState.action === "over") {
      return cn(baseClasses, "border-primary bg-primary/5");
    }

    return cn(
      baseClasses,
      "border-muted-foreground/25 hover:border-muted-foreground/50"
    );
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
            <div className="w-20 cursor-pointer h-20 bg-gray-200 rounded-full flex items-center justify-center">

          {uploadedFileUrl ? (<>
         <Avatar>
            <AvatarImage src={uploadedFileUrl} className="w-full h-full rounded-full"/>
            <AvatarFallback>
                <User className="w-4 h-4"/>
            </AvatarFallback>
         </Avatar>
          </>) : (<Upload className="w-5  h-5" />)}
            </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
            <div className="sm:max-w-md">

                <DialogHeader>
                    <DialogTitle>Upload file</DialogTitle>
                    <DialogDescription>
                    Drag and drop a file or click to browse
                    </DialogDescription>
                </DialogHeader>

                <div
                    className={getDragAreaClasses()}
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeave}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    onClick={handleButtonClick}
                >
                    {selectedFile ? (
                    <div className="flex flex-col items-center gap-2 text-center">
                        <FileIcon className="w-8 h-8 text-primary" />
                        <div className="font-medium">{selectedFile.name}</div>
                        <div className="text-xs text-muted-foreground">
                        {(selectedFile.size / 1024).toFixed(2)} KB
                        </div>
                        <Button
                        variant="ghost"
                        size="sm"
                        className="mt-2"
                        onClick={(e) => {
                            e.stopPropagation();
                            setSelectedFile(null);
                        }}
                        >
                        <X className="w-4 h-4 mr-2" />
                        Remove
                        </Button>
                    </div>
                    ) : (
                    <>
                        <Upload className="w-12 h-12 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">
                        Drag and drop your file here or click to browse
                        </p>
                    </>
                    )}
                    <Input
                    ref={inputRef}
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                    />
                </div>

                <DialogFooter className="flex justify-between sm:justify-between">
                    <Button variant="ghost" onClick={() => setOpen(false)}>
                    Cancel
                    </Button>
                    <Button
                    onClick={() => {}}
                    disabled={!selectedFile || isUploadingFile}
                    className="gap-2"
                    >
                    {isUploadingFile ? (
                        <>
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        Uploading... 
                        </>
                    ) : (
                        <div className="flex items-center gap-2" onClick={handleUpload}>
                        <Upload  className="w-4 h-4" />
                        Upload
                        </div>
                    )}
                    </Button>
                </DialogFooter>
            </div>
        </DialogContent>
      </Dialog>

    </div>
  );
}
