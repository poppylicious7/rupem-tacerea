import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

// Simple password check
function isAuthorized(request: NextRequest): boolean {
  const authHeader = request.headers.get("authorization");
  if (!authHeader) return false;

  const password = authHeader.replace("Bearer ", "");
  return password === process.env.ADMIN_PASSWORD;
}

// GET - List all stories
export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status") || "pending";

    const result = await sql`
      SELECT id, name, title, story, age_range, email, status, admin_notes, created_at, updated_at
      FROM stories
      WHERE status = ${status}
      ORDER BY created_at DESC
    `;

    return NextResponse.json({ stories: result.rows });
  } catch (error) {
    console.error("Get stories error:", error);
    return NextResponse.json({ error: "Failed to fetch stories" }, { status: 500 });
  }
}

// PUT - Update a story (edit, approve, reject)
export async function PUT(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id, title, story, status, adminNotes } = await request.json();

    if (!id) {
      return NextResponse.json({ error: "Story ID required" }, { status: 400 });
    }

    await sql`
      UPDATE stories
      SET title = ${title || null},
          story = COALESCE(${story}, story),
          status = COALESCE(${status}, status),
          admin_notes = COALESCE(${adminNotes}, admin_notes),
          updated_at = NOW()
      WHERE id = ${id}
    `;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Update story error:", error);
    return NextResponse.json({ error: "Failed to update story" }, { status: 500 });
  }
}

// DELETE - Delete a story
export async function DELETE(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Story ID required" }, { status: 400 });
    }

    await sql`DELETE FROM stories WHERE id = ${id}`;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete story error:", error);
    return NextResponse.json({ error: "Failed to delete story" }, { status: 500 });
  }
}
