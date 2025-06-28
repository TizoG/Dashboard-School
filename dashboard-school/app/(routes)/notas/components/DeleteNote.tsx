import { Button } from '@/components/ui/button';
import { RiDeleteBinLine } from 'react-icons/ri';

export const DeleteNote = () => {
    return (
        <Button
            variant={'ghost'}
            className="cursor-pointer hover:scale-[1.2] hover:bg-transparent "
        >
            <RiDeleteBinLine />
        </Button>
    );
};
