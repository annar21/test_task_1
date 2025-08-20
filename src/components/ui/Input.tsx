"use client";

import { cn } from "../utils";

interface InputProps {
  label?: string;
  type?: string;
  value: string;
  placeholder?: string;
  onChange: (v: string) => void;
  className?: string;
}

export function Input({ label, type = "text", value, placeholder, onChange, className }: InputProps) {
  return (
    <label className="block">
      {label && <div className="mb-1 text-xs text-neutral-400">{label}</div>}
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "w-full rounded-lg border border-neutral-800/60 bg-transparent px-3 py-2 text-sm outline-none",
          "placeholder:text-neutral-500 focus:border-neutral-700",
          className
        )}
      />
    </label>
  );
}


