import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { url } from '../../utils/baseurl'
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Page from 'src/components/Page';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100wh',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const AjoutClient = () => {
  const navigate = useNavigate()
  const classes = useStyles();
  const [opensnak, setOpensnak] = useState(false);
  const [stateactivites, setstateactivites] = useState([])
  const [staterevendeur, setstaterevendeur] = useState([])
  const [statepays, setstatepays] = useState([])
  const initialValues = {
    code: '',
    Mail: '',
    Nom: '',
    MatriculeFiscale: '',
    Adresse: '',
    tel: '',
    Contact: '',
    CodeRevendeur: '',
    Observations: '',
    Pays_id: '',
    CP_Ville_CodePostal: '',
    Activites_id: '',
  };
  const handleClosesnak = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpensnak(false);
  };

  useEffect(() => {
    axios.get(url + '/activites')
      .then(res => {
        console.log(res);
        setstateactivites(res.data)
      })
      .catch(err => console.log(err))
    axios.get(url + '/pays')
      .then(res => {
        console.log(res);
        setstatepays(res.data)
      })
      .catch(err => console.log(err))
    axios.get(url + '/revendeur')
      .then(res => {
        console.log(res)
        setstaterevendeur(res.data)
      })
      .catch(err => console.log(err))
  }, [])
  function onSubmit(values) {
    axios.post(url + '/client/add', values)
      .then((response) => {
        console.log(response);
        navigate('/app/customers')
        // window.location.replace('/app/customers');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <Page
      className={classes.root}
      title="AjoutClient"
    >
      <Snackbar  anchorOrigin={{ vertical: 'center',
    horizontal: 'left'}} open={opensnak} autoHideDuration={6000} onClose={handleClosesnak}>
        <Alert onClose={handleClosesnak} severity="success">
         Client ajouté avec succès
        </Alert>
      </Snackbar>
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
      >
        <Container maxWidth="sm">
          <Formik
            {...{ initialValues, onSubmit }}
            validationSchema={
              Yup.object().shape({
                code: Yup.string().required('Code Client est requis'),
                Mail: Yup.string().email('Email doit etre valide').max(255).required('Email est requis'),
                Nom: Yup.string().max(255).required('Nom de la société est requis'),
                MatriculeFiscale: Yup.string().max(255).required('Matricule fiscale est requise'),
                Adresse: Yup.string().required('Adresse est requise'),
                tel: Yup.string().required('Le numéro de téléphone est requis'),
                Contact: Yup.string().required('Contact est requis'),
                Activites_id: Yup.string().required('Activité ID est requis'),
                CodeRevendeur: Yup.string(),
                Observations: Yup.string(),
                Pays_id: Yup.string().required('Pays est requis'),
                CP_Ville_CodePostal: Yup.string().required('Code postal est requis'),
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

                <Box mb={3}>
                  <Typography
                    color="textPrimary"
                    variant="h2"
                  >
                    Ajouter nouveau Client
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.Nom && errors.Nom)}
                  fullWidth
                  helperText={touched.Nom && errors.Nom}
                  label="Nom de la société"
                  margin="normal"
                  name="Nom"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.Nom}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.code && errors.code)}
                  fullWidth
                  helperText={touched.code && errors.code}
                  label="Code Client"
                  margin="normal"
                  name="code"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.code}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.MatriculeFiscale && errors.MatriculeFiscale)}
                  fullWidth
                  helperText={touched.MatriculeFiscale && errors.MatriculeFiscale}
                  label="Matricule fiscale"
                  margin="normal"
                  name="MatriculeFiscale"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.MatriculeFiscale}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.Contact && errors.Contact)}
                  fullWidth
                  helperText={touched.Contact && errors.Contact}
                  label="Contact"
                  margin="normal"
                  name="Contact"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.Contact}
                  variant="outlined"
                />
                <FormControl style={{ width: '550px', marginBottom: '10px' }}>
                  <InputLabel id="demo-simple-select-error-label">Activité</InputLabel>
                  <Select
                    error={Boolean(touched.Activites_id && errors.Activites_id)}
                    fullWidth
                    helperText={touched.Activites_id && errors.Activites_id}
                    label="Activité"
                    margin="normal"
                    name="Activites_id"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.Activites_id}
                    variant="outlined"
                  >
                    <option value=''></option>
                    {stateactivites.map((el, index) => {
                      return (
                        <option key={index} value={el.id}>{el.Activité}</option>)
                    })}
                  </Select>
                </FormControl>
                <TextField
                  error={Boolean(touched.Mail && errors.Mail)}
                  fullWidth
                  helperText={touched.Mail && errors.Mail}
                  label="Email Adress"
                  margin="normal"
                  name="Mail"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="email"
                  value={values.Mail}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.Adresse && errors.Adresse)}
                  fullWidth
                  helperText={touched.Adresse && errors.Adresse}
                  label="Adresse"
                  margin="normal"
                  name="Adresse"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.Adresse}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.tel && errors.tel)}
                  fullWidth
                  helperText={touched.tel && errors.tel}
                  label="Numéro de téléphone"
                  margin="normal"
                  name="tel"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.tel}
                  variant="outlined"
                />
                <FormControl style={{ width: '550px', marginBottom: '10px' }}>
                  <InputLabel id="demo-simple-select-error-label">Revendeur</InputLabel>
                  <Select
                    error={Boolean(touched.CodeRevendeur && errors.CodeRevendeur)}
                    fullWidth
                    helperText={touched.CodeRevendeur && errors.CodeRevendeur}
                    label="Revendeur"
                    margin="normal"
                    name="CodeRevendeur"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.CodeRevendeur}
                    variant="outlined"
                  >
                    <option value=''></option>
                    {staterevendeur.map((el, index) => {
                      return (
                        <option key={index} value={el.id}>{el.nomPrenom}</option>)
                    })}
                  </Select>
                </FormControl>
                <FormControl style={{ width: '550px', marginBottom: '10px' }}>
                  <InputLabel >Pays</InputLabel>
                  <Select
                    error={Boolean(touched.Pays_id && errors.Pays_id)}
                    fullWidth
                    helperText={touched.Pays_id && errors.Pays_id}
                    label="Pays_id"
                    margin="normal"
                    name="Pays_id"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.Pays_id}
                    variant="outlined"
                  >
                    <option value=''></option>
                    {
                      statepays.map((el, index) => {
                        return (
                          <option key={index} value={el.id}>{el.Pays}</option>)
                      })

                    }
                  </Select>
                </FormControl>
                <TextField
                  error={Boolean(touched.CP_Ville_CodePostal && errors.CP_Ville_CodePostal)}
                  fullWidth
                  helperText={touched.CP_Ville_CodePostal && errors.CP_Ville_CodePostal}
                  label="Code postal"
                  margin="normal"
                  name="CP_Ville_CodePostal"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.CP_Ville_CodePostal}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.Observations && errors.Observations)}
                  fullWidth
                  helperText={touched.Observations && errors.Observations}
                  label="Observations"
                  margin="normal"
                  name="Observations"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.Observations}
                  variant="outlined"
                />
                <Box my={2}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Ajouter Client
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </Page>
  );
};

export default AjoutClient;
