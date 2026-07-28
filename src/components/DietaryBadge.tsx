import type { Dietary } from "@/data/menu";

const styles: Record<Dietary, { label: string; cls: string }> = {
  veg: { label: "Vegetarian", cls: "border-leaf text-leaf" },
  vegan: { label: "Vegan", cls: "border-leaf text-leaf bg-leaf/5" },
  "non-veg": { label: "Non-Veg", cls: "border-chilli text-chilli" },
};

export default function DietaryBadge({ dietary }: { dietary: Dietary }) {
  const s = styles[dietary];
  return (
    <span
      className={`inline-block rounded-full border px-2.5 py-0.5 text-[0.65rem] font-medium uppercase tracking-wider ${s.cls}`}
    >
      {s.label}
    </span>
  );
}
