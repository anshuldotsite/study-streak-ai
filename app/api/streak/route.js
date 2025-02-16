import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function POST(req) {
  const { userId } = await req.json();
  const { data: user } = await supabase
    .from("users")
    .select("last_study_date, streak_count")
    .eq("id", userId)
    .single();

  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  const lastStudy = new Date(user.last_study_date);
  const today = new Date();

  if (lastStudy.toDateString() !== today.toDateString()) {
    await supabase
      .from("users")
      .update({
        streak_count: user.streak_count + 1,
        last_study_date: new Date(),
      })
      .eq("id", userId);
  }

  return NextResponse.json({ message: "Streak updated!" });
}
