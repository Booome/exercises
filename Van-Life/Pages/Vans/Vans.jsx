import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { VanTypeLabel } from "../../components/VanTypeLabel";

export function Vans() {
    const [vans, setVans] = useState([]);

    useEffect(() => {
        fetch("/api/vans")
            .then((res) => res.json())
            .then((data) => setVans(data.vans));
    }, []);

    return (
        <div className="px-7 pt-14 pb-20">
            <h1 className="text-2xl font-bold">Explore our van options</h1>
            <Filter />
            <Cards vans={vans} />
        </div>
    );
}

function Filter() {
    const filters = ["Simple", "Luxury", "Rugged"];

    return (
        <div className="mt-5 flex flex-wrap gap-5 items-center text-neutral-600">
            {filters.map((filter) => (
                <button
                    className="bg-orange-100 px-5 py-2 rounded-lg"
                    key={filter}
                >
                    {filter}
                </button>
            ))}
            <button className="mr-2 ml-auto underline">Clear Filter</button>
        </div>
    );
}

function Cards({ vans }) {
    return (
        <div className="mt-14 flex flex-wrap justify-between gap-8">
            {vans.map((van) => (
                <Card key={van.id} van={van} />
            ))}
        </div>
    );
}

function Card({ van }) {
    return (
        <Link
            to={`/vans/${van.id}`}
            className="grow basis-56 overflow-hidden hover:cursor-pointer"
            aria-label={`View details for ${van.name}, priced at $${van.price} per day`}
        >
            <img
                className="w-full max-h-56 object-cover rounded-lg"
                src={van.imageUrl}
                alt={`Image of ${van.name}`}
            />

            <div className="flex justify-between text-neutral-900 text-xl font-semibold mt-2">
                <p>{van.name}</p>
                <div className="flex flex-col items-end">
                    <p className="leading-none">${van.price}</p>
                    <p className="text-sm font-medium leading-none">/day</p>
                </div>
            </div>

            <VanTypeLabel type={van.type} />
        </Link>
    );
}
