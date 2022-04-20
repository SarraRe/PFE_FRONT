import React,{useState} from 'react';
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
import {decodetoken,url} from 'src/utils/baseurl'

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
    textdanger : {
        color : 'red',
        textAlign:'center',
        fontSize:25
    },
    textsuccess: {
        color : 'limegreen',
        textAlign:'center',
        fontSize:25
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

export default function MdpClient() {
    const classes = useStyles();
    const history = useNavigate();
    const [sendresulta, setsendresulta] = useState(false);
    const [statemessage, setstatemessage] = useState('');
    const usercoeected = decodetoken();
    const initialValues = {
        code: usercoeected.Code ,
        MotDePasse: '',
        ConfirmMDP:''
    }

    function onSubmit(values) {
        console.log(values,values.motDePasse == values.ConfirmMDP , values.MotDePasse.localeCompare(values.ConfirmMDP))
        if (values.MotDePasse == values.ConfirmMDP ){
            console.log('ok')
        axios.put(url+`/client/put/${values.code}`, values)
            .then((response) => {
                setstatemessage(response.data)
                setsendresulta(true)
                setTimeout(() => {
                    history('/Interface1');
                   }, 2000);
               
            })
            .catch((error) => {
            });
    }
    else {
        console.log('non ok')

        setstatemessage('Mots de passe non identiques !')
    }

}



    return (
        <div>
            {/* <Navbar /> */}
            <div className={classes.background2}>
                <div className={classes.background2After}></div>
                <div className={classes.formContainer}>
                <p className={sendresulta ?classes.textsuccess : classes.textdanger} >{statemessage}</p>
                    <h1 className={classes.title}>Changez votre mot de passe</h1>
                    <Formik
                        {...{ initialValues, onSubmit }}
                        /* il controle de saisie*/
                        validationSchema={
                            Yup.object().shape({
                                code: Yup.string().required('vous devez saisir votre identifiant'),
                                MotDePasse: Yup.string().required('vous devez saisir le nouveau mot de passe'),
                                ConfirmMDP: Yup.string().required('vous devez confirmer le nouveau mot de passe'),
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
                                        label="Nouveau mot de passe"
                                        type="password"
                                        variant="outlined"
                                        error={Boolean(touched.MotDePasse && errors.MotDePasse)}
                                        helperText={touched.MotDePasse && errors.MotDePasse}
                                        color="primary"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        className={classes.formTextField}
                                        name="MotDePasse"
                                        value={values.MotDePasse}
                                    />
                                </div>
                                <div className="form-row">
                                    <TextField
                                        id="outlined-secondary"
                                        label="Confirmer mot de passe"
                                        type="password"
                                        variant="outlined"
                                        error={Boolean(touched.ConfirmMDP && errors.ConfirmMDP)}
                                        helperText={touched.ConfirmMDP && errors.ConfirmMDP}
                                        color="primary"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        className={classes.formTextField}
                                        name="ConfirmMDP"
                                        value={values.ConfirmMDP}
                                    />
                                </div>
                                <div className="form-row">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        className={classes.button}
                                        type="submit"
                                        disabled={sendresulta}
                                    >
                                        Changer mot de passe
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