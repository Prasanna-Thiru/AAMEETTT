"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

interface AdminUser {
  _id: string;
  name: string;
  email: string;
  role: string;
}

export function useAuth() {
  const router = useRouter();
  const [user, setUser]       = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/auth/me")
      .then((r) => setUser(r.data.data))
      .catch(() => router.replace("/admin"))
      .finally(() => setLoading(false));
  }, [router]);

  return { user, loading };
}
