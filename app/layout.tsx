export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ background: "black", color: "#e5e5e5" }}>
        {children}
      </body>
    </html>
  );
}