import { IoIosArrowForward } from 'react-icons/io';

export const CardsForo = () => {
    return (
        <div className="flex flex-col bg-white p-4 shadow-md w-fit gap-2 rounded-md">
            <h2 className="font-semibold text-lg">Asignatura</h2>
            <div className="flex gap-4 items-center bg-sky-300 px-2 rounded-xl">
                <p className="text-sm">Discusion</p>
                <IoIosArrowForward />
            </div>
        </div>
    );
};
