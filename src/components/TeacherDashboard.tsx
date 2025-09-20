"use client"; 

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { usePortfolioStore } from '@/store/portfolioStore';

interface StudentPortfolio {
  id: string;
  name: string;
  lastName: string; // เพิ่ม
  address: string; // เพิ่ม
  phone: string; // เพิ่ม
  school: string; // เพิ่ม
  gpa: number;
  specialSkills: string; // เพิ่ม
  reason: string; // เพิ่ม
  major: string;
  university: string; // เพิ่ม
  photos: string[]; 
}

// Type สำหรับคอลัมน์ที่สามารถเรียงได้
type SortableColumn = 'name' | 'gpa';

const TeacherDashboard = () => {
  const students = usePortfolioStore((state) => state.students) as StudentPortfolio[];
  // สถานะเก็บคอลัมน์ที่ใช้เรียงลำดับ (เริ่มต้นด้วย 'name')
  const [sortBy, setSortBy] = useState<SortableColumn>('name');
  // สถานะเก็บทิศทางการเรียงลำดับ (เริ่มต้นด้วย 'asc')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc'); 

  // 1. Logic การเรียงลำดับ: ใช้ useMemo เพื่อคำนวณเฉพาะเมื่อ students, sortBy หรือ sortDirection เปลี่ยน
  const sortedStudents = useMemo(() => {
    return [...students].sort((a, b) => {
      let aValue: any = a[sortBy];
      let bValue: any = b[sortBy];

      // สำหรับการเรียงชื่อ เราจะรวมชื่อและนามสกุลเพื่อให้เรียงทั้งชื่อเต็ม
      if (sortBy === 'name') {
          aValue = `${a.name} ${a.lastName}`;
          bValue = `${b.name} ${b.lastName}`;
      }
      
      let comparison = 0;
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
          // เรียงตามตัวอักษรไทย
          comparison = aValue.localeCompare(bValue, 'th', { sensitivity: 'base' });
      } else if (typeof aValue === 'number' && typeof bValue === 'number') {
          // เรียงตามตัวเลข (GPA)
          comparison = aValue - bValue;
      }

      // ปรับทิศทางตาม sortDirection
      return sortDirection === 'asc' ? comparison : comparison * -1;
    });
  }, [students, sortBy, sortDirection]);

  // 2. Function สำหรับจัดการเมื่อคลิกที่ Header คอลัมน์
  const handleSort = (column: SortableColumn) => {
    if (sortBy === column) {
      // คลิกซ้ำ: เปลี่ยนทิศทาง
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // คลิกคอลัมน์ใหม่: ตั้งค่าคอลัมน์และเริ่มต้นที่ 'asc'
      setSortBy(column);
      setSortDirection('asc');
    }
  };
  
  // 3. Function สำหรับแสดง Icon บอกสถานะ
  const getSortIcon = (column: SortableColumn) => {
    if (sortBy !== column) return ' ↕️'; // ไม่ได้เรียง
    return sortDirection === 'asc' ? ' ⬆️' : ' ⬇️'; // เรียงจากน้อยไปมาก หรือ มากไปน้อย
  };

  return (
    // จัดตารางอยู่ตรงกลางจอด้วย max-w-5xl mx-auto
    <div className="p-8 max-w-5xl mx-auto"> 
      <h1 className="text-3xl font-bold mb-6 text-center">หน้าสำหรับอาจารย์: รายชื่อผู้สมัคร</h1>
      
      <table className="min-w-full bg-white border border-gray-200 shadow-lg rounded-lg">
        <thead>
          <tr className="bg-gray-100">
            {/* 💡 TH สำหรับ ชื่อ-นามสกุล: เปิดใช้งาน onClick สำหรับการเรียงลำดับ */}
            <th 
              className="py-3 px-4 border-b cursor-pointer hover:bg-gray-200 text-left"
              onClick={() => handleSort('name')}
            >
              ชื่อ-นามสกุล {getSortIcon('name')}
            </th>
            {/* 💡 TH สำหรับ GPA: เปิดใช้งาน onClick สำหรับการเรียงลำดับ */}
            <th 
              className="py-3 px-4 border-b cursor-pointer hover:bg-gray-200 text-center"
              onClick={() => handleSort('gpa')}
            >
              GPA {getSortIcon('gpa')}
            </th>
            <th className="py-3 px-4 border-b text-center">สาขาที่เลือก</th>
            <th className="py-3 px-4 border-b">รายละเอียด</th>
          </tr>
        </thead>
        <tbody>
          {sortedStudents.map((student) => (
            <tr key={student.id} className="hover:bg-gray-50 border-b">
              <td className="py-2 px-4">{student.name} {student.lastName}</td>
              <td className="py-2 px-4 text-center text-green-600 font-medium">{student.gpa.toFixed(2)}</td>
              <td className="py-2 px-4 text-center">{student.major}</td>
              <td className="py-2 px-4 text-center">
                <Link 
                  href={`/dashboard/${student.id}`} 
                  className="text-blue-500 hover:underline"
                >
                  ดู Portfolio
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {students.length === 0 && (
        <p className="text-center mt-6 text-xl text-gray-500">
            ❌ ยังไม่มีข้อมูลผู้สมัครในระบบ
        </p>
      )}
    </div>
  );
};

export default TeacherDashboard;