"use client";

import { Drawer } from "vaul";

import SidebarMobile from "./SidebarMobile";

import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";

import { XMarkIcon } from "@heroicons/react/24/outline";

export default function MobileDrawer({
  sidebarOpen,
  setSidebarOpen,
  children,
}) {
  return (
    <>
      <Drawer.Root
        open={sidebarOpen}
        onOpenChange={setSidebarOpen}
        shouldScaleBackground
      >
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 bg-black/40" />
          <Drawer.Content className="bg-zinc-100 flex flex-col rounded-t-[10px] h-[96%] mt-24 fixed bottom-0 left-0 right-0">
            <div className="p-4 bg-white rounded-t-[10px] flex-1">
              <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300 mb-8" />
              <div className="px-4 mx-auto">
                <Drawer.Title className="font-medium mb-4">
                  Conversations
                </Drawer.Title>
                <>{children}</>
              </div>
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </>
  );
}
