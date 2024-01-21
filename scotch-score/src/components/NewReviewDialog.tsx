import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Rating,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postReview } from "../services/reviewService";
import CreateReviewRequest from "../types/createReviewRequest";
import Review from "../types/review";

interface NewReviewDialogProps {
  scotchId: string;
  rating: number;
  open: boolean;
  onClose?: () => void;
}

function NewReviewDialog({
  scotchId,
  rating,
  open,
  onClose,
}: NewReviewDialogProps) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { control, register, handleSubmit, formState } =
    useForm<CreateReviewRequest>({
      defaultValues: { rating },
    });
  const { errors } = formState;

  const queryClient = useQueryClient();

  const postReviewMutation = useMutation<Review, unknown, CreateReviewRequest>({
    mutationFn: (request) => postReview(scotchId, request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["scotches", scotchId] });
      queryClient.invalidateQueries({ queryKey: ["reviews", scotchId] });
      onClose?.();
    },
  });

  const handleValidSubmit = (request: CreateReviewRequest) =>
    postReviewMutation.mutate(request);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={fullScreen}
      maxWidth="sm"
      fullWidth
    >
      <form onSubmit={handleSubmit(handleValidSubmit)}>
        <DialogTitle>Write a Review</DialogTitle>
        <DialogContent>
          <Stack spacing={3} justifyContent="flex-start">
            <Typography>Rating</Typography>
            <Box>
              <Controller
                control={control}
                name={"rating"}
                defaultValue={-1}
                render={({ field: { onChange, value } }) => (
                  <Rating
                    name={"rating"}
                    onChange={onChange}
                    value={Number(value)}
                  />
                )}
              />
            </Box>
            <TextField
              label="Review"
              rows={5}
              multiline
              fullWidth
              {...register("description", { required: "Review is required" })}
              error={Boolean(errors.description)}
              helperText={errors.description?.message}
            />
            <TextField
              label="Review Title"
              fullWidth
              {...register("title", { required: "Review Title is required" })}
              error={Boolean(errors.title)}
              helperText={errors.title?.message}
            />
            <TextField
              label="Name"
              fullWidth
              {...register("userName", {
                required: "Name is required",
                minLength: {
                  value: 3,
                  message: "Name must be at least 3 characters long",
                },
                maxLength: {
                  value: 50,
                  message: "Name must be at most 50 characters long",
                },
              })}
              error={Boolean(errors.userName)}
              helperText={errors.userName?.message}
            />
            <TextField
              label="Email"
              fullWidth
              {...register("userEmail", {
                required: "Email is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Email is invalid",
                },
              })}
              error={Boolean(errors.userEmail)}
              helperText={errors.userEmail?.message}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default NewReviewDialog;
