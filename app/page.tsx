import { permanentRedirect } from "next/navigation";

// 308 (permanent) so search engines treat /insights as the real home.
export default function Home() {
  permanentRedirect("/insights");
}
