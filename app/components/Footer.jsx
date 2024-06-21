
import {
    Dialog,
    DialogPanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    Transition,
    TransitionChild,
  } from "@headlessui/react";
  
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
  } from "@heroicons/react/24/outline";
  import {
    ChevronDownIcon,
    MagnifyingGlassIcon,
  } from "@heroicons/react/20/solid";

  
/* 

    do it this way in the future?
    https://github.com/emilkowalski/vaul?tab=readme-ov-file
    https://codesandbox.io/p/devbox/drawer-non-dismissable-forked-jchtff?file=%2Fapp%2Fmy-drawer.tsx

    This footer should only be seen in mobile???
    it should be resizable like the footer in
    mobile view
    https://developer.mozilla.org/en-US/docs/Web/CSS/resize 
    https://tailwindcss.com/docs/resize#class-reference 
*/

const navigation = [
  { name: "Dashboard", href: "#", icon: HomeIcon, current: true },
  { name: "Team", href: "#", icon: UsersIcon, current: false },
  { name: "Projects", href: "#", icon: FolderIcon, current: false },
  { name: "Calendar", href: "#", icon: CalendarIcon, current: false },
  { name: "Documents", href: "#", icon: DocumentDuplicateIcon, current: false },
  { name: "Reports", href: "#", icon: ChartPieIcon, current: false },
];

export default function Footer({setSidebarOpen}) {
  return (
    <>
      <footer className="border-solid border-2 border-grey-500 fixed w-screen bottom-0 bg-white">
        <div className="mx-auto px-6 py-10 md:flex md:items-center md:justify-around lg:px-8">
          <div className="flex justify-center space-x-6 md:order-2">
            {navigation.map((item) => (
              <div
                key={item.name}
                href={item.href}
                className="text-gray-400 hover:text-gray-500"
                onClick={() => setSidebarOpen(true)}
              >
                <span className="sr-only">{item.name}</span>
                <item.icon className="h-6 w-6" aria-hidden="true" />
              </div>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}
