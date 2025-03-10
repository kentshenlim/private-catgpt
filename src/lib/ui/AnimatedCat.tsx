import { motion } from "framer-motion";

export default function AnimatedCat({
  size = 32,
  isSpinning = true,
}: {
  size?: number;
  isSpinning?: boolean;
}) {
  return (
    // SVG adopted from Lucide
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size ?? 20}
      height={size ?? 20}
      viewBox="0 0 24 24"
      fill="none"
      className="mb-1"
    >
      {/* Main Cat Outline Animation */}
      {isSpinning ? (
        <motion.path
          d="M12 5c.67 0 1.35.09 2 .26 1.78-2 5.03-2.84 6.42-2.26 1.4.58-.42 7-.42 7 .57 1.07 1 2.24 1 3.44C21 17.9 16.97 21 12 21s-9-3-9-7.56c0-1.25.5-2.4 1-3.44 0 0-1.89-6.42-.5-7 1.39-.58 4.72.23 6.5 2.23A9.04 9.04 0 0 1 12 5Z"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          initial={{ strokeDasharray: 100, strokeDashoffset: 100 }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          className="stroke-accent"
        />
      ) : (
        <path
          d="M12 5c.67 0 1.35.09 2 .26 1.78-2 5.03-2.84 6.42-2.26 1.4.58-.42 7-.42 7 .57 1.07 1 2.24 1 3.44C21 17.9 16.97 21 12 21s-9-3-9-7.56c0-1.25.5-2.4 1-3.44 0 0-1.89-6.42-.5-7 1.39-.58 4.72.23 6.5 2.23A9.04 9.04 0 0 1 12 5Z"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="stroke-accent"
        />
      )}

      {/* Eyes */}
      <path
        d="M8 14v.5"
        strokeWidth="2"
        strokeLinecap="round"
        className="stroke-accent"
      />
      <path
        d="M16 14v.5"
        strokeWidth="2"
        strokeLinecap="round"
        className="stroke-accent"
      />

      {/* Nose */}
      <path
        d="M11.25 16.25h1.5L12 17l-.75-.75Z"
        strokeWidth="2"
        className="stroke-accent"
      />
    </svg>
  );
}
