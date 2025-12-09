import { Outlet, Link } from "react-router-dom";

export default function Layout() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md flex flex-col">
        <div className="p-4 text-xl font-bold border-b">xxxxxxxxxxxxxxxxxxxxxxxxx</div>
        <nav className="flex-1 p-4 space-y-2">
          <Link to="/" className="block p-2 rounded hover:bg-gray-200">
            Home
          </Link>
          <Link to="/about" className="block p-2 rounded hover:bg-gray-200">
            About
          </Link>
          <Link to="/contact" className="block p-2 rounded hover:bg-gray-200">
            Contact
          </Link>
        </nav>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col">
        <header className="h-14 bg-white shadow flex items-center px-4">
          <h1 className="text-lg font-semibold">Header</h1>
        </header>
        <main className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
