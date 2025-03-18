"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { Upload, FileIcon, X, Check } from "lucide-react"
import { useState, type DragEvent, type ChangeEvent, useRef } from "react"

type DragAction = "enter" | "leave" | "drop" | "exit" | "over" | "none"

type DragState = {
  name: string
  action: DragAction
  state: boolean
}

export function SingleFileUploader() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [uploading, setIsUploading] = useState(false)
  const [uploadedFileUrl, setUploadedFileUrl] = useState<string | null>(null)
  const [open, setOpen] = useState(false)

  const [dragState, setDragState] = useState<DragState>({
    name: "drag-box",
    action: "none",
    state: false,
  })
  const inputRef =  useRef<HTMLInputElement | null>(null)
  const handleButtonClick = () => {
    inputRef.current?.click(); // Safe way to access `click()`
  };

  const updateDragState = (action: DragAction, state: boolean) => {
    setDragState((prev) => ({
      ...prev,
      action,
      state,
    }))
  }

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    updateDragState("enter", true)
  }

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    updateDragState("leave", false)
  }

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    updateDragState("over", true)
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    updateDragState("drop", false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0]
      setSelectedFile(file)
    }
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0])
    }
  }



  const resetUpload = () => {
    setSelectedFile(null)
    setUploadedFileUrl(null)
  }

  const getDragAreaClasses = () => {
    const baseClasses =
      "border-2 border-dashed rounded-lg p-12 transition-colors flex flex-col items-center justify-center gap-4 cursor-pointer"

    if (dragState.action === "enter" || dragState.action === "over") {
      return cn(baseClasses, "border-primary bg-primary/5")
    }

    return cn(baseClasses, "border-muted-foreground/25 hover:border-muted-foreground/50")
  }

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
            <Upload className="w-full  h-full" />
          
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Upload file</DialogTitle>
            <DialogDescription>Drag and drop a file or click to browse</DialogDescription>
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
                <div className="text-xs text-muted-foreground">{(selectedFile.size / 1024).toFixed(2)} KB</div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="mt-2"
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedFile(null)
                  }}
                >
                  <X className="w-4 h-4 mr-2" />
                  Remove
                </Button>
              </div>
            ) : (
              <>
                <Upload className="w-12 h-12 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Drag and drop your file here or click to browse</p>
              </>
            )}
            <Input ref={inputRef} type="file" className="hidden" onChange={handleFileChange} />
          </div>

          <DialogFooter className="flex justify-between sm:justify-between">
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={()=>{}} disabled={!selectedFile || uploading} className="gap-2">
              {uploading ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4" />
                  Upload
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {uploadedFileUrl && (
        <div className="mt-4 p-4 border rounded-lg flex items-center gap-3">
          <div className="bg-primary/10 p-2 rounded-full">
            <Check className="w-4 h-4 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium truncate">{selectedFile?.name}</p>
            <p className="text-xs text-muted-foreground">Upload complete</p>
          </div>
          <Button variant="ghost" size="sm" onClick={resetUpload}>
            <X className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  )
}

