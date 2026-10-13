import { fetchGithubReleases } from '../src/releases.js'

/**
 * Vercel Function: GitHub release list, cached on Vercel's CDN so visitors
 * don't hit GitHub's unauthenticated rate limit. Set GITHUB_TOKEN in the
 * project's environment variables to raise the upstream limit further.
 */
export async function GET() {
  try {
    const releases = await fetchGithubReleases(process.env.GITHUB_TOKEN, { checksum: true })
    return Response.json(releases, {
      headers: {
        'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=86400',
      },
    })
  } catch (err) {
    return Response.json(
      { error: err instanceof Error ? err.message : 'upstream error' },
      { status: 502, headers: { 'Cache-Control': 'public, s-maxage=60' } },
    )
  }
}
