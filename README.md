# CoFndr Website

Production-ready Next.js website for CoFndr with:

- App Router pages
- shared layout and navigation
- API-backed contact form handling
- deployable structure for Vercel or any Node host

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Environment variables

Copy `.env.example` to `.env.local` and set values as needed:

- `CONTACT_EMAIL`: destination email shown in the UI
- `FORM_FORWARD_URL`: optional webhook endpoint to forward submissions
- `RESEND_API_KEY`: optional Resend API key for transactional email delivery

If neither `FORM_FORWARD_URL` nor `RESEND_API_KEY` is set, contact submissions are stored locally in `.data/contact-submissions.jsonl`. That fallback is useful for local development or self-hosted Node deployments, but not for serverless persistence.

## Deploy

### Vercel

1. Import the repo into Vercel.
2. Add environment variables from `.env.example`.
3. Deploy with the default Next.js settings.

### Node host

```bash
npm install
npm run build
npm run start
```
