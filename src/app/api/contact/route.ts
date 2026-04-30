import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const requestData = await request.json()

    // Validate required fields
    if (!requestData.pfullname || !requestData.pemail) {
      return NextResponse.json(
        { error: 'Full name and email are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(requestData.pemail)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }
    // Prepare data for the external APIs
    const payload = {
      pfullname: requestData.pfullname || "",
      pjob_title: requestData.pjob_title || "",
      pcomapny_name: requestData.pcomapny_name || "",
      paddress: requestData.paddress || "",
      pemail: requestData.pemail || "",
      ptel: requestData.ptel || ""
    }

    // Send request to external API
    const response = await fetch('https://sakani.incube-events.com/newsavvy/ContactUs.asmx/AddNewContcat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('External API error:', errorText)
      return NextResponse.json(
        { error: 'Failed to submit contact form' },
        { status: response.status }
      )
    }

    const result = await response.json().catch(() => response.text())

    return NextResponse.json(
      { message: 'Contact form submitted successfully', data: result },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error submitting contact form:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

