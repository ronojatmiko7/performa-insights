import type { MetadataRoute } from "next";
import { getAllPosts } from "../lib/posts";
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
    ...posts.map((post) => ({
      url: postUrl(post.slug),
      lastModified: new Date(post.updated ?? post.date),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
