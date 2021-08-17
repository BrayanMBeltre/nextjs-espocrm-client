import { Sidebar } from "components";
import Head from "next/head";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function Layout({ children }) {
  return (
    <>
      <Head>
        <title>EspoCRM</title>
      </Head>
      <div className="min-h-screen grid grid-cols-12 transition-all">
        <Sidebar />
        <div className="col-span-10 bg-indigo-50">
          <ToastContainer />
          {children}
        </div>
      </div>
    </>
  );
}
