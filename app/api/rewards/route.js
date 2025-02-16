import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// Get all rewards from the store
export async function GET() {
  const { data, error } = await supabase.from("rewards_store").select("*");
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

// Redeem a reward
export async function POST(req) {
  const { rewardId } = await req.json();
  
  // Get the email from localStorage
  const storedEmail = typeof window !== "undefined" ? localStorage.getItem("email") : null;

  if (!storedEmail) {
    return NextResponse.json({ error: "User not logged in" }, { status: 401 });
  }

  // Fetch user details based on email
  const { data: user, error: userError } = await supabase
    .from("users")
    .select("*")
    .eq("email", storedEmail)
    .single();

  if (userError) return NextResponse.json({ error: userError.message }, { status: 404 });

  // Fetch reward details
  const { data: reward, error: rewardError } = await supabase
    .from("rewards_store")
    .select("*")
    .eq("id", rewardId)
    .single();

  if (rewardError) return NextResponse.json({ error: rewardError.message }, { status: 404 });

  // Check if user has enough rewards
  if (user.rewards < reward.cost) {
    return NextResponse.json({ error: "Not enough reward points" }, { status: 400 });
  }

  // Deduct reward points
  const newRewards = user.rewards - reward.cost;
  const { error: updateError } = await supabase
    .from("users")
    .update({ rewards: newRewards })
    .eq("email", storedEmail);

  if (updateError) return NextResponse.json({ error: updateError.message }, { status: 500 });

  return NextResponse.json({ message: "Reward redeemed!", coupon: reward.coupon_code, newRewards });
}
