/* eslint-disable eol-last */
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
import { url } from '../../utils/baseurl';
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

const AjouterPersonnel = () => {
  const navigateur =  useNavigate()
  const classes = useStyles();
  const [opensnak, setOpensnak] = useState(false);
  const handleClosesnak = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpensnak(false);
  };
  const initialValues = {
    nom_prenom: '',
    mail: '',
    tel: '',
  };

  function onSubmit(values) {
    axios.post(url + '/personnel/add', values)
      .then((response) => {
       
        setOpensnak(true);
        setTimeout(() => {
          navigateur('/app/Personnels')
        }, 2000);
      
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <Page
      className={classes.root}
      title="AjouterPersonnel"
    >
          <Snackbar  anchorOrigin={{ vertical: 'center',
    horizontal: 'left'}} open={opensnak} autoHideDuration={6000} onClose={handleClosesnak}>
        <Alert onClose={handleClosesnak} severity="success">
        Personnel ajouté avec succès
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
                nom_prenom: Yup.string().required('Nom et prénom sont requis'),
                mail: Yup.string().email('Email doit etre valide').required('Email est requis'),
                tel: Yup.string().required('Le numéro de téléphone est requis'),
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
                    Ajouter le nouveau personnel
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.nom_prenom && errors.nom_prenom)}
                  fullWidth
                  helperText={touched.nom_prenom && errors.nom_prenom}
                  label="Nom et Prénom"
                  margin="normal"
                  name="nom_prenom"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.nom_prenom}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.mail && errors.mail)}
                  fullWidth
                  helperText={touched.mail && errors.mail}
                  label="Email"
                  margin="normal"
                  name="mail"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.mail}
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
                <Box my={2}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Ajouter personnel
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
export default AjouterPersonnel;