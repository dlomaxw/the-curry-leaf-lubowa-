/**
 * Per-letter hover animation (the reference site's "xspin" effect):
 * every letter sits in its own span and flips on its X-axis with a small
 * stagger when the parent (or any `.group`) is hovered. Pure CSS — see
 * `.spin-text` in globals.css.
 */
export default function SpinText({ text }: { text: string }) {
  return (
    <span className="spin-text" aria-label={text}>
      {Array.from(text).map((ch, i) => (
        <span
          key={i}
          aria-hidden
          style={{ transitionDelay: `${i * 25}ms` }}
        >
          {ch === " " ? " " : ch}
        </span>
      ))}
    </span>
  );
}
