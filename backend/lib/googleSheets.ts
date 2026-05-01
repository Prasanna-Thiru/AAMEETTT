// Helper to send form data to a Google Sheets Apps Script Webhook
export async function pushToGoogleSheets(formType: "Admissions" | "Contact" | "Newsletter", data: any) {
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (!webhookUrl) {
    console.warn("⚠️ GOOGLE_SHEETS_WEBHOOK_URL is not set in .env.local! Skipping Google Sheets update.");
    return;
  }

  try {
    // Normalize data so every form has the EXACT same keys for Google Sheets headers to pick up identically
    const payload = {
      "Timestamp": new Date().toLocaleString(),
      "Form Type": formType,
      "Name": data.name || data.parentName || "-",
      "Student Name": data.studentName || "-",
      "Email": data.email || "-",
      "Phone": data.phone || data.contactNumber || "-",
      "Class Applied": data.classApplying || "-",
      "Schooling": data.schoolingType || "-",
      "Enquiry Type": data.enquiryType || data.role || "-",
      "Message": data.message || "-",
      "Source": data.source || "-"
    };

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify(payload),
    });
    
    if (!response.ok) {
        console.error("Google Sheets Webhook failed with status:", response.status);
    } else {
        const text = await response.text();
        console.log("Google Sheets response:", text);
    }
  } catch (error) {
    console.error(`Failed to push ${formType} to Google Sheets:`, error);
  }
}
