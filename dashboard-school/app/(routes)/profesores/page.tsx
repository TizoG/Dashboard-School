import { SlEnvolopeLetter } from 'react-icons/sl';
import { CardsTeacher } from './components/CardsTeacher';

export default function Profesores() {
    return (
        <section className="p-4">
            <div className="mb-8">
                <h1 className="text-3xl font-bold">Profesores</h1>
            </div>
            <div className="grid grid-cols-3 md:grid-cols-4 sm:grid-cols-2 gap-4">
                <CardsTeacher />
                <CardsTeacher />
                <CardsTeacher />
                <CardsTeacher />
                <CardsTeacher />
            </div>
        </section>
    );
}
