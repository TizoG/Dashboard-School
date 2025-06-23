import { SidebarTrigger } from '@/components/animate-ui/radix/sidebar';
import { Button } from '@/components/ui/button';
import { FaRegBell } from 'react-icons/fa6';

export const Navbar = () => {
    return (
        <div className="flex p-4 border-b h-16 bg-white justify-between">
            <SidebarTrigger className="cursor-pointer hover:bg-indigo-100" />
            <Button variant="outline" className="cursor-pointer">
                <FaRegBell />
            </Button>
        </div>
    );
};
