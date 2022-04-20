import React, { useState } from 'react';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';


export default function Alert(props) {
    const [countRefreshForAlert, setCountRefreshForAlert] = React.useState(0)

    React.useEffect(() => {
        const parsedCount = Number(localStorage.getItem("countRefreshForAlert") || 0)
        setCountRefreshForAlert(parsedCount)
    }, [])
    
    React.useEffect(() => {
        localStorage.setItem("countRefreshForAlert", countRefreshForAlert + 1)
    }, [countRefreshForAlert])

    
    const [open, setOpen] = useState(true);
    // eslint-disable-next-line no-unused-vars
    const [state, setState] = useState({
        vertical: 'bottom',
        horizontal: 'right',
    });
    const { vertical, horizontal } = state;
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            setOpen(false);
            return;
        }
        setOpen(false);
    };
    if (localStorage.getItem("countRefreshForAlert") < 2){
        return (
            <Snackbar open={open} onClose={handleClose} autoHideDuration={3000} key={vertical + horizontal} anchorOrigin={{ vertical, horizontal }}>
                <MuiAlert elevation={6} variant="filled" onClose={handleClose} severity="success">
                    {props.message}
                </MuiAlert>
            </Snackbar>);
        }
    else {
        return <></>;
    }
}