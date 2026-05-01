import StudentAccess from "@/database/models/StudentAccess";

export function normalizeStudentEmail(email: unknown) {
  return String(email || "").toLowerCase().trim();
}

export async function isStudentEmailAllowed(email: unknown) {
  const normalizedEmail = normalizeStudentEmail(email);
  if (!normalizedEmail) return false;

  const access = await StudentAccess.findOne({ email: normalizedEmail }).lean();
  return Boolean(access);
}

export async function markStudentEmailUsed(email: unknown) {
  const normalizedEmail = normalizeStudentEmail(email);
  if (!normalizedEmail) return;

  await StudentAccess.updateOne(
    { email: normalizedEmail },
    { $set: { usedAt: new Date() } }
  );
}
