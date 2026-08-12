"use client";

import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
  return (
    <Toaster
      position="bottom-right"
      toastOptions={{
        style: {
          background: "var(--card)",
          color: "var(--card-foreground)",
          border: "1px solid var(--border)",
          fontSize: "14px",
        },
        success: {
          iconTheme: {
            primary: "var(--success)",
            secondary: "var(--card)",
          },
        },
        error: {
          iconTheme: {
            primary: "var(--destructive)",
            secondary: "var(--card)",
          },
        },
      }}
    />
  );
}
