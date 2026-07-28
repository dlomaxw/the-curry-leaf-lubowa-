import type { Spice } from "@/data/menu";

const labels = ["No heat", "Mild", "Medium", "Hot"];

export default function SpiceLevel({ level }: { level: Spice }) {
  if (level === 0) return null;
  return (
    <span
      className="inline-flex items-center gap-1"
      title={labels[level]}
      aria-label={`Spice level: ${labels[level]}`}
    >
      {[1, 2, 3].map((i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          className={`h-3.5 w-3.5 ${i <= level ? "fill-chilli" : "fill-sand"}`}
          aria-hidden
        >
          <path d="M13.5 2c.3 1 .1 1.8-.4 2.5 3 .8 4.9 3.4 4.9 6.8 0 4.2-3.7 6.7-8.2 6.7C5.6 18 2 15.1 2 10.9c0-.5.6-.7.9-.3.8 1 1.9 1.6 3.3 1.6-1-1.3-1.3-3.1-.6-4.8.2-.4.7-.4.9 0 .4.8 1 1.3 1.9 1.5-.4-1.9.2-3.9 1.9-5.3.9-.8 2-1.3 2.6-1.4.3 0 .5.3.6.8z" />
        </svg>
      ))}
    </span>
  );
}
