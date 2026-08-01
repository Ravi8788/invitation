import { NextResponse } from "next/server";
import { blessingsSchema } from "@/lib/validations";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = blessingsSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, errors: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    // TODO: connect to storage (Sheets/DB/email)
    console.info("[Blessings] New message:", parsed.data);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid request" },
      { status: 400 }
    );
  }
}
