import { LiquidButton } from '@/components/animate-ui/buttons/liquid';
import { GoPlus } from 'react-icons/go';
import { LuPen } from 'react-icons/lu';
import { RiDeleteBinLine } from 'react-icons/ri';
import { PutNote } from './components/PutNote';
import { DeleteNote } from './components/DeleteNote';

export default function Notas() {
    return (
        <section className="w-full flex flex-col items-center py-4">
            <div className="w-4xl">
                <div className="flex justify-between mb-8">
                    <h1 className="text-3xl font-bold">Notas</h1>
                    <LiquidButton>
                        <GoPlus />
                        Añadir nota
                    </LiquidButton>
                </div>
                <div className="flex justify-between p-4 bg-amber-200 rounded-2xl mb-4 items-center">
                    <p className="pr-8">este es el parrafo de las notas</p>
                    <div className="flex gap-3">
                        <PutNote />
                        <DeleteNote />
                    </div>
                </div>
                <div className="flex justify-between p-4 bg-amber-200 rounded-2xl mb-4 items-center">
                    <p className="pr-8 ">
                        este es el parrafo de las notaseste es el parrafo de las
                        notaseste es el parrafo de las notaseste es el parrafo
                        de las notaseste es el parrafo de las notaseste es el
                        parrafo de las notaseste es el parrafo de las notaseste
                        es el parrafo de las notaseste es el parrafo de las
                        notaseste es el parrafo de las notaseste es el parrafo
                        de las notaseste es el parrafo de las notas
                    </p>
                    <div className="flex gap-3">
                        <PutNote />
                        <DeleteNote />
                    </div>
                </div>
            </div>
        </section>
    );
}
