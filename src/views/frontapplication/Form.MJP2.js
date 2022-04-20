import React, { useEffect , useState } from 'react';
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
import {url , decodetoken} from 'src/utils/baseurl'

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

export default function MJP2() {
    const classes = useStyles();
    const history = useNavigate();
    const [state, setstate] = useState({
        id: '',
        nomPrenom: '',
        societe: '',
        activité: '',
        adresse: '',
        tel: '',
        Mail: '',
        observations: ''
    })
    const initialValues =state
    const enableReinitialize = true
   useEffect(() => {
    const  data = decodetoken()
    if (data) {
        axios.get(url +`/revendeur/${data.id}`)
        .then( response  => {
            const res = response.data[0];
            setstate({...state ,id:data.id ,nomPrenom:res.nomPrenom,societe:res.societe,
            activité:res.activité,adresse:res.adresse,tel:res.tel,Mail:res.Mail ,observations:res.observations })
            
        })
            
        }
       return () => {
           
       }
   }, [])

    function onSubmit(values) {
        axios.put(url+'/revendeur/:id', values)
            .then((response) => {
                localStorage.removeItem('countRefreshForAlert');
                history('/Interface2');
            })
            .catch((error) => {
            });
    };


    const phoneRegExp = `^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[ ]{0,1}[-s./0-9]*$`;

    return (
        <div>
            {/* <Navbar /> */}
            <div className={classes.background2}>
                <div className={classes.background2After}></div>
                <div className={classes.formContainer}>
                    <h1 className={classes.title}>Mettez à jour votre profil</h1>
                    <Formik
                    enableReinitialize
                        {...{ initialValues,enableReinitialize, onSubmit }}
                        /*mta3 il controle de saisie*/
                        validationSchema={
                            Yup.object().shape({
                                id: Yup.number().integer().required('vous devez entrer votre identifiant'),
                                nomPrenom: Yup.string().required('vous devez saisir votre nom et prénom'),
                                societe: Yup.string().required('vous devez saisir le nom de votre société'),
                                activité: Yup.string().required('vous devez saisir votre domaine'),
                                adresse: Yup.string().required('vous devez saisir votre adresse'),
                                tel: Yup.string().matches(phoneRegExp, 'Numéro de téléphone non valide').required("vous devez entrer votre numéro de téléphone"),
                                Mail: Yup.string().email('Adresse mail non valide').max(255).required('vous devez saisir votre Email'),
                                observations: Yup.string(),
                            })
                        }
                    >
                        {({
                            errors,
                            handleBlur,
                            handleChange,
                            handleSubmit,
                            isSubmitting,
                            touched,
                            values
                        }) => (

                            <form onSubmit={handleSubmit}>
                                <div className="form-row">
                                    <TextField
                                        id="outlined-secondary"
                                        label="Identifiant"
                                        variant="outlined"
                                        error={Boolean(touched.id && errors.id)}
                                        helperText={touched.id && errors.id}
                                        color="primary"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        className={classes.formTextField}
                                        name="id"
                                        value={values.id}
                                        disabled
                                    />
                                </div>
                                <div className="form-row">
                                    <TextField
                                        id="outlined-secondary"
                                        label="Nom et prénom"
                                        variant="outlined"
                                        error={Boolean(touched.nomPrenom && errors.nomPrenom)}
                                        helperText={touched.nomPrenom && errors.nomPrenom}
                                        color="primary"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        className={classes.formTextField}
                                        name="nomPrenom"
                                        value={values.nomPrenom}
                                    />
                                </div>
                                <div className="form-row">
                                </div>
                                <div className="form-row">
                                    <TextField
                                        id="outlined-secondary"
                                        label="Nom de la société"
                                        variant="outlined"
                                        error={Boolean(touched.societe && errors.societe)}
                                        helperText={touched.societe && errors.societe}
                                        color="primary"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        className={classes.formTextField}
                                        name="societe"
                                        value={values.societe}
                                    />
                                </div>
                                <div className="form-row">
                                    <TextField
                                        id="outlined-secondary"
                                        label="Votre activité"
                                        variant="outlined"
                                        error={Boolean(touched.activité && errors.activité)}
                                        helperText={touched.activité && errors.activité}
                                        color="primary"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        className={classes.formTextField}
                                        name="activité"
                                        value={values.activité}
                                    />
                                </div>
                                <div className="form-row">
                                    <TextField
                                        id="outlined-secondary"
                                        label="Adresse"
                                        variant="outlined"
                                        error={Boolean(touched.adresse && errors.adresse)}
                                        helperText={touched.adresse && errors.adresse}
                                        color="primary"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        className={classes.formTextField}
                                        name="adresse"
                                        value={values.adresse}
                                    />
                                </div>
                                <div className="form-row">
                                    <TextField
                                        id="outlined-secondary"
                                        label="Numéro de téléphone"
                                        variant="outlined"
                                        error={Boolean(touched.tel && errors.tel)}
                                        helperText={touched.tel && errors.tel}
                                        color="primary"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        className={classes.formTextField}
                                        name="tel"
                                        value={values.tel}
                                    />
                                </div>
                                <div className="form-row">
                                    <TextField
                                        id="outlined-secondary"
                                        label="Email"
                                        variant="outlined"
                                        error={Boolean(touched.Mail && errors.Mail)}
                                        helperText={touched.Mail && errors.Mail}
                                        color="primary"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        className={classes.formTextField}
                                        name="Mail"
                                        value={values.Mail}
                                    />
                                </div>
                                <div className="form-row">
                                    <TextField
                                        id="outlined-secondary"
                                        label="observations"
                                        variant="outlined"
                                        error={Boolean(touched.observations && errors.observations)}
                                        helperText={touched.observations && errors.observations}
                                        color="primary"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        className={classes.formTextField}
                                        name="observations"
                                        value={values.observations}
                                    />
                                </div>
                                <div className="form-row">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        className={classes.button}
                                        type="submit"
                                        disabled={isSubmitting}
                                    >
                                        Mettre à jour
                                    </Button>
                                </div>
                            </form>
                        )}
                    </Formik>
                </div>
            </div>
            <Footer />
        </div>
    )
}