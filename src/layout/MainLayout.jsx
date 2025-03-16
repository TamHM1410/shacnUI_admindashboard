import { AppSidebar } from "@/components/common/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";

export function MainLayout({ children }) {
  const isFetching = (
    <>
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="aspect-video rounded-xl bg-muted/50" />
        <div className="aspect-video rounded-xl bg-muted/50" />
        <div className="aspect-video rounded-xl bg-muted/50" />
      </div>
      <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
    </>
  );
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <main className="container flex flex-col py-2 bg-white">
          {children ? children : isFetching}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
