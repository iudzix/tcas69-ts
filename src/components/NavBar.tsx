"use client"; // ทำให้ component นี้เป็น Client Component

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavBar() {
  const pathname = usePathname();
  
  return (
    <nav className="flex justify-between max-w-7xl mx-auto">
      <Link href="/" className="font-bold text-xl hover:text-gray-200">
        TCAS Portfolio
      </Link>
      <div>
        <Link 
          href="/add" 
          className={`mr-4 ${pathname === '/add' ? 'font-bold underline' : ''}`}
        >
          เพิ่ม Portfolio
        </Link>
        <Link 
          href="/dashboard" 
          className={`${pathname.startsWith('/dashboard') ? 'font-bold underline' : ''}`}
        >
          หน้าอาจารย์
        </Link>
      </div>
    </nav>
  );
}

