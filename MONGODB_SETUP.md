# MongoDB Setup Guide

Your website is entirely programmed to use MongoDB to securely handle user accounts, authentication (login, signup), and the admin panel! 

Currently, the forms are failing to log you in because the website has a placeholder connection string. You just need to create a free database and link it.

## Step 1: Create a Free Database
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) and create a free account.
2. Once logged in, click **Build a Database** and select the **FREE** (M0) shared cluster.
3. Choose the region closest to you and click **Create**.

## Step 2: Set Database Credentials
1. Under "Security Quickstart", it will ask you to create a Database User. 
2. Enter a **Username** and click "Autogenerate Secure Password" (or type your own). 
3. **Important:** Copy that password somewhere safe right now! You will need it in Step 4.
4. Click **Create User**.

## Step 3: Network Access
1. Scroll down to "Where would you like to connect from?"
2. Select **My Local Environment**.
3. Click exactly: **Allow Access from Anywhere** (this will add `0.0.0.0/0` so your Next.js server can connect).
4. Click **Finish and Close**.

## Step 4: Get your Connection String!
1. Click the **Connect** button on your cluster.
2. Choose **Drivers** (Node.js).
3. Copy the incredibly long connection string it gives you. It will look like this:
   `mongodb+srv://yourUsername:<password>@cluster0.abcde.mongodb.net/?retryWrites=true&w=majority`
4. Replace `<password>` in that string with the password you saved in Step 2. (Remove the `<` and `>` brackets).

## Step 5: Link it to your Website
1. Open `.env.local` in your website folder.
2. Find `MONGODB_URI` on line 2.
3. Delete the placeholder and paste your completed connection string there!
4. Restart your terminal server (`Ctrl + C` then `npm run dev`).

You're done! Your website's login, signup, and admin dashboards will instantly start working natively.
