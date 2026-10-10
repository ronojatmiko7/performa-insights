// One place for the site's public address. If articles later move to
// https://www.performa.co.id/insights, change SITE_URL here and every
// canonical URL, sitemap entry, and structured-data link follows.
export const SITE_URL = "https://insights.performa.co.id";
export const SITE_NAME = "Performa International Indonesia";
export const POSTS_PATH = "/insights";

/** Turn a /public path into a full URL. Full URLs pass through unchanged. */
export function absoluteUrl(pathOrUrl: string): string {
  return new URL(pathOrUrl, SITE_URL).toString();
}

export function postUrl(slug: string): string {
  return `${SITE_URL}${POSTS_PATH}/${slug}`;
}
