export default function Footer() {
  return (
    <footer className="border-t border-white/5 px-6 py-8">
      <div className="mx-auto flex max-w-5xl items-center justify-between">
        <p className="text-xs text-gray-600">
          &copy; {new Date().getFullYear()} Murtaza Nipplewala
        </p>
      </div>
    </footer>
  );
}
