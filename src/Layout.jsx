import { Outlet } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="w-full sticky top-0 z-50 mx-auto">
        {" "}
        {/* might remove sticky later */}
        <Navbar />
      </div>
      <main className="flex-1">
        <Outlet />
      </main>
      <div className="w-full">
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
