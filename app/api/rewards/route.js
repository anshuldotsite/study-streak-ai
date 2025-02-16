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
  try {
    const { email, rewardId } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "User email is required" }, { status: 400 });
    }

    // Fetch user details based on email
    const { data: user, error: userError } = await supabase
      .from("users")
      .select("rewards")
      .eq("email", email)
      .single();

    if (userError || !user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Fetch reward details
    const { data: reward, error: rewardError } = await supabase
      .from("rewards_store")
      .select("cost, coupon_code")
      .eq("id", rewardId)
      .single();

    if (rewardError || !reward) {
      return NextResponse.json({ error: "Reward not found" }, { status: 404 });
    }

    // Check if user has enough rewards
    if (user.rewards < reward.cost) {
      return NextResponse.json({ error: "Not enough reward points" }, { status: 400 });
    }

    // Deduct reward points
    const newRewards = user.rewards - reward.cost;
    const { error: updateError } = await supabase
      .from("users")
      .update({ rewards: newRewards })
      .eq("email", email);

    if (updateError) {
      return NextResponse.json({ error: "Failed to update user rewards" }, { status: 500 });
    }

    return NextResponse.json({
      message: "Reward redeemed!",
      coupon: reward.coupon_code,
      newRewards,
    });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
