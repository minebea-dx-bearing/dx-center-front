import { useSidebar } from "../../context/SidebarContext";
import { Link, useLocation } from "react-router";
import SidebarWidget from "../../components/layouts/SidebarWidget";
import { ChevronDownIcon, Cog6ToothIcon, EllipsisHorizontalIcon, Squares2X2Icon } from "@heroicons/react/24/outline";
import { useCallback, useEffect, useRef, useState } from "react";

const navItems = [
  {
    icon: <Squares2X2Icon />,
    name: "TURNING",
    subItems: [
      { name: "TN REALTIME", path: "/nat/tn/tn-realtime" },
      { name: "TN REALTIME OEE", path: "/nat/tn/tn-realtime-oee" },
      { name: "TN DAILY", path: "/nat/tn/tn-daily" },
      { name: "TN SUMMARY PROD.", path: "/nat/tn/tn-summary-prod" },
    ],
  },
  {
    icon: <Squares2X2Icon />,
    name: "GRINDING",
    subItems: [
      { name: "IN-BORE REALTIME", path: "/nat/gd/2ndinbore-realtime" },
      { name: "IN-RACE REALTIME", path: "/nat/gd/2ndinrace-realtime" },
      { name: "IN-S/F REALTIME", path: "/nat/gd/2ndinsuper-realtime" },
      { name: "OUT-RACE REALTIME", path: "/nat/gd/2ndoutrace-realtime" },
      { name: "OUT-S/F REALTIME", path: "/nat/gd/2ndoutsuper-realtime" },
    ],
  },
  {
    icon: <Squares2X2Icon />,
    name: "ASSEMBLY",
    subItems: [
      { name: "COMBINE REALTIME", path: "/nat/assy/combine-realtime" },
      { name: "COMBINE REALTIME OEE", path: "/nat/assy/combine-realtime-oee" },
      { name: "MBR REALTIME", path: "/nat/assy/mbr-realtime" },
      { name: "MBR DAILY", path: "/nat/assy/mbr-daily" },
      { name: "ARP REALTIME", path: "/nat/assy/arp-realtime" },
      { name: "ARP DAILY", path: "/nat/assy/arp-daily" },
      { name: "GSSM REALTIME", path: "/nat/assy/gssm-realtime" },
      { name: "GSSM DAILY", path: "/nat/assy/gssm-daily" },
      { name: "FIM REALTIME", path: "/nat/assy/fim-realtime" },
      { name: "FIM DAILY", path: "/nat/assy/fim-daily" },
      { name: "ANT REALTIME", path: "/nat/assy/ant-realtime" },
      { name: "AVS REALTIME", path: "/nat/assy/avs-realtime" },
      { name: "ALU REALTIME", path: "/nat/assy/alu-realtime" },
      { name: "MBR ANALYSIS", path: "/nat/assy/analysis-mc" },
      { name: "MBR UNMATCH", path: "/nat/assy/mbr-unmatch" },
    ],
  },
];

const othersItems = [
  {
    icon: <Cog6ToothIcon />,
    name: "SETTING",
    // subItems: [{ name: "TN RUN PART", path: "/" }],
  },
];

