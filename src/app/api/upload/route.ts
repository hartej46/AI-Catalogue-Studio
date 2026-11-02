import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import sharp, { type Metadata } from "sharp";
import { getCurrentUser } from "@/lib/auth";
import { createClient, createAdminClient } from "@/lib/supabase/server";


// Maximum upload size: 25 MB
const MAX_FILE_SIZE_BYTES = 25 * 1024 * 1024;
const ALLOWED_MIME_TYPES = new Set([
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
]);
const ALLOWED_EXTENSIONS = /\.(jpe?g|png|webp)$/i;

export async function POST(request: Request) {
  try {
    // 1. Identify authenticated user or active demo session
    const user = await getCurrentUser();
    const userId = user?.id || "demo-merchant-id";

    // 2. Parse form data
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const rawProductName = formData.get("product_name") as string | null;

    if (!file) {
      return NextResponse.json(
        { error: "No photo was selected. Please choose a JPG, PNG, or WEBP photo to upload." },
        { status: 400 }
      );
    }

    // 3. Server-side Validation: File size (<= 25 MB)
    if (file.size > MAX_FILE_SIZE_BYTES) {
      return NextResponse.json(
        {
          error: `This photo is too large (${(file.size / (1024 * 1024)).toFixed(1)} MB). Maximum allowed size is 25 MB.`,
        },
        { status: 400 }
      );
    }

    // 4. Server-side Validation: MIME type & Extension
    const mimeType = (file.type || "").toLowerCase();
    const fileName = (file.name || "").toLowerCase();

    if (!ALLOWED_MIME_TYPES.has(mimeType) && !ALLOWED_EXTENSIONS.test(fileName)) {
      return NextResponse.json(
        {
          error: "Unsupported file type. Please upload a JPG, PNG, or WEBP photo.",
        },
        { status: 400 }
      );
    }

    // 5. Read buffer into memory
    const arrayBuffer = await file.arrayBuffer();
    const inputBuffer = Buffer.from(arrayBuffer);

    // 6. Validate image data with Sharp
    let metadata: Metadata;
    try {
      metadata = await sharp(inputBuffer).metadata();
    } catch {
      return NextResponse.json(
        {
          error: "Corrupted or invalid image file. Please choose a valid JPG, PNG, or WEBP photo.",
        },
        { status: 400 }
      );
    }

    if (!metadata.format || !["jpeg", "png", "webp"].includes(metadata.format)) {
      return NextResponse.json(
        {
          error: "Unsupported image format. Please upload a valid JPG, PNG, or WEBP photo.",
        },
        { status: 400 }
      );
    }

    // 7. Dimension Check: Reject images smaller than 800 pixels on long side
    const rawWidth = metadata.width || 0;
    const rawHeight = metadata.height || 0;
    const initialLongSide = Math.max(rawWidth, rawHeight);

    if (initialLongSide < 800) {
      return NextResponse.json(
        {
          error: "This photo is too small. Please use a larger photo.",
        },
        { status: 400 }
      );
    }

    // 8. Rotate correctly using camera EXIF orientation, resize long side to at most 2048px, output clean JPG
    const processedBuffer = await sharp(inputBuffer)
      .rotate() // Automatically respects EXIF orientation metadata
      .resize({
        width: 2048,
        height: 2048,
        fit: "inside",
        withoutEnlargement: true,
      })
      .jpeg({
        quality: 90,
        progressive: true,
        mozjpeg: true,
      })
      .toBuffer();

    const processedMeta = await sharp(processedBuffer).metadata();

    // 9. Optional Product Name Validation: Plain text, <= 60 chars, letters, numbers, spaces & hyphens only
    let sanitizedProductName: string | null = null;
    if (rawProductName && typeof rawProductName === "string") {
      const trimmed = rawProductName.trim();
      if (trimmed.length > 0) {
        if (trimmed.length > 60) {
          return NextResponse.json(
            { error: "Product name must be 60 characters or less." },
            { status: 400 }
          );
        }
        if (!/^[a-zA-Z0-9 -]+$/.test(trimmed)) {
          return NextResponse.json(
            {
              error:
                "Product name can only contain letters, numbers, spaces, and hyphens.",
            },
            { status: 400 }
          );
        }
        sanitizedProductName = trimmed;
      }
    }

    // 10. Generate storage file path: <user_id>/<random_id>.jpg
    const randomId = randomUUID();
    const storagePath = `${userId}/${randomId}.jpg`;

    // 11. Upload to Supabase Storage "originals" bucket (Private)
    let supabase = await createAdminClient();
    let uploadResult = await supabase.storage
      .from("originals")
      .upload(storagePath, processedBuffer, {
        contentType: "image/jpeg",
        upsert: true,
      });

    // If bucket does not exist or permission denied with admin client, attempt anon client
    if (uploadResult.error) {
      const client = await createClient();
      uploadResult = await client.storage
        .from("originals")
        .upload(storagePath, processedBuffer, {
          contentType: "image/jpeg",
          upsert: true,
        });
    }

    let signedUrl: string | null = null;

    if (uploadResult.error) {
      console.warn("Supabase storage upload notice:", uploadResult.error.message);

      // If bucket has not been created yet in Supabase Dashboard
      if (
        uploadResult.error.message.includes("Bucket not found") ||
        uploadResult.error.message.includes("not found")
      ) {
        // Provide data URL preview for local dev testing so developer is not blocked, with instructions
        const base64Preview = `data:image/jpeg;base64,${processedBuffer.toString("base64")}`;
        return NextResponse.json({
          success: true,
          original_path: storagePath,
          signed_url: base64Preview,
          product_name: sanitizedProductName,
          warning:
            "Supabase 'originals' bucket is not created yet. Please create private bucket 'originals' in Supabase Dashboard.",
          dimensions: {
            width: processedMeta.width,
            height: processedMeta.height,
            long_side: Math.max(processedMeta.width || 0, processedMeta.height || 0),
          },
          file_size: processedBuffer.length,
        });
      }

      return NextResponse.json(
        {
          error: `Storage upload failed: ${uploadResult.error.message}`,
        },
        { status: 500 }
      );
    }

    // 12. Generate short-lived signed link (never public)
    const { data: signedData, error: signError } = await supabase.storage
      .from("originals")
      .createSignedUrl(storagePath, 3600); // 1-hour expiration

    if (signError || !signedData?.signedUrl) {
      // Fallback data URL if signing had an issue
      signedUrl = `data:image/jpeg;base64,${processedBuffer.toString("base64")}`;
    } else {
      signedUrl = signedData.signedUrl;
    }

    return NextResponse.json({
      success: true,
      original_path: storagePath,
      signed_url: signedUrl,
      product_name: sanitizedProductName,
      dimensions: {
        width: processedMeta.width,
        height: processedMeta.height,
        long_side: Math.max(processedMeta.width || 0, processedMeta.height || 0),
      },
      file_size: processedBuffer.length,
    });
  } catch (error: any) {
    console.error("Upload route error:", error);
    return NextResponse.json(
      {
        error: error?.message || "Failed to process and upload image.",
      },
      { status: 500 }
    );
  }
}

// DELETE: Remove an uploaded photo from private storage
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const path = searchParams.get("path");

    if (!path) {
      return NextResponse.json({ error: "Missing file path" }, { status: 400 });
    }

    const supabase = await createAdminClient();
    await supabase.storage.from("originals").remove([path]);

    return NextResponse.json({ success: true, message: "File removed successfully." });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Failed to delete file" },
      { status: 500 }
    );
  }
}
