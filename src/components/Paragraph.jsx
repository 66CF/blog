function cn(...args) {
  return args.filter(Boolean).join(" ");
}

export default function Paragraph({ children, className = "" }) {
  return (
    <p className={cn("text-gray-300 leading-relaxed tracking-wide", className)}>
      {children}
    </p>
  );
}
