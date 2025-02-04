import React, { useState } from "react";
import Sidebar, { SidebarItem } from "../../SideBarAdmin";
import {
  Close,
  Logout,
} from "@mui/icons-material";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import DnsRoundedIcon from "@mui/icons-material/DnsRounded";
import Diversity3RoundedIcon from "@mui/icons-material/Diversity3Rounded";
import WidgetsRoundedIcon from "@mui/icons-material/WidgetsRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import MonitorHeartRoundedIcon from "@mui/icons-material/MonitorHeartRounded";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import PrintRoundedIcon from "@mui/icons-material/PrintRounded";
import BusinessIcon from '@mui/icons-material/Business';
import ImportContactsRoundedIcon from "@mui/icons-material/ImportContactsRounded";
import { AnimatePresence, motion } from "framer-motion";
import NewspaperIcon from '@mui/icons-material/Newspaper';
import CategoryIcon from '@mui/icons-material/Category';
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';

function AdminLayout({ children }) {
  const data = [
    {
      icon: <DashboardRoundedIcon />,
      text: "Dashboard",
      to: "/dashboard",
    },
    {
      icon: <ViewCarouselIcon />,
      text: "Carousel",
      to: "/carouselbaru",
      submenu: [],
    },
    {
      icon: <NewspaperIcon />,
      text: "Berita",
      to: "",
      submenu: [
        { text: "Berita Baru", 
          to: "/beritabaru", 
          icon: <MenuBookRoundedIcon /> },
        { 
          text: "Category", 
          to: "/categorybaru", 
          icon: <CategoryIcon /> 
        },
      ],
    },
    {
      icon: <Logout />,
      text: "Keluar",
      to: "logout",
      submenu: [],
    },
  ];

  const [toast, setToast] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="fixed w-1/6 h-full z-40 bg-grayCustom text-sm">
        <Sidebar>
          {data.map((item, key) => (
            <SidebarItem
              key={key}
              text={item.text}
              icon={item.icon}
              to={item.to}
              submenu={item.submenu}
            />
          ))}
        </Sidebar>
      </div>

      <div className="flex-1 ml-[16.6667%] w-5/6 overflow-auto">{children}</div>
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute bottom-5 right-5"
          >
            <div
              id="toast-success"
              className="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow border-2 border-gray-200"
              role="alert"
            >
              <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                </svg>
                <span className="sr-only">Check icon</span>
              </div>
              <div className="ms-3 text-sm font-normal">Berhasil masuk</div>
              <button
                type="button"
                className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
                data-dismiss-target="#toast-success"
                aria-label="Close"
                onClick={() => setToast(false)}
              >
                <Close />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default AdminLayout;
