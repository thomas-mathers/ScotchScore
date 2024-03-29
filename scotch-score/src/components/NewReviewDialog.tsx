import { useAuth0 } from '@auth0/auth0-react';
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
} from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

import useAccessToken from '../hooks/useAccessToken';
import { postReview } from '../services/reviewService';
import CreateReviewRequest from '../types/createReviewRequest';
import Review from '../types/review';

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
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const { user } = useAuth0();
  const { accessToken } = useAccessToken();

  const { control, register, handleSubmit, formState, setValue } =
    useForm<CreateReviewRequest>();

  const { errors } = formState;

  const queryClient = useQueryClient();

  const postReviewMutation = useMutation<Review, unknown, CreateReviewRequest>({
    mutationFn: postReview,
    mutationKey: ['postReview', scotchId, accessToken],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['scotches', scotchId] });
      queryClient.invalidateQueries({ queryKey: ['reviews', scotchId] });
      onClose?.();
    },
  });

  const handleValidSubmit = (request: CreateReviewRequest) =>
    postReviewMutation.mutate(request);

  useEffect(() => {
    setValue('rating', rating);
  }, [rating, setValue]);

  useEffect(() => {
    setValue('userEmail', user?.email ?? '');
    setValue('userName', user?.name ?? '');
    setValue('userProfilePictureUrl', user?.picture ?? '');
  }, [user, setValue]);

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
                name={'rating'}
                defaultValue={rating}
                render={({ field: { onChange, value } }) => (
                  <Rating
                    name={'rating'}
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
              {...register('description', { required: 'Review is required' })}
              error={Boolean(errors.description)}
              helperText={errors.description?.message}
            />
            <TextField
              label="Review Title"
              fullWidth
              {...register('title', { required: 'Review Title is required' })}
              error={Boolean(errors.title)}
              helperText={errors.title?.message}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} name="close">
            Cancel
          </Button>
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default NewReviewDialog;
export type { NewReviewDialogProps };
