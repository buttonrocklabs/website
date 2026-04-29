import type { CSSProperties } from "react";

/* The canonical Button Rock Labs mark.
   Source of truth: BRL/brl-style-guide.html section 1 · Logo.

   Variants:
   - bezel    Filled silhouette + stroke ridge + double-ring bezel.
              The hero treatment. Use inside a copper / dark / granite chip.
   - plain    Filled silhouette only. For small inline marks (footers, ≤24px)
              and light-bg chips where the bezel detail noises up.
   - knockout Outline only — stroked mountain + stroked button-holes, no fill.
              Lives well on light backgrounds and in delicate UI moments
              where a filled mark feels heavy.

   All strokes use currentColor — set text color on the parent to theme it.
   Bezel rings are #000 at low opacity (the embossed effect on copper);
   they're omitted from plain and knockout. */

type Variant = "bezel" | "plain" | "knockout";

type Props = {
  size?: number;
  variant?: Variant;
  className?: string;
  style?: CSSProperties;
};

export default function BrandMark({
  size = 24,
  variant = "bezel",
  className,
  style,
}: Props) {
  if (variant === "knockout") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        className={className}
        style={style}
        aria-hidden="true"
      >
        <path
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinejoin="round"
          strokeLinecap="round"
          d="m16 6 8 16 10-10 4 30H4L16 6z"
        />
        <circle cx={19} cy={29} r={2} fill="none" stroke="currentColor" strokeWidth={1.25} />
        <circle cx={25} cy={35} r={2} fill="none" stroke="currentColor" strokeWidth={1.25} />
      </svg>
    );
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M16 6 L24 22 L34 12 L38 42 L4 42 Z M17 29 A2 2 0 1 0 21 29 A2 2 0 1 0 17 29 Z M23 35 A2 2 0 1 0 27 35 A2 2 0 1 0 23 35 Z"
      />
      {variant === "bezel" && (
        <>
          <path
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinejoin="round"
            strokeLinecap="round"
            d="m16 6 8 16 10-10 4 30H4L16 6z"
          />
          <circle cx={22} cy={32} r={8} fill="none" stroke="#000" strokeOpacity={0.22} strokeWidth={1} />
          <circle cx={22} cy={32} r={6.5} fill="none" stroke="#000" strokeOpacity={0.1} strokeWidth={0.5} />
        </>
      )}
    </svg>
  );
}
