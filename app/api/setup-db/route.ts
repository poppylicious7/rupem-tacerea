import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function GET() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS stories (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(100) NOT NULL DEFAULT 'Anonim',
        title VARCHAR(200),
        story TEXT NOT NULL,
        age_range VARCHAR(50),
        location VARCHAR(100),
        email VARCHAR(255),
        status VARCHAR(20) DEFAULT 'pending',
        admin_notes TEXT,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `;

    // Add title column if it doesn't exist (for existing tables)
    await sql`
      ALTER TABLE stories ADD COLUMN IF NOT EXISTS title VARCHAR(200)
    `;

    await sql`CREATE INDEX IF NOT EXISTS idx_stories_status ON stories(status)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_stories_created ON stories(created_at DESC)`;

    return NextResponse.json({ success: true, message: "Table created/updated!" });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: String(error)
    }, { status: 500 });
  }
}
