import React, { useState } from 'react';
import Navbar from './Navbar';
import BusinessMeeting from '../../Assets/BusinessMeeting.jpeg'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Radio, FormLabel, RadioGroup, FormControlLabel, FormControl, Button } from '@material-ui/core/';
import axios from 'axios';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { url } from 'src/utils/baseurl'
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

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
  formgroups: {
    marginLeft: "5%",
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
    width: "15vw",
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
  genderconection: {
    marginLeft: 50,
    marginTop: 10
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

export default function Auth1() {
  const classes = useStyles();
  const history = useNavigate();
  const [setpassword, setstatepawwsord] = useState(false)
  const [statemessage, setmessage] = useState('')
  const initialValues = {
    Mail: '',
    MotDePasse: '',
    gender: 'client'

  }

  function onSubmit(values) {
    console.log(values)
    if (values.gender == "client") {
      axios.post(url + '/authentification/connection/client', values)
        .then((response) => {
          console.log('resp', response)
          if (response.data && response.data.role == "client") {
            localStorage.setItem("user_connected", response.data.token);
            localStorage.removeItem('countRefreshForAlert');
            history('../Interface1');
          }
          else if (response.data && response.data.data !== "") {
            setmessage(response.data.data)
          }
        })
        .catch((error) => {
        });
    }
    if (values.gender == "revendeur") {
      axios.post(url + '/authentification/connection/revendeur', values)
        .then((response) => {
          console.log('resp', response)
          if (response.data && response.data.role == "revendeur") {
            localStorage.setItem("user_connected", response.data.token);
            localStorage.removeItem('countRefreshForAlert');
            history('../Interface2');
          }
          else if (response.data && response.data.data !== "") {
            setmessage(response.data.data)
          }
        })
        .catch((error) => {
        });
    };
    if (values.gender == "other") {
      axios.post(url + '/authentification/connection/autre', values)
        .then((response) => {
          console.log('resp', response)
          if (response.data && response.data.error == 0) {
            localStorage.setItem("user_connected", response.data.token);
            localStorage.removeItem('countRefreshForAlert');
            history('/app/dashboard');
          }
          else if (response.data && response.data.data !== "") {
            setmessage(response.data.data)
          }
        })
        .catch((error) => {
        });
    };
  }


  return (
    <div>
      <Navbar />
      <div className={classes.background2}>
        <div className={classes.background2After}></div>
        <div className={classes.formContainer}>
          <h1 className={classes.title}>Connectez-vous !</h1>
          <Formik
            {...{ initialValues, onSubmit }}
            /*il controle de saisie*/
            validationSchema={
              Yup.object().shape({
                Mail: Yup.string().email('Email doit etre valide').max(255).required('Email requis'),
                MotDePasse: Yup.string().required('Veuillez sasir votre mot de passe').max(20).matches(),
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
                  <p>{statemessage}</p>
                </div>
                <div className="form-row">
                  <TextField
                    id="outlined-secondary"
                    label="Adresse mail"

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
                  <div className={classes.formgroups} style={{
                    display: 'flex',
                    alignItems: 'center',
                  }}>
                    {setpassword ? <Button style={{ marginTop: '15px' }} onClick={() => setstatepawwsord(false)}><VisibilityIcon fontSize='large' /> </Button> : <Button style={{ marginTop: '15px' }} onClick={() => setstatepawwsord(true)}><VisibilityOffIcon fontSize='large' /></Button>}
                    <TextField
                      style={{ border: 'none' }}
                      id="outlined-secondary"
                      label="Mot de passe"

                      error={Boolean(touched.MotDePasse && errors.MotDePasse)}
                      helperText={touched.MotDePasse && errors.MotDePasse}
                      color="primary"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name="MotDePasse"
                      type={setpassword ? 'text' : 'password'}
                      value={values.MotDePasse}
                      className={classes.formTextField}
                      style={{ marginLeft: '1%' }}
                    />
                  </div>
                </div>
                <div className={classes.genderconection} >
                  <FormControl component={classes.genderconection}>
                    <FormLabel component="legend">Vous êtes ? </FormLabel>
                    <RadioGroup aria-label="gender" defaultValue={values.gendre} name="gender" onChange={handleChange}>
                      <FormControlLabel value="client" control={<Radio />} label="Client" />
                      <FormControlLabel value="revendeur" control={<Radio />} label="Revendeur" />
                      <FormControlLabel value="other" control={<Radio />} label="Gérant" />
                    </RadioGroup>
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
                    Se connecter
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
