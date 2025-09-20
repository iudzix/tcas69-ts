"use client";  

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { usePortfolioStore } from '@/store/portfolioStore'; 
import { StudentPortfolio } from '@/store/portfolioStore';

// 1. 🟢 แก้ไข Validation Schema: บังคับให้ใส่ทุกช่อง (ยกเว้น specialSkills และ photos) 🟢
const FormSchema = z.object({
  // ข้อมูลส่วนตัว: REQUIRED
  name: z.string().min(1, "กรุณากรอกชื่อ"),
  lastName: z.string().min(1, "กรุณากรอกนามสกุล"), 
  address: z.string().min(5, "กรุณากรอกที่อยู่ให้ครบถ้วน"), 
  phone: z.string().min(10, "กรุณากรอกเบอร์โทรศัพท์ 10 หลัก"), 
  school: z.string().min(1, "กรุณากรอกชื่อโรงเรียน"), 
  
  // ข้อมูลการศึกษา/สมัคร: REQUIRED
  gpa: z.coerce.number()
    .min(0.0, "GPA ต้องไม่ติดลบ")
    .max(4.0, "GPA ต้องไม่เกิน 4.0"),
    
  reason: z.string().min(20, "กรุณากรอกเหตุผลในการสมัครอย่างน้อย 20 ตัวอักษร"), 
  major: z.string().min(1, "กรุณาระบุสาขาที่เลือก"),
  university: z.string().min(1, "กรุณาระบุมหาวิทยาลัย"), 
  
  // 🟢 ฟิลด์ยกเว้น 🟢
  specialSkills: z.string().optional(), // OPTIONAL: ความสามารถพิเศษ
  photos: z
  .array(z.string().url())
  .optional()
});

type FormFields = z.infer<typeof FormSchema>;



// ... (ฟังก์ชัน handleImageUpload เหมือนเดิม) ...
const handleImageUpload = (fileList: FileList | undefined): Promise<string[]> => {
    // NOTE: ใช้โค้ด handleImageUpload ล่าสุดที่คุณได้รับ
    if (!fileList || fileList.length === 0) return Promise.resolve([]);
    const filesArray = Array.from(fileList);
    return Promise.all(
        filesArray.map(file => {
            return new Promise<string>((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    if (typeof reader.result === 'string') {
                        resolve(reader.result);
                    } else {
                        reject(new Error("Failed to read file as Data URL."));
                    }
                };
                reader.onerror = () => { reject(reader.error); };
                reader.readAsDataURL(file); 
            });
        })
    );
};


const AddPortfolioForm = () => {
  const addStudent = usePortfolioStore((state) => state.addStudent);
  
  const { 
    register, 
    handleSubmit, 
    reset,
    formState: { errors } 
  } = useForm<FormFields>({
    resolver: zodResolver(FormSchema) as unknown as import("react-hook-form").Resolver<FormFields>,

  });

  const onSubmit = async (data: FormFields) => {
    const fileList = data.photos as unknown as FileList;
    const photosBase64 = await handleImageUpload(fileList);
    
    const studentData = {
      ...data, 
      gpa: parseFloat(data.gpa as unknown as string),
      photos: photosBase64,
    };
    
    addStudent(studentData as StudentPortfolio);
    alert('บันทึก Portfolio เรียบร้อย!');
    reset(); 
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-6 max-w-lg mx-auto bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">แบบฟอร์มเพิ่ม Portfolio</h2>

      {/* 🟢 ข้อมูลส่วนตัว 🟢 */}
      <div className="grid grid-cols-2 gap-4">
        <div className="mb-4">
          <label className="block text-gray-700">ชื่อ *</label>
          <input {...register("name")} className="w-full p-2 border rounded" />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">นามสกุล *</label>
          <input {...register("lastName")} className="w-full p-2 border rounded" />
          {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">หมายเลขโทรศัพท์ *</label>
        <input type="tel" {...register("phone")} className="w-full p-2 border rounded" />
        {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">โรงเรียน *</label>
        <input {...register("school")} className="w-full p-2 border rounded" />
        {errors.school && <p className="text-red-500 text-sm">{errors.school.message}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">ที่อยู่ *</label>
        <textarea {...register("address")} className="w-full p-2 border rounded" rows={2}></textarea>
        {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
      </div>
      
      {/* 🟢 ข้อมูลการศึกษา/สมัคร 🟢 */}
      <div className="mb-4">
        <label className="block text-gray-700">GPA *</label>
        <input type="number" step="0.01" {...register("gpa")} className="w-full p-2 border rounded" />
        {errors.gpa && <p className="text-red-500 text-sm">{errors.gpa.message}</p>}
      </div>
      
      <div className="mb-4">
        <label className="block text-gray-700">มหาวิทยาลัยที่เลือก *</label>
        <input {...register("university")} className="w-full p-2 border rounded" />
        {errors.university && <p className="text-red-500 text-sm">{errors.university.message}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">สาขาที่เลือก *</label>
        <input {...register("major")} className="w-full p-2 border rounded" />
        {errors.major && <p className="text-red-500 text-sm">{errors.major.message}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">ความสามารถพิเศษ (ไม่บังคับ)</label>
        <textarea {...register("specialSkills")} className="w-full p-2 border rounded" rows={2}></textarea>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">เหตุผลในการสมัครเข้าเรียนสาขานี้ *</label>
        <textarea {...register("reason")} className="w-full p-2 border rounded" rows={3}></textarea>
        {errors.reason && <p className="text-red-500 text-sm">{errors.reason.message}</p>}
      </div>
      
      {/* 🟢 Upload รูปภาพ 🟢 */}
      <div className="mb-4">
        <label className="block text-gray-700">รูปภาพนักเรียน (ไม่บังคับ)</label>
        <input type="file" accept="image/*" multiple {...register("photos")} className="w-full p-2 border rounded" />
      </div>

      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
        บันทึก Portfolio
      </button>
    </form>
  );
};

export default AddPortfolioForm;