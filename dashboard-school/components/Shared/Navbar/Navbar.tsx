'use client';

import { SidebarTrigger } from '@/components/animate-ui/radix/sidebar';
import { Button } from '@/components/ui/button';
import {
    SignedIn,
    SignedOut,
    SignInButton,
    SignUpButton,
    UserButton,
} from '@clerk/nextjs';
import { FaRegBell } from 'react-icons/fa6';

export const Navbar = () => {
    return (
        <div className="flex p-4 border-b h-16 bg-white justify-between">
            <SidebarTrigger className="cursor-pointer hover:bg-indigo-100" />
            <div className="flex gap-4 items-center">
                <Button variant="outline" className="cursor-pointer">
                    <FaRegBell />
                </Button>
                <SignedOut>
                    <SignInButton />
                    <SignUpButton>
                        <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                            Sign Up
                        </button>
                    </SignUpButton>
                </SignedOut>
                <SignedIn>
                    <UserButton />
                </SignedIn>
            </div>
        </div>
    );
};
