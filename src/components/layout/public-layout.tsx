import Footer from './footer';
import Header from './header';

export default function PublicLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header variant="public" />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
