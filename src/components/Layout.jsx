import { Outlet } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import Background from "./Background";
import Header from "./Header";

export default function Layout() {
  const { theme } = useTheme();

  return (
    <>
      <Background tint={theme.color} />
      <main className="relative z-10 max-w-5xl mx-auto py-10 px-4 grid gap-6">
        <Header />
        <div>
          <Outlet />
        </div>
      </main>
    </>
  );
}
