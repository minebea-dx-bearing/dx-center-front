import { Outlet, Link } from "react-router-dom";

export default function Layout() {
  console.log("Layout render");

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md flex flex-col">
        <div className="p-4 font-bold border-b">XXXXXXXXxx</div>
        <nav className="flex-1 p-4 space-y-2">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
        </nav>
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="h-14 bg-white shadow flex items-center px-4">dx</header>
        <main className="flex-1 p-4 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
