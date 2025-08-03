import { useRouter } from "next/navigation";
import { verifyIp } from "@/services/verifyIp";
import { showAlert } from "@/utils/alert";

export const useHandleRedirect = () => {
  const router = useRouter();

  const handleRedirect = async () => {
    const allowed = await verifyIp();

    // ERROR FIND LOG 💥
    // console.log("IP Allowed? =>", allowed); 

    if (allowed) {
      router.push("/login");
    } else {
      // ERROR FIND LOG 💥
      // console.log("Showing Alert"); 

      // Show alert if IP is not allowed
      showAlert(
        "Access Denied",
        "Your IP is not allowed to access this portal. Please contact your administrator.",
        "error"
      );
    }
  };

  return handleRedirect;
};