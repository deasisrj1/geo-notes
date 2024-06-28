import {
  Bars3Icon,
  BellIcon,
  CalendarIcon,
  ChartPieIcon,
  Cog6ToothIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
  XMarkIcon,
  ArrowLeftIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const navigation = [
  { name: "Search", href: "", icon: MagnifyingGlassIcon, current: false },
  { name: "Public Notes", href: "", icon: HomeIcon, current: true },
  { name: "My Notes", href: "", icon: UsersIcon, current: false },
  { name: "New Note", href: "", icon: FolderIcon, current: false },
  //   { name: "Calendar", href: "#", icon: CalendarIcon, current: false },
  //   { name: "Documents", href: "#", icon: DocumentDuplicateIcon, current: false },
  //   { name: "Reports", href: "#", icon: ChartPieIcon, current: false },
];

// const teams = [
//   { id: 1, name: "Heroicons", href: "#", initial: "H", current: false },
//   { id: 2, name: "Tailwind Labs", href: "#", initial: "T", current: false },
//   { id: 3, name: "Workcation", href: "#", initial: "W", current: false },
// ];

export default function SidebarComponent({ children, setCurrentTab }) {
  const [current, setCurrent] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  return (
    <>
      {/* Static sidebar for desktop */}
      {/* <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col"> */}
      <div
        className={`lg:fixed  lg:z-50 lg:inset-y-0 hidden md:h-full lg:h-full lg:flex ${
          sidebarOpen ? "lg:w-72" : "lg:w-16"
        } lg:flex-col duration-300  relative`}
      >
        {/* Sidebar component, swap this element with another sidebar if you like */}

        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4">
          {/* <div className="flex h-16 shrink-0 items-center"> */}
          {/* <img
              className="h-8 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            /> */}
          {/* </div> */}

          <nav className="flex flex-1 flex-col py-4">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <div
                        onClick={() => {
                          setCurrent(item.name);
                          setCurrentTab(item.name);
                          if (item.name === current) {
                            setSidebarOpen(!sidebarOpen);
                          } else {
                            setSidebarOpen(false);
                          }
                        }}
                        // href={item.href}
                        className={classNames(
                          item.name == current
                            ? "bg-gray-50 text-indigo-600"
                            : "text-gray-700 hover:bg-gray-50 hover:text-indigo-600",
                          "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
                        )}
                      >
                        <item.icon
                          className={classNames(
                            item.name == current
                              ? "text-indigo-600"
                              : "text-gray-400 group-hover:text-indigo-600",
                            "h-6 w-6 shrink-0"
                          )}
                          aria-hidden="true"
                        />

                        <p
                          className={`text-nowrap ${
                            !sidebarOpen && " hidden "
                          }`}
                        >
                          {item.name}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </li>
              <li>
                {/* <div className="text-xs font-semibold leading-6 text-gray-400">
                  Your teams
                </div>
                <ul role="list" className="-mx-2 mt-2 space-y-1">
                  {teams.map((team) => (
                    <li key={team.name}>
                      <a
                        href={team.href}
                        className={classNames(
                          team.current
                            ? "bg-gray-50 text-indigo-600"
                            : "text-gray-700 hover:bg-gray-50 hover:text-indigo-600",
                          "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
                        )}
                      >
                        <span
                          className={classNames(
                            team.current
                              ? "border-indigo-600 text-indigo-600"
                              : "border-gray-200 text-gray-400 group-hover:border-indigo-600 group-hover:text-indigo-600",
                            "flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border bg-white text-[0.625rem] font-medium"
                          )}
                        >
                          {team.initial}
                        </span>
                        <span className="truncate">{team.name}</span>
                      </a>
                    </li>
                  ))}
                </ul> */}
              </li>
              <li className="mt-auto">
                <a
                  href="user/settings"
                  className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
                >
                  <Cog6ToothIcon
                    className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-indigo-600"
                    aria-hidden="true"
                  />
                  {sidebarOpen && "Settings"}
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {children.map(
        (child) =>
          !sidebarOpen &&
          child.props.name === current && (
            <div className="bg-white ml-16 lg:fixed  lg:z-50 lg:inset-y-0 duration-300 flex flex-col w-96">
              {child}
            </div>
          )
      )}
    </>
  );
}
