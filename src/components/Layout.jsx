import { Outlet } from "react-router-dom";
import Background from "./Background";
import Header from "./Header";
import Card from "./Card";

export default function Layout() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <Background />
      <div className="relative z-10 h-screen flex flex-col max-w-5xl mx-auto">
        <Header />
        <main className="flex-1 overflow-hidden px-4 pb-8">
          <Card className="h-full flex flex-col" opaque>
            <Outlet />
          </Card>
        </main>
      </div>
    </div>
  );
}
