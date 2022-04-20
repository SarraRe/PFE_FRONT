import React from 'react';
import Image from 'material-ui-image';
import erpImg from '../../Assets/erp.jpg'
import { makeStyles } from '@material-ui/core/styles';
import { useMediaQuery } from 'react-responsive';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


const useStyles = makeStyles((theme) => ({
    imageContainerLaptop: {
        display: "flex",
        width: "40vh",
    },
    imageContainerMobile: {
        display: "flex",
        width: "30vw",
        marginLeft: "auto",
        marginRight: "auto",
        boxShadow: "0 0 10px rgba(33,33,33,1)",
        '@media(max-width: 770px)': {
            width: "40vw"
        },
        '@media(max-width: 510px)': {
            width: "60vw"
        },
    },
    descriptionContainer: {
        marginLeft: '5%',
        height: "40vh",
        width: "55vw"

    },
    description: {
        fontSize: "17px",
        fontFamily: "Playfair Display",
    },
    accordionContainer: {
        marginLeft: "auto",
        marginRight: "auto",
        width: "80vw",
        backgroundColor: "transparent",
        marginTop: "4%"
    },
    accordionTitle: {
        fontSize: "3vw"
    },
    accordionDetails: {
        flex: 1,
        flexDirection: "column"
    },
    buttonAccordion: {
        marginTop: "5vh",
        width: "30vw",
        marginLeft: "auto",
        marginRight: "auto",
        textAlign: "center",
        fontFamily: "Playfair Display",
        '@media(max-width: 770px)': {
            width: "40vw"
        },
        '@media(max-width: 510px)': {
            width: "60vw"
        },
    }
}))

const Desktop = ({ children }) => {
    const isDesktop = useMediaQuery({ minWidth: 1037 })
    return isDesktop ? children : null
}
const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({ maxWidth: 1036 })
    return isMobile ? children : null
}
export default function Logiciel(props) {
    const classes = useStyles();

    return (
        <div>
            <Desktop>
                <div className="box">
                    <div className={classes.imageContainerLaptop}>
                        <Image
                            src={erpImg}
                            style={{ width: "100%" }}
                            color="transparent"
                        // cover
                        />
                    </div>
                    <div className={classes.descriptionContainer}>
                        <h1 style={{ fontSize: "2.5vw", }}>{props.title}</h1>
                        <p className={classes.description}>{props.description}</p>
                    </div>
                </div>
            </Desktop>

            <Mobile>
                <Accordion className={classes.accordionContainer}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography className={classes.accordionTitle}>{props.title}</Typography>
                    </AccordionSummary>
                    <AccordionDetails className={classes.accordionDetails}>

                        <p className={classes.description}>{props.description}</p>
                        <div className={classes.imageContainerMobile}>
                            <Image
                                src={erpImg}
                                style={{ width: "100%" }}
                                color="transparent"
                            />
                        </div>
                        {/*<Button
                            variant="contained"
                            color="primary"
                            href="/test"
                            className={classes.buttonAccordion}
                        >
                            J-PRO {props.title}
                        </Button> */}
                    </AccordionDetails>
                </Accordion>
            </Mobile>
        </div>
    )
}