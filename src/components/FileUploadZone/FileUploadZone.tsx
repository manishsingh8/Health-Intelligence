import { Upload, FileText, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useState, useRef } from "react";

interface FileUploadZoneProps {
  onFileSelect: (file: File | null) => void;
  selectedFile: File | null;
  accept?: string;
  maxSize?: number;
}

const FileUploadZone = ({
  onFileSelect,
  selectedFile,
  accept = ".835,.eob,.x12",
  maxSize = 10 * 1024 * 1024,
}: FileUploadZoneProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): boolean => {
    if (file.size > maxSize) {
      setError(`File size must be less than ${maxSize / (1024 * 1024)}MB`);
      return false;
    }
    setError("");
    return true;
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (validateFile(file)) {
        onFileSelect(file);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (validateFile(file)) {
        onFileSelect(file);
      }
    }
  };

  const handleRemoveFile = () => {
    onFileSelect(null);
    setError("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="space-y-2">
      {!selectedFile ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`
            border-2 border-dashed rounded-lg p-12
            transition-all cursor-pointer
            hover-elevate active-elevate-2
            ${
              isDragging
                ? "border-primary bg-primary/5 scale-[1.02]"
                : "border-border"
            }
          `}
          data-testid="dropzone-upload"
        >
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="p-4 rounded-full bg-muted">
              <Upload className="h-4 w-8 text-muted-foreground" />
            </div>
            <div className="text-center space-y-2">
              <p className="text-base font-medium text-foreground">
                Drag and drop your ERA/EOB file here
              </p>
              <p className="text-sm text-muted-foreground">
                or click to browse
              </p>
              <p className="text-xs text-muted-foreground">
                Supported formats: X12 835, EOB
              </p>
            </div>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept={accept}
            onChange={handleFileChange}
            className="hidden"
            data-testid="input-file"
          />
        </div>
      ) : (
        <div
          className="flex items-center justify-between p-4 rounded-md bg-muted border border-border"
          data-testid="file-preview"
        >
          <div className="flex items-center gap-3">
            <FileText className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium text-foreground font-mono">
                {selectedFile.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {formatFileSize(selectedFile.size)}
              </p>
            </div>
          </div>
          <Button
            size="icon"
            variant="ghost"
            onClick={handleRemoveFile}
            data-testid="button-remove-file"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      {error && (
        <p className="text-sm text-destructive" data-testid="text-error">
          {error}
        </p>
      )}
    </div>
  );
};

export default FileUploadZone;
