import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function POST(request: NextRequest) {
  try {
    const { name, title, story, ageRange, email } = await request.json();

    if (!story || story.trim().length < 50) {
      return NextResponse.json(
        { error: "Povestea trebuie să aibă cel puțin 50 de caractere." },
        { status: 400 }
      );
    }

    await sql`
      INSERT INTO stories (name, title, story, age_range, email, status)
      VALUES (
        ${name || "Anonim"},
        ${title || null},
        ${story.trim()},
        ${ageRange || null},
        ${email || null},
        'pending'
      )
    `;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Submit story error:", error);
    return NextResponse.json(
      { error: "A apărut o eroare. Te rugăm să încerci din nou." },
      { status: 500 }
    );
  }
}
