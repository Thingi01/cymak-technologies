import { NextRequest, NextResponse } from "next/server";
import { processAndUploadImage } from "@/lib/upload";

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif"];

export async function POST(request: NextRequest) {
  const formData = await request.formData().catch(() => null);
  if (!formData) return NextResponse.json({ error: "Expected multipart/form-data" }, { status: 400 });

  const file = formData.get("file");
  const folderRaw = formData.get("folder");
 const folder = folderRaw === "blog" ? "blog" : folderRaw === "testimonials" ? "testimonials" : "projects";

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Missing file field" }, { status: 400 });
  }
  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json({ error: `Unsupported file type: ${file.type}` }, { status: 400 });
  }
  if (file.size > MAX_FILE_SIZE_BYTES) {
    return NextResponse.json({ error: "File is too large (max 10MB)" }, { status: 400 });
  }

  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const result = await processAndUploadImage(buffer, file.name, folder);
    return NextResponse.json({ url: result.url, width: result.width, height: result.height, size: result.size });
  } catch (err) {
    console.error("[upload] failed:", err);
    const message = err instanceof Error ? err.message : "Upload failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
