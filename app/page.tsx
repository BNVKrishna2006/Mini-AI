"use client";
import React, { useState, useRef } from "react";

export default function Home() {
  const [msg, setMsg] = useState("");
  const [log, setLog] = useState<string[]>([]);
  const fileRef = useRef<HTMLInputElement | null>(null);

  async function callPing() {
    try {
      const res = await fetch("/api/ping");
      const json = await res.json();
      setLog((l) => [`PING: ${JSON.stringify(json)}`, ...l]);
    } catch (e) {
      setLog((l) => [`PING ERROR: ${String(e)}`, ...l]);
    }
  }

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    if (!msg.trim()) return;
    setLog((l) => [`YOU: ${msg}`, ...l]);
    const echo = msg.toUpperCase();
    setMsg("");
    setTimeout(() => setLog((l) => [`AI: ${echo}`, ...l]), 200);
  }

  async function uploadFile() {
    const file = fileRef.current?.files?.;
    if (!file) {
      setLog((l) => ["UPLOAD: no file selected", ...l]);
      return;
    }
    const fd = new FormData();
    fd.append("file", file);
    try {
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const json = await res.json();
      setLog((l) => [`UPLOAD: ${JSON.stringify(json)}`, ...l]);
    } catch (e) {
      setLog((l) => [`UPLOAD ERROR: ${String(e)}`, ...l]);
    }
  }

  return (
    <main style={{ minHeight: "100vh", padding: 16, maxWidth: 720, margin: "0 auto" }}>
      <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Mini‑AI</h1>
      <p style={{ opacity: 0.7, marginBottom: 16 }}>
        Build OK. Basic chat, API ping, and file upload are enabled.
      </p>

      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <button
          onClick={callPing}
          style={{
            padding: "8px 12px",
            borderRadius: 8,
            border: "1px solid #cbd5e1",
            background: "#0f172a",
            color: "white",
          }}
        >
          Ping API
        </button>

        <input
          type="file"
          ref={fileRef}
          style={{ flex: 1, border: "1px solid #cbd5e1", padding: 6, borderRadius: 8 }}
        />
        <button
          onClick={uploadFile}
          style={{
            padding: "8px 12px",
            borderRadius: 8,
            border: "1px solid #cbd5e1",
            background: "white",
          }}
        >
          Upload
        </button>
      </div>

      <form onSubmit={sendMessage} style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <input
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          placeholder="Type a message..."
          style={{ flex: 1, border: "1px solid #cbd5e1", padding: 10, borderRadius: 8 }}
        />
        <button
          type="submit"
          style={{
            padding: "8px 12px",
            borderRadius: 8,
            border: "1px solid #cbd5e1",
            background: "white",
          }}
        >
          Send
        </button>
      </form>

      <div style={{ display: "grid", gap: 8 }}>
        {log.map((line, i) => (
          <div
            key={i}
            style={{
              border: "1px solid #e2e8f0",
              borderRadius: 8,
              padding: 8,
              background: "white",
            }}
          >
            {line}
          </div>
        ))}
      </div>
    </main>
  );
}

