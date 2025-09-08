import { connectSystem } from "../services/guacApi";
import { showError } from "@/utils/alert";

export const useConnectSystemHandler = () => {
    const handleConnectSystem = async (systemid) => {
        try {
            const result = await connectSystem({ systemid });
            return result;
        } catch (error) {
            showError(
                error.message || 'Failed to connect to the system. Please try again. If the problem persists, contact support. Thank you!'
            );
            return null;
        }
    };

    return { handleConnectSystem };
};