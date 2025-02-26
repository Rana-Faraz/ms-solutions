export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <div className="container flex min-h-screen items-center justify-center">
        <div className="w-full max-w-[400px]">{children}</div>
      </div>
    </div>
  );
}
