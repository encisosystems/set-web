import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Toast({ open, message, onClose }) {
    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
            <Alert onClose={onClose} severity="success" sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    );
}

export default Toast;
