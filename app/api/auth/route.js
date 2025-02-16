import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcrypt";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function POST(req) {
  const { email, password } = await req.json();

  const { data: user, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();
  if (!user || error)
    return NextResponse.json({ error: "Invalid email" }, { status: 401 });

  const validPassword = bcrypt.compareSync(password, user.password_hash);
  if (!validPassword)
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });

  return NextResponse.json({ message: "Login successful", user });
}
