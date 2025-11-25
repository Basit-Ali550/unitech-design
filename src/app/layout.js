// app/layout.jsx
import "./globals.css";
import { AuthProvider } from "../context/AuthContext";
import { Toaster } from "react-hot-toast";
export const metadata = {
  title: "Unitech Design",
  description: "Next.js Authentication",
  icons: {
    icon: "/images/Logo.svg",
    shortcut: "/images/Logo.svg",
    apple: "/images/Logo.svg",
  },
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <AuthProvider>
          {children}
          <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#333',
              color: '#fff',
            },
          }}
        />
        </AuthProvider>
      </body>
    </html>
  );
}