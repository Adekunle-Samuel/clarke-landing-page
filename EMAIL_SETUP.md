# Email Setup with Resend

This project is configured to send automated emails when users join the waitlist or submit partnership requests.

## Setup Instructions

### 1. Install Dependencies

```bash
npm install resend
```

### 2. Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Resend API Configuration
RESEND_API_KEY=your_resend_api_key_here

# Optional: Custom waitlist URL for email templates
WAITLIST_URL=https://useclarke.app

# Supabase Configuration (if not already set)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Resend Setup

1. **Sign up for Resend**: Go to [resend.com](https://resend.com) and create an account
2. **Get your API key**: In the Resend dashboard, go to API Keys and create a new one
3. **Verify your domain**: Add and verify `useclarke.app` in Resend (required for sending emails from sam@useclarke.app)
4. **Add your API key**: Copy the API key and add it to your `.env.local` file

### 4. Email Templates

The project includes two email templates:

- **Waitlist Welcome Email**: Sent to users who join the waitlist with your custom HTML template
- **Partner Notification Email**: Sent to sam@useclarke.app when someone submits a partnership request

### 5. How It Works

- When a user submits the waitlist form, they are added to Supabase and receive a welcome email
- When someone submits a partnership request, you receive a notification email
- Email sending is non-blocking - if email fails, the form submission still succeeds
- All emails are sent from `sam@useclarke.app`

### 6. Testing

To test the email functionality:

1. Make sure your environment variables are set
2. Start your development server: `npm run dev`
3. Submit the waitlist form
4. Check your email for the welcome message
5. Check the console for any email-related errors

### 7. Customization

You can customize the email templates by editing:
- `src/lib/email-templates.ts` - Email content and styling
- `src/app/api/send-waitlist-email/route.ts` - Email sending logic

The waitlist email uses your custom HTML template with proper email client compatibility.
