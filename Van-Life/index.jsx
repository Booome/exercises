import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import { Home } from "./Pages/Home";
import { Dashboard } from "./Pages/Host/Dashboard";
import { Income } from "./Pages/Host/Income";
import { Reviews } from "./Pages/Host/Reviews";
import { About } from "./Pages/About";
import { Vans } from "./Pages/Vans/Vans";
import { VanDetail } from "./Pages/Vans/VanDetail";

import { Layout } from "./components/Layout";
import { HostLayout } from "./components/HostLayout";
import { VansLayout } from "./components/VansLayout";

import "./server";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />

                    <Route path="host" element={<HostLayout />}>
                        <Route index element={<Dashboard />} />
                        <Route path="income" element={<Income />} />
                        <Route path="reviews" element={<Reviews />} />
                    </Route>

                    <Route path="about" element={<About />} />

                    <Route path="vans" element={<VansLayout />}>
                        <Route index element={<Vans />} />
                        <Route path=":id" element={<VanDetail />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
