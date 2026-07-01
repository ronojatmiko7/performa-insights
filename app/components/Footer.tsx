export default function Footer() {
  return (
    <footer className="border-t border-gray-200 mt-24"
      style={{ backgroundColor: "#f9fafb" }}>
      <div className="max-w-6xl mx-auto px-4 py-12 flex flex-col md:flex-row justify-between gap-8">

        <div>
          <div className="font-bold text-xl mb-1" style={{ color: "#005073" }}>
            Performa International Indonesia
          </div>
          <p className="text-sm text-gray-500 max-w-xs">
            Konsultan transformasi organisasi, sistem KPI, dan pengembangan kepemimpinan.
          </p>
          <p className="text-sm text-gray-400 mt-3">
            Centennial Tower 29th Floor Unit DE<br />
            Jl. Jend. Gatot Subroto Kav. 24-25<br />
            Jakarta Selatan 12930
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <div className="text-sm font-semibold text-gray-700 mb-1">Navigasi</div>
          <a href="https://www.performa.co.id/#solusi"
            className="text-sm text-gray-500 hover:text-[#005073] transition-colors">
            Solusi
          </a>
          <a href="https://www.performa.co.id/#konsultan"
            className="text-sm text-gray-500 hover:text-[#005073] transition-colors">
            Konsultan Kami
          </a>
          <a href="/insights"
            className="text-sm text-gray-500 hover:text-[#005073] transition-colors">
            Insights
          </a>
        </div>

        <div className="flex flex-col gap-3">
          <div className="text-sm font-semibold text-gray-700 mb-1">Hubungi Kami</div>
          <a href="https://wa.me/6287770781950"
            target="_blank" rel="noopener noreferrer"
            className="text-sm text-white px-4 py-2 rounded-full text-center transition-colors"
            style={{ backgroundColor: "#005073" }}>
            WhatsApp Kami
          </a>
          <a href="mailto:info@performa.co.id"
            className="text-sm text-gray-500 hover:text-[#005073] transition-colors">
            info@performa.co.id
          </a>
          <a href="https://calendly.com/performaconsulting/diagnostic"
            target="_blank" rel="noopener noreferrer"
            className="text-sm px-4 py-2 rounded-full border-2 text-center transition-colors"
            style={{ borderColor: "#005073", color: "#005073" }}>
            Diagnostik Organisasi
          </a>
        </div>
      </div>

      <div className="border-t border-gray-200 py-4 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} PT Performa International Indonesia. All rights reserved.
      </div>
    </footer>
  );
}
