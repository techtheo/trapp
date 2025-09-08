import React from 'react';
import { Snackbar, Alert } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { closeSnackbar } from '../redux/slices/app';

const CustomSnackbar = () => {
  const dispatch = useDispatch();
  const { snackbar } = useSelector((state) => state.app);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(closeSnackbar());
  };

  // Don't render if snackbar is not properly configured
  if (!snackbar.open || !snackbar.severity || !snackbar.message) {
    return null;
  }

  return (
    <Snackbar
      open={snackbar.open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert
        onClose={handleClose}
        severity={snackbar.severity}
        variant="filled"
        sx={{ width: '100%' }}
      >
        {snackbar.message}
      </Alert>
    </Snackbar>
  );
};

export default CustomSnackbar;