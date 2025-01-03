import aboutHero from "../assets/images/about-hero.png";

export function About() {
    return (
        <main>
            <img
                src={aboutHero}
                alt="About Hero"
                className="object-cover object-center h-60 w-full"
            />
            <div className="pt-12 px-7 pb-14">
                <section className=" text-neutral-900">
                    <h1 className="text-2xl font-bold">
                        Don’t squeeze in a sedan when you could relax in a van.
                    </h1>
                    <p className="mt-8">
                        Our mission is to enliven your road trip with the
                        perfect travel van rental. Our vans are recertified
                        before each trip to ensure your travel plans can go off
                        without a hitch. (Hitch costs extra 😉){" "}
                    </p>
                    <p className="mt-6">
                        Our team is full of vanlife enthusiasts who know
                        firsthand the magic of touring the world on 4 wheels.
                    </p>
                </section>

                <section className="mt-14 bg-orange-200 text-neutral-900 py-8 px-9">
                    <h2 className="text-2xl font-bold">
                        Your destination is waiting. Your van is ready.
                    </h2>
                    <button className="bg-neutral-900 text-white font-bold px-5 py-3 rounded-lg mt-8">
                        Explore our vans
                    </button>
                </section>
            </div>
        </main>
    );
}
