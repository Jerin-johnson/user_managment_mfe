import React from "react";

// ─────────────────────────────────────────────────────────────────────────────
// Usage examples:
//   <Loading />                          → spinner, page-centred
//   <Loading variant="dots" />           → bouncing dots
//   <Loading variant="bar" />            → sliding bar
//   <Loading variant="ring" />           → dashed ring
//   <Loading variant="spinner" inline /> → tiny inline spinner
// ─────────────────────────────────────────────────────────────────────────────

type LoadingVariant = "spinner" | "dots" | "bar" | "ring";

type LoadingProps = {
  variant?: LoadingVariant;
  /** Renders compact inline size instead of page-centred */
  inline?: boolean;
  message?: string;
};

// ── Individual animations ─────────────────────────────────────────────────────

function Spinner({ size = 36 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      className="animate-spin"
      style={{ animationDuration: "0.9s" }}
    >
      <circle
        cx="18"
        cy="18"
        r="14"
        stroke="rgba(255,255,255,0.07)"
        strokeWidth="3"
      />
      <path
        d="M18 4a14 14 0 0 1 14 14"
        stroke="#6366f1"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Dots() {
  return (
    <div className="flex items-center gap-1.5">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-indigo-500"
          style={{
            animation: "loading-pulse 1.2s ease-in-out infinite",
            animationDelay: `${i * 0.2}s`,
          }}
        />
      ))}
      <style>{`
        @keyframes loading-pulse {
          0%, 80%, 100% { opacity: 0.2; transform: scale(0.85); }
          40%            { opacity: 1;   transform: scale(1); }
        }
      `}</style>
    </div>
  );
}

function Bar() {
  return (
    <div className="w-28 h-0.5 rounded-full bg-white/5 overflow-hidden">
      <div
        className="h-full w-2/5 rounded-full bg-indigo-500"
        style={{ animation: "loading-slide 1.4s ease-in-out infinite" }}
      />
      <style>{`
        @keyframes loading-slide {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(350%); }
        }
      `}</style>
    </div>
  );
}

function Ring({ size = 36 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      className="animate-spin"
      style={{ animationDuration: "1.1s" }}
    >
      <circle
        cx="18"
        cy="18"
        r="14"
        stroke="#6366f1"
        strokeWidth="2.5"
        strokeDasharray="22 66"
        strokeLinecap="round"
      />
    </svg>
  );
}

// ── Map variant → element ─────────────────────────────────────────────────────
function Visual({
  variant,
  inline,
}: {
  variant: LoadingVariant;
  inline: boolean;
}) {
  const size = inline ? 16 : 36;
  switch (variant) {
    case "dots":
      return <Dots />;
    case "bar":
      return <Bar />;
    case "ring":
      return <Ring size={size} />;
    default:
      return <Spinner size={size} />;
  }
}

// ── Main export ───────────────────────────────────────────────────────────────
export default function Loading({
  variant = "spinner",
  inline = false,
  message,
}: LoadingProps) {
  if (inline) {
    return (
      <span className="inline-flex items-center gap-2 text-gray-500 text-sm">
        <Visual variant={variant} inline />
        {message && <span>{message}</span>}
      </span>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center flex-1 min-h-[280px] gap-4">
      <Visual variant={variant} inline={false} />
      {message && (
        <p className="text-sm text-gray-500 tracking-wide">{message}</p>
      )}
    </div>
  );
}
