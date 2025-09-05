import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function GET(request: NextRequest) {
  try {
    // Check if environment variables are set
    const hasApiKey = !!process.env.RESEND_API_KEY
    const apiKeyLength = process.env.RESEND_API_KEY?.length || 0
    
    return NextResponse.json({
      status: 'API route is working',
      hasApiKey,
      apiKeyLength,
      environment: process.env.NODE_ENV,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Test failed', details: error.message },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()
    
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required for test' },
        { status: 400 }
      )
    }

    const { data, error } = await resend.emails.send({
      from: 'Sam <sam@useclarke.app>',
      to: [email],
      subject: 'Test Email from Clarke (Production)',
      text: 'This is a test email to verify Resend is working in production.',
    })

    if (error) {
      return NextResponse.json(
        { error: 'Failed to send email', details: error },
        { status: 500 }
      )
    }

    return NextResponse.json({ 
      success: true, 
      messageId: data?.id,
      message: 'Test email sent successfully' 
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Test failed', details: error.message },
      { status: 500 }
    )
  }
}
