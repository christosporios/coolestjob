# CoolestJob.gr 🚀

A curated list of jobs with transparent compensation, from companies that pass the vibe check, with a single-email application process.

## How to Add a Job

Want to add a job to coolestjob.gr? Follow these steps to submit a job listing via a Pull Request:

### 1. Fork the Repository

Start by forking this repository to your GitHub account.

### 2. Add Your Job to the Data File

Open the `data/jobs.ts` file and add your job listing to the `jobs` array. Follow the existing format:

\`\`\`typescript
{
  id: generateId(), // Leave this as is, it will generate a unique ID
  title: "🚀 Your Job Title", // Include an appropriate emoji
  description: "A detailed description of the role, responsibilities, and requirements.",
  company: "Your Company Name",
  companyDescription: "A one-sentence description of your company.",
  compensation: 60000, // Annual compensation in EUR
  email: "jobs@yourcompany.com", // Email where applications will be sent
  location: "Athens, Greece" // Location (e.g., "Athens, Greece", "Athens / Remote", or "Remote")
}
\`\`\`

### 3. Guidelines for Job Listings

- **Be transparent about compensation**: All listings must include the actual compensation.
- **Keep descriptions clear and concise**: Provide enough detail without being overwhelming.
- **Use appropriate emojis**: Add a relevant emoji to your job title.
- **Specify location clearly**: Use "Athens, Greece", "Athens / Remote", or "Remote".
- **Provide a valid email**: Make sure the email address is correct and monitored.

### 4. Submit a Pull Request

After adding your job listing:

1. Commit your changes
2. Push to your fork
3. Open a Pull Request to the main repository

### 5. Review Process

Our team will review your PR to ensure it meets our guidelines. We may suggest changes or ask questions before merging.

## Vibe Check Criteria

We only list jobs from companies that:

- Offer fair and transparent compensation
- Have a positive work culture
- Respect work-life balance
- Provide meaningful work
- Have an easy application process

## Questions?

If you have any questions about adding a job or about coolestjob.gr in general, please email us at hello@coolestjob.gr.

---

✨ Happy job hunting! ✨
