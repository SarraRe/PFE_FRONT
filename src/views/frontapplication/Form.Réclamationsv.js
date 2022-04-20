import React, { useEffect } from 'react';
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
import { decodetoken, url } from 'src/utils/baseurl'
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel'
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

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
    width: "10vw",
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

export default function Réclamations() {
  const classes = useStyles();
  const history = useNavigate();
  const [Types_réclamations_id, setTypes_réclamations_id] = React.useState([]);
  const handleChange = (event) => {
    setTypes_réclamations_id(event.target.value);
  };
  const [typereclamation, settypereclamation] = React.useState([]);
  const [produit, setproduit] = React.useState([]);
  const [revendeur, setrevendeur] = React.useState([]);
  const [opensnak, setOpensnak] = React.useState(false);
  const handleClosesnak = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpensnak(false);
  };
  useEffect(() => {
    const data = decodetoken()
    if (data) {
      initialValues.mail = data.Mail;
      initialValues.telephone = data.tel
      initialValues.revendeur_id = data.id
      axios.get(url + '/reclamations/alltype')
        .then((response) => {
          console.log('resp', response)
          settypereclamation(response.data)
        })
        .catch((error) => {
        });
      axios.get(url + '/produit')
        .then((response) => {
          console.log('resp', response)
          setproduit(response.data)
        })
        .catch((error) => {
        });
      axios.get(url + '/client')
        .then((response) => {
          console.log('resp', response)
          setrevendeur(response.data)
        })
        .catch((error) => {
        });
    }
    return () => {

    }
  }, [localStorage.getItem("user_connected")])
  const initialValues = {
    date: '',
    nom_prénom: '',
    mail: '',
    telephone: '',
    objet: '',
    clients_id: '',
    Types_réclamations_id: '',
    produits_id: '',
    revendeur_id: ''
  }

  function onSubmit(values) {
    console.log(values)
    axios.post(url + '/reclamations/add', values)
      .then((response) => {
        setOpensnak(true);
        setTimeout(() => {
          localStorage.removeItem('countRefreshForAlert');
          history('/Interface2');
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
        <div className={classes.background2After}></div>
        <div className={classes.formContainer}>
          <Snackbar anchorOrigin={{
            vertical: 'center',
            horizontal: 'left'
          }} open={opensnak} autoHideDuration={6000} onClose={handleClosesnak}>
            <Alert onClose={handleClosesnak} severity="success">
              Réclamation ajoutée avec succès
            </Alert>
          </Snackbar>
          <h1 className={classes.title}>Déposez votre réclamation !</h1>
          <Formik
            {...{ initialValues, onSubmit }}
            /*il controle de saisie*/
            validationSchema={
              Yup.object().shape({
                date: Yup.string().required('Date est requise'),
                nom_prénom: Yup.string().required(),
                objet: Yup.string(),
                // clients_id: Yup.string().required('client ID est requis'),
                produits_id: Yup.number().integer().required('ID du produit est requis'),
                revendeur_id: Yup.number().integer(),
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
                    label="Date de dépot"
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                    error={Boolean(touched.date && errors.date)}
                    helperText={touched.date && errors.date}
                    color="primary"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    className={classes.formTextField}
                    name="date"
                    type="date"
                    value={values.date}
                  />
                </div>
                <div className="form-row">
                  <TextField
                    id="outlined-secondary"
                    label="Nom et prénom"
                    variant="outlined"
                    error={Boolean(touched.nom_prénom && errors.nom_prénom)}
                    helperText={touched.nom_prénom && errors.nom_prénom}
                    color="primary"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    className={classes.formTextField}
                    name="nom_prénom"
                    value={values.nom_prénom}
                  />
                </div>


                <div className="form-row">
                  <TextField
                    id="outlined-secondary"
                    label="Objet de la réclamation"
                    variant="outlined"
                    error={Boolean(touched.objet && errors.objet)}
                    helperText={touched.objet && errors.objet}
                    color="primary"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    className={classes.formTextField}
                    name="objet"
                    value={values.objet}
                  />
                </div>
                <div className="form-row">
                  <FormControl style={{ width: '500px', marginBottom: '5px', marginTop: '5px', marginLeft: '60px' }} >
                    <InputLabel >Client</InputLabel>
                    <Select
                      label="Id du client"
                      variant="outlined"
                      error={Boolean(touched.clients_id && errors.clients_id)}
                      helperText={touched.clients_id && errors.clients_id}
                      color="primary"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name="clients_id"
                      value={values.clients_id}
                    >
                      {revendeur.map((el, index) => {
                        return (
                          <option key={index} value={el.Code}>{el.Nom}</option>)
                      }
                      )}
                    </Select>
                  </FormControl>
                </div>
                <div >
                  <FormControl style={{ width: '500px', marginBottom: '5px', marginTop: '5px', marginLeft: '60px' }}>
                    <InputLabel >Réclamations</InputLabel>
                    <Select
                      id="outlined-secondary"
                      native
                      onChange={handleChange}
                      variant="outlined"

                      color="primary"
                      onBlur={handleBlur}
                      name="Types_réclamations_id"
                      defaultValue={values.Types_réclamations_id}
                    > 
                      {typereclamation.map((el, index) => {
                       return (
                        <option key={index} value={el.id}>{el.types_réclamation}</option>)
                    }
                    )}
                    </Select >
                  </FormControl>
                </div>
                <div >
                  <FormControl style={{ width: '500px', marginBottom: '5px', marginTop: '5px', marginLeft: '60px' }}>
                    <InputLabel >Produit</InputLabel>
                    <Select
                      variant="outlined"
                      error={Boolean(touched.produits_id && errors.produits_id)}
                      helperText={touched.produits_id && errors.produits_id}
                      color="primary"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name="produits_id"
                      value={values.produits_id}
                    >
                      {produit.map((el, index) => {
                        return (
                          <option key={index} value={el.id}>{el.Nom}</option>)
                      }
                      )}
                    </Select>
                  </FormControl>
                </div>
                {/* <div>
                <FormControl style={{width : '550px' , marginBottom:'5px',marginTop:'5px' , marginLeft:'60px'}} >
                  <InputLabel >Revendeur</InputLabel>
                  <Select
                    id="outlined-secondary"
                    variant="outlined"
                    InputLabelProps={{shrink: false}}
                    error={Boolean(touched.revendeur_id && errors.revendeur_id)}
                    helperText={touched.revendeur_id && errors.revendeur_id}
                    color="primary"
                    onBlur={handleBlur}
                    input={
                      <OutlinedInput
                        notched
                        labelWidth={'labelWidth'}
                        name="age"
                        id="outlined-age-always-notched"
                      />
                    }
                    onChange={handleChange}
                    name="revendeur_id"
                    value={values.revendeur_id}
                  >
                     {revendeur.map((el,index) => {return (
                    <option key={index} value={el.id}>{el.nomPrenom}</option> )}
                    )}
                 </Select>
                 </FormControl>
                </div> */}
                <div className="form-row">
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Envoyer
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