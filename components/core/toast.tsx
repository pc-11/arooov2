import React, { createContext, useEffect, useState, useContext } from "react";

interface ToastContextType {
  toasts: ToastLike[];
  showToast: (
    message: string,
    type?: ToastLike["type"],
    onsetDelay?: number
  ) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType>({
  toasts: [],
  showToast: (message: string, type?: string, onsetDelay?: number) => {},
  removeToast: (id: string) => {},
});

interface ToastLike {
  id: string;
  message: string;
  type?: string;
  duration?: number;
}

export const Toast = ({ toast }: { toast: ToastLike }) => {
  const { removeToast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(toast.id);
    }, toast.duration ?? 2400); // Toasts disappear after 3 seconds
    return () => clearTimeout(timer);
  }, [toast.id]);

  return (
    <div
      className={`
        bg-opacity-90 rounded-xl shadow-lg m-2 px-4 py-3 text-white
        transform transition-all duration-500 ease-in-out
        bg-slate-400
      `}
    >
      <b>{toast.message}</b>
    </div>
  );
};

export const ToastProvider = ({ children }: { children: any }) => {
  const [toasts, setToasts] = useState<ToastLike[]>([]);
  // const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

  const showToast = (message: string, type = "info", onsetDelay = 0) => {
    const _showToast = () => {
      const newToast = { id: String(Date.now()), message, type };
      setToasts((toasts) => [...toasts, newToast]);
    };
    setTimeout(_showToast, onsetDelay);
  };

  const removeToast = (id: string) => {
    setToasts((currentToasts) =>
      currentToasts.filter((toast) => toast.id !== id)
    );
  };

  return (
    <ToastContext.Provider value={{ toasts, showToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

export const ToastContainer = () => {
  const { toasts } = useToast();
  return (
    <div className="fixed bottom-0 right-10 z-50 flex flex-col items-end pointer-events-none p-4">
      {toasts.map((toast: ToastLike) => (
        <Toast
          key={toast.id}
          toast={{
            id: toast.id,
            message: toast.message,
            type: toast.type,
          }}
        />
      ))}
    </div>
  );
};
