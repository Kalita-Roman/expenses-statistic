"use client";
import React from "react";

import {
  Button,
  Dialog as HeadlessDialog,
  DialogPanel,
  DialogTitle,
  DialogBackdrop,
} from "@headlessui/react";

type DialogProps = React.PropsWithChildren<{
  onClose?: () => void;
  title?: string;
}>;

export const Dialog = ({
  title,
  onClose = () => {},
  children,
}: DialogProps) => {
  return (
    <HeadlessDialog
      open
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={onClose}
    >
      <DialogBackdrop className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
          >
            <Button
              onClick={onClose}
              className="absolute top-4 right-4 text-white hover:text-gray-300"
              aria-label="Close"
            >
              ✕
            </Button>
            {title && (
              <DialogTitle
                as="h1"
                className="text-base/7 font-medium text-white"
              >
                {title}
              </DialogTitle>
            )}
            <div className="mt-4">{children}</div>
          </DialogPanel>
        </div>
      </div>
    </HeadlessDialog>
  );
};
