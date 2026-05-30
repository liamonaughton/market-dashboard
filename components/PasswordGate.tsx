"use client";

import { FormEvent, ReactNode, useEffect, useState } from "react";

const STORAGE_KEY = "market-dashboard:gate:v1";
const PASSWORD = "11capital";

interface PasswordGateProps {
  children: ReactNode;
}

export default function PasswordGate({ children }: PasswordGateProps) {
  const [hydrated, setHydrated] = useState(false);
  const [authed, setAuthed] = useState(false);
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(STORAGE_KEY) === "ok") {
        setAuthed(true);
      }
    } catch {
      // sessionStorage unavailable; user will need to re-enter each load
    }
    setHydrated(true);
  }, []);

  if (!hydrated) return null;

  if (authed) return <>{children}</>;

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value === PASSWORD) {
      try {
        sessionStorage.setItem(STORAGE_KEY, "ok");
      } catch {
        // ignore
      }
      setAuthed(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-49px)] items-center justify-center bg-background px-4">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm rounded-xl border border-border bg-surface p-6 shadow-lg"
      >
        <h1 className="text-lg font-semibold text-white">Protected page</h1>
        <p className="mt-1 text-sm text-muted">
          Enter the password to continue.
        </p>
        <input
          type="password"
          autoFocus
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            if (error) setError(false);
          }}
          className="mt-4 w-full rounded-md border border-border bg-surface-elevated px-3 py-2 text-sm text-white placeholder:text-muted focus:border-accent focus:outline-none"
          placeholder="Password"
        />
        {error ? (
          <p className="mt-2 text-xs text-negative">Incorrect password.</p>
        ) : null}
        <button
          type="submit"
          className="mt-4 w-full rounded-md bg-accent px-3 py-2 text-sm font-medium text-white transition hover:bg-accent/90"
        >
          Unlock
        </button>
      </form>
    </div>
  );
}
