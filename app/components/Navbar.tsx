"use client";
import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav style={{ backgroundColor: "#fff", borderBottom: "1px solid #e5e7eb" }}
      className="fixed top-0 left-0 right-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">

        {/* Logo */}
        <Link href="https://www.performa.co.id" className="flex items-center gap-2">
          <img
            src="https://i.ibb.co.com/qMHcWzjh/Logo-Only-performa.png"
            alt="Performa International Indonesia"
            className="h-16 w-auto"
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="https://www.performa.co.id/#solusi"
            className="text-sm font-medium text-gray-600 hover:text-[#005073] transition-colors">
            Solusi
          </Link>
          <Link href="https://www.performa.co.id/#konsultan"
            className="text-sm font-medium text-gray-600 hover:text-[#005073] transition-colors">
            Konsultan Kami
          </Link>
          <Link href="/insights"
            className="text-sm font-medium transition-colors"
            style={{ color: "#005073", fontWeight: 600 }}>
            Insights
          </Link>
          <a href="https://wa.me/6287770781950"
            target="_blank" rel="noopener noreferrer"
            className="text-sm font-medium text-white px-4 py-2 rounded-full transition-colors"
            style={{ backgroundColor: "#005073" }}>
            WhatsApp
          </a>
          <a href="https://calendly.com/performaconsulting/diagnostic"
            target="_blank" rel="noopener noreferrer"
            className="text-sm font-medium px-4 py-2 rounded-full border-2 transition-colors"
            style={{ borderColor: "#005073", color: "#005073" }}>
            Diagnostik Organisasi
          </a>
        </div>

        {/* Mobile hamburger */}
        <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu">
          <div className="w-5 h-0.5 bg-gray-600 mb-1"></div>
          <div className="w-5 h-0.5 bg-gray-600 mb-1"></div>
          <div className="w-5 h-0.5 bg-gray-600"></div>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 flex flex-col gap-4">
          <Link href="https://www.performa.co.id/#solusi"
            className="text-sm font-medium text-gray-700" onClick={() => setMenuOpen(false)}>
            Solusi
          </Link>
          <Link href="https://www.performa.co.id/#konsultan"
            className="text-sm font-medium text-gray-700" onClick={() => setMenuOpen(false)}>
            Konsultan Kami
          </Link>
          <Link href="/insights"
            className="text-sm font-semibold" style={{ color: "#005073" }}
            onClick={() => setMenuOpen(false)}>
            Insights
          </Link>
          <a href="https://wa.me/6287770781950"
            target="_blank" rel="noopener noreferrer"
            className="text-sm font-medium text-white px-4 py-2 rounded-full text-center"
            style={{ backgroundColor: "#005073" }}>
            WhatsApp
          </a>
          <a href="https://calendly.com/performaconsulting/diagnostic"
            target="_blank" rel="noopener noreferrer"
            className="text-sm font-medium px-4 py-2 rounded-full border-2 text-center"
            style={{ borderColor: "#005073", color: "#005073" }}>
            Diagnostik Organisasi
          </a>
        </div>
      )}
    </nav>
  );
}
