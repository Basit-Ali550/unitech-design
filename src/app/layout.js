// src/app/layout.tsx
import TopBar from "../components/TopBar";
import Sidebar from "../components/Sidebar";
import "./globals.css"; // if you have global styles

// export const metadata: Metadata = {
//   title: "Unitec Design",
//   description: "Analytics & Design Platform",
// };

export default function RootLayout({
  children
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <div className="flex h-screen">
          <Sidebar />
          <div className="flex-1 flex flex-col overflow-hidden">
           <TopBar/>
            <main className="flex-1 overflow-auto p-6">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}