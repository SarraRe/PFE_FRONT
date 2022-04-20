import React, { useEffect, useState } from 'react';
// import Navbar from './Navbar';
import BusinessMeeting from '../../Assets/BusinessMeeting.jpeg'
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Select } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { url, decodetoken } from 'src/utils/baseurl'
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert'

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
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

export default function MJP1() {
    const classes = useStyles();
    const [codepostale, setcodepostal] = useState([])
    const [pays, setpays] = useState([])
    const [activites, setactivites] = useState([])
    const [initialdata, setinitildata] = useState({
        code: '',
        Nom: '',
        Adresse: '',
        MatriculeFiscale: '',
        Mail: '',
        Contact: '',
        CodeRevendeur: '',
        Observations: '',
        Telephone: '',
        CP_Ville_CodePostal: '',
        Pays_id: '',
        Activites_id: ''
    })
    const history = useNavigate();
    const initialValues = initialdata
    const enableReinitialize = true


    useEffect(() => {

        const data = decodetoken()
        axios.get(url + '/pays')
            .then((response) => {
                console.log('resp', response)
                setpays(response.data)
            })
            .catch((error) => {
            });
        axios.get(url + `/client/${data.Code}`)
            .then(response => {
                const res = response.data[0];
                setinitildata({
                    ...initialdata, code: data.Code,
                    Nom: res.Nom,
                    Adresse: res.Adresse,
                    MatriculeFiscale: res.MatriculeFiscale,
                    Mail: res.Mail,
                    Contact: res.Contact,
                    CodeRevendeur: res.CodeRevendeur,
                    Observations: res.Observations,
                    Telephone: res.tel,
                    CP_Ville_CodePostal: res.CP_Ville_CodePostal,
                    Pays_id: res.Pays_id,
                    Activites_id: res.Activites_id
                })
            })
        axios.get(url + '/activites')
            .then((response) => {
                console.log('resp', response)
                setactivites(response.data)
            })
            .catch((error) => {
            });
        axios.get(url + '/adresse')
            .then((response) => {
                console.log('resp', response)
                setcodepostal(response.data)
            })
            .catch((error) => {
            });
    }, [])
    const [opensnak, setOpensnak] = React.useState(false);
    const handleClosesnak = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpensnak(false);
    };
    function onSubmit(values) {
        axios.put('http://localhost:5000/client/mise/:code', values)
            .then((response) => {
                setOpensnak(true);
                setTimeout(() => {
                    localStorage.removeItem('countRefreshForAlert');
                    history('/Interface1');
                }, 2000);

            })
            .catch((error) => {
            });
    };


    const phoneRegExp = `^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[ ]{0,1}[-s./0-9]*$`;

    return (
        <div>
            {/* <Navbar /> */}

            <div className={classes.background2}>
                <Snackbar anchorOrigin={{
                    vertical: 'center',
                    horizontal: 'left'
                }} open={opensnak} autoHideDuration={6000} onClose={handleClosesnak}>
                    <Alert onClose={handleClosesnak} severity="success">
                        Profil mis à jour
                    </Alert>
                </Snackbar>
                <div className={classes.background2After}></div>
                <div className={classes.formContainer}>
                    <h1 className={classes.title}>Mettez à jour votre profil</h1>
                    <Formik
                        enableReinitialize
                        {...{ initialValues, enableReinitialize, onSubmit }}
                        /*mta3 il controle de saisie*/
                        validationSchema={
                            Yup.object().shape({
                                code: Yup.string().required('vous devez entrer votre identifiant'),
                                Nom: Yup.string().required('vous devez entrer le nom de votre société'),
                                Adresse: Yup.string().required('vous devez entrer votre adresse'),
                                MatriculeFiscale: Yup.string().required('vous devez entrer votre matricule fiscale'),
                                Mail: Yup.string().email('Adresse mail non valide').max(255).required('vous devez entrer votre adresse'),
                                Telephone: Yup.string().matches(phoneRegExp, 'Numéro de téléphone non valide').required("vous devez entrer votre numéro de téléphone"),
                                CP_Ville_CodePostal: Yup.string().required('vous devez entrer votre Code postal'),
                                Contact: Yup.string().required('vous devez entrer vos Nom & prénom'),
                                Activites_id: Yup.string().required('entrez votre identifiant activité'),
                                Observations: Yup.string(),
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
                                        error={Boolean(touched.code && errors.code)}
                                        helperText={touched.code && errors.code}
                                        color="primary"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        className={classes.formTextField}
                                        name="code"
                                        value={values.code}
                                        disabled
                                    />
                                </div>
                                <div className="form-row">
                                    <TextField
                                        id="outlined-secondary"
                                        label="Nom de votre société"
                                        variant="outlined"
                                        error={Boolean(touched.Nom && errors.Nom)}
                                        helperText={touched.Nom && errors.Nom}
                                        color="primary"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        className={classes.formTextField}
                                        name="Nom"
                                        value={values.Nom}
                                    />
                                </div>
                                <div className="form-row">
                                </div>
                                <div className="form-row">
                                    <TextField
                                        id="outlined-secondary"
                                        label="Adresse"
                                        variant="outlined"
                                        error={Boolean(touched.Adresse && errors.Adresse)}
                                        helperText={touched.Adresse && errors.Adresse}
                                        color="primary"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        className={classes.formTextField}
                                        name="Adresse"
                                        value={values.Adresse}
                                    />
                                </div>
                                <div className="form-row">
                                    <TextField
                                        id="outlined-secondary"
                                        label="Matricule fiscale"
                                        variant="outlined"
                                        error={Boolean(touched.MatriculeFiscale && errors.MatriculeFiscale)}
                                        helperText={touched.MatriculeFiscale && errors.MatriculeFiscale}
                                        color="primary"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        className={classes.formTextField}
                                        name="MatriculeFiscale"
                                        value={values.MatriculeFiscale}
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
                                        label="Nom & prénom"
                                        variant="outlined"
                                        error={Boolean(touched.Contact && errors.Contact)}
                                        helperText={touched.Contact && errors.Contact}
                                        color="primary"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        className={classes.formTextField}
                                        name="Contact"
                                        value={values.Contact}
                                    />
                                </div>
                                <div className="form-row">
                                    <TextField
                                        id="outlined-secondary"
                                        label="Code de votre revendeur"
                                        variant="outlined"
                                        error={Boolean(touched.CodeRevendeur && errors.CodeRevendeur)}
                                        helperText={touched.CodeRevendeur && errors.CodeRevendeur}
                                        color="primary"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        className={classes.formTextField}
                                        name="CodeRevendeur"
                                        value={values.CodeRevendeur}
                                    />
                                </div>
                                <div className="form-row">
                                    <TextField
                                        id="outlined-secondary"
                                        label="Observations"
                                        variant="outlined"
                                        error={Boolean(touched.Observations && errors.Observations)}
                                        helperText={touched.Observations && errors.Observations}
                                        color="primary"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        className={classes.formTextField}
                                        name="Observations"
                                        value={values.Observations}
                                    />
                                </div>
                                <div className="form-row">
                                    <TextField
                                        id="outlined-secondary"
                                        label="Telephone"
                                        variant="outlined"
                                        error={Boolean(touched.Telephone && errors.Telephone)}
                                        helperText={touched.Telephone && errors.Telephone}
                                        color="primary"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        className={classes.formTextField}
                                        name="Telephone"
                                        value={values.Telephone}
                                    />
                                </div>
                                <div className="form-row">
                                    <TextField
                                        id="outlined-secondary"
                                        label="Code Postal"
                                        variant="outlined"
                                        error={Boolean(touched.CP_Ville_CodePostal && errors.CP_Ville_CodePostal)}
                                        helperText={touched.CP_Ville_CodePostal && errors.CP_Ville_CodePostal}
                                        color="primary"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        className={classes.formTextField}
                                        name="CP_Ville_CodePostal"
                                        value={values.CP_Ville_CodePostal}
                                    />
                                </div>
                                <div className="form-row">
                                    <FormControl style={{ width: '500px', marginBottom: '5px', marginTop: '5px', marginLeft: '60px' }} >
                                        <InputLabel >Payes</InputLabel>
                                        <Select
                                            id="outlined-secondary"
                                            label="Pays ID"
                                            variant="outlined"
                                            error={Boolean(touched.Pays_id && errors.Pays_id)}
                                            helperText={touched.Pays_id && errors.Pays_id}
                                            color="primary"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            name="Pays_id"
                                            value={values.Pays_id}
                                        >   {pays.map((el, index) => {
                                            return (<option key={index} value={el.id}>{el.Pays}</option>)
                                        })}
                                        </Select>
                                    </FormControl>
                                </div>
                                <div className="form-row">
                                    <FormControl style={{ width: '500px', marginBottom: '5px', marginTop: '5px', marginLeft: '60px' }} >
                                        <InputLabel >Activité</InputLabel>
                                        <Select
                                            id="outlined-secondary"
                                            label="Activité ID"
                                            variant="outlined"
                                            error={Boolean(touched.Activites_id && errors.Activites_id)}
                                            helperText={touched.Activites_id && errors.Activites_id}
                                            color="primary"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            name="Activites_id"
                                            value={values.Activites_id}
                                        >
                                            {activites.map((el, index) => {
                                                return (<option value={el.id} key={index}>{el.Activité}</option>)
                                            })}
                                        </Select>
                                    </FormControl>
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
