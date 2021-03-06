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

export default function Main() {
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
            {(location.state  && showAlert) &&
                <Alert message={location.state.message} />
            }
            <div className={classes.background}>
                <br />
                <Zoom right cascade collapse when={showTitle}>
                    <h1 className="title">J-PRO: Meilleur ERP Tunisie</h1>
                </Zoom>
            </div>
            <div id="scrollTo">
                <div className={classes.background2}>
                    <div className={classes.background2After}></div>
                    <Fade right>
                        <LogicielCard description="La comptabilit?? g??r??e ?? l???aide du module J-PRO Comptabilit?? permet de disposer de toutes les informations concernant les transactions de l???entreprise et la situation de ses comptes. Ce qui lui permet d???avoir une meilleure visibilit?? sur son activit?? et l???aide ?? bien planifier sa strat??gie de d??veloppement." title="Comptabilit??" />
                    </Fade>
                    <Fade left>
                        <LogicielCard description="L???entreprise doit s???adapter en permanence ?? la concurrence, ce qui l???emp??che d???augmenter librement les prix de ventes afin de garantir ses marges. Pour Cela, la performance du processus d???achat est g??n??ralement l???une des priorit??s strat??giques de la direction." title="Gestion des achats" />
                    </Fade>
                    <Fade right>
                        <LogicielCard description="Le module J-PRO Gestion des stocks est con??u afin d???offrir une utilisation simple et intuitive tout en assurant une ma??trise et une organisation rigoureuse et efficace de la gestion des stocks." title="Gestion des stocks" />
                    </Fade>
                    <Fade left>
                        <LogicielCard description="Le Module J-PRO Gestion des ventes est con??u pour automatiser, d???une fa??on organis??e et intuitive, les diff??rentes fonctions li??es ?? la gestion des ventes, de l?????tablissement du devis jusqu????? la g??n??ration de la facture et r??glement du client.
                    Ce module, dot?? de fonctionnalit??s tr??s riches, est destin?? ?? renforcer l???efficacit?? des commerciaux dans leurs fonctions op??rationnelles et d??cisionnelles." title="Gestion des ventes" />
                    </Fade>
                    <Fade right>
                        <LogicielCard description="Le module J-PRO GPAO, avec sa performance et sa couverture fonctionnelle, est un outil bien plac?? pour garantir la rigueur et l???efficacit?? de l???ensemble des activit??s li??es ?? la gestion du processus de production. Offrant des conditions favorables ?? l???entreprise pour optimiser l???utilisation de ses ressources, respecter ses d??lais, minimiser ses co??ts de production et ma??triser la tra??abilit?? des mati??res premi??res utilis??es et des produits finis et semi-finis fabriqu??s." title="GPAO" />
                    </Fade>
                    <Fade left>
                        <LogicielCard description="Avec le d??veloppement de l???entreprise et l???augmentation de son effectif, un logiciel de paie devient incontournable et obligatoire pour g??rer la paie des salari??s. Un logiciel de paie professionnel doit traiter les donn??es relatives aux salaires, automatiser les calculs, g??n??rer les bulletins de paie et ??tablir des d??clarations sociales et fiscales." title="Gestion de la paie" />
                    </Fade>
                    <Fade right>
                        <LogicielCard description="la gestion de la paie prend en charge l???aspect co??t (salaires et aux charges sociales et fiscales li??es), alors que le module de gestion du personnel prend en charge l???aspect capital humain qui doit ??tre valoris?? et g??r?? de mani??re optimale. Avec ces deux modules, la gestion du personnel s???inscrit dans un contexte global de strat??gie de d??veloppement de l???entreprise." title="Gestion des Ressources Humaines" />
                    </Fade>
                    <Fade left>
                        <LogicielCard description="La gestion des immobilisations traite les informations li??es aux actifs immobilis??s de l???entreprise : immobilisations incorporelles, corporelles et financi??res.
                    Le module J-PRO Gestion des immobilisations est destin?? ?? assurer une gestion efficace de l???int??gralit?? de ces actifs durant leur cycle de vie." title="Gestion des immobilistations" />
                    </Fade>
                    <Fade right>
                        <LogicielCard description="Une bonne gestion des ressources financi??res est indispensable pour assurer la p??rennit?? de l???entreprise. Pour cela, l???entreprise doit mettre en place des outils coh??rents de traitement, de contr??le et de pr??vision.
                    Le module J-PRO Gestion financi??re est con??ue pour offrir, d???une fa??on instantan??e, une vision d??taill??e et globale de l???activit?? de l???entreprise, lui permettant une prise de d??cision rapide et ??clair??e." title="Gestion Financi??re" />
                    </Fade>
                </div>
            </div>
            <Footer />
        </div >
    )
}

