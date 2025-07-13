export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-[#3B82F6] to-[#0F172A] text-white mt-12 shadow-inner">
      <div className="text-center text-xs text-gray-300 mb-4">
        🌱 Powered sustainably. Built with Vercel, Firebase, and care.{' '}
        <a
          href="https://ayandakopanogatsha.com"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-green-200"
        >
          See Developer
        </a>
      </div>
      <div className="container px-4 py-6 text-center text-sm space-y-1">
        <p>&copy; {new Date().getFullYear()} Quickstack by Ayanda K. Gatsha</p>
        <p className="opacity-90">
          Built fast. Built right. No AI, no fluff — just code.
        </p>
      </div>
    </footer>
  );
}
