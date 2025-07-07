import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const GuestLayout = () => {
  return (
    <div className="flex flex-col">
      <NavBar />
      <div className="h-full min-h-screen">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default GuestLayout;
