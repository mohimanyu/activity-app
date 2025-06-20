import { Box, Paper, Typography, TextField, Button } from "@mui/material";
import type { FormEvent } from "react";
import { useActivities } from "../../../lib/hooks/useActivities";
import { useNavigate, useParams } from "react-router";

export default function ActivityForm() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { updateActivity, createActivity, activity, isLoadingActivity } =
        useActivities(id);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        const data: { [key: string]: FormDataEntryValue } = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        if (activity) {
            data.id = activity.id;
            await updateActivity.mutateAsync(data as unknown as Activity);
            navigate(`/activities/${id}`);
        } else {
            createActivity.mutate(data as unknown as Activity, {
                onSuccess: (id) => {
                    navigate(`/activities/${id}`);
                },
            });
        }
    };

    const handleCancel = () => {
        if (activity) navigate(`/activities/${id}`);
        else navigate("/activities");
    };

    if (isLoadingActivity) return <Typography>Loading...</Typography>;

    return (
        <Paper sx={{ borderRadius: 3, p: 3 }}>
            <Typography variant="h5" gutterBottom color="primary">
                {activity ? "Edit" : "Create"} Activity
            </Typography>
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ display: "flex", flexDirection: "column", gap: 3 }}
            >
                <TextField
                    id=""
                    name="title"
                    label="Title"
                    defaultValue={activity?.title}
                />
                <TextField
                    id=""
                    name="description"
                    label="Description"
                    defaultValue={activity?.description}
                    multiline
                    rows={3}
                />
                <TextField
                    id=""
                    name="category"
                    label="Category"
                    defaultValue={activity?.category}
                />
                <TextField
                    id=""
                    name="date"
                    label="Date"
                    type="date"
                    defaultValue={
                        activity?.date
                            ? new Date(activity.date)
                                  .toISOString()
                                  .split("T")[0]
                            : new Date().toISOString().split("T")[0]
                    }
                />
                <TextField
                    id=""
                    name="city"
                    label="City"
                    defaultValue={activity?.city}
                />
                <TextField
                    id=""
                    name="venue"
                    label="Venue"
                    defaultValue={activity?.venue}
                />
                <Box sx={{ display: "flex", justifyContent: "end", gap: 2 }}>
                    <Button color="inherit" onClick={handleCancel}>
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        color="success"
                        variant="contained"
                        disabled={
                            updateActivity.isPending || createActivity.isPending
                        }
                    >
                        Submit
                    </Button>
                </Box>
            </Box>
        </Paper>
    );
}
