import { useRouter } from "next/navigation";
import { verifyIp } from "@/services/verifyIp";
import { showAlert } from "@/utils/alert";

export const useHandleRedirect = () => {
  const router = useRouter();

  const handleRedirect = async () => {
    const allowed = await verifyIp();
    console.log("IP Allowed? =>", allowed); // ✅ Confirm result

    if (allowed) {
      router.push("/login");
    } else {
      console.log("Showing Alert"); // ✅ Debug log
      showAlert(
        "Access Denied",
        "Your IP is not allowed to access this portal. Please contact your administrator.",
        "error"
      );
    }
  };

  return handleRedirect;
};