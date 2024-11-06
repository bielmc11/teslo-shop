import { Sidebar, TopMenu } from "@/components/inedx";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen changeScroll">
      <TopMenu />
      <Sidebar />
      <div className="md:px-10">{children}</div>
    </main>
  );
}
