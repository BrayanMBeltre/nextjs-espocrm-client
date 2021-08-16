import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen grid grid-cols-12 transition-all">
      <Sidebar />
      <div className="col-span-10 bg-indigo-50">{children}</div>
    </div>
  );
}
