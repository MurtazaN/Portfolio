export default function Footer() {
  return (
    <footer className="border-t border-white/5 px-6 py-8">
      <div className="mx-auto flex max-w-5xl items-center justify-between">
        <p className="text-xs text-gray-600">
          &copy; {new Date().getFullYear()} Murtaza Nipplewala
        </p>
        <p className="text-xs text-gray-600">
          Built with Next.js &amp; Tailwind CSS
        </p>
      </div>
    </footer>
  );
}
