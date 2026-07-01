export default function NotFound() {
  return (
    <div className="flex-1 flex justify-center items-center">
      <div className="text-center" style={{ fontSize: "clamp(2rem, 8vw, 8rem)" }}>
        <span style={{ color: "var(--color-accent)" }}>404</span>
      </div>
    </div>
  );
}
