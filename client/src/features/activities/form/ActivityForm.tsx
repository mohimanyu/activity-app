import { Box, Paper, Typography, TextField, Button } from "@mui/material";
import type { FormEvent } from "react";

type Props = {
    closeForm: () => void;
    activity?: Activity;
    submitForm: (activity: Activity) => void;
};

export default function ActivityForm({
    closeForm,
    activity,
    submitForm,
}: Props) {
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        const data: { [key: string]: FormDataEntryValue } = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        if (activity) data.id = activity.id;

        submitForm(data as unknown as Activity);
    };

    return (
        <Paper sx={{ borderRadius: 3, p: 3 }}>
            <Typography variant="h5" gutterBottom color="primary">
                Create Activity
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
                    defaultValue={activity?.date}
                />
                <TextField
                    id=""
                    name="city"
                    label="City"
                    defaultValue={activity?.city}
                />
                <TextField id="" name="venue" label="Venue" />
                <Box sx={{ display: "flex", justifyContent: "end", gap: 2 }}>
                    <Button color="inherit" onClick={closeForm}>
                        Cancel
                    </Button>
                    <Button type="submit" color="success" variant="contained">
                        Submit
                    </Button>
                </Box>
            </Box>
        </Paper>
    );
}
