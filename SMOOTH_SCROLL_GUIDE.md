# 🎯 دليل Smooth Scroll بين الأقسام

## ✅ **التحسينات الجديدة**

تم تحسين الـ Navbar ليدعم **Smooth Scroll الذكي** بين أقسام الصفحة!

---

## 🎨 **كيف يعمل؟**

عند النقر على أي عنوان في الـ Navbar:

### **1. روابط داخل نفس الصفحة (Internal Links)**
```tsx
// مثال: #about, #services, #contact
<SmartNavLink href="#about">About</SmartNavLink>
```
**النتيجة:** ✅ Smooth scroll ناعم إلى القسم (بدون تحميل الصفحة)

### **2. روابط لصفحة أخرى بها قسم معين**
```tsx
// مثال: /en/expo#gallery
<SmartNavLink href="/en/expo#gallery">Expo Gallery</SmartNavLink>
```
**النتيجة:**
- إذا كنت في `/en/expo`: ✅ Smooth scroll إلى #gallery
- إذا كنت في صفحة أخرى: ➡️ انتقال عادي للصفحة

### **3. روابط لصفحات أخرى (External Links)**
```tsx
// مثال: /en/contact, /ar/media
<SmartNavLink href="/en/contact">Contact</SmartNavLink>
```
**النتيجة:** ➡️ انتقال عادي بين الصفحات (مع page transition جميل)

---

## 🚀 **SmartNavLink Component**

### **الميزات:**
- 🎯 **ذكي**: يميّز تلقائياً بين internal و external links
- ⚡ **سريع**: smooth scroll فوري بدون تأخير
- 🎨 **ناعم**: يستخدم Lenis للحصول على أنعم scroll
- 📱 **متجاوب**: يعمل على جميع الأجهزة

### **الكود:**
```tsx
'use client';

import SmartNavLink from '@/components/shared/Navbar/SmartNavLink';

function MyNavbar() {
  return (
    <nav>
      {/* Internal section scroll */}
      <SmartNavLink href="#about">
        About Us
      </SmartNavLink>

      {/* Same page, different section */}
      <SmartNavLink href="/en#services">
        Our Services
      </SmartNavLink>

      {/* Different page */}
      <SmartNavLink href="/en/contact">
        Contact
      </SmartNavLink>
    </nav>
  );
}
```

---

## 📝 **كيفية إضافة أقسام جديدة**

### **الخطوة 1: أضف ID للقسم**
```tsx
<section id="about" className="py-20">
  <h2>About Us</h2>
  {/* محتوى القسم */}
</section>

<section id="services" className="py-20">
  <h2>Our Services</h2>
  {/* محتوى القسم */}
</section>
```

### **الخطوة 2: أضف الرابط في الـ Navbar**
في ملف الصفحة (مثلاً `page.tsx`):
```tsx
const sections = [
  { label: isRTL ? 'من نحن' : 'About', href: '#about' },
  { label: isRTL ? 'خدماتنا' : 'Services', href: '#services' },
  { label: isRTL ? 'اتصل بنا' : 'Contact', href: '#contact' },
];

<UnifiedHeader lang={lang} sections={sections} />
```

---

## ⚙️ **التخصيص**

### **تغيير إعدادات الـ Scroll:**

في `SmartNavLink.tsx`:
```tsx
scrollToSection(sectionId, {
  offset: -80,    // المسافة من الأعلى (للـ fixed header)
  duration: 1.5   // مدة الانتقال بالثواني
});
```

### **أمثلة:**
```tsx
// Scroll سريع
scrollToSection('about', { duration: 0.8 });

// Scroll بطيء وناعم
scrollToSection('about', { duration: 2.5 });

// مع offset أكبر
scrollToSection('about', { offset: -120 });
```

---

## 🎯 **أمثلة عملية**

### **مثال 1: صفحة Home مع أقسام**
```tsx
// في /[lang]/page.tsx
const sections = [
  { label: isRTL ? 'الرئيسية' : 'Home', href: '#hero' },
  { label: isRTL ? 'من نحن' : 'About', href: '#about' },
  { label: isRTL ? 'المشاريع' : 'Projects', href: '#projects' },
  { label: isRTL ? 'فريقنا' : 'Team', href: '#team' },
];

<UnifiedHeader lang={lang} sections={sections} />

{/* في الصفحة */}
<section id="hero">...</section>
<section id="about">...</section>
<section id="projects">...</section>
<section id="team">...</section>
```

### **مثال 2: صفحة Expo مع أقسام**
```tsx
// في /[lang]/expo/page.tsx
const sections = [
  { label: isRTL ? 'نظرة عامة' : 'Overview', href: '#overview' },
  { label: isRTL ? 'المعرض' : 'Gallery', href: '#gallery' },
  { label: isRTL ? 'الجدول' : 'Schedule', href: '#schedule' },
];

<UnifiedHeader lang={lang} sections={sections} />
```

---

## 🔧 **التحسينات المطبقة**

### **في Navbar.tsx:**
✅ استبدال جميع الأزرار بـ `SmartNavLink`
✅ Desktop navigation
✅ Mobile menu
✅ Services dropdown

### **في SmartNavLink.tsx:**
✅ كشف تلقائي للـ internal links
✅ دمج مع Lenis smooth scroll
✅ دعم callbacks (onClick)
✅ دعم جميع خصائص Link من Next.js

---

## 📊 **المقارنة**

| الميزة | قبل التحسين | بعد التحسين |
|--------|-------------|-------------|
| Internal Links | ❌ انتقال فوري | ✅ Smooth scroll |
| نعومة الحركة | ⚠️ عادية | ✅ Lenis (أنعم) |
| السرعة | 📍 فوري | 🎨 1.5 ثانية |
| تجربة المستخدم | ⚠️ قفز مفاجئ | ✅ انتقال ناعم |
| الأداء | ✅ جيد | ✅ ممتاز |

---

## 🎉 **النتيجة النهائية**

الآن عند النقر على أي عنوان في الـ Navbar:

1. **Internal Section** (#about) → 🎯 Smooth scroll ناعم
2. **Same Page Section** (/en#about) → 🎯 Smooth scroll ناعم
3. **Different Page** (/en/contact) → ➡️ Page transition جميل

**تجربة مستخدم مثالية! 🚀**

---

## 📚 **المزيد من الأمثلة**

### **Footer Links:**
```tsx
import SmartNavLink from '@/components/shared/Navbar/SmartNavLink';

function Footer() {
  return (
    <footer>
      <SmartNavLink href="#top">
        Back to Top
      </SmartNavLink>

      <SmartNavLink href="#contact">
        Contact Us
      </SmartNavLink>
    </footer>
  );
}
```

### **في أي Component:**
```tsx
import SmartNavLink from '@/components/shared/Navbar/SmartNavLink';

function CTAButton() {
  return (
    <SmartNavLink
      href="#services"
      className="btn btn-primary"
    >
      Explore Our Services
    </SmartNavLink>
  );
}
```

---

**استمتع بالـ Smooth Scroll! 🎨**

*Generated by Claude Code - November 2025*
