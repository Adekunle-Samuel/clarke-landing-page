export const getWaitlistWelcomeEmail = (name: string, waitlistUrl: string = 'https://useclarke.app') => ({
  subject: 'Finally, shopping that feels personal 🙌',
  text: `Hi ${name}!

Thank you for joining the waitlist.

When we set out to build Clarke, it was simple: fashion should work for real people, not just standard sizes. Basically, every body matters.

That's why Clarke is designed to be your personal shopper, curating pieces that actually fit your size, body, and style.

We're building for you if…
- You hesitate to shop online because sizes are all over the place.
- You're searching for unique, stylish, and quality pieces but don't know where to start.
- You don't see your body represented when you shop and want a personal experience.

With Clarke, we're prioritizing what matters most when you find an item—fit, style, and how it makes you feel. It's all about you.

In the meantime, you can reply this email if you have any question. If you think someone could benefit from Clarke, share the waitlist with them.

Share the waitlist: ${waitlistUrl}

Or forward this email to a friend who needs this.

With love,
Sam
Co-Founder, Clarke

---
You're receiving this because you joined the Clarke waitlist.
If this wasn't you, you can safely ignore this email.`,
})

export const getPartnerNotificationEmail = (brandName: string, email: string) => ({
  subject: 'New Partnership Request! 🤝',
  text: `New Partnership Request

Brand Name: ${brandName}
Email: ${email}
Date: ${new Date().toLocaleDateString()}`,
})
