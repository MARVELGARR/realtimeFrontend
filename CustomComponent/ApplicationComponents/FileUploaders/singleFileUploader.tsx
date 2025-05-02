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
import useSingleFileUpload from "@/hooks/UserHooks/usesingleImageUpload";
import { cn } from "@/lib/utils";
import { useFileUploader } from "@/store/useFileUploader";
import { useModal } from "@/store/useModalStore";
import { Upload, FileIcon, X, Check, User } from "lucide-react";
import { useState, type DragEvent, type ChangeEvent, useRef } from "react";
import { toast } from "sonner";

type DragAction = "enter" | "leave" | "drop" | "exit" | "over" | "none";

type DragState = {
  name: string;
  action: DragAction;
  state: boolean;
};

export function SingleFileUploader() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { isOpen, onClose, type } = useModal();

  const isModalOpen = isOpen && type === "singleFileUploader";

  const handleModalClose = () => {
    onClose();
  };

  const { setUrl, fileFor } = useFileUploader();

  const [dragState, setDragState] = useState<DragState>({
    name: "drag-box",
    action: "none",
    state: false,
  });
  const inputRef = useRef<HTMLInputElement | null>(null);
  const handleButtonClick = () => {
    inputRef.current?.click(); // Safe way to access `click()`
  };

  const { upload, isUploading } = useSingleFileUpload();

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
      const formData = new FormData();
    if (!selectedFile) return;
    formData.append("singleFile", selectedFile);
   console.log(formData.get("singleFile")) 
    upload(formData)
      .then((data) => {
        setUrl(data.url, fileFor);
        toast("File uploaded", {
          description: `${data.url}`,
        });
        onClose();
      })
      .catch((error) => {
        toast("File upload failed", {
          description: `${error.error}`,
        });
      });
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
      <Dialog open={isModalOpen} onOpenChange={handleModalClose}>
        <DialogTrigger asChild>

        </DialogTrigger>
        <DialogContent className="sm:max-w-md bg-cyan-800 text-white">
          <div className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Upload file</DialogTitle>
              <DialogDescription className="text-white">
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
              <Button
                className=" cursor-pointer hover:bg-gray-500"
                variant="ghost"
                onClick={handleModalClose}
              >
                Cancel
              </Button>
              <Button
                onClick={handleUpload}
                disabled={!selectedFile || isUploading}
                className="gap-2"
              >
                {isUploading ? (
                  <>
                    <div className="h-4 w-4 text-white animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Uploading...
                  </>
                ) : (
                  <div
                    className="flex items-center text-white gap-2"
                    
                  >
                    <Upload className="w-4 h-4" />
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
