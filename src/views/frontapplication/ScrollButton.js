import React, { useState, useEffect } from 'react';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import IconButton from '@material-ui/core/IconButton'
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    container: {
        position: "fixed",
        bottom: "4%",
        right: "2%",
        zIndex:2
    },
}))


export default function ScrollButton(props) {
    const classes = useStyles();
    const [show, setShow] = useState(false);
    const [height, setHeight] = useState(window.innerHeight);
    const updateDimensions = () => {
        setHeight(window.innerHeight);
    }
    useEffect(() => {
        window.addEventListener("resize", updateDimensions);
        return () => window.removeEventListener("resize", updateDimensions);
    });
    const showTime = () => {
        if (window.scrollY > height) setShow(true);
        else setShow(false);
    }
    useEffect(() => {
        window.addEventListener("scroll", showTime)
        return () => {
            window.removeEventListener("scroll", showTime)
        }
    })
    const handleClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    return (
        <div>
            {show &&
                <IconButton onClick={handleClick} handler={props.isClicked} className={classes.container}>
                    <ExpandLessIcon />
                </IconButton>}
        </div>
    )
}