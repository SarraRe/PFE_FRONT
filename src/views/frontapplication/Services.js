import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { makeStyles } from '@material-ui/core/styles';
import softwareImg from '../../Assets/SoftwareHome.jpg'
import softwareImg2 from '../../Assets/SoftwareHome2.jpeg'
import LogicielCard from './LogicielCard';
import Zoom from 'react-reveal/Zoom';
import ScrollButton from './ScrollButton'
import Fade from 'react-reveal/Fade';
import Footer from './Footer';
import { useLocation } from "react-router-dom";
import Alert from './Alert.js'

export default function Services() {
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
            <Navbar />
            <ScrollButton />
            {(location.state && showAlert) &&
                <Alert message={location.state.message} />
            }
            <div className={classes.background}>
                <br />
                <Zoom right cascade collapse when={showTitle}>
                    <h1 className="title">Nos Services</h1>
                </Zoom>
            </div>
            <div id="scrollTo">
                <div className={classes.background2}>
                    <div className={classes.background2After}></div>
                    <Fade right>
                        <LogicielCard description="L'entreprise se spécialise dans la conception, le développement et la mise en place des systèmes d’information en gestion industrielle. L’objectif est de présenter une approche systémique de la gestion des opérations industrielles et d’aborder, également, une stratégie pour leurs organisation." title="Conception et mise en place" />
                    </Fade>
                    <Fade left>
                        <LogicielCard description="L'entreprise met à la disposition de ses partenaires une équipe d’ingénieurs et de consultants pour procurer l’assistance nécessaire dans le domaine de la mise en place des systèmes informatiques de gestion industrielle.

                    Nos consultants assurent l’assistance et l’accompagnement durant toutes les phases de la mission dans le but d’informatiser les différents services de l’entreprise de manière intégrale." title="Assistance" />
                    </Fade>
                    <Fade right>
                        <LogicielCard description="L'entreprise fait améliorer les compétences individuelles et collectives de votre personnel selon vos propres besoins techniques, industriels et organisationnels.

                    Nos prestations seront adaptées aux besoins spécifiques de chaque entreprise et peuvent être réalisés sous forme de séminaires de formation ou de cycles de formation continue en inter ou intra-entreprise.." title="Formation" />
                    </Fade>
                    <Fade left>
                        <LogicielCard description="L'entreprise établie une étude de votre système informatique et vous apporte les solutions adéquates. Ce diagnostic donne lieu à un ensemble de recommandations permettant d’optimiser ou de faire évoluer votre infrastructure." title="Etude et diagnostic" />
                    </Fade>
                </div>
            </div>
            <Footer />
        </div >
    )
}