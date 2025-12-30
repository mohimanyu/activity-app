import { Box, Paper, Typography, Button } from "@mui/material";
import { useActivities } from "../../../lib/hooks/useActivities";
import { useNavigate, useParams } from "react-router";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import {
  activitySchema,
  type ActivitySchema,
} from "../../../lib/schemas/activitySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import TextInput from "../../../app/shared/components/TextInput";
import SelectInput from "../../../app/shared/components/SelectInput";
import { categoryOptions } from "./categoryOptions";
import DateTimeInput from "../../../app/shared/components/DateTimeInput";
import LocationInput from "../../../app/shared/components/LocationInput";
import { z } from "zod";
import type { Resolver } from "react-hook-form";

export default function ActivityForm() {
  const { reset, handleSubmit, control } = useForm<
    z.input<typeof activitySchema>,
    unknown,
    ActivitySchema
  >({
    mode: "onTouched",
    resolver: zodResolver(activitySchema) as unknown as Resolver<
      z.input<typeof activitySchema>,
      unknown,
      ActivitySchema
    >,
  });
  const navigate = useNavigate();
  const { id } = useParams();
  const { updateActivity, createActivity, activity, isLoadingActivity } =
    useActivities(id);

  useEffect(() => {
    if (activity)
      reset({
        ...activity,
        location: {
          city: activity.city,
          venue: activity.venue,
          latitude: activity.latitude,
          longitude: activity.longitude,
        },
      });
  }, [activity, reset]);

  const onSubmit = (data: ActivitySchema) => {
    const { location, ...rest } = data;
    const flattenedData = { ...rest, ...location };
    // Remove undefined values so we don't override required Activity properties
    const definedOnly = Object.fromEntries(
      Object.entries(flattenedData).filter(([, v]) => v !== undefined)
    ) as Partial<NonNullable<typeof activity>>;
    try {
      if (activity) {
        updateActivity.mutate(
          { ...activity, ...definedOnly } as NonNullable<typeof activity>,
          {
            onSuccess: () => navigate(`/activities/${activity.id}`),
          }
        );
      } else {
        const newActivity = {
          ...flattenedData,
          isCancelled: false,
        } as unknown as NonNullable<typeof activity>;
        createActivity.mutate(newActivity, {
          onSuccess: (id) => navigate(`/activities/${id}`),
        });
      }
    } catch (error) {
      console.log(error);
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
        onSubmit={handleSubmit(onSubmit)}
        sx={{ display: "flex", flexDirection: "column", gap: 3 }}
      >
        <TextInput label="Title" control={control} name="title" />
        <TextInput
          label="Description"
          control={control}
          name="description"
          multiline
          rows={3}
        />
        <Box display="flex" gap={3}>
          <SelectInput
            items={categoryOptions}
            label="Category"
            control={control}
            name="category"
          />
          <DateTimeInput label="Date" control={control} name="date" />
        </Box>
        <LocationInput
          control={control}
          label="Enter the location"
          name="location"
        />
        <Box sx={{ display: "flex", justifyContent: "end", gap: 2 }}>
          <Button color="inherit" onClick={handleCancel}>
            Cancel
          </Button>
          <Button
            type="submit"
            color="success"
            variant="contained"
            disabled={updateActivity.isPending || createActivity.isPending}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}
