import { Sidebar, TopMenu } from "@/components/inedx";
import { RenderSidebar } from "@/components/ui/sidebar/RenderSidebar";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen">
      <TopMenu />
     {/* <Sidebar />  */}
     <RenderSidebar/>
      <div className="px-10">{children}</div>
    </main>
  );
}
