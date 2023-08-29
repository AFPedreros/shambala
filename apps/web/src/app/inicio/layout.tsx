import { SiteHeader } from '@/components/site-header';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SidebarNav } from '@/components/sidebar-nav';
import { BottomBarNav } from '@/components/bottombar-nav';

interface PostsLayoutProps {
    children: React.ReactNode;
}

export default async function PostsLayout({ children }: PostsLayoutProps) {

    return (
        <div className="relative flex flex-col min-h-screen">
            <SiteHeader />
            <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
                <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r md:sticky md:block">
                    <ScrollArea className="py-6 h-full relative pr-6 lg:py-8">
                        <SidebarNav className="p-1" />
                    </ScrollArea>
                </aside>
                <main className="flex w-full flex-col">{children}</main>
            </div>
            <BottomBarNav />
        </div>
    );
}