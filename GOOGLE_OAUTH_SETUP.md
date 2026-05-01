# Google OAuth Setup

This project supports Google account sign-in for student, parent, and faculty portal users.

## 1. Create Google OAuth Credentials

1. Go to the Google Cloud Console:
   https://console.cloud.google.com/
2. Create a new project or select your existing school website project.
3. Open **APIs & Services** > **OAuth consent screen**.
4. Choose the user type that matches your use case.
5. Fill in the app name, support email, and developer contact email.
6. Save the consent screen.
7. Open **APIs & Services** > **Credentials**.
8. Click **Create Credentials** > **OAuth client ID**.
9. Select **Web application**.
10. Add the authorized redirect URI for local development. It must exactly match your `.env.local` value:

```text
http://localhost:3000/api/auth/google/callback
```

11. Add your production redirect URI:

```text
https://your-domain.com/api/auth/google/callback
```

Replace `your-domain.com` with the real deployed domain.

## 2. Add Environment Variables

Create or update `.env.local` in the project root:

```env
GOOGLE_CLIENT_ID=your-google-oauth-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-oauth-client-secret
NEXT_PUBLIC_SITE_URL=http://localhost:3000
GOOGLE_OAUTH_REDIRECT_URI=http://localhost:3000/api/auth/google/callback
```

For production, set:

```env
NEXT_PUBLIC_SITE_URL=https://your-domain.com
GOOGLE_OAUTH_REDIRECT_URI=https://your-domain.com/api/auth/google/callback
```

Do not commit `.env` or `.env.local` files. They contain secrets.

## 3. Run The App

Install dependencies if needed:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000/login
```

Click **Continue with Google**.

## 4. How The Flow Works

The login card sends users to:

```text
/api/auth/google?role=student&intent=login
```

The backend redirects to Google with these scopes:

```text
openid email profile
```

After Google redirects back to:

```text
/api/auth/google/callback
```

the app:

1. Verifies the OAuth state cookie.
2. Exchanges the Google code for an access token.
3. Reads the user's Google profile.
4. Checks for an existing portal account with the same email.
5. Logs in matching users with the normal portal JWT cookie.
6. Sends new users back to signup with Google name and email prefilled.

## 5. Role Notes

Student Google sign-in still requires the email to be approved in student access before the account can continue.

Parent and faculty Google sign-in can find existing accounts by email. New users are redirected to the signup form to complete role-specific fields.

## 6. Common Errors

`google-config`

Google credentials are missing. Check `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`.

`google-state`

The OAuth session expired or the callback was opened directly. Start again from the login page.

`google-token`

Google rejected the code exchange. Check the redirect URI in Google Cloud Console and `NEXT_PUBLIC_SITE_URL`.
The Google Cloud authorized redirect URI must exactly match `GOOGLE_OAUTH_REDIRECT_URI`, including protocol, host, port, path, and trailing slash.

`google-profile`

The app could not read the Google email/profile. Make sure the scopes include `openid email profile`.

`student-not-approved`

The Google email is not approved for student portal access yet.

## 7. Production Checklist

- Add production redirect URI in Google Cloud Console.
- Add `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` to the hosting provider.
- Set `NEXT_PUBLIC_SITE_URL` to the exact deployed origin.
- Set `GOOGLE_OAUTH_REDIRECT_URI` to the exact callback URL authorized in Google Cloud Console.
- Keep HTTPS enabled in production.
- Test all three roles: student, parent, and faculty.
