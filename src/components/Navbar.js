import React from "react";
import { useLocation } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import { Link as RouterLink } from "react-router-dom";
import logo from "../components/assets/Logo/1.png";

const navigation = [
  { name: "Beranda", target: "beranda" },
  { name: "Profil", target: "profil" },
  { name: "Berita", href: "/berita" },
  { name: "WBK", target: "wbk" },
  { name: "Road Map", target: "roadmap" },
  { name: "Timeline", target: "timeline" },
];

export default function Navbar() {
  const location = useLocation();

  return (
    <div className="relative">
      <nav className="fixed top-0 left-0 right-0 bg-blue-900 w-full navbar z-50">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-20 items-center justify-between">
            <div className="flex flex-1 items-center justify-between">
              <div className="flex shrink-0 items-center">
                <img src={logo} className="h-12 w-auto" alt="Logo" />
              </div>
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-12 ml-auto">
                  {navigation.map((item) =>
                    item.href ? (
                      <RouterLink
                        key={item.name}
                        to={item.href}
                        className="text-white hover:text-cyan-500 rounded-md px-3 py-2 text-md font-normal"
                      >
                        {item.name}
                      </RouterLink>
                    ) : (
                      <ScrollLink
                        key={item.name}
                        to={item.target}
                        smooth={true}
                        duration={500}
                        offset={-80}
                        className="text-white hover:text-cyan-500 rounded-md px-3 py-2 text-md font-normal cursor-pointer"
                        onClick={(e) => {
                          if (location.pathname !== "/") {
                            e.preventDefault();
                            window.location.href = `/#${item.target}`;
                          }
                        }}
                      >
                        {item.name}
                      </ScrollLink>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
