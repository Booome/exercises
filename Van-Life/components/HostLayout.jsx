import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";

export function HostLayout() {
    return (
        <div className="px-7">
            <nav className="flex gap-4  text-lg font-medium text-neutral-600">
                <NavLink to="/host">Dashboard</NavLink>
                <NavLink to="/host/income">Income</NavLink>
                <NavLink to="/host/reviews">Reviews</NavLink>
            </nav>
            <Outlet />
        </div>
    );
}

function NavLink({ children, to }) {
    return (
        <Link className="hover:text-neutral-700 hover:underline" to={to}>
            {children}
        </Link>
    );
}
