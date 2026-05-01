const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");

const mongoUri = "mongodb+srv://PRASANNA:AMET%401234567890@mnrs.hg6yavf.mongodb.net/?appName=MNRS";

const AdminUserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String },
    role: { type: String, enum: ["superadmin", "editor"], default: "superadmin" },
  },
  { timestamps: true }
);

AdminUserSchema.methods.comparePassword = async function (password) {
  return bcryptjs.compare(password, this.password);
};

AdminUserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcryptjs.hash(this.password, 10);
  next();
});

const AdminUser = mongoose.model("AdminUser", AdminUserSchema);

const seed = async () => {
  try {
    await mongoose.connect(mongoUri);
    console.log("✓ Connected to MongoDB");

    const email = "admin@mnrs.edu.in";
    const password = "Admin@123456";

    let admin = await AdminUser.findOne({ email });
    if (!admin) {
      admin = new AdminUser({
        email,
        name: "Super Admin",
        password,
        role: "superadmin",
      });
      await admin.save();
      console.log("✓ Admin user created successfully!");
      console.log(`  Email: ${email}`);
      console.log(`  Password: ${password}`);
    } else {
      admin.password = password;
      await admin.save();
      console.log("✓ Admin credentials updated successfully!");
      console.log(`  Email: ${email}`);
      console.log(`  Password: ${password}`);
    }

    process.exit(0);
  } catch (err) {
    console.error("✗ Error creating admin:", err.message);
    process.exit(1);
  }
};

seed();
