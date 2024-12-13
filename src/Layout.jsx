import { Outlet } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";

const Layout = () => {
  return (
    <div className="flex flex-col">
      {/* might remove later */}
      <div className="w-full sticky top-0 z-50 mx-auto">
        <Navbar />
      </div>
      <main>
        <Outlet />
      </main>
      <div className="w-full">
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
