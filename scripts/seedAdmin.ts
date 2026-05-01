import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";

// Get the correct path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import the model using the correct relative path
import AdminUser from "../database/models/AdminUser.js";


const seed = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI missing from .env.local");
    }
    await mongoose.connect(process.env.MONGODB_URI);
    
    const email = "admin@mnrs.edu.in";
    const password = "AdminPassword!2024";

    let admin = await AdminUser.findOne({ email });
    if (!admin) {
      admin = new AdminUser({
        email,
        name: "Super Admin",
        password,
        role: "superadmin"
      });
      await admin.save();
      console.log("Admin generated successfully!");
    } else {
      admin.password = password; 
      await admin.save();
      console.log("Admin credentials updated successfully!");
    }
    process.exit(0);
  } catch (err) {
    console.error("Error creating admin:", err);
    process.exit(1);
  }
};

seed();
