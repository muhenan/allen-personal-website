import { NextResponse } from "next/server";

const USERNAME = "muhenan";
const BASE = "https://api.github.com";
const HEADERS = { "Accept": "application/vnd.github+json", "X-GitHub-Api-Version": "2022-11-28" };

async function ghFetch(path: string) {
  const res = await fetch(`${BASE}${path}`, { headers: HEADERS, next: { revalidate: 3600 } });
  if (!res.ok) throw new Error(`GitHub API error: ${res.status} ${path}`);
  return res.json();
}

export async function GET() {
  try {
    const [user, repos, events] = await Promise.all([
      ghFetch(`/users/${USERNAME}`),
      ghFetch(`/users/${USERNAME}/repos?per_page=100&sort=pushed`),
      ghFetch(`/users/${USERNAME}/events?per_page=100`),
    ]);

    // Language distribution
    const langMap: Record<string, number> = {};
    for (const repo of repos) {
      if (repo.language) {
        langMap[repo.language] = (langMap[repo.language] || 0) + 1;
      }
    }
    const languages = Object.entries(langMap)
      .sort((a, b) => b[1] - a[1])
      .map(([name, count]) => ({ name, count }));

    // Top repos by stars
    const topRepos = [...repos]
      .sort((a: { stargazers_count: number }, b: { stargazers_count: number }) => b.stargazers_count - a.stargazers_count)
      .slice(0, 12)
      .map((r: {
        name: string; description: string; html_url: string;
        stargazers_count: number; forks_count: number; language: string; pushed_at: string; topics: string[];
      }) => ({
        name: r.name,
        description: r.description,
        url: r.html_url,
        stars: r.stargazers_count,
        forks: r.forks_count,
        language: r.language,
        pushedAt: r.pushed_at,
        topics: r.topics,
      }));

    // Contribution heatmap — last 90 days from events
    const heatmap: Record<string, number> = {};
    for (const event of events) {
      if (["PushEvent", "PullRequestEvent", "IssuesEvent", "CreateEvent"].includes(event.type)) {
        const day = event.created_at.slice(0, 10);
        heatmap[day] = (heatmap[day] || 0) + 1;
      }
    }

    // Active hours distribution (0-23)
    const hourCounts = Array(24).fill(0);
    for (const event of events) {
      const hour = new Date(event.created_at).getUTCHours();
      hourCounts[hour]++;
    }
    const activeHours = hourCounts.map((count: number, hour: number) => ({ hour, count }));

    // Active days distribution (0=Sun ... 6=Sat)
    const dayCounts = Array(7).fill(0);
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    for (const event of events) {
      const day = new Date(event.created_at).getUTCDay();
      dayCounts[day]++;
    }
    const activeDays = dayCounts.map((count: number, i: number) => ({ day: dayNames[i], count }));

    // Recent activity feed
    const activityFeed = events.slice(0, 20).map((e: {
      type: string; created_at: string;
      repo: { name: string; url: string };
      payload: { commits?: { message: string }[]; pull_request?: { title: string }; issue?: { title: string }; ref?: string; ref_type?: string };
    }) => {
      let description = "";
      if (e.type === "PushEvent" && e.payload.commits?.length) {
        description = e.payload.commits[0].message.split("\n")[0];
      } else if (e.type === "PullRequestEvent" && e.payload.pull_request) {
        description = e.payload.pull_request.title;
      } else if (e.type === "IssuesEvent" && e.payload.issue) {
        description = e.payload.issue.title;
      } else if (e.type === "CreateEvent") {
        description = `Created ${e.payload.ref_type} ${e.payload.ref ?? ""}`;
      } else if (e.type === "WatchEvent") {
        description = "Starred a repo";
      } else if (e.type === "ForkEvent") {
        description = "Forked a repo";
      }
      return {
        type: e.type,
        repo: e.repo.name,
        description,
        createdAt: e.created_at,
      };
    });

    return NextResponse.json({
      user: {
        login: user.login,
        name: user.name,
        avatar: user.avatar_url,
        bio: user.bio,
        followers: user.followers,
        following: user.following,
        publicRepos: user.public_repos,
        createdAt: user.created_at,
        url: user.html_url,
      },
      languages,
      topRepos,
      heatmap,
      activeHours,
      activeDays,
      activityFeed,
    });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
