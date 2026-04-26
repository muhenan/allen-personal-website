import { NextResponse } from "next/server";

const API_KEY = process.env.WAKA_API_KEY ?? "";
const BASE = "https://wakatime.com/api/v1";

async function wakaFetch(path: string) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { Authorization: `Basic ${Buffer.from(API_KEY).toString("base64")}` },
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error(`WakaTime API error: ${res.status} ${path}`);
  return res.json();
}

export async function GET() {
  try {
    const [stats, allTime] = await Promise.all([
      wakaFetch("/users/current/stats/last_7_days"),
      wakaFetch("/users/current/all_time_since_today"),
    ]);

    const s = stats.data;

    // Languages — top 10
    const languages = (s.languages ?? []).slice(0, 10).map((l: { name: string; percent: number; text: string }) => ({
      name: l.name,
      percent: l.percent,
      text: l.text,
    }));

    // Editors
    const editors = (s.editors ?? []).slice(0, 5).map((e: { name: string; percent: number; text: string }) => ({
      name: e.name,
      percent: e.percent,
      text: e.text,
    }));

    // Daily averages from last 7 days
    const dailyAvg = s.human_readable_daily_average_including_other_language ?? "0 hrs 0 mins";
    const totalWeek = s.human_readable_total_including_other_language ?? "0 hrs 0 mins";

    // Operating systems
    const os = (s.operating_systems ?? []).slice(0, 3).map((o: { name: string; percent: number; text: string }) => ({
      name: o.name,
      percent: o.percent,
      text: o.text,
    }));

    // Categories (coding, debugging, browsing, etc.)
    const categories = (s.categories ?? []).slice(0, 5).map((c: { name: string; percent: number; text: string }) => ({
      name: c.name,
      percent: c.percent,
      text: c.text,
    }));

    return NextResponse.json({
      dailyAvg,
      totalWeek,
      totalAllTime: allTime.data?.text ?? "N/A",
      languages,
      editors,
      os,
      categories,
      bestDay: s.best_day ? {
        date: s.best_day.date,
        text: s.best_day.text,
      } : null,
    });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
