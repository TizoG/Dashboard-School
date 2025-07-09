import { Button } from '@/components/ui/button';
import axios from 'axios';
import { RiDeleteBinLine } from 'react-icons/ri';

type DeleteNoteProps = {
    id: number;
    onDelete?: () => void;
};
export const DeleteNote = ({ id, onDelete }: DeleteNoteProps) => {
    const handleDelete = async () => {
        const confirmacion = confirm('Estas seguro?');
        if (!confirmacion) return;

        try {
            await axios.delete('/api/tipsNotas', { data: { id } });
            onDelete?.();
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <Button
            variant={'ghost'}
            className="cursor-pointer hover:scale-[1.2] hover:bg-transparent "
            onClick={handleDelete}
        >
            <RiDeleteBinLine />
        </Button>
    );
};
