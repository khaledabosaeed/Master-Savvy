# Partners Logos

This directory contains partner company logos for the Expo Partners section.

## How to Add Partner Logos

1. Add your partner logo images to this directory
2. Recommended format: PNG with transparent background
3. Recommended size: Width 180-200px, Height 80-100px
4. Name your files: partner1.png, partner2.png, etc.

## Update the Component

After adding logos, update the partners array in:
`/src/components/expo-page/sections/ExpoPartners/ExpoPartners.tsx`

Example:
```typescript
const partners = [
  { id: 1, name: "Company Name", logo: "/partners/partner1.png" },
  { id: 2, name: "Company Name", logo: "/partners/partner2.png" },
  // Add more partners...
]
```

## Current Partners (from the design)
Based on the uploaded image, you should add logos for:
1. سكني (Sakani)
2. NHC
3. Hisense
4. PropTech
5. الأولى (Al Awaly)
6. شؤون البلديات (Municipal Affairs)
7. Samsung
8. المنتدى السعودي للمباني الخضراء (Saudi Green Building Forum)
