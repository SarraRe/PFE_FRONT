import React, { useState } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core';
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

const AjoutRevendeur = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const [opensnak, setOpensnak] = useState(false);
  const handleClosesnak = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpensnak(false);
  };
  const initialValues = {
    nomPrenom: '',
    societe: '',
    activité: '',
    adresse: '',
    tel: '',
    Mail: '',
    observations: '',
    etat_rev: '',
  };

  function onSubmit(values) {
    axios.post('http://localhost:5000/revendeur/add/nr', values)
      .then((response) => {
        setOpensnak(true);
        setTimeout(() => {
          navigate('/app/candidat_revendeur');
        }, 2000);
     
      })
      .catch((error) => {
        console.log(error);
      });
  }


  return (
    <Page
      className={classes.root}
      title="AjoutRevendeur"
    >
        <Snackbar  anchorOrigin={{ vertical: 'center',
    horizontal: 'left'}} open={opensnak} autoHideDuration={6000} onClose={handleClosesnak}>
        <Alert onClose={handleClosesnak} severity="success">
         Revendeur ajouté avec succès
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
                nomPrenom: Yup.string().max(255).required('Nom et prénom sont requis'),
                societe: Yup.string().required('champs société est requise'),
                activité: Yup.string().required('activité est requise'),
                adresse: Yup.string().required('adresse est requise'),
                tel: Yup.string().required('Le numéro de téléphone est requis'),
                Mail: Yup.string().email('Email doit etre valide').max(255).required('Email est requis'),
                observations: Yup.string(),
                etat_rev: Yup.string().required('Etat revendeur est requis -fonctionnel-'),
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
                    Ajouter revendeur
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.nomPrenom && errors.nomPrenom)}
                  fullWidth
                  helperText={touched.nomPrenom && errors.nomPrenom}
                  label="Nom et prénom"
                  margin="normal"
                  name="nomPrenom"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.nomPrenom}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.societe && errors.societe)}
                  fullWidth
                  helperText={touched.societe && errors.societe}
                  label="Nom de la société"
                  margin="normal"
                  name="societe"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.societe}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.activité && errors.activité)}
                  fullWidth
                  helperText={touched.activité && errors.activité}
                  label="Domaine"
                  margin="normal"
                  name="activité"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.activité}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.adresse && errors.adresse)}
                  fullWidth
                  helperText={touched.adresse && errors.adresse}
                  label="Adresse"
                  margin="normal"
                  name="adresse"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.adresse}
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
                <TextField
                  error={Boolean(touched.Mail && errors.Mail)}
                  fullWidth
                  helperText={touched.Mail && errors.Mail}
                  label="Email"
                  margin="normal"
                  name="Mail"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="email"
                  value={values.Mail}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.observations && errors.observations)}
                  fullWidth
                  helperText={touched.observations && errors.observations}
                  label="observations"
                  margin="normal"
                  name="observations"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.observations}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.etat_rev && errors.etat_rev)}
                  fullWidth
                  helperText={touched.etat_rev && errors.etat_rev}
                  label="Etat du revendeur"
                  margin="normal"
                  name="etat_rev"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.etat_rev}
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
                    Ajouter revendeur
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
export default AjoutRevendeur;
