import { useEffect } from "react";
import ReactDOM from "react-dom";

interface Props {
  isOpen: boolean;
  title?: string;
  confirmText?: string;
  cancelText?: string;
  children: React.ReactNode;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function ConfirmModal({
  isOpen,
  title = "Confirm",
  confirmText = "Confirm",
  cancelText = "Cancel",
  onCancel,
  onConfirm,
  children,
}: Props) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onCancel]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black opacity-75" />
      <div
        className="bg-white dark:bg-slate-700 dark:text-white text-gray-700 w-full max-w-md rounded-lg p-6 shadow-lg relative"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold mb-4 ">{title}</h2>
        <p className="mb-6">{children}</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-800"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
