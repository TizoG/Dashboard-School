'use client';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '../../../../../components/animate-ui/radix/sidebar';

import { Items } from './AppSidebar-Items';
import Link from 'next/link';

import { usePathname } from 'next/navigation';
export const AppSidebar = () => {
    const pathname = usePathname();
    return (
        <Sidebar className=" bg-white dark:bg-gray-900 shadow-md overflow-hidden">
            <SidebarHeader className="text-2xl font-semibold px-4 py-3 text-indigo-600 border-b h-16 items-center justify-center">
                Dashboard School
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel className="px-4 text-sm font-bold text-gray-500 uppercase">
                        FP DAW
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {Items.map((item) => (
                                <SidebarMenuItem
                                    key={item.title}
                                    className="p-1"
                                >
                                    <SidebarMenuButton asChild>
                                        <Link
                                            href={item.href}
                                            className={`flex items-center gap-3 px-4 py-2 rounded-md
                                                text-gray-800 dark:text-gray-200 font-medium
                                                transition duration-500 transform background-color box-shadow
                                                hover:scale-105
                                                hover:bg-indigo-100 dark:hover:bg-indigo-800
                                                hover:shadow-lg ${
                                                    pathname === item.href
                                                        ? 'bg-indigo-100 scale-105 shadow-lg'
                                                        : ''
                                                }`}
                                        >
                                            <item.icon className="w-5 h-5 text-indigo-500 z-10" />
                                            <span className="relative z-10">
                                                {item.title}
                                            </span>
                                            <span className="absolute inset-0 bg-indigo-100 dark:bg-indigo-800 opacity-0 hover:opacity-100 rounded-md z-0" />
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>Footer</SidebarFooter>
        </Sidebar>
    );
};
