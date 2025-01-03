import homeHero from "../assets/images/home-hero.png";

export function Home() {
    return (
        <div className="flex relative">
            <img
                src={homeHero}
                alt="Home Hero"
                className="absolute top-0 left-0 w-full h-full object-cover object-top z-0"
            />
            <div className="text-white flex flex-col items-center justify-center text-center px-7 py-16 z-10 bg-black/50">
                <section>
                    <h1 className="text-4xl font-extrabold">
                        You got the travel plans, we got the travel vans.
                    </h1>
                    <p className="mt-6">
                        Add adventure to your life by joining the #vanlife
                        movement. Rent the perfect van to make your perfect road
                        trip.
                    </p>
                    <button className="mt-14 h-12 bg-amber-600 w-full rounded-md font-bold">
                        Find your van
                    </button>
                </section>
            </div>
        </div>
    );
}