export default function SidebarNat() {
  const { isExpanded, isMobileOpen } = useSidebar();
  const location = useLocation();

  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [subMenuHeight, setSubMenuHeight] = useState({});
  const subMenuRefs = useRef({});

  const isActive = useCallback((path) => location.pathname === path, [location.pathname]);

  const handleSubmenuToggle = (index, menuType) => {
    setOpenSubmenu((prevOpenSubmenu) => {
      if (prevOpenSubmenu && prevOpenSubmenu.type === menuType && prevOpenSubmenu.index === index) {
        return null;
      }
      return { type: menuType, index };
    });
  };

  const renderMenuItems = (items, menuType) => (
    <ul className="flex flex-col gap-4">
      {items.map((nav, index) => (
        <li key={nav.name}>
          {nav.subItems ? (
            <button
              onClick={() => handleSubmenuToggle(index, menuType)}
              className={`menu-item group ${
                openSubmenu?.type === menuType && openSubmenu?.index === index ? "menu-item-active" : "menu-item-inactive"
              } cursor-pointer ${!isExpanded ? "lg:justify-center" : "lg:justify-start"}`}
            >
              <span
                className={`menu-item-icon-size  ${
                  openSubmenu?.type === menuType && openSubmenu?.index === index ? "menu-item-icon-active" : "menu-item-icon-inactive"
                }`}
              >
                {nav.icon}
              </span>
              {(isExpanded || isMobileOpen) && <span className="menu-item-text">{nav.name}</span>}
              {(isExpanded || isMobileOpen) && (
                <ChevronDownIcon
                  className={`ml-auto w-5 h-5 transition-transform duration-200 ${
                    openSubmenu?.type === menuType && openSubmenu?.index === index ? "rotate-180 text-brand-500" : ""
                  }`}
                />
              )}
            </button>
          ) : (
            nav.path && (
              <Link to={nav.path} className={`menu-item group ${isActive(nav.path) ? "menu-item-active" : "menu-item-inactive"}`}>
                <span className={`menu-item-icon-size ${isActive(nav.path) ? "menu-item-icon-active" : "menu-item-icon-inactive"}`}>{nav.icon}</span>
                {(isExpanded || isMobileOpen) && <span className="menu-item-text">{nav.name}</span>}
              </Link>
            )
          )}
          {nav.subItems && (isExpanded || isMobileOpen) && (
            <div
              ref={(el) => {
                subMenuRefs.current[`${menuType}-${index}`] = el;
              }}
              className="overflow-hidden transition-all duration-300"
              style={{
                height: openSubmenu?.type === menuType && openSubmenu?.index === index ? `${subMenuHeight[`${menuType}-${index}`]}px` : "0px",
              }}
            >
              <ul className="mt-2 space-y-1 ml-5">
                {nav.subItems.map((subItem) => (
                  <li key={subItem.name}>
                    <Link
                      to={subItem.path}
                      className={`menu-dropdown-item ${isActive(subItem.path) ? "menu-dropdown-item-active" : "menu-dropdown-item-inactive"}`}
                    >
                      {subItem.name}
                      <span className="flex items-center gap-1 ml-auto">
                        {subItem.new && (
                          <span
                            className={`ml-auto ${
                              isActive(subItem.path) ? "menu-dropdown-badge-active" : "menu-dropdown-badge-inactive"
                            } menu-dropdown-badge`}
                          >
                            new
                          </span>
                        )}
                        {subItem.pro && (
                          <span
                            className={`ml-auto ${
                              isActive(subItem.path) ? "menu-dropdown-badge-active" : "menu-dropdown-badge-inactive"
                            } menu-dropdown-badge`}
                          >
                            pro
                          </span>
                        )}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
      ))}
    </ul>
  );

  useEffect(() => {
    let submenuMatched = false;
    ["main", "others"].forEach((menuType) => {
      const items = menuType === "main" ? navItems : othersItems;
      items.forEach((nav, index) => {
        if (nav.subItems) {
          nav.subItems.forEach((subItem) => {
            if (isActive(subItem.path)) {
              setOpenSubmenu({
                type: menuType,
                index,
              });
              submenuMatched = true;
            }
          });
        }
      });
    });

    if (!submenuMatched) {
      setOpenSubmenu(null);
    }
  }, [location, isActive]);

  useEffect(() => {
    if (openSubmenu !== null) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`;
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prevHeights) => ({
          ...prevHeights,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);
  return (
    <aside
    className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-transform duration-300 ease-in-out z-50 border-r border-gray-200 w-[270px]
    ${(isExpanded || isMobileOpen) ? "translate-x-0" : "-translate-x-full"}`}
>
      <div className={`py-8 flex ${!isExpanded ? "lg:justify-center" : "justify-start"}`}>
        <Link to="/">
          {isExpanded || isMobileOpen ? (
            <>
              <img className="dark:hidden" src="/images/logo/logo.svg" alt="Logo" width={150} height={40} />
              <img className="hidden dark:block" src="/images/logo/logo-dark.svg" alt="Logo" width={150} height={40} />
            </>
          ) : (
            <img src="/images/logo/logo-icon.svg" alt="Logo" width={32} height={32} />
          )}
        </Link>
      </div>

      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
        <nav className="mb-6">
          <div className="flex flex-col gap-4">
            <div>
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded ? "lg:justify-center" : "justify-start"
                }`}
              >
                {isExpanded || isMobileOpen ? "Menu" : <EllipsisHorizontalIcon className="size-6" />}
              </h2>
              {renderMenuItems(navItems, "main")}
            </div>
            <div className="">
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded ? "lg:justify-center" : "justify-start"
                }`}
              >
                {isExpanded || isMobileOpen ? "Others" : <EllipsisHorizontalIcon className="size-6" />}
              </h2>
              {renderMenuItems(othersItems, "others")}
            </div>
          </div>
        </nav>
        {isExpanded || isMobileOpen ? <SidebarWidget /> : null}
      </div>
    </aside>
  );
}
