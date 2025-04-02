import React from "react";
import { Dialog } from "@/components/client";
import { Button, ButtonType } from "@/components/presentation";

interface ConfirmationDialogDialogProps {
  onConfirm?: () => void;
  onReject?: () => void;
}

export const ConfirmationDialog = ({
  onConfirm,
  onReject,
}: ConfirmationDialogDialogProps) => {
  return (
    <>
      <Dialog title="Confirmation" onClose={onReject}>
        <div className="flex flex-col gap-8">
          <div className="flex justify-between">
            Are you sure you want to delete this record?
          </div>
          <div className="grid grid-cols-3 gap-4">
            <Button
              buttonType={ButtonType.Outlined}
              className="col-span-1"
              onClick={onConfirm}
            >
              Yes
            </Button>
            <Button className="col-span-2" onClick={onReject}>
              No
            </Button>
          </div>
        </div>
      </Dialog>
    </>
  );
};
