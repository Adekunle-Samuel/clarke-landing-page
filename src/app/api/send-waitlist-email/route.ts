import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { getWaitlistWelcomeEmail, getPartnerNotificationEmail } from '@/lib/email-templates'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const { name, email, type = 'waitlist' } = await request.json()

    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      )
    }

    if (type === 'waitlist') {
      const emailTemplate = getWaitlistWelcomeEmail(name, process.env.WAITLIST_URL || 'https://useclarke.app')
      
      const { data, error } = await resend.emails.send({
        from: 'Sam <sam@useclarke.app>',
        to: [email],
        subject: emailTemplate.subject,
        html: emailTemplate.html,
      })

      if (error) {
        console.error('Resend error:', error)
        return NextResponse.json(
          { error: 'Failed to send email' },
          { status: 500 }
        )
      }

      return NextResponse.json({ success: true, data })
    }

    // Handle partner emails
    if (type === 'partner') {
      const emailTemplate = getPartnerNotificationEmail(name, email)
      
      const { data, error } = await resend.emails.send({
        from: 'Sam <sam@useclarke.app>',
        to: ['sam@useclarke.app'],
        subject: emailTemplate.subject,
        html: emailTemplate.html,
      })

      if (error) {
        console.error('Resend error:', error)
        return NextResponse.json(
          { error: 'Failed to send email' },
          { status: 500 }
        )
      }

      return NextResponse.json({ success: true, data })
    }

    return NextResponse.json(
      { error: 'Invalid email type' },
      { status: 400 }
    )
  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
