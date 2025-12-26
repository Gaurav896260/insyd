import "../styles/globals.css";
import LayoutWrapper from "../components/LayoutWrapper";
export const metadata = {
  title: "BuildStock - Construction Inventory",
  description: "Smart inventory for construction material suppliers",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
