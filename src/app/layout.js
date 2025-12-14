import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientLayout from "./clientLayout";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "TaskFlow",
  description: "App for tracking tasks and boosting productivity",
  verification: {
    google: "U5MuFiB3r44x5i_oAnoW_INY9vAFP3P7EaXdLfA755I",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ClientLayout>
        <div className="bg-black">
        {children}
        </div>
      </ClientLayout>
      </body>
    </html>
  );
}
