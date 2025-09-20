"use client"; 

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { usePortfolioStore } from '@/store/portfolioStore';

export default function StudentDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  
  const student = usePortfolioStore((state) => 
    state.students.find(s => s.id === id)
  );

  if (!student) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-3xl font-bold text-red-500">ไม่พบข้อมูลนักเรียน</h1>
        <button onClick={() => router.push('/dashboard')} className="mt-4 text-blue-500 hover:underline">
          กลับสู่หน้าหลัก
        </button>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-6">รายละเอียด Portfolio: {student.name} {student.lastName}</h1>
      
      {/* 🟢 ส่วนแสดงข้อมูลใหม่ 🟢 */}
      <h2 className="text-2xl font-semibold border-b pb-2 mb-4">ข้อมูลส่วนตัวและการศึกษา</h2>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <p><strong>ชื่อ-นามสกุล:</strong> {student.name} {student.lastName}</p>
        <p><strong>โรงเรียน:</strong> {student.school}</p>
        <p><strong>เบอร์โทรศัพท์:</strong> {student.phone}</p>
        <p><strong>ที่อยู่:</strong> {student.address}</p>
        <p><strong>มหาวิทยาลัยที่เลือก:</strong> {student.university}</p>
        <p><strong>GPA:</strong> <span className="text-green-600 font-semibold">{student.gpa.toFixed(2)}</span></p>
        <p><strong>สาขาที่เลือก:</strong> {student.major}</p>
      </div>

      <h2 className="text-2xl font-semibold border-b pb-2 mb-4 mt-6">รายละเอียดการสมัคร</h2>
      <div className="mb-4">
        <p className="font-semibold">เหตุผลในการสมัคร:</p>
        <p className="p-3 border rounded bg-gray-50 whitespace-pre-wrap">{student.reason}</p>
      </div>
      <div className="mb-4">
        <p className="font-semibold">ความสามารถพิเศษ:</p>
        <p className="p-3 border rounded bg-gray-50 whitespace-pre-wrap">{student.specialSkills || '-'}</p>
      </div>

      {/* 🟢 ส่วนแสดงรูปภาพ (เดิม) 🟢 */}
      <h2 className="text-2xl font-semibold mt-8 mb-3 border-b pb-2">รูปภาพนักเรียนที่แนบมา</h2>
      <div className="flex space-x-4 overflow-x-auto p-4 border rounded bg-gray-50">
        {student.photos && student.photos.length > 0 ? (
          student.photos.map((base64, index) => (
            <img 
              key={index} 
              src={base64} 
              alt={`Student Photo ${index + 1}`} 
              className="w-48 h-48 object-cover rounded-md shadow-md flex-shrink-0"
            />
          ))
        ) : (
          <p className="text-gray-500">ไม่มีรูปภาพแนบ</p>
        )}
      </div>

      <button onClick={() => router.back()} className="mt-6 text-blue-500 hover:underline">
        ← กลับสู่ตารางรายชื่อ
      </button>
    </div>
  );
}