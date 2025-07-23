import { CardsFile } from "./components/CardsFile";
import UploadFile from "./components/UploadFile";

export default function Archivos() {
  return (
    <section className="p-4">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold">Archivos</h1>
      </div>
      <div className="grid grid-cols-3 md:grid-cols-4 sm:grid-cols-2 gap-4">
        <CardsFile />
        <CardsFile />
        <CardsFile />
        <CardsFile />
        <CardsFile />
        <CardsFile />
      </div>
      <UploadFile />
    </section>
  );
}
