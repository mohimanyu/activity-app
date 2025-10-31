import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { LoginSchema } from "../schemas/loginSchema";
import agent from "../api/agent";
import { useLocation, useNavigate } from "react-router";
import type { RegisterSchema } from "../schemas/registerSchema";
import { toast } from "react-toastify";

export const useAccount = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const location = useLocation();

    const loginUser = useMutation({
        mutationFn: async (credentials: LoginSchema) => {
            await agent.post("/login?useCookies=true", credentials);
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["user"],
            });
        },
        onError: (error) => {
            toast.error(error?.message || "An error occurred");
        },
    });

    const registerUser = useMutation({
        mutationFn: async (credentials: RegisterSchema) => {
            await agent.post("/account/register", credentials);
        },
        onSuccess: () => {
            toast.success("Register successful - you can now login");
            navigate("/login");
        },
        onError: (error) => {
            toast.error(error?.message || "An error occurred");
        },
    });

    const logoutUser = useMutation({
        mutationFn: async () => {
            await agent.post("/account/logout");
        },
        onSuccess: () => {
            queryClient.removeQueries({ queryKey: ["user"] });
            queryClient.removeQueries({ queryKey: ["activities"] });
            navigate("/");
        },
        onError: (error) => {
            toast.error(error?.message || "An error occurred");
        },
    });

    const { data: currentUser, isLoading: loadingUserInfo } = useQuery({
        queryKey: ["user"],
        queryFn: async () => {
            const response = await agent.get<User>("/account/user-info");
            return response.data;
        },
        enabled:
            !queryClient.getQueryData(["user"]) &&
            location.pathname !== "/login" &&
            location.pathname !== "/register",
    });

    return {
        loginUser,
        registerUser,
        logoutUser,
        currentUser,
        loadingUserInfo,
    };
};
