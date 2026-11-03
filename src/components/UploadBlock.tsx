"use client";

import { useState, useRef, ChangeEvent, DragEvent } from "react";
import Image from "next/image";
import {
  Upload,
  Camera,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Lock,
  Sparkles,
  Maximize2,
  FileImage,
} from "lucide-react";

export interface UploadedPhotoData {
  originalPath: string;
  signedUrl: string;
  productName: string;
  dimensions?: {
    width?: number;
    height?: number;
    long_side?: number;
  };
  fileSize?: number;
}

interface UploadBlockProps {
  onUploadChange: (photo: UploadedPhotoData | null) => void;
  initialPhoto?: UploadedPhotoData | null;
  domainLabel?: string;
}

const MAX_FILE_SIZE_BYTES = 25 * 1024 * 1024; // 25 MB
const ALLOWED_EXTENSIONS = /\.(jpe?g|png|webp)$/i;

export default function UploadBlock({
  onUploadChange,
  initialPhoto = null,
  domainLabel = "Product",
}: UploadBlockProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [uploadedPhoto, setUploadedPhoto] = useState<UploadedPhotoData | null>(
    initialPhoto
  );
  const [productName, setProductName] = useState(initialPhoto?.productName || "");
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [warningMsg, setWarningMsg] = useState<string | null>(null);

  // Client-side sanitizer for product name (letters, numbers, spaces, hyphens, <= 60 chars)
  const handleProductNameChange = (value: string) => {
    const sanitized = value.replace(/[^a-zA-Z0-9 -]/g, "").slice(0, 60);
    setProductName(sanitized);

    if (uploadedPhoto) {
      const updated = { ...uploadedPhoto, productName: sanitized };
      setUploadedPhoto(updated);
      onUploadChange(updated);
    }
  };

  // Pre-validate file in browser before sending to server
  const validateAndUpload = (file: File) => {
    setErrorMsg(null);
    setWarningMsg(null);

    // 1. Extension & MIME Type Check
    const isMimeValid =
      file.type === "image/jpeg" ||
      file.type === "image/png" ||
      file.type === "image/webp";
    const isExtValid = ALLOWED_EXTENSIONS.test(file.name);

    if (!isMimeValid && !isExtValid) {
      setErrorMsg(
        "Unsupported file type. Please upload a JPG, PNG, or WEBP photo."
      );
      return;
    }

    // 2. File Size Check (<= 25 MB)
    if (file.size > MAX_FILE_SIZE_BYTES) {
      const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
      setErrorMsg(
        `This photo is too large (${sizeMb} MB). Maximum allowed size is 25 MB.`
      );
      return;
    }

    // 3. Image Dimension Check (>= 800px on the long side)
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new window.Image();
      img.onload = () => {
        const longSide = Math.max(img.naturalWidth, img.naturalHeight);
        if (longSide < 800) {
          setErrorMsg("This photo is too small. Please use a larger photo.");
          return;
        }

        // Passed all browser pre-checks -> proceed to upload
        executeUpload(file);
      };
      img.onerror = () => {
        setErrorMsg("Could not decode image. Please select a valid photo.");
      };
      img.src = e.target?.result as string;
    };
    reader.onerror = () => {
      setErrorMsg("Failed to read file.");
    };
    reader.readAsDataURL(file);
  };

  const executeUpload = (file: File) => {
    setIsUploading(true);
    setUploadProgress(10);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("product_name", productName.trim());

    // Use XMLHttpRequest for granular progress bar simulation + real transfer
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/upload", true);

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percent = Math.round((event.loaded / event.total) * 75);
        setUploadProgress(Math.max(percent, 15));
      }
    };

    xhr.onload = () => {
      setUploadProgress(95);

      try {
        const data = JSON.parse(xhr.responseText);

        if (xhr.status >= 200 && xhr.status < 300 && data.success) {
          setUploadProgress(100);

          const photoResult: UploadedPhotoData = {
            originalPath: data.original_path,
            signedUrl: data.signed_url,
            productName: productName.trim(),
            dimensions: data.dimensions,
            fileSize: data.file_size,
          };

          setUploadedPhoto(photoResult);
          onUploadChange(photoResult);

          if (data.warning) {
            setWarningMsg(data.warning);
          }
        } else {
          setErrorMsg(data.error || "Upload failed. Please try again.");
          onUploadChange(null);
        }
      } catch {
        setErrorMsg("Invalid server response. Please try again.");
        onUploadChange(null);
      } finally {
        setTimeout(() => setIsUploading(false), 300);
      }
    };

    xhr.onerror = () => {
      setErrorMsg("Network error occurred during upload. Please try again.");
      setIsUploading(false);
      onUploadChange(null);
    };

    xhr.send(formData);
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      validateAndUpload(file);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      validateAndUpload(file);
    }
  };

  const handleRemovePhoto = async () => {
    if (uploadedPhoto?.originalPath) {
      try {
        await fetch(
          `/api/upload?path=${encodeURIComponent(uploadedPhoto.originalPath)}`,
          { method: "DELETE" }
        );
      } catch {
        // Non-fatal
      }
    }

    setUploadedPhoto(null);
    setErrorMsg(null);
    setWarningMsg(null);
    setUploadProgress(0);
    onUploadChange(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="bg-surface rounded-[8px] p-3.5 border border-border shadow-warm-sm space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <div className="w-6 h-6 rounded-[4px] bg-bg border border-border flex items-center justify-center text-brass">
            <Camera className="w-3.5 h-3.5" />
          </div>
          <span className="font-semibold text-xs uppercase tracking-wider text-ink">
            Product Photo Staging
          </span>
        </div>
        <div className="flex items-center gap-1 text-[10px] text-muted font-normal bg-bg border border-border px-2 py-0.5 rounded-[4px]">
          <Lock className="w-3 h-3 text-brass" />
          <span>Private &amp; Encrypted</span>
        </div>
      </div>

      {/* Error Message Banner */}
      {errorMsg && (
        <div className="p-2.5 bg-surface border border-accent rounded-[6px] flex items-start gap-2 text-xs text-accent">
          <AlertCircle className="w-4 h-4 text-accent shrink-0 mt-0.5" />
          <div className="flex-1 text-[11px] font-medium leading-relaxed">
            {errorMsg}
          </div>
          <button
            type="button"
            onClick={() => setErrorMsg(null)}
            className="text-accent hover:text-accent-hover text-xs font-bold leading-none p-0.5"
          >
            ✕
          </button>
        </div>
      )}

      {/* Warning Notice (e.g. Supabase bucket creation tip) */}
      {warningMsg && (
        <div className="p-2 bg-surface border border-brass rounded-[6px] text-[10px] text-ink leading-snug">
          Notice: {warningMsg}
        </div>
      )}

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={handleFileInputChange}
      />

      {/* Upload State / Thumbnail */}
      {uploadedPhoto ? (
        <div className="space-y-3">
          {/* Uploaded Thumbnail Card */}
          <div className="relative rounded-[6px] border border-border bg-bg p-3 flex items-center gap-3">
            {/* Thumbnail Preview with signed link */}
            <div className="relative w-20 h-20 rounded-[4px] overflow-hidden border border-border bg-surface shrink-0 shadow-warm-sm">
              <Image
                src={uploadedPhoto.signedUrl}
                alt={productName || "Uploaded product"}
                fill
                className="object-cover"
                unoptimized
              />
            </div>

            {/* Metadata Info */}
            <div className="flex-1 min-w-0 space-y-1">
              <div className="flex items-center gap-1 text-ink font-semibold text-xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0" />
                <span className="truncate">Ready for 4K Synthesis</span>
              </div>

              <div className="text-[10px] text-muted space-y-0.5">
                <p className="truncate font-medium text-ink">
                  {productName || `${domainLabel} Photograph`}
                </p>
                {uploadedPhoto.dimensions && (
                  <p className="font-mono text-[9px] text-muted">
                    {uploadedPhoto.dimensions.width} ×{" "}
                    {uploadedPhoto.dimensions.height} px · Normalized JPG
                  </p>
                )}
                <div className="flex items-center gap-1 text-[9px] text-muted">
                  <Camera className="w-2.5 h-2.5 text-brass" />
                  <span>Camera rotation auto-aligned</span>
                </div>
              </div>
            </div>

            {/* Remove Button */}
            <button
              type="button"
              onClick={handleRemovePhoto}
              title="Remove photo"
              className="p-2 rounded-[4px] border border-border bg-surface text-muted hover:text-accent hover:border-accent transition-colors duration-150 shrink-0 cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* Upload Dropzone */
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => !isUploading && fileInputRef.current?.click()}
          className={`relative rounded-[6px] border border-dashed p-5 text-center cursor-pointer transition-colors duration-150 ${
            isDragging
              ? "border-accent bg-bg"
              : "border-border bg-bg hover:border-muted hover:bg-surface"
          }`}
        >
          {isUploading ? (
            <div className="space-y-2.5 py-2">
              <Loader2 className="w-6 h-6 text-accent animate-spin mx-auto" />
              <div className="text-xs font-semibold text-ink">
                Processing &amp; Normalizing Photo...
              </div>

              {/* Progress Bar */}
              <div className="w-48 mx-auto bg-border rounded-[2px] h-1 overflow-hidden">
                <div
                  className="bg-accent h-1 rounded-[2px] transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              <div className="text-[10px] text-muted">
                {uploadProgress < 75
                  ? `Uploading (${uploadProgress}%)`
                  : "Checking rotation & converting to 2048px JPG..."}
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="w-9 h-9 rounded-[4px] bg-surface border border-border text-brass flex items-center justify-center mx-auto">
                <Upload className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-semibold text-ink">
                  Upload Raw Product Photo
                </p>
                <p className="text-[10px] text-muted mt-0.5">
                  Drag &amp; drop or tap to browse from camera
                </p>
              </div>
              <div className="inline-flex items-center gap-1 text-[9px] text-muted bg-surface border border-border px-2 py-0.5 rounded-[4px]">
                <span>JPG, PNG, WEBP</span>
                <span>·</span>
                <span>Min 800px</span>
                <span>·</span>
                <span>Max 25 MB</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Optional Product Name Field */}
      <div className="space-y-1 pt-1">
        <div className="flex items-center justify-between text-[10px]">
          <label className="font-medium text-ink">
            Product Name <span className="text-muted font-normal">(Optional)</span>
          </label>
          <span className="text-[9px] text-muted font-mono">
            {productName.length}/60
          </span>
        </div>
        <input
          type="text"
          value={productName}
          onChange={(e) => handleProductNameChange(e.target.value)}
          maxLength={60}
          placeholder="e.g. Heritage Polki Choker"
          className="w-full text-xs px-3 py-2 rounded-[4px] border border-border bg-bg text-ink placeholder-muted focus:bg-surface focus:border-accent outline-none transition-colors duration-150"
        />
        <p className="text-[9px] text-muted">
          Plain text only: letters, numbers, spaces, and hyphens (max 60 characters).
        </p>
      </div>
    </div>
  );
}
