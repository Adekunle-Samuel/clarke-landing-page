// Test script to verify email sending works
// Run with: node test-email.js

const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

async function testEmail() {
  try {
    console.log('Testing email sending...');
    
    const { data, error } = await resend.emails.send({
      from: 'Sam <sam@useclarke.app>',
      to: ['sam@useclarke.app'], // Send to yourself for testing
      subject: 'Test Email from Clarke',
      text: 'This is a test email to verify Resend is working correctly.',
    });

    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent successfully:', data);
    }
  } catch (error) {
    console.error('Test failed:', error);
  }
}

testEmail();
