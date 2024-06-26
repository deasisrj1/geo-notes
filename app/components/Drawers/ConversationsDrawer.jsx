import {
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";

export default function ConversationDrawer({ children }) {
  return (
    <>
      {/* Static sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-96 lg:flex-col">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-3 pb-4">
          <div className="flex h-16 shrink-0 items-center">
            <img
              className="h-8 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
          </div>
          <div className="text-xs font-semibold leading-6 text-gray-400">
            Notes
          </div>
          {children}
        </div>

        <footer className="border-solid border-2 border-grey-500 fixed w-96 bottom-0 bg-white">
          <div className="mx-auto px-6 py-10 md:flex md:items-center md:justify-around ">
            <div className="flex justify-center space-x-6 md:order-2">
              <Cog6ToothIcon
                className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-indigo-600"
                aria-hidden="true"
              />
              Add notes
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
