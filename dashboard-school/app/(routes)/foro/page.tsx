import { CardsForo } from './components/CardsForo';

export default function Foro() {
    return (
        <section className="p-4">
            <div className="mb-8">
                <h1 className="text-3xl font-bold">Foro</h1>
            </div>
            <div className="grid grid-cols-3 md:grid-cols-4 sm:grid-cols-2 gap-4">
                <CardsForo />
                <CardsForo />
                <CardsForo />
                <CardsForo />
                <CardsForo />
                <CardsForo />
            </div>
        </section>
    );
}
