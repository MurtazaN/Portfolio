import type { Metadata } from "next";
import "./globals.css";

const title = "Murtaza Nipplewala | AI Software Engineer";
const description =
  "AI Software Engineer at Bitcoin Culture Hub · MS CS @ Northeastern · 4× AWS Certified. I build AI-powered applications end to end, from LLM integrations to scalable cloud infrastructure.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
