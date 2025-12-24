import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Fitness Coach - Personalized Workout & Diet Plans",
  description:
    "Get AI-powered personalized workout and diet plans tailored to your fitness goals",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased bg-gray-900">{children}</body>
    </html>
  );
}
