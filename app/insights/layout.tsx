import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function InsightsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      <Navbar />
      <main className="pt-16">
        {children}
      </main>
      <Footer />
    </div>
  );
}
