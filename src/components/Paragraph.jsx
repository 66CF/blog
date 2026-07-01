export default function Paragraph({ children, className = "" }) {
  return (
    <p className={`text-gray-300 leading-relaxed tracking-wide ${className}`}>
      {children}
    </p>
  );
}
