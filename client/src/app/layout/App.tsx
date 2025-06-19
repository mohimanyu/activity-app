import { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "./NavBar";
import { Box, Container, CssBaseline } from "@mui/material";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";

function App() {
    const [activities, setActivities] = useState<Activity[]>([]);
    const [selectedActivity, setSelectedActivity] = useState<
        Activity | undefined
    >(undefined);
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        axios
            .get<Activity[]>("https://localhost:5001/api/activities")
            .then((response) => setActivities(response.data));
    }, []);

    const handleSelectActivity = (id: string) => {
        setSelectedActivity(activities.find((activity) => activity.id === id));
    };

    const handleCancelSelectActivity = () => {
        setSelectedActivity(undefined);
    };

    const handleOpenForm = (id?: string) => {
        if (id) handleSelectActivity(id);
        else handleCancelSelectActivity();
        setEditMode(true);
    };

    const handleFormClose = () => {
        setEditMode(false);
    };

    const handleSubmitForm = (activity: Activity) => {
        if (activity.id) {
            setActivities(
                activities.map((x) => (x.id === activity.id ? activity : x))
            );
        } else {
            const newActivity = {
                ...activity,
                id: activities.length.toString(),
            };
            setSelectedActivity(newActivity);
            setActivities([...activities, newActivity]);
        }
        setEditMode(false);
    };

    const handleDeleteActivity = (id: string) => {
        setActivities(activities.filter((activity) => activity.id !== id));
        setSelectedActivity(undefined);
        setEditMode(false);
    };

    return (
        <Box sx={{ bgcolor: "#eeeeee" }}>
            <CssBaseline />
            <NavBar openForm={handleOpenForm} />
            <Container maxWidth="xl" sx={{ mt: 2 }}>
                <ActivityDashboard
                    activities={activities}
                    selectActivity={handleSelectActivity}
                    cancelSelectActivity={handleCancelSelectActivity}
                    selectedActivity={selectedActivity}
                    editMode={editMode}
                    openForm={handleOpenForm}
                    closeForm={handleFormClose}
                    submitForm={handleSubmitForm}
                    deleteActivity={handleDeleteActivity}
                />
            </Container>
        </Box>
    );
}

export default App;
