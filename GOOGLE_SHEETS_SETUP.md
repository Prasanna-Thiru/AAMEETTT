# Google Sheets Integration Guide

Your website is now fully equipped to push form submissions directly to Google Sheets! Follow these incredibly simple steps to connect them.

## 1. Prepare your Google Sheet
1. Go to Google Sheets and create a new Blank spreadsheet.
2. Name it something like "School Website Forms".

## 2. Add the Webhook Script
1. In your new Google Sheet, click on **Extensions** > **Apps Script** in the top menu.
2. Delete the default `myFunction() { }` code.
3. Paste the following integration code:

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    
    // Add timestamp automatically
    data.Timestamp = new Date().toLocaleString();
    
    // Fetch existing headers on the first row
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn() || 1).getValues()[0];
    
    // If headers don't exist yet, create them dynamically based on the form 
    if (!headers[0]) {
      const newHeaders = Object.keys(data);
      sheet.getRange(1, 1, 1, newHeaders.length).setValues([newHeaders]);
      sheet.appendRow(Object.values(data));
    } else {
      // Map data to corresponding columns
      const row = headers.map(header => data[header] || "");
      sheet.appendRow(row);
    }
    
    return ContentService.createTextOutput(JSON.stringify({ "result": "success" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch(error) {
    return ContentService.createTextOutput(JSON.stringify({ "result": "error", "message": error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

## 3. Deploy the Script
1. Click the blue **Deploy** button at the top right of the Apps Script window and choose **New deployment**.
2. Click the tiny **gear icon** ⚙️ next to "Select type" and choose **Web app**.
3. Under *Description* type "Forms Setup".
4. Under *Execute as*, leave it as **Me**.
5. Under *Who has access*, change it to **Anyone**. (This allows your website backend to send it data).
6. Click **Deploy**. (Google may ask you to authorize access—click "Review permissions", choose your Google account, click "Advanced" and then "Go to project (unsafe)", then "Allow").
7. Copy the **Web app URL** it generates (it starts with `https://script.google.com/macros/...`).

## 4. Paste the URL into your Website
1. Go to the `.env.local` file in your main website folder.
2. Add a new line at the very bottom and paste your URL like this:
```
GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/your-unique-id/exec
```

You're done! Now, whenever someone submits an **Admission form**, **Contact Form**, or **Newsletter Subscription**, their data will instantly auto-populate in your Google Sheet!
