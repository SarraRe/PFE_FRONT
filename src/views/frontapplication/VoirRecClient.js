import React, {useEffect , useState} from 'react';
// import Navbar from './Navbar';
import BusinessMeeting from '../../Assets/BusinessMeeting.jpeg'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {url ,decodetoken} from 'src/utils/baseurl';
import {TableBody,Table,TableCell,TableContainer,TableHead
,TableRow} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    container: {
        backgroundImage: `url("${BusinessMeeting}")`,
        backgroundRepeat: 'repeat',
        width: '100%',
        height: "180vh",
        color: 'white',
        backgroundAttachment: "fixed",
        position: 'absolute',
        zIndex: -1,
    },
    col : {

    } ,
    table : {
        borderCollapse:'collapse',
            width: '100%',
            marginBottom: '1rem',
            backgroundColor: 'transparent',
        
    },
    formContainer: {
        width: "45vw",
        marginLeft: "auto",
        marginRight: "auto",
        backgroundColor: "rgba(250,250,250,0.95)",
        boxShadow: "0 0 10px rgba(33,33,33,1)",
        marginTop: "10vh",
        borderRadius: "1vh",
        zIndex: 2,
        '@media(max-width: 900px)': {
            width: "70vw"
        },
    },
    formTextField: {
        marginLeft: "10%",
        marginTop: "2%",
        width: "32vw",
        '@media(max-width: 900px)': {
            width: "54vw"
        },
    },
    formControl: {
        marginLeft: "10%",
        marginTop: '6%',
        marginBottom: '-1%',
        width: "32vw",
        '@media(max-width: 900px)': {
            width: "54vw"
        },
    },
    title: {
        color: "black",
        marginLeft: "10%",
        fontFamily: "Playfair Display",
        paddingTop: "1vh",
        paddingBottom: "1vh",
        fontSize: "3.5vw",
        '@media(max-width: 770px)': {
            fontSize: "5vw"
        },
    },
    besoinTxt: {
        marginLeft: "10%",
        fontSize: "2vw",
        fontFamily: "Playfair Display",
        marginTop: "7vh",
        marginBottom: "-1vh"
    },
    button: {
        margin: theme.spacing(1),
        marginLeft: "10%",
        marginTop: "10%",
        marginBottom: "4vh",
        width: "20vw",
        '@media(max-width: 900px)': {
            width: "22vw"
        },
    },
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
        backgroundImage: `url("${BusinessMeeting}")`,
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        position: "absolute",
        top: "0px",
        right: "0px",
        bottom: "0px",
        left: "0px",
    }
}))

export default function VoirRecClient() {
    const classes = useStyles();
    const [statecode, setstatecode] = useState('')
    const [statereclamation, setstatereclamation] = useState([])
    const initialValues = {
        code: statecode,
    }
useEffect(() => {
    const  data = decodetoken()
  if (data) {
    axios.get(url+ '/reclamations/client/'+ data.Code)
    .then((response) => {
        console.log(response.data);
        setstatereclamation(response.data)
    })
    .catch((error) => {
        console.log(error)
    })
    initialValues.code = data.Code;
    setstatecode(data.Code)
  }
    return () => {
        
    }
}, [localStorage.getItem("user_connected")])
    function onSubmit(values) {
        axios.get(url+ '/reclamations/client/'+ values.code)
            .then((response) => {
                console.log(response.data);
                setstatereclamation(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    };

    // /client/aff/code'

    return (
        <div>
            {/* <Navbar /> */}
            <div className={classes.background2}>
                <div className={classes.background2After}></div>
                <div className={classes.formContainer}>
                    <h1 className={classes.title}>Voici vos réclamations</h1>
 
                    {statereclamation.length >0 ? <>
                    <Table className={classes.table}>
                        <TableHead >
                        <TableRow>
                            <TableCell  scope={classes.col}>Date de dépot</TableCell >
                            <TableCell  scope={classes.col}>Produit ID</TableCell >
                            <TableCell  scope={classes.col}>Etat de la réclamation</TableCell >
                            <TableCell  scope={classes.col}>Identifiant</TableCell >
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {statereclamation.map((el,index) => {
                            return(
                                <TableRow  key = {index}>
                                    <TableCell >{new Intl.DateTimeFormat('en-GB').format(new Date(el.date))}</TableCell >
                                    <TableCell >{el.produits_id}</TableCell >
                                    <TableCell >{el.etat_rec}</TableCell >
                                    <TableCell >{el.id }</TableCell >
                                </TableRow >
                            )
                        } )}
                        </TableBody>
                    </Table>
                    </> :<h3>Vous n'avez pas encore déposé de réclamations pour le moment </h3>
                        }
                </div>
            </div>
            <Footer />
        </div>
    )
}