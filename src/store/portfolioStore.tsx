import { create } from 'zustand';

interface StudentPortfolio {
  id: string;
  name: string;
  lastName: string;
  address: string;
  phone: string;
  school: string;
  gpa: number;
  specialSkills: string;
  reason: string;
  major: string;
  university: string;
  photos: string[]; // Base64 strings หรือ URLs
}

interface PortfolioStore {
  students: StudentPortfolio[];
  addStudent: (newStudentData: Omit<StudentPortfolio, 'id'>) => void;
}

// 🟢 ข้อมูลเริ่มต้น (Hardcoded Initial Data) 🟢
const INITIAL_STUDENTS: StudentPortfolio[] = [
  {
    id: '169001',
    name: 'สมชาย',
    lastName: 'ใจดี',
    address: '99/1 ถ.มิตรภาพ จ.กรุงเทพฯ',
    phone: '0812345678',
    school: 'โรงเรียนก้าวหน้าวิทย์',
    gpa: 3.85,
    specialSkills: 'เขียนโปรแกรมภาษา Python, เล่นกีตาร์',
    reason: 'ต้องการเข้าสาขาคอมพิวเตอร์เพื่อพัฒนาเทคโนโลยีด้าน AI และนำมาประยุกต์ใช้ในอุตสาหกรรมการเกษตรของประเทศให้มีประสิทธิภาพมากยิ่งขึ้น',
    major: 'วิศวกรรมคอมพิวเตอร์',
    university: 'มหาวิทยาลัยเทคโนโลยีไทย',
    photos: [`https://i.pinimg.com/736x/e9/60/e6/e960e6d2e98c562a47abd91c7719bf88.jpg`,`https://i.pinimg.com/1200x/f6/96/c6/f696c666dd2b8891588d38a493d1729a.jpg`], 
  },
  {
    id: '169002',
    name: 'สุดารัตน์',
    lastName: 'ตั้งใจเรียน',
    address: '101 ม.8 ต.ท่าทราย จ.เชียงใหม่',
    phone: '0998765432',
    school: 'โรงเรียนภารกิจศึกษา',
    gpa: 3.50,
    specialSkills: 'สื่อสารภาษาอังกฤษคล่องแคล่ว, จัดทำสื่อวิดีโอ',
    reason: 'สนใจสาขาบริหารธุรกิจเนื่องจากต้องการนำความรู้ไปเปิดธุรกิจ Startup ด้านการท่องเที่ยวเชิงอนุรักษ์ โดยเน้นการสร้างรายได้ที่ยั่งยืนให้กับชุมชนท้องถิ่น',
    major: 'บริหารธุรกิจระหว่างประเทศ',
    university: 'มหาวิทยาลัยนานาชาติ',
    photos: [`https://i.pinimg.com/736x/da/c8/b2/dac8b20f0a5ec6f5f860c9af4a9c6f96.jpg`,`https://i.pinimg.com/736x/0b/41/14/0b41147e70b60de708f02bebb0cc457d.jpg`], 
  },
];

// 3. สร้าง Store โดยใช้ข้อมูลเริ่มต้น
export const usePortfolioStore = create<PortfolioStore>((set) => ({
  students: INITIAL_STUDENTS, // 💡 กำหนดค่าเริ่มต้น
  
  addStudent: (newStudentData) => 
    set((state) => ({
      students: [
        ...state.students, 
        { 
          ...newStudentData, 
          id: Date.now().toString() 
        }
      ],
    })),
}));