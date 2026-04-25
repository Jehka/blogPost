import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Theology Subtext",
  description: "A personal space for poetry and writing",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}