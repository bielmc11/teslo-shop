
export default function AuthLayout({
 children
}: {
 children: React.ReactNode;
}) {
  return (
    <main className="bg-grey-400 min-h-screen">
      {children}
    </main>
  );
}