export const contact = {
  formHeading: 'Send a message',
  fields: {
    name: { label: 'Your name' },
    email: { label: 'Email', hint: 'So I can reply.' },
    topic: { label: "What's it about?" },
    message: { label: 'Message', hint: 'A few lines about what you need.' },
  },
  topics: ['Freelance project', 'Collaboration', 'Internship or job', 'Something else'] as const,
  submit: 'Send message',
  submitting: 'Sending…',
  errorSummary: 'Please fix the highlighted fields.',
  errors: {
    name: 'Please enter your name.',
    email: 'Please enter a valid email address.',
    topic: 'Please choose a topic.',
    message: 'Please write at least 20 characters.',
    messageLong: 'Please keep it under 2,000 characters.',
    rateLimited: 'Too many messages in a short time. Please try again in a few minutes.',
    failed: 'Your message could not be sent. Please email me directly.',
  },
  success: { heading: 'Message sent', body: "Thanks. I'll reply to you by email." },
};

export type ContactContent = typeof contact;
