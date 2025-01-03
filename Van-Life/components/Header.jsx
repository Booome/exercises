import { Link } from "react-router-dom";

export function Header() {
    return (
        <header className="min-h-28 flex justify-between items-center px-6">
            <Link className="text-2xl font-bold text-black" to="/">
                #VANLIFE
            </Link>
            <nav>
                <ul className="text-base font-semibold flex gap-4">
                    <li>
                        <Link to="/host">Host</Link>
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                    <li>
                        <Link to="/vans">Vans</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
