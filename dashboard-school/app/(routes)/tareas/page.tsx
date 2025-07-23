import { GoPlus } from 'react-icons/go';
import { Button } from '@/components/ui/button';
import { CiCalendarDate, CiCircleCheck } from 'react-icons/ci';
import { ComponentsTodo } from './components/ComponentsTodo';
import { LuPen } from 'react-icons/lu';
import { TfiComment } from 'react-icons/tfi';
import { ButtonTodo } from './components/ButtonTodo';

export default function Tareas() {
    return (
        <section className="bg-white w-full h-full flex flex-col items-center pt-4">
            <div className="flex flex-col w-4xl">
                <h1 className="text-3xl font-bold">Tarea</h1>
                <div className="flex gap-2 items-center">
                    <CiCircleCheck className="text-gray-400" />
                    <p className="text-gray-400">9 tareas</p>
                </div>
                <div>
                    <div className="my-4 border-b py-4 flex justify-between">
                        <span>aqui van las tareas</span>
                        <div className="flex gap-3 cursor-pointer">
                            <div className="hover:bg-gray-300 flex items-center p-1 rounded-sm">
                                <LuPen />
                            </div>
                            <div className="hover:bg-gray-300 flex items-center p-1 rounded-sm">
                                <CiCalendarDate />
                            </div>
                            <div className="hover:bg-gray-300 flex items-center p-1 rounded-sm">
                                <TfiComment />
                            </div>
                        </div>
                    </div>
                    <div className="my-4 border-b py-4 flex justify-between">
                        <span>aqui van las tareas</span>
                        <div className="flex gap-3 cursor-pointer">
                            <div className="hover:bg-gray-300 flex items-center p-1 rounded-sm">
                                <LuPen />
                            </div>
                            <div className="hover:bg-gray-300 flex items-center p-1 rounded-sm">
                                <CiCalendarDate />
                            </div>
                            <div className="hover:bg-gray-300 flex items-center p-1 rounded-sm">
                                <TfiComment />
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <ButtonTodo />
                </div>
                <div className="my-4">
                    <Button
                        variant={'ghost'}
                        className="hover:bg-white cursor-pointer group hover:text-amber-500"
                    >
                        <div className="group-hover:bg-amber-500 rounded-full p-1">
                            <GoPlus className="text-amber-500 group-hover:text-white" />
                        </div>
                        Añadir tarea
                    </Button>
                </div>
            </div>
        </section>
    );
}
