"use client";

const LEVELS = [
  { label: "Lemah", color: "bg-red-400" },
  { label: "Cukup", color: "bg-gold-400" },
  { label: "Kuat", color: "bg-emerald-400" },
] as const;

function scorePassword(password: string): number {
  if (!password) return 0;
  let score = 0;
  if (password.length >= 8) score += 1;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score += 1;
  if (/\d/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;
  return Math.min(score, 3);
}

interface PasswordStrengthMeterProps {
  password: string;
}

export function PasswordStrengthMeter({ password }: PasswordStrengthMeterProps) {
  if (!password) return null;

  const score = scorePassword(password);
  const level = LEVELS[Math.max(score - 1, 0)] ?? LEVELS[0];

  return (
    <div className="mt-2" aria-live="polite">
      <div className="flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-colors ${
              i < score ? level.color : "bg-white/10"
            }`}
          />
        ))}
      </div>
      <p className="mt-1 text-xs text-white/40">Kekuatan password: {level.label}</p>
    </div>
  );
}