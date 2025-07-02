import { SlEnvolopeLetter } from 'react-icons/sl';

export const CardsTeacher = () => {
    return (
        <div className="bg-white flex items-center gap-8 w-fit p-4 rounded-md shadow-md">
            <div>
                <h2>Alberto Torres</h2>
                <div className="ml-4 bg-sky-300 px-2 rounded-xl">
                    <p>Web Developer Junior</p>
                </div>
                <p className="text-sm text-gray-500">alvberto@gmail.com</p>
            </div>
            <div>
                <SlEnvolopeLetter className="text-sky-500" size={30} />
            </div>
        </div>
    );
};
