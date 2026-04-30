import { redirect } from 'next/navigation';

export default function RootPage() {
  // إعادة توجيه تلقائية للصفحة الرئيسية بالعربية
  redirect('/ar');
}
