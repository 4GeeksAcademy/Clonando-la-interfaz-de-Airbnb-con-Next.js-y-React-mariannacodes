import { Suspense } from "react";
import RoomDetail from "@/components/RoomDetail";

const RoomPage = () => (
  <Suspense fallback={<p className="p-6 text-center text-gray-500">Cargando alojamiento…</p>}>
    <RoomDetail />
  </Suspense>
);

export default RoomPage;
