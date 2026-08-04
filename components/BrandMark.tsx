interface BrandMarkProps {
  size?: number;
  className?: string;
}

/** The nine-square pixel-cube mark — one shared component instead of six inlined copies. */
export default function BrandMark({ size = 24, className }: BrandMarkProps) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} className={className} aria-hidden="true">
      <rect x="0" y="0" width="20" height="20" />
      <rect x="80" y="0" width="20" height="20" />
      <rect x="20" y="20" width="20" height="20" />
      <rect x="60" y="20" width="20" height="20" />
      <rect x="40" y="40" width="20" height="20" />
      <rect x="20" y="60" width="20" height="20" />
      <rect x="60" y="60" width="20" height="20" />
      <rect x="0" y="80" width="20" height="20" />
      <rect className="red" x="80" y="80" width="20" height="20" />
    </svg>
  );
}
