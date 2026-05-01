"use client";

import { useState } from "react";

export default function GallerySeedPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const seedGallery = async () => {
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const response = await fetch("/api/admin/gallery/seed", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ seed: true }),
      });
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to seed gallery");
      }

      setMessage(data.message);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unexpected error";
      setError(`Error: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "40px", fontFamily: "Arial, sans-serif" }}>
      <h1>Gallery Seeder</h1>
      <p>Click the button below to populate the gallery with 25 curated images.</p>

      <button
        onClick={seedGallery}
        disabled={loading}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          cursor: loading ? "not-allowed" : "pointer",
          backgroundColor: loading ? "#ccc" : "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
        }}
      >
        {loading ? "Seeding..." : "Seed Gallery"}
      </button>

      {message && (
        <div style={{ color: "green", marginTop: "20px", fontSize: "16px" }}>
          {message}
        </div>
      )}

      {error && (
        <div style={{ color: "red", marginTop: "20px", fontSize: "16px" }}>
          {error}
        </div>
      )}
    </div>
  );
}
