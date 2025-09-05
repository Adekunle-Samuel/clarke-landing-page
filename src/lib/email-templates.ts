export const getWaitlistWelcomeEmail = (name: string, waitlistUrl: string = 'https://useclarke.app') => ({
  subject: 'Finally, shopping that feels personal 🙌',
  text: `Hiiii,

Thank you for being here with us.

When I started shopping online, I realized how broken online fashion is. Sizes are inconsistent, there's no real guidance, and so many of us just don't see ourselves represented.

If you experienced any of this like myself and my co-founder did, you get it;

You've probably hesitated buying clothes online because sizing guides vary so wildly between brands.

Maybe you're looking for quality pieces that match your style but don't know where to start.

Or you're tired of shopping experiences that don't feel like they're meant for you.

That's what Clarke is about - making fashion shopping work for real people. Every body should matter in fashion shopping. You deserve to look good and we want to help.

I'd love to hear what your biggest challenge is with online shopping. Just reply to this email - I read every response.

Since you are now here with us, we are in this together. So, If you know someone else who might relate to this, feel free to forward this along. They might want to stay in touch with us here: ${waitlistUrl}

Best,

Sam
Co-Founder, Clarke

P.S. You signed up to hear about Clarke. If this wasn't you, no worries - just ignore this email.`,
})

export const getPartnerNotificationEmail = (brandName: string, email: string) => ({
  subject: 'New Partnership Request! 🤝',
  text: `New Partnership Request

Brand Name: ${brandName}
Email: ${email}
Date: ${new Date().toLocaleDateString()}`,
})
