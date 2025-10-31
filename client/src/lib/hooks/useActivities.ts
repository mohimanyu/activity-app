import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import agent from "../api/agent";
import { useLocation } from "react-router";
import { useAccount } from "./useAccount";
import { toast } from "react-toastify";

export const useActivities = (id?: string) => {
    const queryClient = useQueryClient();
    const location = useLocation();
    const { currentUser } = useAccount();

    const { data: activities, isLoading } = useQuery({
        queryKey: ["activities"],
        queryFn: async () => {
            const response = await agent.get<Activity[]>("/activities");
            return response.data;
        },
        enabled: !id && location.pathname === "/activities" && !!currentUser,
    });

    const { data: activity, isLoading: isLoadingActivity } = useQuery({
        queryKey: ["activities", id],
        queryFn: async () => {
            const response = await agent.get<Activity>(`activities/${id}`);
            return response.data;
        },
        enabled: !!id && !!currentUser,
    });

    const updateActivity = useMutation({
        mutationFn: async (activity: Activity) => {
            await agent.put("/activities", activity);
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["activities"],
            });
        },
        onError: (error) => {
            toast.error(error?.message || "An error occurred");
        },
    });

    const createActivity = useMutation({
        mutationFn: async (activity: Activity) => {
            const response = await agent.post("/activities", activity);
            return response.data;
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["activities"],
            });
        },
        onError: (error) => {
            toast.error(error?.message || "An error occurred");
        },
    });

    const deleteActivity = useMutation({
        mutationFn: async (id: string) => {
            await agent.delete(`/activities/${id}`);
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["activities"],
            });
        },
        onError: (error) => {
            toast.error(error?.message || "An error occurred");
        },
    });

    return {
        activities,
        isLoading,
        activity,
        isLoadingActivity,
        updateActivity,
        createActivity,
        deleteActivity,
    };
};
