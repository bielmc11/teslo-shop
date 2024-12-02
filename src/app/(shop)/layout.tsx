import { AuthProvider, Footer, Sidebar, TopMenu } from "@/components/inedx";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen changeScroll flex flex-col">
      {" "}
      {/* CUIDADO CON ESTE FLEX */}
      <TopMenu />
      <AuthProvider>
        <Sidebar />
      </AuthProvider>
      <div className="md:px-10">{children}</div>
      <Footer />
    </main>
  );
}
