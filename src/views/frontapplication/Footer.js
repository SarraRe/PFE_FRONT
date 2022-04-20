import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';
import FacebookIcon from '@material-ui/icons/Facebook';
import CopyrightIcon from '@material-ui/icons/Copyright';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import footerImg from '../../Assets/logiciel0.png';

const useStyles = makeStyles({
    container: {
        width: "100%",
        height: "auto",
        backgroundColor: "#020611",
        display: "flex",
        position: "relative",
        flexDirection: "column"
        // flexWrap:"wrap",
    },
    socialNetworkContainer: {
        width: "300px",
        textAlign: "center",
        flexWrap: "nowrap",
        marginBottom: "2vh"
        // paddingTop:"20px"
    },
    socialText: {
        color: "white",
        marginBottom: "-1px",
        '@media(max-width: 810px)': {
            fontSize: "32px"
        }
    },
    copyrightContainer: {
        display: "flex",
        textAlign: "center",
        position: "absolute",
        bottom: 0
        // backgroundColor: "red"
    },
    copyrightText: {
        color: "white",
        fontSize: "10px"
    },
    copyrightIcon: {
        fill: "white",
        marginTop: "auto",
        marginBottom: "auto",
        marginRight: "2px"
    },
    partOne: {
        paddingTop: "20px",
        // marginLeft: "2vw",
        position: "relative"
    },
    partWithoutCopyright: {
        flexDirection: "row",
        display: "flex",
        '@media(max-width: 810px)': {
            flexDirection: "column",
            // backgroundColor:"red",
            alignItems: "center",
            marginLeft: "auto",
            marginRight: "auto",
            marginBottom: "50px"
        }
    },
    partTwoAndThree: {
        flexDirection: "row",
        display: "flex"
    },
    logiciels: {
        paddingTop: "20px",
        flexDirection: "column",
        display: "flex",
        marginLeft: "4vw",
        marginRight: "4vw",
        marginBottom: "20px",
        '@media(max-width: 810px)': {
            marginLeft: "2vw",
            marginRight: "8vw",
        },
        '@media(max-width: 410px)': {
            marginLeft: "2vw",
            marginRight: "0vw",
        }
    },
    services: {
        paddingTop: "20px",
        flexDirection: "column",
        display: "flex",
        marginLeft: "3vw",
        marginRight: "3vw",
        '@media(max-width: 810px)': {
            marginLeft: "8vw",
            marginRight: "0vw",
        },
        '@media(max-width: 410px)': {
            marginLeft: "1vw",
            marginRight: "0vw",
        },
    },
    partFour: {
        backgroundImage: `url(${footerImg})`,
        backgroundSize: "cover",
        width: "380px",
        height: "300px",
        marginTop: "40px",
        marginLeft: "6vw",
        '@media(max-width: 810px)': {
            display: "none"
        }
    },
    productsText: {
        color: "white",
        '@media(max-width: 810px)': {
            fontSize: "22px"
        }
    },
    servicesText: {
        color: "white",
        '@media(max-width: 810px)': {
            fontSize: "22px"
        }
    },
    productsLinks: {
        marginTop: "4px",
        marginBottom: "8px",
        color: "white",
        fontSize: "14px",
        '@media(min-width: 810px)': {
            whiteSpace: "nowrap"
        }
    },
})
export default function Footer() {
    const classes = useStyles();
    return (
        <div className={classes.container}>
            <div className={classes.partWithoutCopyright}>
                <div className={classes.partOne}>
                    <div className={classes.socialNetworkContainer}>
                        <h3 className={classes.socialText}>Rejoignez nous!</h3>
                        <IconButton href="https://www.facebook.com/TUNIDEV">
                            <FacebookIcon style={{ fill: "#4267B2" }} />
                        </IconButton>
                        <h3 className={classes.socialText}>Contactez nous!</h3>
                        <h4 className={classes.socialText}>71949094</h4>
                        {/*<IconButton href="https://www.facebook.com/TUNIDEV">
                            <InstagramIcon style={{ fill: "#E1306C" }} />
                        </IconButton>
                        <IconButton href="https://www.facebook.com/TUNIDEV">
                            <LinkedInIcon style={{ fill: "#0e76a8" }} />
                        </IconButton>
                        <IconButton href="https://www.facebook.com/TUNIDEV">
                            <YouTubeIcon style={{ fill: "red" }} />
                        </IconButton>*/}
                    </div>
                </div>
                <div className={classes.partTwoAndThree}>
                    <div className={classes.logiciels}>
                        <h3 className={classes.productsText}>Logiciels J-PRO</h3>
                        <Link className={classes.productsLinks} component={RouterLink} to="/">Gestion des ventes</Link>
                        <Link className={classes.productsLinks} component={RouterLink} to="/">Gestion des achats</Link>
                        <Link className={classes.productsLinks} component={RouterLink} to="/">Comptabilité</Link>
                        <Link className={classes.productsLinks} component={RouterLink} to="/">Gestion des stocks</Link>
                        <Link className={classes.productsLinks} component={RouterLink} to="/">Gestion des ressources humaines</Link>
                        <Link className={classes.productsLinks} component={RouterLink} to="/">GPAO</Link>
                        <Link className={classes.productsLinks} component={RouterLink} to="/">Gestion de la paie</Link>
                        <Link className={classes.productsLinks} component={RouterLink} to="/">Gestion financière</Link>
                        <Link className={classes.productsLinks} component={RouterLink} to="/">Gestion des immobilistions</Link>
                    </div>
                    <div className={classes.services}>
                        <h3 className={classes.servicesText}>Services</h3>
                        <Link className={classes.productsLinks} component={RouterLink} to="/">Assistance</Link>
                        <Link className={classes.productsLinks} component={RouterLink} to="/">Formation</Link>
                        <Link className={classes.productsLinks} component={RouterLink} to="/">Conception et mise en place</Link>
                    </div>
                </div>
                <div className={classes.partFour}>
                </div>
            </div>
            <div className={classes.copyrightContainer}>
                <CopyrightIcon className={classes.copyrightIcon} style={{ fontSize: 18 }} />
                <h6 className={classes.copyrightText}>Copyright 2021</h6>
            </div>
        </div>
    )
}
