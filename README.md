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
- `CONTACT_FROM_NAME`: sender name used for Resend delivery
- `CONTACT_FROM_EMAIL`: verified sender email used for Resend delivery
- `FORM_FORWARD_URL`: optional webhook endpoint to forward submissions
- `RESEND_API_KEY`: optional Resend API key for transactional email delivery

If you use Resend, keep `CONTACT_EMAIL=tech.cofndr@gmail.com` and set:

- `RESEND_API_KEY=re_...`
- `CONTACT_FROM_EMAIL` to a sender/domain verified inside your Resend account

The default `onboarding@resend.dev` sender is suitable for initial testing. For production, replace it with your own verified domain sender.

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
