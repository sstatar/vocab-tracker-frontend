import { useRouter } from "next/navigation";
import { mutate } from "swr";

export function useLogout() {
    const router = useRouter();

    const handleLogout = () => {
        const isConfirmed = window.confirm("Are you sure you want to log out?");
        if (!isConfirmed) return;

        localStorage.removeItem("token");

        mutate(() => true, undefined, { revalidate: false });

        router.push("/login");
    };

    return { handleLogout };
}