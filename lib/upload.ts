import sharp from "sharp";
import { put, del } from "@vercel/blob";

const MAX_WIDTH = 1600;
const WEBP_QUALITY = 82;

export interface UploadResult {
  url: string;
  pathname: string;
  width: number;
  height: number;
  size: number;
}

/**
 * Takes a raw uploaded file buffer, resizes/compresses/converts it to webp
 * with sharp, then stores it in Vercel Blob. Returns the public URL.
 */
export async function processAndUploadImage(
  buffer: Buffer,
  originalName: string,
  folder: "blog" | "projects" = "projects"
): Promise<UploadResult> {
  const image = sharp(buffer).rotate(); // auto-orient based on EXIF

  const metadata = await image.metadata();
  const shouldResize = (metadata.width ?? 0) > MAX_WIDTH;

  const pipeline = shouldResize
    ? image.resize({ width: MAX_WIDTH, withoutEnlargement: true })
    : image;

  const webpBuffer = await pipeline.webp({ quality: WEBP_QUALITY }).toBuffer();
  const outputMeta = await sharp(webpBuffer).metadata();

  const safeBaseName = originalName
    .replace(/\.[^/.]+$/, "")
    .replace(/[^a-zA-Z0-9-_]/g, "-")
    .toLowerCase();
  const pathname = `${folder}/${Date.now()}-${safeBaseName}.webp`;

  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) {
    throw new Error(
      "BLOB_READ_WRITE_TOKEN is not set. Add it to .env (create a Vercel Blob store first)."
    );
  }

  const blob = await put(pathname, webpBuffer, {
    access: "public",
    contentType: "image/webp",
    token,
  });

  return {
    url: blob.url,
    pathname: blob.pathname,
    width: outputMeta.width ?? 0,
    height: outputMeta.height ?? 0,
    size: webpBuffer.length,
  };
}

/** Delete a previously uploaded image from Vercel Blob given its full URL. */
export async function deleteUploadedImage(url: string) {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) return;
  try {
    await del(url, { token });
  } catch (err) {
    console.error("[upload] Failed to delete blob:", err);
  }
}
