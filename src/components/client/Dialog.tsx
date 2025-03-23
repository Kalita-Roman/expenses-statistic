import { ExpenseForm } from "@/components/client";
import { redirect } from "next/navigation";

import {
  Button,
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogBackdrop,
} from "@headlessui/react";

export const JustDialog = () => {
  const handleClose = async () => {
    "use server";
    redirect("/expenses");
  };

  return (
    <Dialog
      open
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={handleClose}
    >
      <DialogBackdrop className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
          >
            <Button
              onClick={handleClose}
              className="absolute top-4 right-4 text-white hover:text-gray-300"
              aria-label="Close"
            >
              ✕
            </Button>
            <DialogTitle as="h3" className="text-base/7 font-medium text-white">
              Add expense
            </DialogTitle>
            <ExpenseForm onDone={handleClose} />
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};
