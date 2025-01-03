import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { VanTypeLabel } from "../../components/VanTypeLabel";

export function VanDetail() {
    const { id } = useParams();
    const [van, setVan] = useState(null);

    useEffect(() => {
        fetch(`/api/vans/${id}`)
            .then((res) => res.json())
            .then((data) => setVan(data.vans));
    }, [id]);

    return (
        <div className="px-7 pb-10">
            <div className="flex items-center gap-2 text-base">
                <span className="text-neutral-500">🡠</span>
                <span>Back to all vans</span>
            </div>
            {van ? (
                <div className="flex flex-col items-start">
                    <img
                        className="rounded-lg mt-10 mb-12"
                        src={van.imageUrl}
                        alt={`Image of ${van.name}`}
                    />
                    <VanTypeLabel type={van.type} />

                    <h1 className="text-2xl font-bold mt-5">{van.name}</h1>
                    <p className="text-xl font-bold mt-2">
                        ${van.price}
                        <span className="font-normal">/day</span>
                    </p>
                    <p className="mt-3 text-base font-medium text-neutral-900">
                        {van.description}
                    </p>
                    <button className="mt-5 bg-orange-400 text-white w-full py-3 rounded-lg">
                        Rent this van
                    </button>
                </div>
            ) : null}
        </div>
    );
}
