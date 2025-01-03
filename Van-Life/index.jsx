import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import { Home } from "./Pages/Home";
import { About } from "./Pages/About";
import { Vans } from "./Pages/Vans";

function Header() {
    return (
        <header className="bg-orange-50 min-h-28 flex justify-between items-center px-6">
            <Link className="text-2xl font-bold text-black" to="/">
                #VANLIFE
            </Link>
            <nav>
                <ul className="text-base font-semibold flex gap-3">
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

function Footer() {
    return (
        <footer className="bg-neutral-800 flex justify-center items-center min-h-16 text-sm text-zinc-400 font-medium">
            Ⓒ 2022 #VANLIFE
        </footer>
    );
}

function App() {
    return (
        <>
            <BrowserRouter>
                <Header />

                <main className="flex-grow">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/vans" element={<Vans />} />
                    </Routes>
                </main>

                <Footer />
            </BrowserRouter>
        </>
    );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
