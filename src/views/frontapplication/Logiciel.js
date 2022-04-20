import React from 'react'
import InfoLogicielCard from './InfoLogicielCard';
import AvantageCard from './AvantageCard';
import capture from '../Assets/capture.png';
import Navbar from './Navbar';
import { makeStyles } from '@material-ui/core/styles';
import softwareImage from "../Assets/logiciel4.png";
import Zoom from 'react-reveal/Zoom';
import Fade from 'react-reveal/Fade';
import { Button } from '@material-ui/core';
import Footer from './Footer';

//je ne l'ai pas utilisé finalement
const useStyles = makeStyles({
    topContainer: {
        height: "70vh",
        width: "100%",
        backgroundColor: "#020611"
    },
    imageContainer: {
        backgroundImage: `url(${softwareImage})`,
        backgroundSize: "cover",
        width: "48vw",
        height: "80vh",
        position: "absolute",
        top: "12vh",
        right: "0vw"
    },
    title: {
        color: "white",
        marginTop: "16vh",
        fontFamily: "Playfair Display",
        fontSize: "60px",
        marginLeft: "14vw"
    },
    button: {
        color: 'white',
        backgroundColor: '#0451e1',
        marginLeft: "14vw",
        marginTop: "-32vh",
        fontFamily: "Playfair Display",
        fontSize: "20px",
        // position:"absolute"
    },
    secondContainer: {
        backgroundColor: "#F2F5F6",
        width: "100%",
        height: "80vh",
        display: "flex",
        '@media(max-width: 1313px)': {
            height: "145vh",
        },
        '@media(max-width: 774px)': {
            height: "225vh",
        }
    },
    avantageContainer: {
        display: "flex",
        height: "50vh",
        marginTop: "12vh",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        flexWrap: "wrap",
        '@media(max-width: 1313px)': {
            height: "120vh",
        },
        '@media(max-width: 774px)': {
            height: "200vh",
        }
    }
})
export default function Logiciel() {
    const classes = useStyles();

    return (
        <div>
            <Navbar />
            <div className={classes.topContainer}>
                <div style={{ paddingTop: "10vh" }}>
                    <Zoom right cascade collapse className={{ marginTop: "16vh", }}>
                        <h1 className={classes.title}>Logiciel Comptabilité</h1>
                        <Button className={classes.button} variant="contained" color="primary">Réservez votre logiciel Dès maintenant!</Button>
                    </Zoom> 
                </div>
                <div className={classes.imageContainer} />
            </div>
            <Fade>
                <InfoLogicielCard
                    flexDirection="row"
                    marginLeft="10vw"
                    marginRight="0"
                    image={capture}
                    title="Une gestion des congés adaptée à votre structure"
                    description="Besoin de simplifier, automatiser vos processus RH et dématérialiser les données de vos salariés ? Sage Espace Employés vous permet rapidement le suivi et la gestion des congés et absences de vos salariés, de la demande de congés, jusqu’à l’envoi des données en paye pour la préparation des bulletins de salaire."
                />
            </Fade>
            <Fade>
                <InfoLogicielCard
                    flexDirection="row-reverse"
                    marginLeft="0"
                    marginRight="10vw"
                    image={capture}
                    title="Une vraie souplesse d’utilisation"
                    description="Grâce à son circuit de validation largement paramétrable, vos responsables d’équipes valident les demandes d’absences en étant au bureau ou depuis leur mobile. Sage Espace Employés s’adapte à votre organisation de la plus simple à la plus complexe, en France ou à l’international.
                    Vos compteurs et soldes de congés payés, RTT, heures de récupération, absence maladie sont à jour en temps réel. Les contrôles sont automatiquement faits lors de la prise de congés par vos salariés."
                />
            </Fade>
            <Fade>
                <InfoLogicielCard
                    flexDirection="row"
                    marginLeft="10vw"
                    marginRight="0"
                    image={capture}
                    title="Le planning des congés en temps réel et partagé"
                    description="Oubliez les files d’attentes dans le bureau pour demander l’état de ses congés, les délais trop longs de préparation des données pour la paie, le planning Excel, difficile à maintenir et non partagé.
                    Vous gérez désormais le planning de présence de vos salariés et automatisez tout le processus de gestion des congés et des absences , du plus simple au plus complexe."
                />
            </Fade>
            <Fade>
                <InfoLogicielCard
                    flexDirection="row-reverse"
                    marginLeft="0"
                    marginRight="10vw"
                    image={capture}
                    title="Une paie prête dans les délais"
                    description="En fin de mois, vous allez gagner un temps précieux et vous éviter le stress de la paie en retard.
                    Il vous suffit d’exporter en un clic les données de congés et d’absences de Sage Espace Employés vers votre service de paie, interne ou externalisée, vers Sage 100cloud Paie & RH !"
                />
            </Fade>
            <div className={classes.secondContainer}>
                <div className={classes.avantageContainer}>
                    <AvantageCard
                        title="Rapidité"
                        description="Ripidité unique!Ripidité unique!Ripidité unique!"
                        image="https://www.broadbandgenie.co.uk/images/fckImages/stock/connectionspeed_450x300.jpg" />
                    <AvantageCard
                        title="Simplicité"
                        description="Simplicité unique!Simplicité unique!Simplicité unique!Simplicité unique!Simplicité unique!"
                        image="http://happycoaching.fr/wp-content/uploads/2018/01/simplicit%C3%A9-2-1.jpg"
                    />
                    <AvantageCard
                        title="Puissance"
                        description="Puissance unique!Puissance unique!Puissance unique!Puissance unique!Puissance unique!Puissance unique!Puissance unique!"
                        image="https://yt3.ggpht.com/ytc/AAUvwnhDDj07HGlPDUlQPdgjeobT37h8kfZ3gAyn3b0c=s900-c-k-c0x00ffffff-no-rj"
                    />
                </div>
            </div>
            <Footer />
        </div>
    )
}
