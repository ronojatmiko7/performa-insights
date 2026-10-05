import type { MetadataRoute } from "next";
import { getAllPosts } from "../lib/posts";
import { CATALOG_PATH, CATALOG_UPDATED, TRACKS } from "../lib/catalog";
import { POSTS_PATH, SITE_URL, postUrl } from "../lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const newest = posts[0] ? new Date(posts[0].updated ?? posts[0].date) : new Date();

  return [
    {
      url: `${SITE_URL}${POSTS_PATH}`,
      lastModified: newest,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}${CATALOG_PATH}`,
      lastModified: new Date(CATALOG_UPDATED),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${SITE_URL}${CATALOG_PATH}/metode`,
      lastModified: new Date(CATALOG_UPDATED),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    ...TRACKS.map((track) => ({
      url: `${SITE_URL}${CATALOG_PATH}/${track.slug}`,
      lastModified: new Date(CATALOG_UPDATED),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...posts.map((post) => ({
      url: postUrl(post.slug),
      lastModified: new Date(post.updated ?? post.date),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
