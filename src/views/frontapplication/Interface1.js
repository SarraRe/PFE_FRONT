import React, { useState, useEffect } from 'react';
// import Navbar from './Navbar';
import { makeStyles } from '@material-ui/core/styles';
import softwareImg from '../../Assets/SoftwareHome.jpg'
import softwareImg2 from '../../Assets/SoftwareHome2.jpeg'
import Button from '@material-ui/core/Button';
import { Link as RouterLink } from 'react-router-dom';
import Zoom from 'react-reveal/Zoom';
import ScrollButton from './ScrollButton'
import Fade from 'react-reveal/Fade';
import Footer from './Footer';
import { useLocation } from "react-router-dom";
import Alert from './Alert.js'

export default function Interface1() {
    const [showTitle, setShowTitle] = useState(false)
    const [height, setHeight] = useState(window.innerHeight);
    const updateDimensions = () => {
        setHeight(window.innerHeight);
    }

    useEffect(() => {
        window.addEventListener("resize", updateDimensions);
        return () => window.removeEventListener("resize", updateDimensions);
    });

    const updateShowTxt = () => {
        setShowTitle(true)
    }
    let stateCheck = setInterval(() => {
        if (document.readyState !== 'loading') {
            setShowTitle(true);
            clearInterval(stateCheck);
        }
    }, 100);

    useEffect(() => {
        window.addEventListener("load", updateShowTxt)
        return () => window.removeEventListener("load", updateShowTxt)
    })

    const showTextOnScrollTop = () => {
        if (window.pageYOffset === 0) {
            setShowTitle(false);
            setShowTitle(true);
        }
    }
    useEffect(() => {
        window.addEventListener("scroll", showTextOnScrollTop)
        return () => window.removeEventListener("scroll", showTextOnScrollTop)
    })
    const [showAlert, setShowAlert] = useState(false)
    const location = useLocation();
    useEffect(() => {
        if (location.state !== undefined)
            setShowAlert(true);
    }, [location]);


    const useStyles = makeStyles({
        background2: {
            position: "relative",
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            paddingBottom: "10%",
            paddingTop: "5%"
        },

        background2After: {
            content: "",
            backgroundImage: `url("${softwareImg2}")`,
            backgroundSize: "cover",
            backgroundAttachment: "fixed",
            position: "absolute",
            top: 0,
            right: "0px",
            bottom: "0px",
            left: "0px",
            opacity: 0.1,
        },
        background: {
            backgroundImage: `url("${softwareImg}")`,
            backgroundRepeat: 'no-repeat',
            width: '100%',
            height: `${height}px`,
            color: 'white',
            backgroundAttachment: "fixed",
            // '@media(max-width: 1313px)': {
            //     height: '100px',
            // },
        },
    })
    const classes = useStyles();

    return (
        <div>
            {/* <Navbar /> */}
            <ScrollButton />
            {(location.state && showAlert) &&
                <Alert message={location.state.message} />
            }
            <div className={classes.background}>
                <br />
                <Zoom right cascade collapse when={showTitle}>
                    <h1 className="title">Espace client</h1>
                </Zoom>
            </div>
            <div id="scrollTo">
                <div className={classes.background2}>
                    <div className={classes.background2After}></div>
                    <Fade right>
                        <Button style={{ color: "black", fontSize: 30,  background: '#ffcdd2',  border: 20 }} component={RouterLink} to="/reclamation">  Déposer réclamations  </Button>
                    </Fade>
                    <Fade left>
                        <Button style={{ color: "black", fontSize: 30, }} component={RouterLink} to="/VoirRecClient">  Voir mes réclamations  </Button>
                    </Fade>
                    <Fade right>
                        <Button style={{ color: "black", fontSize: 30,  background: '#ffcdd2' }} component={RouterLink} to="/MdpClient">  Changer mon mot de passe  </Button>
                    </Fade>
                    <Fade left>
                        <Button style={{ color: "black", fontSize: 30, }} component={RouterLink} to="/MJP1">  Mettre à jour mon profil  </Button>
                    </Fade>
                    <Fade right>
                        <Button style={{ color: "black", fontSize: 30,  background: '#ffcdd2' }} component={RouterLink} to="/">  Page d'acceuil  </Button>
                    </Fade>
                </div>
            </div>
            <Footer />
        </div >
    )
}