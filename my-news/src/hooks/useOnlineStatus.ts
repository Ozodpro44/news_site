import { useEffect } from "react";
import { toast } from "sonner";

let offlineToastId: string | number | undefined;

export const useOnlineStatus = () => {
  useEffect(() => {
    const handleOnline = () => {
      if (offlineToastId) {
        toast.dismiss(offlineToastId);
        offlineToastId = undefined;
      }
      toast.success("Internet aloqasi qayta tiklandi", {
        description: "Endi barcha xizmatlardan foydalanishingiz mumkin",
      });
    };
    const handleOffline = () => {
      offlineToastId = toast.error("Internet aloqasi yo'q", {
        description: "Iltimos, internet aloqangizni tekshiring",
        duration: Infinity, // Keep showing until back online
      });
    };

    // Check initial status
    if (!navigator.onLine) {
      handleOffline();
    }

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      if (offlineToastId) {
        toast.dismiss(offlineToastId);
      }
    };
  }, []);
};
