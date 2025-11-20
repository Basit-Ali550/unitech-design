// app/layout.jsx
import "./globals.css";
import { AuthProvider } from "../context/AuthContext";

export const metadata = {
  title: "My App",
  description: "Next.js Authentication",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}