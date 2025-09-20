import './globals.css'; 
import Link from 'next/link';

// สร้าง NavBar เป็น Server Component ง่ายๆ หากไม่ต้องการ Interaction
// หากต้องการ Active Link ให้แยกเป็น Client Component ตามตัวอย่างก่อนหน้า
const NavBar = () => (
    <nav className="flex justify-between max-w-7xl mx-auto">
        <span className="font-bold text-xl">TCAS Portfolio</span>
        <div>
            <Link href="/add" className="mr-4 hover:underline">เพิ่ม Portfolio</Link>
            <Link href="/dashboard" className="hover:underline">หน้าอาจารย์</Link>
        </div>
    </nav>
);

export const metadata = {
  title: 'TCAS69 Portfolio System',
  description: 'Application form for TCAS portfolio management',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      <body>
        <header className="bg-blue-600 p-4 text-white">
          <NavBar />
        </header>
        
        {/* main สำหรับเนื้อหาแต่ละหน้า */}
        <main className="min-h-[calc(100vh-100px)]"> 
          {children}
        </main>
        
        <footer className="bg-gray-800 text-white p-4 text-center">
            &copy; 2025 TCAS Portfolio
        </footer>
      </body>
    </html>
  );
}