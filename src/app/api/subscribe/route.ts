import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import path from 'path'
import fs from 'fs'

export async function POST(request: NextRequest) {
  try {
const {
  fullName,
  email,
  phone,
  companyName,
  jobTitle,
  message,
  lang,
} = await request.json()
    // Validate email
if (!email || !email.includes('@')) {
  return NextResponse.json(
    { error: 'Invalid email address' },
    { status: 400 }
  )
}

if (!fullName) {
  return NextResponse.json(
    { error: 'Full name is required' },
    { status: 400 }
  )
}



    // إنشاء transporter مع تفعيل debug
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: parseInt(process.env.SMTP_PORT || '587') === 465, // true فقط لـ 465
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
      logger: true,   // لتسجيل كل خطوات الاتصال
      debug: true,    // لعرض رسائل الأخطاء من Gmail
    })

    await transporter.verify()
      .then(() => console.log('✅ SMTP connection successful'))
      .catch(err => {
        console.error('❌ SMTP connection failed:', err)
        throw err   // إذا فشل الاتصال نوقف الإرسال
      })
    // Email contentn
    const isArabic = lang === 'ar'

    const assignedTeam = isArabic
      ? 'فريق Savvy للتواصل'
      : 'Savvy Contact Team'
    
    const subject = isArabic
      ? 'طلب جديد من صفحة Main - Savvy'
      : 'New Subscription Main- Savvy'
const htmlContent = isArabic
  ? `
  <div dir="rtl" style="font-family: Arial; max-width:600px; margin:auto">
    <h2 style="color:#2563eb">طلب تواصل جديد 📩</h2>

    <p><strong>الاسم الكامل:</strong> ${fullName}</p>
    <p><strong>البريد الإلكتروني:</strong> ${email}</p>
    <p><strong>رقم الهاتف:</strong> ${phone || '-'}</p>
    <p><strong>اسم الشركة:</strong> ${companyName || '-'}</p>
    <p><strong>المسمى الوظيفي:</strong> ${jobTitle || '-'}</p>

    <hr />

    <p><strong>الرسالة:</strong></p>
    <p>${message || 'لا توجد رسالة'}</p>

    <hr />
    <p style="font-size:13px;color:#666">
      التاريخ: ${new Date().toLocaleDateString('ar-SA')} <br/>
      الوقت: ${new Date().toLocaleTimeString('ar-SA')}
    </p>
  </div>
  `
      : `
  <div style="font-family: Arial; max-width:600px; margin:auto">
    <h2 style="color:#2563eb">New Contact Request 📩</h2>

    <p><strong>Full Name:</strong> ${fullName}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Phone:</strong> ${phone || '-'}</p>
    <p><strong>Company:</strong> ${companyName || '-'}</p>
    <p><strong>Job Title:</strong> ${jobTitle || '-'}</p>

    <hr />

    <p><strong>Message:</strong></p>
    <p>${message || 'No message provided'}</p>

    <hr />
    <p style="font-size:13px;color:#666">
      Date: ${new Date().toLocaleDateString('en-US')} <br/>
      Time: ${new Date().toLocaleTimeString('en-US')}
    </p>
  </div>
`



    // قائمة المستقبلين
    const recipients = [
      process.env.RECIPIENT_EMAIL || '',
      'modar.alfaleh@savvyworld.ai',
      // 'raad.a@savvyworld.ai',
      // 'rami.a@savvyworld.ai',
      // 'rashad.walid@savvyworld.ai',
      'sayf.m@savvyworld.ai',
       'issam.p@savvyworld.ai'
      // 'tamara.h@savvyworld.ai',
      // 'mansour.m@savvyworld.ai'
    ].join(', ')

    // Send email
    await transporter.sendMail({
      from: `"Savvy main page" <${process.env.SMTP_USER}>`,
      to: recipients,
      subject: subject,
      html: htmlContent,
      text: `New subscription: ${email} (Language: ${lang})`,
    })

// =====================
// 6️⃣ Client Notification
// =====================
const imagePath = path.join(process.cwd(), 'public', 'INdb.png')

// Verify image file exists before attaching
const imageExists = fs.existsSync(imagePath)
if (!imageExists) {
  console.warn(`⚠️ Image file not found at: ${imagePath}. Email will be sent without image attachment.`)
}



const clientSubject = isArabic
  ? 'تم استلام طلبك – Savvy'
  : 'Your Request Has Been Assigned – Savvy'

  const clientHtml = isArabic
  ? `
  <div dir="rtl" style="font-family: Arial; max-width:600px; margin:auto; text-align:center">

    <img
      src="cid:responseImage"
      alt="Request received"
      style="width:100%; max-width:420px; display:block; margin:20px auto;"
    />

    <h2 style="color:#16a34a">تم استلام طلبك بنجاح يا ${fullName} ✅</h2>

    <p>
      شكرًا لتواصلك معنا.  
      تم استلام طلبك وإسناده إلى <strong>${assignedTeam}</strong>.
    </p>

    <p>سيقوم أحد أعضاء فريقنا بالتواصل معك قريبًا.</p>

    <hr />

    <p style="font-size:13px;color:#666">
      Savvy Team<br/>
      رسالة تلقائية – يرجى عدم الرد
    </p>

  </div>
  `
  : `
  <div style="font-family: Arial; max-width:600px; margin:auto; text-align:center">

    <img
      src="cid:responseImage"
      alt="Request received"
      style="width:100%; max-width:420px; display:block; margin:20px auto;"
    />

    <h2 style="color:#16a34a">Your request has been received, ${fullName} ✅</h2>

    <p>
      Thank you for contacting us.  
      Your request has been received and assigned to <strong>${assignedTeam}</strong>.
    </p>

    <p>Our team will contact you shortly.</p>

    <hr />

    <p style="font-size:13px;color:#666">
      Savvy Team<br/>
      This is an automated message – please do not reply
    </p>

  </div>
  `



  await transporter.sendMail({
    from: `"Savvy Team" <${process.env.SMTP_USER}>`,
    to: email,
    subject: clientSubject,
    html: clientHtml,
    attachments: imageExists
      ? [
          {
            filename: 'Email response.png', // اسم الصورة
            path: imagePath,                // المسار الكامل
            cid: 'responseImage',           // يجب أن يطابق src="cid:responseImage"
          },
        ]
      : [], // Send without attachment if image file doesn't exist
  })
  

    // =====================
    // 7️⃣ Response
    // =====================
    // إرجاع الرد فوراً للعميل
    const response = NextResponse.json(
      { message: 'Emails sent successfully' },
      { status: 200 }
    )

    // =====================
    // External API - Save Contact Data (Background)
    // =====================
    // إرسال البيانات في الخلفية بدون انتظار
    ;(async () => {
      try {
        const payload = {
          pfullname: fullName || "",
          pjob_title: jobTitle || "",
          pcomapny_name: companyName || "",
          paddress: "",
          pemail: email || "",
          ptel: phone || ""
        }

        const apiResponse = await fetch('https://sakani.incube-events.com/newsavvy/ContactUs.asmx/AddNewContcat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        })

        if (!apiResponse.ok) {
          console.error('External API failed:', apiResponse.status, apiResponse.statusText)
        } else {
          console.log('✅ Contact data saved to external API successfully')
        }
      } catch (apiError) {
        console.error('Error calling external API:', apiError)
        // لا نرمي خطأ هنا حتى لا يؤثر على إرسال البريد
      }
    })()

    return response

  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    )
  }
}
