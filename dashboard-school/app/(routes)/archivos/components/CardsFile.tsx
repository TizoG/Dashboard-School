import { CiFileOn } from 'react-icons/ci';

export const CardsFile = () => {
    return (
        <div className="flex  flex-col justify-between w-fit rounded-2xl border border-black">
            <div className="bg-amber-200 p-4 border-b border-black rounded-tr-2xl rounded-tl-2xl">
                <h2 className="font-semibold text-lg">Asignatura</h2>
            </div>
            <div className="flex gap-4 p-4">
                <CiFileOn size={50} className="text-gray-500" />
                <div className=" ">
                    <h3 className="font-semibold">nombre del archivo.pdf</h3>
                    <p className="text-sm text-gray-500">4 may 2023</p>
                </div>
            </div>
        </div>
    );
};
