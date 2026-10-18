import { useRouter } from "next/navigation";
import { useAuth } from "./useAuth";

export function useLogout() {
    const { endSession } = useAuth();
    const router = useRouter();

    const handleLogout = () => {
        const isConfirmed = window.confirm("Are you sure you want to log out?");
        if (!isConfirmed) return;
        endSession();
        router.push("/login");
    };

    return { handleLogout };
}
