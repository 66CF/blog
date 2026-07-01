export default function Card({ children, className = "", opaque, ...rest }) {
  return (
    <div
      className={`border border-zinc-700/50 p-4 md:p-6 bg-black/80 backdrop-blur-md ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}
