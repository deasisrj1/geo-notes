import { signOut } from "@/app/logout/actions";
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
  ArrowLeftStartOnRectangleIcon,
  ArrowLeftEndOnRectangleIcon,
  DocumentPlusIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useState } from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Drawer({
  content,
  // current,
  // setCurrent,
  setSidebarOpen,
  sidebarOpen,
  setCurrentTab,
  currentTab,
}) {
  const item = content;
  return (
    <li key={item.name}>
      <div
        onClick={() => {
          if (item.name === currentTab || item.name === "") {
            setSidebarOpen(!sidebarOpen);
          } else {
            setSidebarOpen(false);
            // setCurrent(item.name);
            setCurrentTab(item.name);
          }
        }}
        // href={item.href}
        className={classNames(
          item.name == currentTab
            ? "bg-gray-50 text-indigo-600"
            : "text-gray-700 hover:bg-gray-50 hover:text-indigo-600",
          "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
        )}
      >
        <item.icon
          className={classNames(
            item.name == currentTab
              ? "text-indigo-600"
              : "text-gray-400 group-hover:text-indigo-600",
            "h-6 w-6 shrink-0"
          )}
          aria-hidden="true"
        />

        <p className={`hidden text-nowrap ${sidebarOpen && " lg:block "}`}>
          {item.name}
        </p>
      </div>
    </li>
  );
}

function LoggedInContent(props) {
  if (props.user) {
    return <Drawer {...props} />;
  } else {
    return !props.content.loggedInContent && <Drawer {...props} />;
  }
}
const navigation = [
  {
    name: "",
    href: "",
    icon: Bars3Icon,
    loggedInContent: false,
  },
  {
    name: "Search",
    href: "",
    icon: MagnifyingGlassIcon,
    loggedInContent: false,
  },
  {
    name: "Public Notes",
    href: "",
    icon: UsersIcon,
    loggedInContent: false,
  },
  {
    name: "My Notes",
    href: "",
    icon: FolderIcon,
    loggedInContent: true,
  },
  {
    name: "New Note",
    href: "",
    icon: DocumentPlusIcon,
    loggedInContent: true,
  },
];

export default function SidebarComponent({
  children,
  setCurrentTab,
  user,
  currentTab,
}) {
  // const [current, setCurrent] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const drawerProps = {
    // current,
    // setCurrent,
    setSidebarOpen,
    sidebarOpen,
    setCurrentTab,
    currentTab,
  };
  return (
    <>
      <div
        className={`bg-white md:fixed  hidden z-50 md:inset-y-0 duration-300 md:flex md:flex-col xs:flex xs:flex-row md:h-full overflow-y-auto ${
          sidebarOpen ? "lg:w-72 md:w-20" : "md:w-20"
        } relative`}
      >
        <div className="flex grow md:flex-col gap-y-5 overflow-y-auto  bg-white px-6 pb-4 xs:flex xs:flex-row">
          <nav className="flex flex-1 md:flex-col py-4 xs:flex xs:flex-row">
            <ul
              role="list"
              className="flex flex-1 md:flex-col xs:flex xs:flex-row md:gap-y-7 xs:justify-between"
            >
              <li>
                <ul
                  role="list"
                  className="-mx-2 space-y-1 xs:flex xs:flex-row md:flex-col"
                >
                  {navigation.map((item) => (
                    <LoggedInContent
                      key={item.name}
                      user={user}
                      content={item}
                      {...drawerProps}
                    />
                  ))}
                </ul>
              </li>
              <li className="mt-auto xs:flex xs:flex-row md:flex-col xs:gap-x-3">
                {user && (
                  <>
                    <form className="text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-indigo-600 rounded-md">
                      <button
                        className="group -mx-2 flex gap-x-3 p-2 text-nowrap"
                        formAction={signOut}
                      >
                        <ArrowLeftStartOnRectangleIcon className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-indigo-600" />
                        <p
                          className={`hidden text-nowrap ${
                            sidebarOpen && " lg:block "
                          }`}
                        >
                          Log Out
                        </p>
                      </button>
                    </form>
                    <a
                      href="user/settings"
                      className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
                    >
                      <Cog6ToothIcon
                        className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-indigo-600"
                        aria-hidden="true"
                      />
                      <p
                        className={`hidden text-nowrap ${
                          sidebarOpen && " lg:block "
                        }`}
                      >
                        Settings
                      </p>
                    </a>
                  </>
                )}
                {!user && (
                  <Link
                    className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
                    key={"login"}
                    href="/login"
                  >
                    <ArrowLeftEndOnRectangleIcon className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-indigo-600" />
                    <p
                      className={`hidden text-nowrap ${
                        sidebarOpen && " lg:block "
                      }`}
                    >
                      Log In
                    </p>
                  </Link>
                )}
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {children.map((child) => (
        <div
          key={child.props.name}
          className={`duration-300 bg-white hidden md:fixed  md:inset-y-0 md:flex md:flex-col xs:bottom-0 xs:flex xs:flex-col xs:fixed xs:w-full z-[-100] ${
            !sidebarOpen && child.props.name === currentTab
              ? "md:w-96 md:ml-20 z-[40]  xs:h-1/2 xs:mb-20"
              : "md:w-20 xs:h-20"
          } md:h-full overflow-y-auto`}
        >
          {child.props.name === currentTab && child}
        </div>
      ))}
    </>
  );
}
