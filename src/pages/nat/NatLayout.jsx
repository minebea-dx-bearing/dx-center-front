import { SidebarProvider, useSidebar } from "../../context/SidebarContext";
import { Outlet } from "react-router-dom";
import SidebarNat from "./SidebarNat";
import Header from "../../components/layouts/header/Header";

const LayoutContent = () => {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();

  return (
    <div className="flex h-screen">
      <div>
        <SidebarNat />
      </div>
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${isExpanded || isHovered ? "lg:ml-[270px]" : "lg:ml-[0px]"} ${
          isMobileOpen ? "ml-0" : ""
        }`}
      >
        <Header />
        <div className="mx-auto p-2">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default function NatLayout() {
  return (
    <SidebarProvider>
      <LayoutContent />
    </SidebarProvider>
  );
}
