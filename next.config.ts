import type { NextConfig } from "next";

const NEW_KPI_SLUG = "kenapa-kpi-tidak-tercapai-dan-ini-bukan-salah-karyawan-anda";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Old URL of "Kenapa KPI Tidak Tercapai?" (title and slug changed 9 Oct 2026).
      {
        source: "/insights/kenapa-kpi-gagal-dan-ini-bukan-salah-karyawan-anda",
        destination: `/insights/${NEW_KPI_SLUG}`,
        permanent: true,
      },
      // Short-lived intermediate slug, live for a few hours on 9 Oct 2026.
      {
        source: "/insights/kenapa-kpi-tidak-achieve-dan-ini-bukan-salah-karyawan-anda",
        destination: `/insights/${NEW_KPI_SLUG}`,
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
