import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcrypt";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// 🔹 Register User
export async function POST(req) {
  const { id,name, email, password } = await req.json();
  const hashedPassword = bcrypt.hashSync(password, 10);

  const { data, error } = await supabase
    .from("users")
    .insert([{id, name, email, password_hash: hashedPassword, streak_count: 0, last_study_date: new Date() }])
    .select("id, name, email, streak_count, last_study_date");

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  return NextResponse.json({ message: "User registered!", user: data[0] });
}

// 🔹 User Login (Auto-Increments Streak)
export async function PUT(req) {
  const { email, password } = await req.json();

  const { data: user, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  if (!user || error) return NextResponse.json({ error: "Invalid email" }, { status: 401 });

  const validPassword = bcrypt.compareSync(password, user.password_hash);
  if (!validPassword) return NextResponse.json({ error: "Invalid password" }, { status: 401 });

  // 🔹 Auto-Increment Streak if it's a new day
  const lastStudy = new Date(user.last_study_date);
  const today = new Date();
  if (lastStudy.toDateString() !== today.toDateString()) {
    await supabase
      .from("users")
      .update({ streak_count: user.streak_count + 1, last_study_date: new Date() })
      .eq("email", email);
  }

  return NextResponse.json({ message: "Login successful", email });
}


// 🔹 Fetch User Profile (Using Email)
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json({ error: "Email required" }, { status: 400 });
    }

    const { data: user, error } = await supabase
      .from("users")
      .select("name, email, streak_count, last_study_date, rewards")
      .eq("email", email)
      .single();

    if (!user || error) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status :500});
}
}