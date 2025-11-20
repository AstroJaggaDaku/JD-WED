
JD Matrimony — Ultra Premium (Generated)

How to run:
1) cd JD-Matrimony-Ultra
2) npm install
3) create a file named .env in project root (see .env.example)
4) node seed-admin.js
5) npm run dev

.env.example (create and fill)
MONGO_URI=your_mongodb_uri
NEXTAUTH_SECRET=long_random_string
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=
OTP_EMAIL_FROM=
OTP_SMTP_HOST=
OTP_SMTP_PORT=
OTP_SMTP_USER=
OTP_SMTP_PASS=

Notes:
- For OTP email, configure SMTP creds (optional).
- For image uploads, set Cloudinary keys.
- This scaffold uses Next.js App Router and NextAuth (credentials + google).
- Two NextAuth routes are created: [...nextauth] and nextauth (fallback).
- After seeding admin, delete the seed file or restrict access.
