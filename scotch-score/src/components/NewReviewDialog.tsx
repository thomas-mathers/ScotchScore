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

interface NewReviewDialogProps {
  rating: number;
  open: boolean;
  onClose?: () => void;
}

function NewReviewDialog({ rating, open, onClose }: NewReviewDialogProps) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={fullScreen}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>Write a Review</DialogTitle>
      <DialogContent>
        <Stack spacing={3} justifyContent="flex-start">
          <Typography>Rating</Typography>
          <Box>
            <Rating value={rating} />
          </Box>
          <TextField label="Review" rows={5} multiline fullWidth />
          <TextField label="Review Title" fullWidth />
          <TextField label="Name" fullWidth />
          <TextField label="Email" fullWidth />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default NewReviewDialog;
