import Image from "next/image";
import { plural } from "@/lib/format";
import type { Host } from "@/types/listing";

interface HostCardProps {
  host: Host;
}

const HostCard = ({ host }: HostCardProps) => (
  <section className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm">
    <Image src={host.avatar} alt={host.name} width={56} height={56} className="h-14 w-14 rounded-full object-cover" />
    <div>
      <h2 className="font-semibold">Anfitrión: {host.name}</h2>
      <p className="text-sm text-gray-500">{plural(host.yearsHosting, "año", "años")} como anfitrión</p>
    </div>
  </section>
);

export default HostCard;
