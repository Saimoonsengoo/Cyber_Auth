import { Navigate } from "react-router-dom";
import { useAuthStore } from "../contexts/AuthStore";

export const requireAuth = (element, requireVerified = true) => {
    const { user, isVerified } = useAuthStore.getState();
    if (!user) {
        return <Navigate to="/sign-in" />;
    }
    if (requireVerified && !isVerified) {
        return <Navigate to="/email-verify" />;
    }
    return element;
};
