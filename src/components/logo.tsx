export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 36 36"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <rect x="4" y="20" width="28" height="4" rx="1" fill="#c45c0a" opacity="0.6" />
      <rect x="8" y="14" width="20" height="4" rx="1" fill="#c45c0a" opacity="0.8" />
      <rect x="12" y="8" width="12" height="4" rx="1" fill="#f07020" />
      <rect x="16" y="3" width="4" height="4" rx="1" fill="#ffb340" opacity="0.9" />
    </svg>
  )
}

export function LogoWordmark({ className }: { className?: string }) {
  return (
    <span className={className}>
      Doc<span className="text-ember-hot">Foundry</span>
    </span>
  )
}
