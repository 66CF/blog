export default function SectionTitle({ children }) {
  return (
    <h2 className="text-2xl font-bold text-accent" style={{ color: "var(--color-accent)" }}>
      {children}
    </h2>
  );
}
