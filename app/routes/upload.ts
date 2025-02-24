import { writeFile } from "fs/promises"
import { json } from "@remix-run/node"
import path from "path"

export async function action({ request }: { request: Request }) {
  const formData = await request.formData()
  const file = formData.get("file") as File

  if (!file) {
    return json({ success: false, error: "No file uploaded" }, { status: 400 })
  }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)
  const fileName = `${Date.now()}-${file.name}`
  const filePath = path.join(process.cwd(), "public/uploads", fileName)

  try {
    await writeFile(filePath, buffer)
    return json({ success: true, filePath: `/uploads/${fileName}` })
  } catch (error) {
    console.error("File upload error:", error)
    return json({ success: false, error: "Failed to save file" }, { status: 500 })
  }
}
