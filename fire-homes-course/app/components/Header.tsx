import Link from "next/link";
import { GoHome } from "react-icons/go";

export function Header() {
  return (
    <header className="flex justify-between items-center h-24 px-5 bg-sky-950 text-white rounded-t-lg tracking-widest">
      <Link href="/" className="flex items-center gap-1 text-3xl font-normal">
        <GoHome className="pb-1" />
        <span className="uppercase">Fire Homes</span>
      </Link>

      <nav className="flex items-center gap-2 text-normal font-normal">
        <Link className="hover:underline pr-4" href="/">
          PROPERTY SEARCH
        </Link>
        <Link className="hover:underline" href="/login">
          LOGIN
        </Link>
        <div className="border-l border-white/50 h-8"></div>
        <Link className="hover:underline" href="/register">
          SIGNUP
        </Link>
      </nav>
    </header>
  );
}
