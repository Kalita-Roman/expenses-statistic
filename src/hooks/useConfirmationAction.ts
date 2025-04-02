import { useRef, useState } from "react";

type Args = unknown[];
type Fn = (...args: Args) => unknown;

export const useConfirmationAction = () => {
  const [isWaiting, setIsWaiting] = useState(false);
  const actionRef = useRef<Fn>(() => {});
  const argsRef = useRef<Args>([]);
  const handleConfirm = () => {
    actionRef.current(...argsRef.current);
    setIsWaiting(false);
  };
  const handleReject = () => {
    setIsWaiting(false);
  };
  const withConfirmation = (fn: Fn) => {
    actionRef.current = fn;
    return (...args: Args) => {
      argsRef.current = args;
      setIsWaiting(true);
    };
  };
  return { isWaiting, withConfirmation, handleConfirm, handleReject };
};
