import parrot from "@/app/assets/parrot.png";
import Image from "next/image";

export default function Home() {
  return (
    <div className="mx-auto max-w-screen-sm">
      <header className="bg-[url('@/app/assets/worldmap.png')]">
        <Image src={parrot} alt="parrot" />
      </header>
    </div>
  );
}
